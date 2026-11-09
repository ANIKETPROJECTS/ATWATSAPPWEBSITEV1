import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import broadcastIcon from '../../assets/hero-feature-icons/broadcast.svg';
import assistantIcon from '../../assets/hero-feature-icons/assistant.svg';
import agentsIcon from '../../assets/hero-feature-icons/agents.svg';
import aiChatbotIcon from '../../assets/hero-feature-icons/ai-chatbot.svg';
import catalogIcon from '../../assets/hero-feature-icons/catalog.svg';
import formsIcon from '../../assets/hero-feature-icons/forms.svg';
import paymentsIcon from '../../assets/hero-feature-icons/payments.svg';
import './hero-feature-flow.css';

export type HeroFeatureStage = 'broadcast' | 'reply' | 'answer' | 'forms' | 'checkout';

const features: Array<{
  id: string;
  title: string;
  description: string;
  icon: string;
}> = [
  {
    id: 'broadcast',
    title: 'WhatsApp Broadcasting',
    description: 'Reach customers',
    icon: broadcastIcon,
  },
  {
    id: 'assistant',
    title: 'AI Assistant',
    description: 'Guide conversations',
    icon: assistantIcon,
  },
  {
    id: 'agents',
    title: 'WhatsApp AI Agents',
    description: 'Follow up in chat',
    icon: agentsIcon,
  },
  {
    id: 'ai-chatbot',
    title: 'AI WhatsApp Chatbot',
    description: 'Answer FAQs & leads',
    icon: aiChatbotIcon,
  },
  {
    id: 'catalog',
    title: 'WhatsApp Catalog',
    description: 'Show products in chat',
    icon: catalogIcon,
  },
  {
    id: 'forms',
    title: 'WhatsApp Forms',
    description: 'Collect details',
    icon: formsIcon,
  },
  {
    id: 'payments',
    title: 'WhatsApp Payments',
    description: 'Payments in chat',
    icon: paymentsIcon,
  },
];

const featureSequenceByStage: Record<HeroFeatureStage, string[]> = {
  broadcast: ['broadcast'],
  reply: ['assistant', 'agents'],
  answer: ['ai-chatbot', 'catalog'],
  forms: ['forms'],
  checkout: ['payments'],
};

export default function HeroFeatureFlow({ stage }: { stage: HeroFeatureStage }) {
  const prefersReducedMotion = useReducedMotion() === true;
  const [activeFeatureId, setActiveFeatureId] = useState('broadcast');
  const featureListRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const sequence = featureSequenceByStage[stage];
    setActiveFeatureId(sequence[0]);
    if (prefersReducedMotion || sequence.length < 2) return;

    const timeout = window.setTimeout(() => setActiveFeatureId(sequence[1]), 1400);
    return () => window.clearTimeout(timeout);
  }, [stage, prefersReducedMotion]);

  useLayoutEffect(() => {
    const list = featureListRef.current;
    if (!list) return;

    const updateProgress = () => {
      const activeStep = list.querySelector<HTMLElement>('.hero-feature-flow-step.is-active');
      const icon = activeStep?.querySelector<HTMLElement>('.hero-feature-flow-icon');
      if (!icon) return;

      const listTop = list.getBoundingClientRect().top + 14;
      const iconCenter = icon.getBoundingClientRect().top + icon.getBoundingClientRect().height / 2;
      list.style.setProperty('--hero-feature-progress-height', `${Math.max(0, iconCenter - listTop)}px`);
    };

    updateProgress();
    const observer = new ResizeObserver(updateProgress);
    observer.observe(list);
    list.querySelectorAll('.hero-feature-flow-step').forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [activeFeatureId]);

  return (
    <aside className="hero-feature-flow" aria-label="AtWassup features in a customer journey">
      <ol ref={featureListRef} className="hero-feature-flow-list">
        {features.map(({ id, title, description, icon }) => {
          const isActive = activeFeatureId === id;
          return (
            <li
              key={id}
              className={`hero-feature-flow-step${isActive ? ' is-active' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="hero-feature-flow-icon" aria-hidden="true">
                <img src={icon} alt="" draggable={false} />
              </span>
              <span className="hero-feature-flow-copy">
                <strong>{title}</strong>
                <span>{description}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
