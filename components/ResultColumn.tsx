"use client";

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
    <div className={`rounded-xl border bg-white shadow-sm overflow-hidden ${
      result.success ? "border-green-200" : "border-red-200"
    }`}>
      {/* Header with status */}
      <div className={`px-5 py-4 border-b ${
        result.success
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
          : "bg-gradient-to-r from-red-50 to-orange-50 border-red-200"
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          </div>
          {result.success ? (
            <div className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Parsed
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Failed
            </div>
          )}
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Raw Response */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Raw LLM Response</h4>
          </div>
          <JsonViewer
            content={result.raw}
            highlightSchemaEcho={!result.success}
          />
        </div>

        {/* Parsed Output */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-1.5 w-1.5 rounded-full ${result.parsed ? "bg-green-500" : "bg-red-500"}`}></div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Parsed Output</h4>
          </div>
          {result.parsed ? (
            <JsonViewer content={JSON.stringify(result.parsed, null, 2)} />
          ) : (
            <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 text-sm text-red-700 flex items-start gap-2">
              <svg className="h-4 w-4 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Parser returned <code className="font-mono font-bold">null</code>. The raw response contains formatting that strict JSON.parse cannot handle.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
