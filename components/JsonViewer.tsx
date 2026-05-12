"use client";

import { useCallback } from "react";

interface JsonViewerProps {
  content: string;
  highlightSchemaEcho?: boolean;
}

export function JsonViewer({ content, highlightSchemaEcho }: JsonViewerProps) {
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(content);
  }, [content]);

  if (!highlightSchemaEcho) {
    return (
      <div className="relative group">
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600 text-slate-300 p-1.5 rounded-md"
          title="Copy to clipboard"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <pre className="rounded-lg bg-[#0d1117] text-[#c9d1d9] p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words leading-relaxed max-h-[400px] overflow-y-auto border border-slate-800">
          <SyntaxHighlight content={content} />
        </pre>
      </div>
    );
  }

  const parts = content.split(/(```json|```|\$defs|"\$defs"|"properties"|"\$schema"|"definitions")/g);
  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-700 hover:bg-slate-600 text-slate-300 p-1.5 rounded-md"
        title="Copy to clipboard"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      <pre className="rounded-lg bg-[#0d1117] text-[#c9d1d9] p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words leading-relaxed max-h-[400px] overflow-y-auto border border-red-900/50">
        {parts.map((part, i) =>
          /^```json$|^```$|^\$defs$|^"\$defs"$|^"\$schema"$|^"properties"$|^"definitions"$/.test(part) ? (
            <span key={i} className="text-red-400 font-bold bg-red-500/15 px-1 py-0.5 rounded border border-red-500/20">
              {part}
            </span>
          ) : (
            <SyntaxHighlight key={i} content={part} />
          )
        )}
      </pre>
    </div>
  );
}

function SyntaxHighlight({ content }: { content: string }) {
  const highlighted = content.split(/("(?:[^"\\]|\\.)*")\s*:/g);

  if (highlighted.length <= 1) {
    const valueParts = content.split(/("(?:[^"\\]|\\.)*")/g);
    return (
      <>
        {valueParts.map((part, i) => {
          if (i % 2 === 1) {
            return <span key={i} className="text-[#a5d6ff]">{part}</span>;
          }
          const numParts = part.split(/(\b\d+\.?\d*\b)/g);
          return (
            <span key={i}>
              {numParts.map((np, j) =>
                j % 2 === 1 ? (
                  <span key={j} className="text-[#79c0ff]">{np}</span>
                ) : (
                  <span key={j}>{np}</span>
                )
              )}
            </span>
          );
        })}
      </>
    );
  }

  return (
    <>
      {highlighted.map((part, i) => {
        if (i % 2 === 1) {
          return <><span key={i} className="text-[#7ee787]">{part}</span>:</>;
        }
        const valueParts = part.split(/("(?:[^"\\]|\\.)*")/g);
        return (
          <span key={i}>
            {valueParts.map((vp, j) => {
              if (j % 2 === 1) {
                return <span key={j} className="text-[#a5d6ff]">{vp}</span>;
              }
              const numParts = vp.split(/(\b\d+\.?\d*\b)/g);
              return (
                <span key={j}>
                  {numParts.map((np, k) =>
                    k % 2 === 1 ? (
                      <span key={k} className="text-[#79c0ff]">{np}</span>
                    ) : (
                      <span key={k}>{np}</span>
                    )
                  )}
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}
