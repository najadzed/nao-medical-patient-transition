🏥 Healthcare Doctor–Patient Translation Web Application

Pre-Interview Take-Home Assignment for Nao Medical

A full-stack, AI-powered web application that enables real-time multilingual communication between doctors and patients through text, audio, translation, searchable logs, and AI-generated medical summaries.

🚀 Project Overview

This application acts as a real-time translation bridge between a doctor and a patient who speak different languages.

The system allows both roles to:

Send text messages

Record audio directly from the browser

See instant translations into the other party’s selected language

Persist conversation history across sessions

Search past conversations

Generate AI-powered summaries highlighting medical insights

The focus of this project is system design, AI integration, and feature prioritization under time constraints, not just UI.

✅ Core Functionalities Implemented
1. Real-Time Doctor–Patient Translation

Two roles: Doctor and Patient

Each role selects their preferred language

Messages are translated into the other party’s language using Gemini API

Works for both text and audio messages

2. Text Chat Interface

Clear chat layout with visual separation between roles

Conversation style UI with message bubbles

Mobile-friendly responsive layout using Tailwind CSS

3. Audio Recording & Storage

Record audio directly from the browser using MediaRecorder API

Audio uploaded and stored on server

Audio appears inside the chat thread

Audio playable even after page refresh

4. Conversation Logging & Persistence

SQLite database via Prisma ORM

Messages stored with timestamps

Conversation history persists beyond session

5. Conversation Search

Search across original and translated messages

Quickly retrieve relevant past interactions

6. AI-Powered Medical Summary

Gemini used to summarize entire conversation

Extracts:

Symptoms

Possible diagnosis

Follow-up actions

🧠 AI & LLM Integration
Feature	AI Usage
Translation	Gemini LLM with medical-focused prompt
Conversation Summary	Gemini LLM analyzing entire chat history

Prompts were carefully designed to:

Return only clean translations

Extract structured medical insights in summaries

🛠 Tech Stack
Layer	Technology
Frontend	Next.js 16 (App Router) + Tailwind CSS
Backend	Next.js API Routes
Database	SQLite + Prisma ORM
AI	Google Gemini API
Audio	Browser MediaRecorder + server file storage
Deployment	Vercel-ready
🗂 Project Structure
/app
  /api
    /conversation
    /message
    /messages/[id]
    /upload
    /search
    /summary
/lib
  ai.js
  prisma.js
/prisma
  schema.prisma


This structure demonstrates clear separation of:

API logic

AI utilities

Database layer

UI layer

▶️ How to Run Locally
1. Install dependencies
npm install

2. Add environment variables

Create .env:

GEMINI_API_KEY=your_key_here
DATABASE_URL="file:./dev.db"

3. Setup database
npx prisma migrate dev

4. Run
npm run dev


Open: http://localhost:3000

🔒 Privacy & Security Considerations

No PHI is permanently stored

Audio stored locally for demo purposes

API keys stored in environment variables

HTTPS recommended in deployment (Vercel)

🎯 What This Project Demonstrates

Full-stack architecture under time constraint

Effective use of AI tools for real product features

Handling of audio data in web applications

Database modeling for conversational systems

Prioritization of features based on requirements

Clean and modular code organization

⚠️ Known Limitations / Trade-offs

SQLite used for simplicity; Postgres recommended for production

Basic search without highlighting (time trade-off)

No authentication (out of scope)

Audio files stored locally (cloud storage recommended for scale)

🌐 Deployment

This app is fully deployable to Vercel without modification.

👨‍💻 Developer

Ahammed Najad

🙌 Notes

This project was intentionally built focusing on system design, AI integration, and functional completeness within the 12-hour constraint, aligning with the assignment’s expectations.