# BAML vs Pydantic: Structured Output Parsing Demo

Interactive web demo comparing BAML's Schema-Aligned Parser (SAP) against naive Pydantic-style JSON.parse validation. Both pipelines send the same prompt to the same LLM (Gemini 2.0 Flash via OpenRouter), then parse the response using different strategies. BAML's SAP recovers from malformed outputs (markdown fences, prose wrapping, schema echo); the Pydantic baseline does not.

Live: [baml.helloviks.com](https://baml.helloviks.com)

Eval repo: [github.com/thisisvk45/baml-diligence-eval](https://github.com/thisisvk45/baml-diligence-eval)

## Local Development

```bash
git clone https://github.com/thisisvk45/baml-demo.git
cd baml-demo
npm install
```

Copy the env file and add your OpenRouter API key:

```bash
cp .env.example .env.local
# Edit .env.local and set OPENROUTER_API_KEY
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

1. You provide a job description and resume bullets (or leave them empty to trigger the failing case).
2. The app sends both inputs to Gemini 2.0 Flash via OpenRouter, using two prompt variants.
3. The BAML pipeline parses the response with a resilient SAP that strips fences, extracts JSON from prose, and recovers from `$defs`/`properties` wrapping.
4. The Pydantic pipeline uses strict `JSON.parse` with root-level key validation. No recovery.
5. Results are displayed side by side with parse status and raw/parsed output.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Set `OPENROUTER_API_KEY` in Environment Variables.
4. Deploy.

For custom domain setup, add a CNAME record pointing your subdomain to `cname.vercel-dns.com`.

## License

MIT
