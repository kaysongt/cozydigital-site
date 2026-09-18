"use client";

import Link from "next/link";
import { FormEvent, useId, useState } from "react";
import { CLIENT_HUB_REL } from "@/lib/client-hub";
import { HELPER_NAME } from "@/data/site-knowledge";
import { answerQuestion, type AskResult } from "@/lib/ask-site";

function ReadMore({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel={CLIENT_HUB_REL}
        className="future-text-link"
      >
        {label} ↗
      </a>
    );
  }
  return (
    <Link href={href} className="future-text-link">
      {label} ↗
    </Link>
  );
}

function AnswerBody({ result }: { result: AskResult }) {
  if (result.status === "empty") {
    return <p>{result.answer}</p>;
  }

  if (result.status === "unknown") {
    return (
      <>
        <p>{result.answer}</p>
        <p className="ask-lamp-links">
          <ReadMore href={result.href} label={result.hrefLabel} />
          <ReadMore href={result.ctaHref} label={result.ctaLabel} />
        </p>
      </>
    );
  }

  return (
    <>
      <p>{result.answer}</p>
      <p className="ask-lamp-links">
        <ReadMore
          href={result.href}
          label={result.hrefLabel}
          external={result.external}
        />
      </p>
    </>
  );
}

export default function AskLamp() {
  const inputId = useId();
  const hintId = useId();
  const answerId = useId();
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<AskResult | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(answerQuestion(question));
  }

  return (
    <div className="ask-lamp">
      <p className="future-label">{HELPER_NAME}</p>
      <h3 className="ask-lamp-title">Ask anything else</h3>
      <p id={hintId} className="ask-lamp-hint">
        {HELPER_NAME} answers from Cozy Digital’s own pages — services, the free
        audit and playbook, booking, the founders, and the Client Hub. Not a
        general chatbot.
      </p>
      <form className="ask-lamp-form" onSubmit={onSubmit}>
        <label htmlFor={inputId} className="ask-lamp-label">
          Question for {HELPER_NAME}
        </label>
        <div className="ask-lamp-row">
          <input
            id={inputId}
            name="question"
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="How do I book a call?"
            autoComplete="off"
            enterKeyHint="search"
            aria-describedby={hintId}
            aria-controls={answerId}
          />
          <button type="submit">Ask</button>
        </div>
      </form>
      <div
        id={answerId}
        className="ask-lamp-answer"
        role="status"
        aria-live="polite"
      >
        {result ? (
          <>
            <p className="ask-lamp-credit">
              {result.status === "answered"
                ? `${HELPER_NAME} · from ${result.topic}`
                : HELPER_NAME}
            </p>
            <AnswerBody result={result} />
          </>
        ) : null}
      </div>
    </div>
  );
}
