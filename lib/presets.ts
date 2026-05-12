export interface Preset {
  label: string;
  jd: string;
  bullets: string;
}

export const DEFAULT_RESUME = `Vikas Kumar
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
    label: "Senior Backend Engineer (Fintech)",
    jd: `Senior Backend Engineer
FinScale Technologies | New York, NY (Hybrid)

About Us
FinScale is a Series B fintech company building real-time payment infrastructure for banks and neobanks. Our platform processes over $2B in monthly transaction volume across 12 countries. We are a team of 45 engineers and growing.

The Role
We are looking for a Senior Backend Engineer to join our Core Payments team. You will own the design, implementation, and reliability of the services that move money between financial institutions. This is a high-impact role where your code directly affects transaction throughput, latency, and regulatory compliance.

What You Will Do
- Design and build high-throughput payment processing services handling tens of thousands of transactions per second
- Own the data layer for our transaction ledger, including schema design, query optimization, and replication strategy
- Collaborate with the platform team on our migration from a monolithic architecture to event-driven microservices
- Work with compliance and security teams to maintain PCI-DSS and SOX compliance across all services
- Participate in on-call rotations and drive incident response and post-mortems
- Mentor junior engineers and contribute to architectural decision records

What We Expect
- 5+ years of production backend experience in Python or Go
- Deep understanding of distributed systems, consensus protocols, and eventual consistency patterns
- Strong SQL skills, preferably with PostgreSQL at scale (billions of rows, partitioning, read replicas)
- Experience with event-driven architectures using Kafka, RabbitMQ, or similar message brokers
- Hands-on AWS or GCP experience (ECS/EKS, RDS, S3, Lambda)
- Familiarity with infrastructure-as-code (Terraform or Pulumi)

Nice to Have
- Experience in fintech or payments specifically
- Knowledge of financial regulations (PCI-DSS, SOX, AML/KYC)
- Contributions to open-source infrastructure projects
- Experience with chaos engineering or formal verification

Compensation
$180K-$220K base + equity + benefits. Relocation assistance available.`,
    bullets: DEFAULT_RESUME,
  },
  {
    label: "ML Engineer (NLP/LLMs)",
    jd: `Machine Learning Engineer, NLP/LLM Systems
Meridian AI | San Francisco, CA (Remote OK)

About Us
Meridian AI builds enterprise search and knowledge management products powered by large language models. Our customers include Fortune 500 companies in legal, healthcare, and financial services. We raised a $40M Series A and are scaling our applied AI team.

The Role
We need an ML Engineer to own the model layer of our product: fine-tuning, evaluation, deployment, and monitoring of LLMs that power semantic search, document summarization, and question answering for enterprise customers. You will work at the intersection of research and production.

What You Will Do
- Fine-tune and evaluate large language models (LLaMA, Mistral, GPT-4) for domain-specific NLP tasks
- Build and maintain RAG pipelines including embedding generation, vector store management, and retrieval optimization
- Design evaluation frameworks that measure output quality, hallucination rates, and latency at scale
- Deploy models to production using containerized serving infrastructure with auto-scaling and A/B testing
- Collaborate with product and customer success to translate domain requirements into model improvements
- Stay current with the research landscape and prototype new approaches

What We Expect
- 3+ years of ML engineering experience with a focus on NLP
- Strong proficiency in Python and at least one deep learning framework (PyTorch preferred)
- Experience fine-tuning and deploying LLMs in production environments
- Working knowledge of RAG architectures, vector databases (Pinecone, Weaviate, Qdrant), and embedding models
- Experience with ML infrastructure: model serving (vLLM, TGI, SageMaker), experiment tracking, monitoring
- Solid software engineering fundamentals (Git, testing, CI/CD, code review)

Nice to Have
- Published research or open-source contributions in NLP
- Experience with RLHF, DPO, or other alignment techniques
- Familiarity with healthcare, legal, or financial domain data
- Experience building evaluation pipelines for generative models

Compensation
$170K-$210K base + equity. Full remote with quarterly team offsites.`,
    bullets: DEFAULT_RESUME,
  },
  {
    label: "Product Manager (B2B SaaS)",
    jd: `Senior Product Manager, Platform
Arclight Software | Austin, TX (Hybrid)

About Us
Arclight builds workflow automation software for mid-market and enterprise operations teams. Our platform serves 400+ companies across manufacturing, logistics, and professional services. We are profitable, growing 60% YoY, and expanding our product team.

The Role
We are hiring a Senior Product Manager to own our core platform experience. You will define what we build, why we build it, and how we measure success. This role requires someone who can go deep with customers, think in systems, and communicate clearly across engineering, design, sales, and leadership.

What You Will Do
- Own the product roadmap for the core platform, balancing customer requests, strategic bets, and technical debt
- Run continuous discovery: customer interviews, usage analytics, competitive analysis, and sales feedback loops
- Write clear PRDs and collaborate with engineering and design through the full build cycle
- Define and track product KPIs tied to business outcomes (activation, retention, expansion revenue)
- Partner with sales and customer success on enterprise deal support and feature scoping
- Present product strategy and results to the executive team and board

What We Expect
- 5+ years of product management experience in B2B SaaS
- Demonstrated track record of shipping products that drove measurable revenue or retention impact
- Experience with data-driven decision making, A/B testing, and product analytics tools (Amplitude, Mixpanel, or similar)
- Strong technical fluency: you can read API docs, discuss architecture tradeoffs, and estimate scope with engineers
- Experience navigating enterprise sales cycles with 3-6 month close timelines
- Excellent written communication: you write specs, memos, and updates that people actually read

Nice to Have
- Experience in operations, logistics, or manufacturing verticals
- MBA or equivalent business training
- Background in engineering or data science before moving to product
- Experience with platform/API products

Compensation
$160K-$195K base + equity + performance bonus.`,
    bullets: DEFAULT_RESUME,
  },
  {
    label: "DevOps / Platform Engineer",
    jd: `Senior DevOps Engineer, Platform Infrastructure
Cloudbridge Systems | Seattle, WA (Remote OK)

About Us
Cloudbridge provides managed Kubernetes and developer tooling for mid-sized engineering teams. Our platform runs 2,000+ production clusters for 150 customers. We are a 30-person team that punches above our weight on reliability and developer experience.

The Role
We are hiring a Senior DevOps Engineer to join our platform infrastructure team. You will build and maintain the systems that our customers and our own engineering team depend on every day: CI/CD pipelines, observability, deployment automation, and cluster management tooling.

What You Will Do
- Manage and improve multi-tenant Kubernetes clusters (EKS) serving hundreds of microservices
- Build and maintain Terraform modules and Helm charts for standardized service deployment
- Design and operate the observability stack: metrics, logging, tracing, and alerting
- Implement and maintain GitOps workflows using ArgoCD or Flux
- Automate incident response and build self-healing infrastructure patterns
- Participate in on-call rotation and lead incident post-mortems
- Collaborate with product engineering to improve developer experience and deployment velocity

What We Expect
- 4+ years in DevOps, SRE, or platform engineering roles
- Expert-level Kubernetes knowledge (EKS, GKE, or self-managed clusters)
- Strong experience with infrastructure-as-code (Terraform required, Pulumi or CDK a plus)
- Proficiency in at least one scripting/systems language (Python, Go, or Bash)
- Hands-on experience with observability tools (Prometheus, Grafana, Datadog, or similar)
- Familiarity with GitOps patterns and tools (ArgoCD, Flux, or equivalent)
- On-call experience and comfort with incident management processes

Nice to Have
- Experience operating multi-tenant SaaS infrastructure
- Contributions to CNCF or other open-source infrastructure projects
- Experience with service mesh (Istio, Linkerd) or eBPF-based tooling
- Background in chaos engineering or reliability testing

Compensation
$165K-$200K base + equity. Fully remote with optional Seattle office access.`,
    bullets: DEFAULT_RESUME,
  },
  {
    label: "Empty inputs (schema-echo bug)",
    jd: "",
    bullets: "",
  },
];
