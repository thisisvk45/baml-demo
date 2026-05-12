"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResultColumn } from "@/components/ResultColumn";
import { PRESETS } from "@/lib/presets";

interface PipelineResult {
  raw: string;
  parsed: Record<string, unknown> | null;
  success: boolean;
}

interface CompareResponse {
  baml: PipelineResult;
  pydantic: PipelineResult;
  error?: string;
}

export default function Home() {
  const [jd, setJd] = useState("");
  const [bullets, setBullets] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompareResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd, bullets }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  function loadPreset(index: number) {
    const preset = PRESETS[index];
    setJd(preset.jd);
    setBullets(preset.bullets);
    setActivePreset(index);
    setResult(null);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-[#fafbfc]">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-[1280px] px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-semibold text-slate-800">BAML Eval Demo</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Gemini 2.0 Flash via OpenRouter
            </div>
            <a
              href="https://github.com/thisisvk45/baml-diligence-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-6">
        {/* Hero */}
        <div className="pt-10 pb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Structured Output Parsing
          </h1>
          <p className="mt-2 text-slate-500 max-w-xl">
            Same model, same prompt intent, different parsers. See why resilient parsing matters
            when LLMs wrap valid JSON in markdown fences or schema definitions.
          </p>
        </div>

        {/* Preset selector */}
        <div className="mb-6">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Quick Start</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset, i) => (
              <button
                key={i}
                onClick={() => loadPreset(i)}
                className={`text-sm px-4 py-2 rounded-lg border transition-all ${
                  activePreset === i
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : preset.jd === ""
                    ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Section */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm mb-8 overflow-hidden">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="p-5">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Job Description
              </label>
              <Textarea
                placeholder="Paste a job description here, or select a preset above..."
                value={jd}
                onChange={(e) => { setJd(e.target.value); setActivePreset(null); }}
                className="h-48 font-mono text-sm resize-none border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-colors"
              />
            </div>
            <div className="p-5">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-3">
                <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Resume Bullets
              </label>
              <Textarea
                placeholder="Paste resume bullet points here, or select a preset above..."
                value={bullets}
                onChange={(e) => { setBullets(e.target.value); setActivePreset(null); }}
                className="h-48 font-mono text-sm resize-none border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-colors"
              />
            </div>
          </div>

          <div className="px-5 py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Both fields are sent to Gemini 2.0 Flash. The same response is parsed by each pipeline.
            </div>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 text-sm font-medium shadow-sm disabled:opacity-50 transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Comparing...
                </span>
              ) : (
                "Run Comparison"
              )}
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50/50 p-8 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-blue-900">Sending to both pipelines in parallel</p>
            <p className="text-xs text-blue-600 mt-1">BAML (SAP) and Pydantic (strict) will each parse the LLM response independently</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-5 flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-900">Request failed</p>
              <p className="text-sm text-red-700 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="mb-8">
            {/* Verdict bar */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">Parsing Results</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Same LLM response, different parsing strategies</p>
                </div>
                <div className="flex items-center gap-4">
                  <VerdictBadge label="BAML (SAP)" success={result.baml.success} />
                  <div className="h-6 w-px bg-slate-200"></div>
                  <VerdictBadge label="Pydantic (strict)" success={result.pydantic.success} />
                </div>
              </div>

              {/* Show the key insight when BAML passes and Pydantic fails */}
              {result.baml.success && !result.pydantic.success && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-start gap-2 text-sm text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <svg className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      The LLM returned valid JSON wrapped in markdown fences. BAML&apos;s SAP stripped the
                      fences and extracted the data. Pydantic&apos;s strict JSON.parse failed because the
                      raw string is not valid JSON.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <ResultColumn
                title="BAML Pipeline"
                subtitle="Schema-Aligned Parser: strips fences, extracts JSON, recovers from wrappers"
                result={result.baml}
              />
              <ResultColumn
                title="Pydantic Pipeline"
                subtitle="Strict JSON.parse, no recovery from malformed output"
                result={result.pydantic}
              />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!result && !error && !loading && (
          <div className="rounded-xl border-2 border-dashed border-slate-200 p-16 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-slate-100 mb-5">
              <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-600">No comparison run yet</p>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Select a preset above or paste your own JD and resume, then click Run Comparison.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200/80">
        <div className="mx-auto max-w-[1280px] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>Structured output parsing reliability demo</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/thisisvk45/baml-diligence-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-600 transition-colors"
            >
              Eval Repo
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="https://github.com/thisisvk45/baml-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-600 transition-colors"
            >
              Source Code
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function VerdictBadge({ label, success }: { label: string; success: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs text-slate-500">{label}</span>
      {success ? (
        <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-xs font-semibold">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          PASS
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2.5 py-1 rounded-full text-xs font-semibold">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          FAIL
        </span>
      )}
    </div>
  );
}
