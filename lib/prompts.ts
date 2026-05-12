// Two prompt builders: one simulating BAML's structured output prompt,
// one simulating a naive Pydantic-style prompt.

const SCHEMA = `{
  "matches": [
    {
      "requirement": "string",
      "evidence": "string",
      "score": "number (0-100)"
    }
  ],
  "coverage_score": "number (0-100)",
  "missing_requirements": ["string"]
}`;

export function buildBamlPrompt(jd: string, bullets: string): string {
  return `You are a resume screening assistant. Compare the candidate's experience against the job description and return a JSON object with the following schema:

${SCHEMA}

Answer in JSON only. Do not include any explanation or markdown formatting.

If the job description or resume is empty or missing, return:
{"matches": [], "coverage_score": 0, "missing_requirements": ["No data provided"]}

Job Description:
${jd}

Candidate Bullets:
${bullets}`;
}

export function buildPydanticPrompt(jd: string, bullets: string): string {
  return `You are a resume screening assistant. Compare the candidate's experience against the job description.

Return your answer as a JSON object matching this exact schema:

${SCHEMA}

Important: Return ONLY the JSON object. No markdown, no code fences, no explanation.

If the job description or resume is empty or missing, return:
{"matches": [], "coverage_score": 0, "missing_requirements": ["No data provided"]}

Job Description:
${jd}

Candidate Bullets:
${bullets}`;
}
