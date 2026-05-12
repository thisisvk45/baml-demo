export interface Preset {
  label: string;
  jd: string;
  bullets: string;
}

export const PRESETS: Preset[] = [
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
    bullets: `- Built high-throughput payment processing pipeline handling 50k TPS using Go and Kafka
- Designed and maintained PostgreSQL schemas for transaction ledger serving 10M+ daily queries
- Led migration from monolith to microservices architecture on AWS ECS, reducing deploy times by 80%
- Implemented PCI-DSS compliant card tokenization service with end-to-end encryption
- Managed Terraform-based infrastructure across 3 AWS regions with automated failover
- 7 years backend engineering experience, 4 years specifically in fintech
- Set up GitLab CI/CD pipelines with automated testing, security scanning, and canary deployments`,
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
    bullets: `- Fine-tuned LLaMA 2 70B for domain-specific summarization, achieving 15% improvement over base model on internal benchmarks
- Built production RAG pipeline using Pinecone and LangChain, serving 500+ enterprise users
- Deployed models on AWS SageMaker with custom inference containers and auto-scaling
- Implemented evaluation framework for LLM outputs using human preference data and automated metrics
- Contributed to open-source tokenizer library with 2k+ GitHub stars
- 4 years ML engineering experience, 2 years focused on NLP/LLM systems
- Published paper on efficient attention mechanisms at EMNLP 2024`,
  },
  {
    label: "Product Manager (B2B SaaS)",
    jd: `Senior Product Manager - B2B SaaS Platform

Lead product strategy and execution for our core platform serving mid-market and enterprise customers.

Requirements:
- 5+ years of product management experience in B2B SaaS
- Track record of shipping products that drive measurable revenue growth
- Experience with data-driven decision making and A/B testing
- Strong technical fluency; ability to work directly with engineering teams
- Experience with enterprise sales cycles and customer discovery
- Excellent written and verbal communication
- MBA or equivalent experience preferred`,
    bullets: `- Owned product roadmap for $12M ARR analytics platform, growing revenue 40% YoY
- Led discovery and launch of self-serve onboarding flow, reducing time-to-value from 14 days to 2 days
- Ran 30+ customer interviews per quarter to validate feature prioritization
- Defined and tracked product KPIs using Amplitude, with weekly stakeholder reporting
- Collaborated with 3 engineering squads (12 engineers) using dual-track agile
- 6 years PM experience across two B2B SaaS companies (Series B and Series D)
- MBA from Kellogg School of Management`,
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
    bullets: `- Managed 40-node Kubernetes cluster on EKS serving 200+ microservices with 99.95% uptime
- Built Terraform modules for standardized service deployment, adopted by 8 engineering teams
- Implemented GitOps workflow using ArgoCD, reducing deployment errors by 60%
- Designed observability stack with Prometheus, Grafana, and PagerDuty integration
- Automated incident response runbooks, cutting mean time to resolution from 45 min to 12 min
- 5 years DevOps experience, previously SRE at a Series C startup
- On-call rotation lead, managed escalation policies for 50-person engineering org`,
  },
  {
    label: "Empty inputs (triggers parse failure)",
    jd: "",
    bullets: "",
  },
];
