"use client";

interface JsonViewerProps {
  content: string;
  highlightSchemaEcho?: boolean;
}

export function JsonViewer({ content, highlightSchemaEcho }: JsonViewerProps) {
  if (!highlightSchemaEcho) {
    return (
      <pre className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-words">
        {content}
      </pre>
    );
  }

  // Highlight $defs and properties keys in red
  const parts = content.split(/(\$defs|"properties"|"\$schema"|"definitions")/g);
  return (
    <pre className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm font-mono overflow-x-auto whitespace-pre-wrap break-words">
      {parts.map((part, i) =>
        /^\$defs$|^"\$schema"$|^"properties"$|^"definitions"$/.test(part) ? (
          <span key={i} className="text-red-600 font-bold bg-red-50">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </pre>
  );
}
