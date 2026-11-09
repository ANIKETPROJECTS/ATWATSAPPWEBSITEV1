import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  Bot,
  ClipboardList,
  CreditCard,
  Megaphone,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import './hero-feature-flow.css';

export type HeroFeatureStage = 'broadcast' | 'reply' | 'answer' | 'forms' | 'checkout';

const features: Array<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: 'broadcast',
    title: 'WhatsApp Broadcasting',
    description: 'Reach customers',
    icon: Megaphone,
  },
  {
    id: 'assistant',
    title: 'AI Assistant',
    description: 'Guide conversations',
    icon: Sparkles,
  },
  {
    id: 'agents',
    title: 'WhatsApp AI Agents',
    description: 'Follow up in chat',
    icon: Bot,
  },
  {
    id: 'ai-chatbot',
    title: 'AI WhatsApp Chatbot',
    description: 'Answer FAQs & leads',
    icon: MessageCircle,
  },
  {
    id: 'chatbots',
    title: 'WhatsApp Chatbots',
    description: 'Automate journeys',
    icon: Workflow,
  },
  {
    id: 'catalog',
    title: 'WhatsApp Catalog',
    description: 'Show products in chat',
    icon: ShoppingBag,
  },
  {
    id: 'forms',
    title: 'WhatsApp Forms',
    description: 'Collect details',
    icon: ClipboardList,
  },
  {
    id: 'payments',
    title: 'WhatsApp Payments',
    description: 'Payments in chat',
    icon: CreditCard,
  },
];

const featureSequenceByStage: Record<HeroFeatureStage, string[]> = {
  broadcast: ['broadcast', 'catalog'],
  reply: ['assistant', 'agents'],
  answer: ['ai-chatbot', 'chatbots'],
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
      <div className="hero-feature-flow-heading">
        <span>One connected journey</span>
      </div>

      <ol className="hero-feature-flow-list">
        {features.map(({ id, title, description, icon: Icon }) => {
          const isActive = activeFeatureId === id;
          return (
            <li
              key={id}
              className={`hero-feature-flow-step${isActive ? ' is-active' : ''}`}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="hero-feature-flow-icon" aria-hidden="true">
                <Icon size={14} strokeWidth={2} />
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
