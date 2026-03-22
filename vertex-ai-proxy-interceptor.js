import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '', vertexai: true });

const PLAYBOOK_CONTEXT = `
ACME Sales Analytics Platform Context:
- What We Do: AI-powered pipeline analytics, real-time deal scoring, automated coaching.
- Key Features: Deal Intelligence (MEDDIC), Pipeline Analytics (92% accuracy), Conversation Intel, CRM Integration (Salesforce, HubSpot, SAP), Automated Reports.
- Pricing: Starter ($30k/yr, 25 reps), Professional ($75k/yr, 100 reps), Enterprise (Custom).
- Objection 1 (Salesforce Einstein): Position as complementary. Einstein is data collection; ACME is intelligence.
- Objection 2 (Too expensive): ROI in <6 months. Use Tata Motors case study.
- Objection 3 (No bandwidth): 2-week implementation, zero engineering effort.
- Objection 4 (IT/Procurement): SOC2 Type II, GDPR, ISO 27001. Parallel track.
- Case Study (Tata Motors): 120 reps, 22% -> 35% win rate, 54% -> 89% forecast accuracy, 87% time saved on reviews.
`;

type Tab = 'MEDDIC' | 'BattleCard' | 'Playbook';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('MEDDIC');
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      let prompt = '';
      let config: any = {};

      if (activeTab === 'MEDDIC') {
        prompt = `Act as a senior sales manager. Analyze this deal using MEDDIC: ${input}. 
        Provide: 1. Score (0-100), 2. Forecast Category (Commit/Upside/Pipeline/At Risk), 3. Missing info/Follow-up questions. 
        Be concise and direct.`;
      } else if (activeTab === 'BattleCard') {
        prompt = `Act as a senior sales manager. Research competitor: ${input}. 
        Provide: 1. Latest market intel, 2. Objection handlers, 3. Talk tracks.`;
        config = { tools: [{ googleSearch: {} }] };
      } else {
        prompt = `Act as a senior sales manager. Answer this question using the provided context: ${input}. 
        Context: ${PLAYBOOK_CONTEXT}`;
      }

      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { role: 'user', parts: [{ text: prompt }] },
        config
      });
      setResponse(res.text || 'No response generated.');
    } catch (err) {
      setResponse('Error processing request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 max-w-4xl mx-auto">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">Enterprise Sales Co-Pilot</h1>
        <p className="text-slate-600 mt-2 italic">"Good morning. What high-stakes deal or competitor are we tackling today?"</p>
      </header>

      <div className="flex gap-2 mb-6">
        {(['MEDDIC', 'BattleCard', 'Playbook'] as Tab[]).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-semibold transition-all ${activeTab === tab ? 'bg-blue-900 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-4 border border-slate-200 rounded-xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder={`Enter details for ${activeTab}...`}
        />
        <button 
          onClick={handleAction}
          disabled={loading}
          className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Analyzing...' : 'Generate Strategic Insight'}
        </button>
      </div>

      {response && (
        <div className="mt-8 p-8 bg-white rounded-2xl border border-blue-100 shadow-sm">
          <h3 className="font-bold text-blue-900 mb-4 text-lg border-b pb-2">Manager's Strategic Guidance:</h3>
          <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">
            {response}
          </div>
        </div>
      )}
    </div>
  );
}