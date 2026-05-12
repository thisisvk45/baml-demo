"use client";

import { useState } from "react";
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
  const [showRaw, setShowRaw] = useState(true);

  return (
    <div className={`rounded-xl border bg-white shadow-sm overflow-hidden ${
      result.success ? "border-green-200/80" : "border-red-200/80"
    }`}>
      {/* Header */}
      <div className={`px-5 py-4 ${
        result.success
          ? "bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50"
          : "bg-gradient-to-r from-red-50 via-rose-50 to-orange-50"
      }`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${result.success ? "bg-green-500" : "bg-red-500"}`}></div>
              <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{subtitle}</p>
          </div>
          {result.success ? (
            <span className="shrink-0 inline-flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              PARSED
            </span>
          ) : (
            <span className="shrink-0 inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              FAILED
            </span>
          )}
        </div>
      </div>

      {/* Tab switcher */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-5">
        <div className="flex gap-0 -mb-px">
          <button
            onClick={() => setShowRaw(true)}
            className={`text-xs font-medium px-4 py-2.5 border-b-2 transition-colors ${
              showRaw
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Raw Response
          </button>
          <button
            onClick={() => setShowRaw(false)}
            className={`text-xs font-medium px-4 py-2.5 border-b-2 transition-colors ${
              !showRaw
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Parsed Output
            {!result.parsed && (
              <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-100 text-red-600 text-[10px] font-bold">!</span>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {showRaw ? (
          <div>
            <JsonViewer
              content={result.raw}
              highlightSchemaEcho={!result.success}
            />
            {!result.success && (
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Red highlights show formatting that breaks strict parsing
              </p>
            )}
          </div>
        ) : (
          <div>
            {result.parsed ? (
              <JsonViewer content={JSON.stringify(result.parsed, null, 2)} />
            ) : (
              <div className="rounded-lg border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-900">Parser returned null</p>
                    <p className="text-xs text-red-700 mt-1 leading-relaxed">
                      The raw response contains formatting (markdown fences, prose) that
                      strict <code className="font-mono bg-red-100 px-1 rounded">JSON.parse</code> cannot
                      handle. Switch to Raw Response to see what the LLM actually returned.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
