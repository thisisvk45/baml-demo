export interface Preset {
  label: string;
  jd: string;
  bullets: string;
}

const VIKAS_RESUME = `Vikas Kumar
+1 336-577-7770 | Kumav25@wfu.edu | https://helloviks.com | github.com/thisisvk45

Education
MS - Business Analytics (Fully Funded) Wake Forest School of Business 4.0/4.0 Jul 2025 - May 2026
Bachelor of Technology - Data Science (Fully Funded) Plaksha University, Mohali 8.59/10 Sep 2021 - May 2025

Skills
- Programming: Python, TypeScript, SQL, Git, REST APIs, Jupyter
- AI & ML: LLM applications, RAG pipelines, multi-agent systems, transformer fine-tuning (HuggingFace, OpenAI APIs)
- LLM Engineering: LangChain, LangGraph, LlamaIndex, HuggingFace, Transformers, Prompt Design, Multimodal Systems
- AI Systems: Knowledge Graphs, Evaluation Frameworks, Hallucination Mitigation, Responsible AI, A/B Testing
- Infrastructure: AWS (EC2, S3, Lambda), Vercel, Docker, Snowflake, PostgreSQL, MongoDB, Vector Databases

Experience
Wake Forest University School of Business | AI Engineer Mar 2026 - Present
- Engineered automated ETL workflows to normalize Handshake API and institutional data into a unified knowledge layer, powering real-time LLM-driven analytics for 40+ academic advisors.
- Designed and implemented pilot prompt pipelines with structured grounding, achieving a 3x acceleration in query resolution and reducing manual advisor workload during initial deployment.
- Currently architecting agentic AI workflows using RAG and Azure OpenAI to enable multi-step reasoning over student placement data, with a focus on hallucination mitigation for university-wide production.

Aditya Birla Group | AI/Software Engineer Intern Jan 2025 - Jun 2025
- Designed clustering models to optimize logistics routes across 6 regional clusters, generating $3.2M in annual cost savings by identifying and eliminating structural inefficiencies across the delivery network.
- Built predictive models for delivery time estimation and route optimization, achieving a 23% reduction in average delivery time across high-volume distribution corridors using gradient boosting and geospatial features.
- Built a multi-agent system to automate Neo4j knowledge graph tagging across 500+ entities and 12 semantic dimensions, achieving 96% accuracy and reducing manual effort by 80%.

Lawroom AI | Founding Software Engineer Sep 2024 - Jan 2025
- Built a multilingual generative AI legal assistant using fine-tuned LegalBERT and transformer models, supporting 10 languages and scaling to serve 2,000+ active users across diverse legal jurisdictions.
- Designed prompt evaluation pipelines across 1,000+ queries, improving response accuracy by 30% through structured hallucination mitigation and iterative prompt optimization techniques.
- Developed scalable backend infrastructure using FastAPI and Firebase, handling 3,000+ concurrent user interactions with high availability and low-latency response in production.

Scale AI | AI Trainer (Freelance) Aug 2024 - Dec 2024
- Designed 500+ adversarial and edge-case prompts to systematically expose LLM failure modes including hallucination, instruction drift, and reasoning breakdown across complex multi-turn workflows.
- Conducted large-scale red-teaming on 3,000+ responses, evaluating outputs for factual accuracy, logical coherence, and instruction-following, achieving 90%+ agreement with ground-truth labels for RLHF pipelines.

Projects
OmniPro Support | Next.js 14, Claude Sonnet 4, ElevenLabs Apr 2026 - Present
- Built end-to-end multimodal AI assistant with 14 production features for Prox Founding Engineer Challenge in one week, including hands-free voice loop, photo diagnosis pipeline, and 9 interactive artifact components.
- Architected multi-agent deliberation system (Technical Specialist + parallel Safety + Quality reviewers) over 14-tool structured knowledge base, eliminating probabilistic retrieval failures for safety-critical hardware content.

SViam.ai | Next.js, Supabase, OpenRouter, Deepgram, ElevenLabs, Monaco Dec 2025 - Present
- Building voice-driven AI interviewer with adaptive follow-up questioning, Monaco code editor, and Piston sandboxed execution.
- Engineered speech pipeline using Deepgram STT and ElevenLabs TTS, achieving end-to-end response under 2 seconds.`;

export const PRESETS: Preset[] = [
  {
    label: "AI Engineer (use Vikas's resume)",
    jd: `AI Engineer - Series B Startup

We are building intelligent automation for enterprise workflows. Looking for an AI engineer who can own the full stack from model integration to production deployment.

Requirements:
- 2+ years building LLM-powered applications in production
- Experience with RAG pipelines, vector databases, and retrieval systems
- Proficiency in Python and TypeScript
- Hands-on experience with LangChain, LlamaIndex, or similar frameworks
- Experience with prompt engineering and evaluation frameworks
- Familiarity with cloud infrastructure (AWS, GCP, or Azure)
- Experience with knowledge graphs or structured data extraction is a plus
- Strong software engineering practices (testing, CI/CD, code review)`,
    bullets: VIKAS_RESUME,
  },
  {
    label: "Senior Backend Engineer (Fintech)",
    jd: `Senior Backend Engineer - Fintech Startup

We are building the next generation of payment infrastructure. You will design and operate critical backend services that move money.

Requirements:
- 5+ years of experience with Python or Go in production
- Deep experience with distributed systems and microservices architecture
- Strong understanding of SQL (PostgreSQL preferred) and NoSQL databases
- Hands-on experience with AWS or GCP in production environments
- Familiarity with event-driven architectures (Kafka, RabbitMQ, or similar)
- Knowledge of financial regulations (SOX, PCI-DSS) is a strong plus
- Experience with CI/CD pipelines and infrastructure-as-code`,
    bullets: VIKAS_RESUME,
  },
  {
    label: "ML Engineer (NLP/LLMs)",
    jd: `Machine Learning Engineer - NLP/LLM Team

Join our applied AI team to build and deploy large language model systems for enterprise customers.

Requirements:
- 3+ years of ML engineering experience, with focus on NLP
- Strong proficiency in Python and PyTorch or TensorFlow
- Experience fine-tuning and deploying LLMs (GPT, LLaMA, Mistral, or similar)
- Familiarity with RAG architectures and vector databases
- Experience with ML infrastructure: model serving, monitoring, A/B testing
- Strong software engineering fundamentals (version control, testing, code review)
- Published research or open-source contributions in NLP is a plus`,
    bullets: VIKAS_RESUME,
  },
  {
    label: "DevOps / Platform Engineer",
    jd: `Senior DevOps Engineer - Platform Team

Build and maintain the infrastructure and developer tools that power our engineering organization.

Requirements:
- 4+ years of experience in DevOps, SRE, or platform engineering
- Expert-level Kubernetes knowledge (EKS, GKE, or self-managed)
- Strong experience with infrastructure-as-code (Terraform, Pulumi, or CloudFormation)
- Proficiency in at least one scripting language (Python, Bash, or Go)
- Experience with observability stack (Prometheus, Grafana, Datadog, or similar)
- Familiarity with GitOps workflows (ArgoCD, Flux)
- On-call experience and incident management background`,
    bullets: VIKAS_RESUME,
  },
  {
    label: "Empty inputs (schema-echo bug)",
    jd: "",
    bullets: "",
  },
];
