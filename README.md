🏥 Doctor–Patient Translation Web Application

A full-stack healthcare communication app that helps doctors and patients who speak different languages communicate seamlessly using AI-powered translation and conversation summarization.

Built as part of a technical take-home assignment to demonstrate full-stack architecture, AI integration, audio handling, database design, and production deployment.

🚀 Live Demo

Live App: https://nao-medical-patient-transition.vercel.app


🎯 Project Overview

This application acts as a real-time translation bridge between a doctor and a patient.

Users type messages in their own language

The app translates messages into the other user’s language using AI

Conversations are stored and can be searched later

Audio messages can be recorded and saved in the conversation

An AI summary generates a medical-style overview of the entire conversation

The focus of this project was not just features, but correct architecture for a serverless production environment.

✨ Core Features
✅ Real-Time Translation

Messages typed by the doctor or patient are automatically translated into the selected language of the other participant using Google Gemini AI.

✅ Text Chat Interface

Clear UI that distinguishes between doctor and patient messages with timestamps.

✅ Audio Recording & Storage

Users can record audio directly from the browser. Audio clips are saved and playable inside the conversation thread.

✅ Conversation Logging

All messages and audio are stored in a PostgreSQL database and persist across sessions.

✅ Conversation Search

Keyword search across past messages with contextual results.

✅ AI-Powered Medical Summary

At any point, users can generate a structured summary highlighting:

Symptoms

Possible diagnosis

Medications

Follow-up actions

🛠 Tech Stack
Layer	Technology
Frontend	Next.js (App Router), React, Tailwind CSS
Backend	Next.js API Routes
Database	Neon PostgreSQL
ORM	Prisma
AI	Google Gemini API
Deployment	Vercel
🧠 Architecture Notes

This project originally worked with SQLite locally. During deployment, SQLite caused serverless runtime failures because Vercel’s filesystem is read-only.

The architecture was refactored to use Neon PostgreSQL with Prisma for proper serverless compatibility.

This demonstrates handling real production deployment issues rather than just local development.

📦 Local Setup
1. Clone the repository
git clone https://github.com/najadzed/doc-patient-ai.git
cd doc-patient-ai

2. Install dependencies
npm install

3. Create .env
DATABASE_URL=your_neon_postgres_url
GEMINI_API_KEY=your_gemini_key

4. Run Prisma migration
npx prisma migrate dev
npx prisma generate

5. Start the app
npm run dev

🌍 Deployment

The app is deployed on Vercel with:

Neon PostgreSQL for database

Prisma configured for Node.js runtime

Environment variables set in Vercel dashboard

📚 What This Project Demonstrates

Full-stack application design

AI/LLM API integration

Audio handling in browser

Database schema design with Prisma

Search and data persistence

Debugging serverless deployment issues

Migrating from SQLite to PostgreSQL for production

👨‍💻 Developer

Najad
Built for Nao Medical Pre-Interview Assignment
