"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonViewer } from "@/components/JsonViewer";

interface PipelineResult {
  raw: string;
  parsed: Record<string, unknown> | null;
  success: boolean;
}

interface ResultColumnProps {
  title: string;
  subtitle: string;
  result: PipelineResult;
}

export function ResultColumn({ title, subtitle, result }: ResultColumnProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <div className="mt-2">
          {result.success ? (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
              PARSE OK
            </span>
          ) : (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
              PARSE FAILED
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Raw LLM Response</h4>
          <JsonViewer
            content={result.raw}
            highlightSchemaEcho={!result.success}
          />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Parsed Output</h4>
          {result.parsed ? (
            <JsonViewer content={JSON.stringify(result.parsed, null, 2)} />
          ) : (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              Parser returned null. The response could not be validated against the expected schema.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
