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
    <main className="mx-auto max-w-[1200px] px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          BAML vs Pydantic: Structured Output Parsing
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Compare how BAML&apos;s Schema-Aligned Parser (SAP) handles malformed LLM responses
          versus naive JSON.parse validation. Both pipelines hit the same model with the same
          prompt intent, then parse the response differently.
        </p>
      </header>

      <section className="mb-8 space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={loadExample}>
            Load passing example
          </Button>
          <Button variant="outline" size="sm" onClick={loadFailingCase}>
            Load failing case (empty inputs)
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <Textarea
              placeholder="Paste a job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="h-40 font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume Bullets
            </label>
            <Textarea
              placeholder="Paste resume bullet points here..."
              value={bullets}
              onChange={(e) => setBullets(e.target.value)}
              className="h-40 font-mono text-sm"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Running comparison..." : "Run Comparison"}
        </Button>
      </section>

      {error && (
        <div className="mb-8 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <section className="grid gap-6 md:grid-cols-2">
          <ResultColumn
            title="BAML Pipeline"
            subtitle="SAP: strips fences, extracts JSON, recovers from wrappers"
            result={result.baml}
          />
          <ResultColumn
            title="Pydantic Pipeline"
            subtitle="Strict: JSON.parse only, no recovery from malformed output"
            result={result.pydantic}
          />
        </section>
      )}
    </main>
  );
}
