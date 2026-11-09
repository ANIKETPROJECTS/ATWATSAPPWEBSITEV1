import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const sequence = featureSequenceByStage[stage];
    setActiveFeatureId(sequence[0]);
    if (prefersReducedMotion || sequence.length < 2) return;

    const timeout = window.setTimeout(() => setActiveFeatureId(sequence[1]), 1400);
    return () => window.clearTimeout(timeout);
  }, [stage, prefersReducedMotion]);

  return (
    <aside className="hero-feature-flow" aria-label="AtWassup features in a customer journey">
      <ol className="hero-feature-flow-list">
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
