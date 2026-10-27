"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CHAT_ENDPOINT, CHAT_MAX_LENGTH, fallbackAnswer, parseAiAnswer, siteAnswer, welcome, type ChatAnswer } from "@/lib/cozy-chat";
import "./cozy-chat.css";

type Message = { role: "user" | "assistant"; text: string; answer?: ChatAnswer };
const starterQuestions = ["Explore services", "See our work", "Free AI workshop", "Book a call"];
const initialMessages: Message[] = [{ role: "assistant", text: welcome.text, answer: welcome }];

function ChatIcon({ close = false }: { close?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {close ? <path d="m6 6 12 12M6 18 18 6" /> : <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H5l-3 2V11.5a9.5 9.5 0 0 1 19 0Z" /><path d="M7 11h.01M12 11h.01M17 11h.01" /></>}
  </svg>;
}

export default function CozyChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const launcher = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const sentAt = useRef<number[]>([]);
  const aiUnavailableUntil = useRef(0);

  useEffect(() => {
    if (open) { dialog.current?.showModal(); inputRef.current?.focus(); }
    else { dialog.current?.close(); }
  }, [open]);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, busy, open]);
  useEffect(() => () => controller.current?.abort(), []);

  function closeChat() { setOpen(false); launcher.current?.focus(); }
  function resetChat() {
    if (inFlight.current) return;
    setMessages(initialMessages); setInput(""); setNotice(""); inputRef.current?.focus();
  }

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || text.length > CHAT_MAX_LENGTH || inFlight.current) return;
    const now = Date.now();
    sentAt.current = sentAt.current.filter(time => now - time < 60_000);
    if (sentAt.current.length >= 8) { setNotice("Give me a moment, then try again. You can still use the links above."); return; }
    sentAt.current.push(now);
    inFlight.current = true; setBusy(true); setNotice(""); setInput("");
    inputRef.current?.focus();
    setMessages(previous => [...previous.slice(-38), { role: "user", text }]);
    let answer = siteAnswer(text);
    if (!answer && Date.now() > aiUnavailableUntil.current) {
      const abort = new AbortController(); controller.current = abort;
      const timer = window.setTimeout(() => abort.abort(), 16_000);
      try {
        const response = await fetch(CHAT_ENDPOINT, {
          method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: messages.slice(-4).map(({ role, text: content }) => ({ role, content })) }),
          signal: abort.signal,
        });
        if (response.ok) {
          const data = await response.json(); answer = parseAiAnswer(data);
          if (!answer) aiUnavailableUntil.current = Date.now() + 5 * 60_000;
        } else aiUnavailableUntil.current = Date.now() + 60_000;
      } catch { aiUnavailableUntil.current = Date.now() + 60_000; }
      finally { window.clearTimeout(timer); controller.current = null; }
    }
    const resolved = answer || fallbackAnswer();
    setMessages(previous => [...previous, { role: "assistant", text: resolved.text, answer: resolved }]);
    inFlight.current = false; setBusy(false);
  }

  return <>
    <button ref={launcher} type="button" className="cozy-chat-launcher" aria-label={open ? "Close Cozy chat" : "Open Cozy chat"} aria-haspopup="dialog" aria-expanded={open} aria-controls="cozy-chat-dialog" onClick={() => open ? closeChat() : setOpen(true)}>
      <ChatIcon close={open} /><span>Ask Cozy</span>
    </button>
    {open && <dialog ref={dialog} id="cozy-chat-dialog" className="cozy-chat-panel" aria-labelledby="cozy-chat-title" onCancel={event => { event.preventDefault(); closeChat(); }} onClick={event => { if (event.target === dialog.current) { const box = dialog.current.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeChat(); } }}>
      <header className="cozy-chat-header">
        <img src="/favicon-32x32.png" width="32" height="32" alt="" />
        <div><h2 id="cozy-chat-title">Cozy Assistant</h2><p>Your guide to Cozy Digital</p></div>
        <button type="button" className="cozy-chat-icon-button" aria-label="Close chat" onClick={closeChat}><ChatIcon close /></button>
      </header>
      <div ref={log} className="cozy-chat-log" role="log" aria-label="Chat messages" aria-live="polite" aria-relevant="additions" aria-busy={busy}>
        <p className="cozy-chat-intro">A little direction. A good next step.</p>
        {messages.map((message, index) => <div key={index} className={`cozy-chat-message cozy-chat-message-${message.role}`}>
          <span className="cozy-chat-sr-only">{message.role === "user" ? "You" : "Cozy Assistant"}: </span>
          <p>{message.text}</p>
          {!!message.answer?.links.length && <div className="cozy-chat-links">{message.answer.links.map(link => <Link href={link.href} key={link.href} onClick={closeChat}>{link.label}<span aria-hidden="true">↗</span></Link>)}</div>}
          {message.answer?.source === "ai" && <small className="cozy-chat-source">AI answer · Confirm project details with our team</small>}
        </div>)}
        {messages.length === 1 && <div className="cozy-chat-starters" aria-label="Suggested questions">{starterQuestions.map(question => <button type="button" key={question} onClick={() => void send(question)}>{question}<span aria-hidden="true">↗</span></button>)}</div>}
        {busy && <p className="cozy-chat-thinking" role="status">Finding the right answer<span aria-hidden="true">…</span></p>}
      </div>
      <div className="cozy-chat-bottom">
        {notice && <p className="cozy-chat-notice" role="status">{notice}</p>}
        <form onSubmit={event => { event.preventDefault(); void send(input); }}>
          <label htmlFor="cozy-chat-input" className="cozy-chat-input-label">What can I help you find?</label>
          <div className="cozy-chat-input-wrap">
            <input ref={inputRef} id="cozy-chat-input" value={input} onChange={event => setInput(event.target.value)} maxLength={CHAT_MAX_LENGTH} autoComplete="off" placeholder="Ask about services, courses…" enterKeyHint="send" aria-describedby="cozy-chat-privacy" />
            <button type="submit" aria-label="Send message" disabled={busy || !input.trim()}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7M12 5v15" /></svg></button>
          </div>
        </form>
        <p id="cozy-chat-privacy" className="cozy-chat-privacy">Automated help. Messages may use AI. Avoid private details. <Link href="/privacy/" onClick={closeChat}>Privacy</Link></p>
        {messages.length > 1 && <button className="cozy-chat-reset" type="button" disabled={busy} onClick={resetChat}>Clear conversation</button>}
      </div>
    </dialog>}
  </>;
}
