// BAML-style SAP (Schema-Aligned Parser): resilient fallback parsing.
// Pydantic-style: strict JSON.parse, no recovery.

export interface ScreeningResult {
  matches: Array<{
    requirement: string;
    evidence: string;
    score: number;
  }>;
  coverage_score: number;
  missing_requirements: string[];
}

function isScreeningResult(obj: unknown): obj is ScreeningResult {
  if (typeof obj !== "object" || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return (
    Array.isArray(o.matches) &&
    typeof o.coverage_score === "number" &&
    Array.isArray(o.missing_requirements)
  );
}

/**
 * BAML-style SAP parser:
 * 1. Strip markdown code fences if present
 * 2. Extract JSON object even if wrapped in prose
 * 3. Recover from $defs/properties wrapping by extracting inner data
 * 4. Return parsed object or null on failure
 */
export function parseBaml(raw: string): ScreeningResult | null {
  try {
    let text = raw.trim();

    // Step 1: Strip markdown code fences
    text = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "");
    text = text.trim();

    // Step 2: Extract JSON object from prose
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    text = jsonMatch[0];

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return null;
    }

    // Direct match
    if (isScreeningResult(parsed)) return parsed;

    // Step 3: Recover from $defs/properties/schema wrapping
    if (typeof parsed === "object" && parsed !== null) {
      const obj = parsed as Record<string, unknown>;

      // Check common wrapper keys
      for (const key of ["properties", "data", "result", "response", "output"]) {
        if (obj[key] && isScreeningResult(obj[key])) {
          return obj[key] as ScreeningResult;
        }
      }

      // If it has $defs or $schema, look for the actual data nested inside
      if (obj["$defs"] || obj["$schema"] || obj["definitions"]) {
        // Try to find screening data at any nested level
        for (const value of Object.values(obj)) {
          if (isScreeningResult(value)) return value as ScreeningResult;
          if (typeof value === "object" && value !== null) {
            for (const inner of Object.values(value as Record<string, unknown>)) {
              if (isScreeningResult(inner)) return inner as ScreeningResult;
            }
          }
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Pydantic-style strict parser:
 * 1. JSON.parse the raw response
 * 2. Validate root-level keys
 * 3. Return null on failure (no recovery from wrapper structures)
 */
export function parsePydantic(raw: string): ScreeningResult | null {
  try {
    const parsed = JSON.parse(raw.trim());
    if (isScreeningResult(parsed)) return parsed;
    return null;
  } catch {
    return null;
  }
}
