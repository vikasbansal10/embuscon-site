"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "modernize data platforms",
  "build agentic AI systems",
  "deliver programs with precision",
  "accelerate digital transformation",
];

const TYPE_SPEED = 55;   // ms per character typed
const DELETE_SPEED = 28; // ms per character deleted
const PAUSE_MS = 1800;   // pause at full phrase before deleting

export function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex] ?? "";

    if (paused) {
      const t = setTimeout(() => {
        setPaused(false);
        setDeleting(true);
      }, PAUSE_MS);
      return () => clearTimeout(t);
    }

    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        TYPE_SPEED
      );
      return () => clearTimeout(t);
    }

    if (!deleting && displayed.length === current.length) {
      setPaused(true);
      return;
    }

    if (deleting && displayed.length > 0) {
      const t = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        DELETE_SPEED
      );
      return () => clearTimeout(t);
    }

    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }
  }, [displayed, deleting, paused, phraseIndex]);

  return (
    <span className="text-brand-primary">
      {displayed}
      <span className="typewriter-cursor" aria-hidden />
    </span>
  );
}
