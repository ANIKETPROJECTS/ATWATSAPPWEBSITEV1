import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './hero-headline.css';

const headlines = [
  'hero.rotator.leads',
  'hero.rotator.marketing',
  'hero.rotator.growth',
];

export default function HeroHeadlineRotator() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % headlines.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="hero-headline-rotator mt-0 lg:mt-4 text-[#3acd32]">
      <span className="sr-only">{headlines.map((headline) => t(headline)).join(' · ')}</span>
      <span key={activeIndex} className="hero-headline-slide-in" aria-hidden="true">
        {t(headlines[activeIndex])}
      </span>
    </span>
  );
}
