/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for chat assistant
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are Odette, the smart, helpful, and elegant digital guide and AI Assistant to Niño Verdejo.
Niño is a highly skilled Web/App Developer, AI Automation Specialist, and Technical Virtual Assistant with 2 years of experience.
He loves solving complex problems and has worked with startups, global brands, and local businesses to bring their digital products to life.

Here are his core details:
- Services:
  1. Full-Stack Web Development (Custom SPAs, modern robust full-stack applications with React & Vite, database integrations).
  2. UI/UX Design & Prototyping (Figma-to-code, pixel-perfect user experiences, fluid animations).
  3. Technical Virtual Assistant (Server maintenance, database optimization, query tuning, workflow setups).
  4. AI Automation (Integrating LLMs, custom chatbots, webhook pipelines, workflow automation).
- Core Skills & Tech Stack:
  - Languages/Frameworks: React, Node.js, TypeScript, Next.js, Express.
  - Tools & Platforms: Supabase, Firebase, AWS, Figma, Git.
  - Soft Skills: Active communication, timely delivery, problem-solving, and attention to detail.

When answering, adopt the identity of Odette. Be helpful, polite, professional, and concise. Keep answers short and direct so they look good in a small floating chat window.
If the user asks an out-of-the-box or external question, leverage your search capability to find the latest real-time information or specific answer. Always relate the answer back to Niño's skills or how Niño can help them with their goals.

IMPORTANT: Do NOT output HTML. Use markdown format if necessary but keep it clean and minimal. Do not write extremely long answers.`;

      // Map chat history to contents format for @google/genai SDK
      const contents: any[] = [];
      if (history && Array.isArray(history)) {
        // Only map messages that are not internal step indicators
        history.forEach((msg: any) => {
          if (msg.text && (msg.sender === 'user' || msg.sender === 'bot')) {
            contents.push({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            });
          }
        });
      }

      // Add the current message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // Call Gemini 3.5 Flash (as per gemini-api guidelines for basic/general text tasks) with Google Search grounding
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }]
        }
      });

      const reply = response.text || "I'm sorry, I couldn't generate a response. Please try again.";

      // Extract search grounding sources
      let sources: { title: string; url: string }[] = [];
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        sources = chunks
          .filter((chunk: any) => chunk.web && chunk.web.uri)
          .map((chunk: any) => ({
            title: chunk.web.title || 'Web Search Result',
            url: chunk.web.uri
          }));
      }

      return res.json({ reply, sources });
    } catch (error: any) {
      console.error('Gemini API Error in /api/chat:', error);
      return res.status(500).json({ error: error.message || 'Failed to process AI chat query.' });
    }
  });

  // Integrate Vite as a middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
