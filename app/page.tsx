"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [role, setRole] = useState("patient");
  const [search, setSearch] = useState("");

  const [patientLang, setPatientLang] = useState("Spanish");
  const [doctorLang, setDoctorLang] = useState("English");

  const mediaRecorderRef = useRef<any>(null);
  const audioChunksRef = useRef<any[]>([]);

  useEffect(() => {
    fetch("/api/conversation", { method: "POST" })
      .then(res => res.json())
      .then(data => {
        setConversationId(data.id);

        fetch(`/api/messages/${data.id}`)
          .then(res => res.json())
          .then(msgs => setMessages(msgs));
      });
  }, []);

  async function sendMessage() {
    if (!text.trim() || !conversationId) return;

    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        role,
        conversationId,
        targetLang: role === "patient" ? doctorLang : patientLang,
      }),
    });

    const data = await res.json();
    setMessages(prev => [...prev, data]);
    setText("");
  }

  async function generateSummary() {
    const res = await fetch("/api/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId }),
    });

    const data = await res.json();
    alert(data.summary);
  }

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = e => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });

      const formData = new FormData();
      formData.append("audio", blob);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const { path } = await uploadRes.json();

      const msgRes = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "Audio message",
          role,
          conversationId,
          targetLang: role === "patient" ? doctorLang : patientLang,
          audioPath: path,
        }),
      });

      const msg = await msgRes.json();
      setMessages(prev => [...prev, msg]);
    };

    mediaRecorder.start();
  }

  function stopRecording() {
    mediaRecorderRef.current.stop();
  }

  async function searchMessages() {
    const res = await fetch(`/api/search?q=${search}`);
    const data = await res.json();
    setMessages(data);
  }

  return (
    <div className="min-h-screen p-6">
  <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">

    <h1 className="text-3xl font-bold mb-4 text-center">
      🏥 Doctor–Patient Translator
    </h1>

    {/* Role & Language */}
    <div className="flex gap-4 mb-4">
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <select
        value={patientLang}
        onChange={e => setPatientLang(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option>Spanish</option>
        <option>English</option>
        <option>French</option>
        <option>Arabic</option>
        <option>Hindi</option>
      </select>

      <select
        value={doctorLang}
        onChange={e => setDoctorLang(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option>English</option>
        <option>Spanish</option>
        <option>French</option>
        <option>Arabic</option>
        <option>Hindi</option>
      </select>
    </div>

    {/* Actions */}
    <div className="flex gap-2 mb-4">
      <input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 rounded-lg flex-1"
      />
      <button
        onClick={searchMessages}
        className="bg-blue-500 text-white px-4 rounded-lg"
      >
        Search
      </button>
      <button
        onClick={generateSummary}
        className="bg-green-600 text-white px-4 rounded-lg"
      >
        AI Summary
      </button>
    </div>

    {/* Chat Window */}
    <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50 mb-4">
      {messages.map(m => (
        <div
          key={m.id}
          className={`mb-4 p-3 rounded-lg shadow ${
            m.role === "doctor"
              ? "bg-blue-100 text-right"
              : "bg-gray-200"
          }`}
        >
          <p className="text-sm font-bold">{m.role?.toUpperCase()}</p>

          {m.originalText && m.originalText !== "Audio message" && (
            <p className="text-sm">🗣 {m.originalText}</p>
          )}

          {m.translatedText && (
            <p className="text-sm text-green-700">🌐 {m.translatedText}</p>
          )}

          {m.audioPath && (
            <audio controls src={m.audioPath} className="mt-2 w-full" />
          )}
        </div>
      ))}
    </div>

    {/* Recorder */}
    <div className="flex gap-2 mb-3">
      <button
        onClick={startRecording}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        🎤 Record
      </button>
      <button
        onClick={stopRecording}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
      >
        Stop
      </button>
    </div>

    {/* Input */}
    <div className="flex gap-2">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type message..."
        className="border p-3 rounded-lg flex-1"
      />
      <button
        onClick={sendMessage}
        className="bg-black text-white px-6 rounded-lg"
      >
        Send
      </button>
    </div>
  </div>
</div>
  );
}