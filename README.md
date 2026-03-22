# enterprise-sales-copilot
AI-powered sales agent built on Google Vertex AI Studio with RAG, Grounding and MEDDIC framework
# 🤖 Enterprise Sales Co-Pilot
> An AI-powered sales agent built on Google Vertex AI Studio using 
> Gemini 1.5 Pro, RAG, Google Search Grounding, and the MEDDIC framework.

---

## 🎯 Project Overview
A multi-capability conversational AI agent that helps B2B enterprise 
sales reps close deals faster — built entirely without writing code, 
using Google Vertex AI Studio.

---

## ✨ Key Capabilities

### 1. 🏆 MEDDIC Deal Qualifier
- Sales rep describes a deal in natural language
- Agent maps it to the MEDDIC framework
- Asks smart follow-up questions for missing info
- Outputs Deal Score (0–100) + Forecast Category
  - Commit / Upside / Pipeline / At Risk

### 2. ⚔️ Competitive Battle Card
- Rep mentions a competitor (e.g. HubSpot, Salesforce)
- Agent fetches real-time web data via Google Search Grounding
- Generates objection handlers + recommended talk tracks
- Eliminates hallucination using live grounded data

### 3. 📚 Sales Playbook Q&A (RAG)
- Agent answers questions using uploaded company documents
- Sources: Product overview, case studies, objection handling guide
- Built on Vertex AI Search with PDF ingestion and vector indexing
- Answers are grounded in actual documents — not guesswork

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Google Vertex AI Studio | Agent building & deployment |
| Gemini 1.5 Pro | Foundation language model |
| Vertex AI Search | RAG data store & PDF indexing |
| Google Search Grounding | Real-time competitive intelligence |
| React + TypeScript | Auto-generated frontend UI |
| Google Cloud Storage | Document storage |

---

## 🏗️ Architecture
```
User (Sales Rep)
      │
      ▼
 [Co-Pilot Agent — Gemini 1.5 Pro]
      │
      ├──► MEDDIC Qualifier     → Prompt reasoning & scoring
      │
      ├──► Competitive Intel    → Google Search Grounding (live web)
      │
      └──► Playbook Q&A         → RAG via Vertex AI Search (PDFs)
```

---

## 📄 Knowledge Base Documents
- `product-overview.pdf` — Product features, pricing, ICP
- `casestudy-manufacturing.pdf` — Tata Motors win story
- `objection-handling.pdf` — 5 objections with responses

---

## 💡 Key Learnings
- Designing multi-tool AI agents using system prompt orchestration
- Implementing RAG with Vertex AI Search and unstructured PDF ingestion
- Using Google Search Grounding to eliminate hallucination on live data
- Prompt engineering for structured output and conditional reasoning
- End-to-end AI application deployment on Google Cloud

---

## 👤 Author
**Keshav Maheshwari**  
[GitHub](https://github.com/KeshavMaheshwari7)
```

Click **"Commit changes"** → **"Commit directly to main"** → **"Commit changes"**

---

## Step 3 — Upload Your PDF Files

1. In the repo click **"Add file"** → **"Upload files"**
2. Upload the 3 PDFs
3. Click **"Commit changes"**

---

Once done your project will live at:
```
github.com/KeshavMaheshwari7/enterprise-sales-copilot
