// Two prompt builders:
// BAML uses informal schema (how BAML actually works - natural language + examples)
// Pydantic uses formal JSON Schema (what model_json_schema() generates)
// The eval's finding: Haiku echoes formal JSON Schema back instead of filling it with data.

const INFORMAL_SCHEMA = `{
  "matches": [
    {
      "bullet_id": int,
      "jd_requirement": string,
      "match_score": float (0-1),
      "justification": string
    }
  ],
  "coverage_score": float (0-1),
  "missing_requirements": [string]
}`;

// This is what Pydantic's model_json_schema() actually produces.
// The $defs and properties structure is what triggers Haiku's schema-echo bug.
const FORMAL_JSON_SCHEMA = `{
  "$defs": {
    "Match": {
      "type": "object",
      "properties": {
        "bullet_id": { "type": "integer", "description": "Index of the resume bullet" },
        "jd_requirement": { "type": "string", "description": "The JD requirement being matched" },
        "match_score": { "type": "number", "minimum": 0, "maximum": 1, "description": "Match confidence 0-1" },
        "justification": { "type": "string", "description": "Why this bullet matches the requirement" }
      },
      "required": ["bullet_id", "jd_requirement", "match_score", "justification"]
    }
  },
  "type": "object",
  "properties": {
    "matches": {
      "type": "array",
      "items": { "$ref": "#/$defs/Match" },
      "description": "List of bullet-to-requirement matches"
    },
    "coverage_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 1,
      "description": "Overall coverage of JD requirements"
    },
    "missing_requirements": {
      "type": "array",
      "items": { "type": "string" },
      "description": "JD requirements not covered by any bullet"
    }
  },
  "required": ["matches", "coverage_score", "missing_requirements"]
}`;

export function buildBamlPrompt(jd: string, bullets: string): string {
  return `You are a resume screening assistant. Compare the candidate's experience against the job description and return a JSON object with the following structure:

${INFORMAL_SCHEMA}

Answer in JSON only. Do not include any explanation or markdown formatting.

If the job description or resume is empty or missing, return:
{"matches": [], "coverage_score": 0, "missing_requirements": ["No data provided"]}

Job Description:
${jd}

Candidate Bullets:
${bullets}`;
}

export function buildPydanticPrompt(jd: string, bullets: string): string {
  // Mimics how Pydantic/instructor sends the schema: formal JSON Schema
  // with $defs, type annotations, and $ref pointers.
  // No hand-holding instructions for edge cases.
  return `Respond with a JSON object that conforms to the following JSON Schema:

${FORMAL_JSON_SCHEMA}

The JSON object must validate against the schema above. Do not include anything other than the JSON object in your response.

Job Description:
${jd}

Candidate Bullets:
${bullets}`;
}
