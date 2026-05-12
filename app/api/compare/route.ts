import { NextRequest } from "next/server";
import { buildBamlPrompt, buildPydanticPrompt } from "@/lib/prompts";
import { parseBaml, parsePydantic } from "@/lib/parsers";
import { callOpenRouter } from "@/lib/openrouter";

export async function POST(request: NextRequest) {
  try {
    const { jd, bullets } = (await request.json()) as {
      jd: string;
      bullets: string;
    };

    const bamlPrompt = buildBamlPrompt(jd, bullets);
    const pydanticPrompt = buildPydanticPrompt(jd, bullets);

    // Call both prompts in parallel
    const [bamlRaw, pydanticRaw] = await Promise.all([
      callOpenRouter(bamlPrompt),
      callOpenRouter(pydanticPrompt),
    ]);

    const bamlParsed = parseBaml(bamlRaw);
    const pydanticParsed = parsePydantic(pydanticRaw);

    return Response.json({
      baml: {
        raw: bamlRaw,
        parsed: bamlParsed,
        success: bamlParsed !== null,
      },
      pydantic: {
        raw: pydanticRaw,
        parsed: pydanticParsed,
        success: pydanticParsed !== null,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return Response.json({ error: message }, { status: 500 });
  }
}
