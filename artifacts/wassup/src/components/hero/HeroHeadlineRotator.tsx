import { useEffect, useState } from 'react';
import './hero-headline.css';

const headlines = [
  'AI that drives leads & sales',
  'AI for WhatsApp marketing',
  'AI that grows your business',
];

export default function HeroHeadlineRotator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % headlines.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="hero-headline-rotator text-[#3acd32]">
      <span className="sr-only">
        AI that drives leads and sales. AI for WhatsApp marketing. AI that grows your business.
      </span>
      <span key={activeIndex} className="hero-headline-slide-in" aria-hidden="true">
        {headlines[activeIndex]}
      </span>
    </span>
  );
}
