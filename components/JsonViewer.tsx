"use client";

interface JsonViewerProps {
  content: string;
  highlightSchemaEcho?: boolean;
}

export function JsonViewer({ content, highlightSchemaEcho }: JsonViewerProps) {
  if (!highlightSchemaEcho) {
    return (
      <div className="relative group">
        <pre className="rounded-lg border border-slate-200 bg-slate-900 text-slate-100 p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words leading-relaxed max-h-80 overflow-y-auto">
          <SyntaxHighlight content={content} />
        </pre>
      </div>
    );
  }

  // Highlight $defs and properties keys in red
  const parts = content.split(/(\$defs|"properties"|"\$schema"|"definitions"|```json|```)/g);
  return (
    <div className="relative">
      <pre className="rounded-lg border border-red-200 bg-slate-900 text-slate-100 p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-words leading-relaxed max-h-80 overflow-y-auto">
        {parts.map((part, i) =>
          /^\$defs$|^"\$schema"$|^"properties"$|^"definitions"$|^```json$|^```$/.test(part) ? (
            <span key={i} className="text-red-400 font-bold bg-red-950/50 px-0.5 rounded">
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
  // Simple JSON syntax highlighting
  const highlighted = content.split(/("(?:[^"\\]|\\.)*")\s*:/g);

  if (highlighted.length <= 1) {
    // Try to highlight string values and numbers
    const valueParts = content.split(/("(?:[^"\\]|\\.)*")/g);
    return (
      <>
        {valueParts.map((part, i) => {
          if (i % 2 === 1) {
            return <span key={i} className="text-emerald-400">{part}</span>;
          }
          // Highlight numbers
          const numParts = part.split(/(\b\d+\.?\d*\b)/g);
          return (
            <span key={i}>
              {numParts.map((np, j) =>
                j % 2 === 1 ? (
                  <span key={j} className="text-amber-400">{np}</span>
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
          return <><span key={i} className="text-blue-400">{part}</span>:</>;
        }
        // Highlight string values and numbers in non-key parts
        const valueParts = part.split(/("(?:[^"\\]|\\.)*")/g);
        return (
          <span key={i}>
            {valueParts.map((vp, j) => {
              if (j % 2 === 1) {
                return <span key={j} className="text-emerald-400">{vp}</span>;
              }
              const numParts = vp.split(/(\b\d+\.?\d*\b)/g);
              return (
                <span key={j}>
                  {numParts.map((np, k) =>
                    k % 2 === 1 ? (
                      <span key={k} className="text-amber-400">{np}</span>
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
