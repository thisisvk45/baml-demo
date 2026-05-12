"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResultColumn } from "@/components/ResultColumn";

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

const EXAMPLE_JD = `Senior Backend Engineer - Fintech

Requirements:
- 5+ years experience with Python or Go
- Experience with distributed systems and microservices
- Strong understanding of SQL and NoSQL databases
- Experience with cloud platforms (AWS/GCP)
- Knowledge of financial regulations (SOX, PCI-DSS) preferred`;

const EXAMPLE_BULLETS = `- Built high-throughput payment processing pipeline handling 50k TPS using Go and Kafka
- Designed and maintained PostgreSQL schemas for transaction ledger serving 10M+ daily queries
- Led migration from monolith to microservices architecture on AWS ECS
- Implemented PCI-DSS compliant card tokenization service
- 7 years backend engineering experience, 4 years in fintech`;

export default function Home() {
  const [jd, setJd] = useState("");
  const [bullets, setBullets] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompareResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  function loadExample() {
    setJd(EXAMPLE_JD);
    setBullets(EXAMPLE_BULLETS);
  }

  function loadFailingCase() {
    setJd("");
    setBullets("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-[1200px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-semibold text-slate-900 text-lg">BAML Eval Demo</span>
          </div>
          <a
            href="https://github.com/thisisvk45/baml-diligence-eval"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View Eval Repo
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-6 py-10">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Structured Output Parsing: BAML vs Pydantic
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl leading-relaxed">
            Both pipelines send the same prompt to Gemini 2.0 Flash. BAML&apos;s Schema-Aligned
            Parser recovers from markdown fences, prose wrapping, and schema echo.
            The Pydantic baseline uses strict JSON.parse with no recovery.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Model: Gemini 2.0 Flash</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>Via OpenRouter</span>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Input</h2>
            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
              >
                Load passing example
              </button>
              <button
                onClick={loadFailingCase}
                className="text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-md transition-colors"
              >
                Load failing case
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Job Description
              </label>
              <Textarea
                placeholder="Paste a job description here..."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                className="h-44 font-mono text-sm resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">
                Resume Bullets
              </label>
              <Textarea
                placeholder="Paste resume bullet points here..."
                value={bullets}
                onChange={(e) => setBullets(e.target.value)}
                className="h-44 font-mono text-sm resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm font-medium shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Running...
                </span>
              ) : (
                "Run Comparison"
              )}
            </Button>
            {loading && (
              <span className="text-sm text-slate-500">Sending to both pipelines in parallel...</span>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-start gap-3">
            <svg className="h-5 w-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div>
            {/* Summary bar */}
            <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 flex items-center justify-between shadow-sm">
              <span className="text-sm font-medium text-slate-700">Results</span>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">BAML:</span>
                  {result.baml.success ? (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Parsed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-red-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Failed
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Pydantic:</span>
                  {result.pydantic.success ? (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Parsed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-red-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Failed
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <ResultColumn
                title="BAML Pipeline"
                subtitle="Schema-Aligned Parser: strips fences, extracts JSON, recovers from wrappers"
                result={result.baml}
              />
              <ResultColumn
                title="Pydantic Pipeline"
                subtitle="Strict JSON.parse only, no recovery from malformed output"
                result={result.pydantic}
              />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!result && !error && !loading && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="mt-4 text-sm text-slate-500">
              Enter a job description and resume bullets above, or load an example to see the comparison.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16">
        <div className="mx-auto max-w-[1200px] px-6 py-6 flex items-center justify-between text-sm text-slate-400">
          <span>Built to demonstrate structured output parsing reliability</span>
          <a
            href="https://github.com/thisisvk45/baml-diligence-eval"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-600 transition-colors"
          >
            github.com/thisisvk45/baml-diligence-eval
          </a>
        </div>
      </footer>
    </div>
  );
}
