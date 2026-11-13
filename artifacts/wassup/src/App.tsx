import { type CSSProperties, type FormEvent, type ReactNode, type UIEvent, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  Globe,
  Headphones,
  Instagram,
  Linkedin,
  Link2,
  Mail,
  MapPin,
  Megaphone,
  Menu,
  Phone,
  Send,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Workflow,
  Wifi,
  X,
} from 'lucide-react';
import { useSubmitDemoRequest } from '@workspace/api-client-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import CommerceDemo from '@/components/hero/CommerceDemo';
import { FigmaSvgCrop } from '@/components/hero/FigmaChrome';
import HeroFeatureFlow, { type HeroFeatureStage } from '@/components/hero/HeroFeatureFlow';
import HeroHeadlineRotator from '@/components/hero/HeroHeadlineRotator';
import ChatbotInquiryDemo from '@/components/chatbot/ChatbotInquiryDemo';
import ClinicAppointmentDemo from '@/components/flows/ClinicAppointmentDemo';
import ContactWhatsAppForm from '@/components/ContactWhatsAppForm';
import NotFound from '@/pages/not-found';
import madeInIndiaFlagPath from './assets/made-in-india-flag.png';
import metaBusinessPartnerPath from './assets/meta-business-partner.png';
import metaTechProviderPath from './assets/meta-tech-provider.png';
import verifiedBusinessBadge from './assets/verified-business.svg';
import logoPath from './assets/airavata-technologies-logo.svg';
import airavataTriangleSourcePath from './assets/airavata-technologies-mark-source.svg';
import contactEmailPath from './assets/contact-email.png';
import contactLocationPath from './assets/contact-location.png';
import contactPhonePath from './assets/contact-phone.png';
import socialFacebookPath from './assets/social-facebook.png';
import socialInstagramPath from './assets/social-instagram.png';
import socialLinkedinPath from './assets/social-linkedin.png';
import socialYoutubePath from './assets/social-youtube.png';
import whatsappContactPath from './assets/whatsapp-contact.png';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const officeAddress =
  'Hubtown Greenwood CHS, Flat no. 805/A Wing, 8th Floor, Pokhran Road No. 1, Vartak Nagar, Thane (W), 400606';
const officeMapUrl =
  'https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=Kff7Yb0Guec7MT7HvCMLyFxF&daddr=Pokhran+Road+No.+1,+next+to+Apana+Bhandar,+Jay+Jaywanti+Society,+Vartak+Naka,+Thane+West,+Thane,+Maharashtra+400606';
const officeMapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(officeAddress)}&output=embed`;

const capabilities = [
  { group: 'connect', icon: BadgeCheck, motion: 'badge', title: 'WhatsApp Business API onboarding', text: 'Get guided setup for Meta verification and Green Tick assistance.' },
  { group: 'automate', icon: FileText, motion: 'document', title: 'Message templates', text: 'Send marketing, utility, and alert templates to your customers.' },
  { group: 'automate', icon: Bot, motion: 'bot', title: 'Chatbot builder', text: 'Automate FAQs, capture leads, and share order status.' },
  { group: 'automate', icon: Workflow, motion: 'flow', title: 'WhatsApp Flows', text: 'Create in-chat forms for bookings, applications, and surveys.' },
  { group: 'connect', icon: Globe, motion: 'globe', title: 'Website integration', text: 'Add click-to-chat and start WhatsApp conversations from your website.' },
  { group: 'connect', icon: Database, motion: 'database', title: 'CRM and software integration', text: 'Connect your tools to collect and sync leads and customer data.' },
  { group: 'automate', icon: Megaphone, motion: 'megaphone', title: 'Campaigns', text: 'Broadcast approved templates to the customer segments you choose.' },
  { group: 'grow', icon: Headphones, motion: 'headset', title: 'Live chat', text: 'Let an agent take over whenever a conversation needs a person.' },
  { group: 'grow', icon: BarChart3, motion: 'chart', title: 'Analytics dashboard', text: 'Track delivery, read rates, conversations, and agent performance.' },
  { group: 'grow', icon: ShoppingBag, motion: 'catalog', title: 'Product catalogs', text: 'Showcase products and help customers shop inside WhatsApp.' },
];

const capabilityGroups = [
  { id: 'connect', label: '01 · CONNECT', title: 'Get everything connected', description: 'Start with the right setup, then bring your existing tools into the conversation.' },
  { id: 'automate', label: '02 · AUTOMATE', title: 'Make every message work harder', description: 'Turn common questions and customer journeys into repeatable experiences.' },
  { id: 'grow', label: '03 · SUPPORT & GROW', title: 'Keep improving the experience', description: 'Support people when they need you and learn from every interaction.' },
];

const processSteps = [
  { title: 'Onboard', text: 'Get help setting up your WhatsApp Business API and verification.' },
  { title: 'Connect', text: 'Bring your website, CRM, or existing software into the workflow.' },
  { title: 'Automate', text: 'Set up templates, chatbots, flows, and campaigns for your team.' },
  { title: 'Grow', text: 'Use live conversations and analytics to keep improving.' },
];

type DemoMessage = {
  from: 'customer' | 'bot';
  text: string;
  time: string;
};

const demoConversation: DemoMessage[] = [
  { from: 'customer', text: 'Hi! What can AtWassup do for our business?', time: '10:41 AM' },
  { from: 'bot', text: 'AtWassup brings WhatsApp Business API setup, customer support, automation, and campaigns into one place.', time: '10:41 AM' },
  { from: 'customer', text: 'Can it answer FAQs and run campaigns?', time: '10:42 AM' },
  { from: 'bot', text: 'Yes. Chatbots can handle FAQs and capture leads. Approved templates power campaigns, and WhatsApp Flows handle in-chat forms.', time: '10:42 AM' },
  { from: 'customer', text: 'Can a person take over? Can we connect our CRM?', time: '10:42 AM' },
  { from: 'bot', text: 'Yes—agents can step in through live chat. Website, CRM, and software integrations can sync leads and customer data.', time: '10:42 AM' },
  { from: 'customer', text: 'Do you help with setup and Green Tick verification?', time: '10:43 AM' },
  { from: 'bot', text: 'We guide WhatsApp Business API onboarding, Meta verification, and Green Tick assistance. Meta makes the final verification decision.', time: '10:43 AM' },
  { from: 'customer', text: 'And how does pricing work?', time: '10:44 AM' },
  { from: 'bot', text: 'Plans are quoted around messaging volume, integrations, and support needs. A demo can help find the right fit. Glad I could help!', time: '10:44 AM' },
];

function getDemoReply(question: string) {
  const normalizedQuestion = question.toLowerCase();

  if (/\b(price|pricing|cost|quote|rate|plan|plans|billing|estimate|budget|charges)\b|how much/.test(normalizedQuestion)) {
    return 'AtWassup pricing is quoted around your messaging volume, integrations, and support needs. Book a demo for a quote tailored to your use case.';
  }
  if (/\b(green tick|verification|verify|onboard|onboarding|setup)\b/.test(normalizedQuestion)) {
    return 'We guide WhatsApp Business API onboarding, Meta verification, and Green Tick assistance. Meta makes the final verification decision.';
  }
  if (/\b(agent|human|handoff|handover|live chat|team|support)\b/.test(normalizedQuestion)) {
    return 'Your team can take over a conversation in live chat, with multiple agents available on the Growth plan.';
  }
  if (/\b(crm|integrat|website|software|connect)\b/.test(normalizedQuestion)) {
    return 'AtWassup can connect your website, CRM, or existing software to sync leads and customer data. Integration scope depends on your setup.';
  }
  if (/\b(analytic|report|delivery|read rate|performance)\b/.test(normalizedQuestion)) {
    return 'The analytics dashboard can track delivery, read rates, conversations, and agent performance.';
  }
  if (/\b(catalog|product|shop|commerce)\b/.test(normalizedQuestion)) {
    return 'Product catalog integration can showcase items and help customers shop inside WhatsApp. It is included in the Enterprise plan.';
  }
  if (/\b(faq|chatbot|automat|campaign|broadcast|template|flow|lead|order status|whatsapp|platform|feature)\b/.test(normalizedQuestion)) {
    return 'You can automate FAQs, capture leads, share order updates, send approved template campaigns, and build WhatsApp Flows for in-chat forms.';
  }
  if (/\b(demo|start|next step|getting started)\b/.test(normalizedQuestion)) {
    return 'A demo is a good next step. The AtWassup team can walk through your use case, onboarding, integrations, and a tailored quote.';
  }

  return 'I can help with AtWassup features, automation, integrations, onboarding, live chat, analytics, or pricing. What would you like to know?';
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible');
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function useSectionInView<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

function SectionLabel({ children, tone = 'green' }: { children: ReactNode; tone?: 'green' | 'dark' }) {
  return (
    <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] ${tone === 'dark' ? 'border-white/20 text-[#3acd32]' : 'border-black/10 bg-white text-black/60'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === 'dark' ? 'bg-[#3acd32]' : 'bg-[#3acd32]'}`} />
      {children}
    </div>
  );
}

function CapabilityGroupPanel({ group, groupIndex }: { group: (typeof capabilityGroups)[number]; groupIndex: number }) {
  const labelDelay = 920 + groupIndex * 480;

  return (
    <div className="feature-group" data-group-index={groupIndex} data-testid={`capability-group-${group.id}`}>
      <div className="feature-group-intro">
        <div className="feature-group-label-wrap" style={{ '--feature-label-delay': `${labelDelay}ms` } as CSSProperties}>
          <p className="feature-group-label font-mono text-[10px] font-bold uppercase tracking-[.18em] text-[#3acd32]">{group.label}</p>
          <span className="feature-group-label-flash" aria-hidden="true" />
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-[-.04em]">{group.title}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-white/45">{group.description}</p>
      </div>
      <div className="feature-list">
        {capabilities.filter((capability) => capability.group === group.id).map(({ icon: Icon, motion, title, text }, rowIndex) => {
          const rowDelay = 900 + groupIndex * 500 + rowIndex * 130;

          return (
            <article
              key={title}
              className="feature-row"
              data-icon-motion={motion}
              data-testid={`feature-${group.id}-${title.toLowerCase().replaceAll(' ', '-')}`}
              style={{ '--feature-row-delay': `${rowDelay}ms` } as CSSProperties}
            >
              <div className="feature-row-title-line">
                <span className="feature-row-icon" aria-hidden="true">
                  <Icon size={14} className="feature-icon-underlay text-[#3acd32]" />
                  <Icon size={14} className="feature-icon-draw text-[#3acd32]" />
                </span>
                <span className="feature-row-title-wrap">
                  <h4 className="feature-row-title text-xs font-bold leading-snug text-white/90">{title}</h4>
                  <span className="feature-row-title-underline" aria-hidden="true" />
                </span>
              </div>
              <p className="feature-row-description">{text}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PrimaryButton({ children, onClick, testId }: { children: ReactNode; onClick: () => void; testId: string }) {
  return (
    <button data-testid={testId} onClick={onClick} className="header-action header-action-primary min-w-[180px] px-8">
      {children}
    </button>
  );
}

function InteractivePhone() {
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<DemoMessage[]>(demoConversation);
  const [isReplying, setIsReplying] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  }, [messages.length, isReplying]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || isReplying) return;
    const reply = getDemoReply(text);
    setMessages((current) => [...current, { from: 'customer', text, time: 'now' }]);
    setDraft('');
    setIsReplying(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, {
        from: 'bot',
        text: reply,
        time: 'now',
      }]);
      setIsReplying(false);
    }, 850);
  };

  return (
    <div className="relative w-full max-w-[340px] rounded-[38px] border-[7px] border-[#171817] bg-[#171817] p-2 shadow-[0_28px_0_rgba(0,0,0,.08),0_35px_70px_rgba(0,0,0,.16)] sm:max-w-[370px]" data-testid="interactive-phone">
      <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative overflow-hidden rounded-[29px] bg-[#efece5]">
        <div className="flex items-center justify-between bg-[#101110] px-5 pb-3 pt-7 text-[10px] text-white/65">
          <span>9:41</span>
          <div className="flex items-center gap-1.5"><Wifi size={12} /><span className="h-2.5 w-4 rounded-[3px] border border-white/60" /></div>
        </div>
          <div className="flex items-center justify-between bg-[#101110] px-4 pb-4 text-white">
          <div className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3acd32] text-xs font-bold text-black">A</div><div><p className="text-xs font-bold">AtWassup Chatbot</p><p className="text-[9px] text-[#3acd32]">10-message sample · scroll up</p></div></div>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[9px] font-bold text-white/60">INTERACTIVE DEMO</span>
        </div>
        <div className="flex h-[395px] flex-col p-3">
          <div className="mx-auto mb-3 rounded-full bg-black/[.06] px-3 py-1 text-[9px] font-semibold text-black/40">TODAY</div>
          <div ref={messagesContainerRef} className="min-h-0 flex-1 space-y-2.5 overflow-x-hidden overflow-y-auto pr-1" aria-label="AtWassup demo conversation" data-testid="chat-demo-messages">
            {messages.map((message, index) => (
              <div key={`${message.time}-${index}`} className={`chat-tail relative max-w-[88%] rounded-[15px] px-3.5 py-2.5 text-[11px] leading-relaxed shadow-sm ${message.from === 'bot' ? 'chat-tail-right ml-auto rounded-br-[4px] bg-[#c9f8d5] text-black/80' : 'chat-tail-left rounded-bl-[4px] bg-white text-black/75'}`}>
                {message.from === 'bot' && <span className="mb-1 flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-[#3acd32]"><Bot size={9} /> AtWassup Chatbot</span>}
                {message.text}<span className="mt-1 block text-right text-[8px] text-black/35">{message.time}{message.from === 'bot' && <> · <Check size={9} className="inline text-[#3acd32]" /></>}</span>
              </div>
            ))}
            {isReplying && <div className="chat-tail chat-tail-right flex w-fit items-center gap-1 rounded-[15px] rounded-bl-[4px] bg-white px-3.5 py-3 shadow-sm"><span className="blinking-dot h-1.5 w-1.5 rounded-full bg-black/40" /><span className="blinking-dot h-1.5 w-1.5 rounded-full bg-black/40 [animation-delay:150ms]" /><span className="blinking-dot h-1.5 w-1.5 rounded-full bg-black/40 [animation-delay:300ms]" /></div>}
          </div>
          <div className="mt-3 flex items-center gap-2 border-t border-black/[.08] pt-3">
            <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') sendMessage(); }} placeholder="Try a customer question" aria-label="Message the AtWassup chatbot demo" className="min-w-0 flex-1 rounded-full bg-white px-3.5 py-2.5 text-[11px] outline-none placeholder:text-black/30 focus:ring-2 focus:ring-[#3acd32]/40" />
            <button onClick={sendMessage} aria-label="Send chatbot demo message" data-testid="button-send-demo-message" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3acd32] text-black transition hover:scale-105 disabled:opacity-50" disabled={!draft.trim() || isReplying}><Send size={13} /></button>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl border border-black/10 bg-white px-3 py-2.5 shadow-lg sm:flex"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3acd32] text-black"><Smartphone size={14} /></span><div><p className="text-[8px] font-bold uppercase tracking-widest text-black/35">Try it yourself</p><p className="text-[11px] font-bold">Sample replies · not live.</p></div></div>
    </div>
  );
}

function LeadModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const submitDemoRequest = useSubmitDemoRequest();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const whatsapp = String(formData.get('whatsapp') ?? '').trim();

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await submitDemoRequest.mutateAsync({
        data: { name, email, ...(whatsapp ? { whatsapp } : {}) },
      });
      setSent(true);
    } catch (error) {
      const errorData = typeof error === 'object' && error !== null && 'data' in error
        ? (error as { data?: unknown }).data
        : undefined;
      const serverMessage = typeof errorData === 'object' && errorData !== null && 'error' in errorData && typeof errorData.error === 'string'
        ? errorData.error
        : undefined;
      setErrorMessage(serverMessage ?? "We couldn't send your request right now. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" data-testid="modal-lead">
      <div className="relative w-full max-w-[470px] overflow-hidden rounded-[28px] bg-[#fcfbf8] shadow-2xl">
        <button data-testid="button-close-modal" onClick={onClose} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-black/60 transition hover:bg-black hover:text-white"><X size={17} /></button>
        {!sent ? (
          <div className="p-7 sm:p-10">
            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3acd32] text-black"><Sparkles size={22} /></div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-black/45">DEMO REQUEST</p>
            <h2 className="font-display text-3xl font-bold tracking-[-.05em]">See AtWassup in action.</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/55">Share your details and the AtWassup team will follow up about a demo.</p>
            <form className="mt-7 space-y-3" onSubmit={handleSubmit}>
              <input name="name" data-testid="input-lead-name" required maxLength={120} placeholder="Your name" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-black/30 focus:border-[#3acd32] focus:ring-2 focus:ring-[#3acd32]/20" />
              <input name="email" data-testid="input-lead-work-email" required type="email" maxLength={254} placeholder="Work email" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-black/30 focus:border-[#3acd32] focus:ring-2 focus:ring-[#3acd32]/20" />
              <input name="whatsapp" data-testid="input-lead-whatsapp" maxLength={40} placeholder="WhatsApp number (optional)" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-black/30 focus:border-[#3acd32] focus:ring-2 focus:ring-[#3acd32]/20" />
              {errorMessage && <p role="alert" data-testid="demo-form-error" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}
              <button data-testid="button-submit-lead" type="submit" disabled={isSubmitting} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-sm font-bold text-white transition hover:bg-[#3acd32] hover:text-black disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Sending request…' : 'Continue demo request'} {!isSubmitting && <ArrowRight size={16} />}</button>
            </form>
          </div>
        ) : (
          <div className="flex min-h-[390px] flex-col items-center justify-center p-10 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#3acd32] text-black"><Check size={29} /></div>
            <h2 className="font-display text-3xl font-bold tracking-[-.05em]">Thanks for your interest.</h2>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-black/55">Your demo request has been sent to the AtWassup team. We’ll be in touch soon.</p>
            <button data-testid="button-done-modal" onClick={onClose} className="mt-7 rounded-full border border-black/15 px-5 py-3 text-sm font-bold transition hover:bg-black hover:text-white">Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

function DemoModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onClick={onClose}>
      <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-[760px] overflow-y-auto rounded-[28px] bg-[#101110] p-5 text-white shadow-2xl sm:p-8" role="dialog" aria-modal="true" aria-labelledby="interactive-demo-title" data-testid="modal-ai-demo" onClick={(event) => event.stopPropagation()}>
        <button data-testid="button-close-demo" onClick={onClose} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#3acd32] hover:text-black"><X size={17} /></button>
        <div className="mb-6 max-w-lg"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#3acd32]">Interactive chatbot preview</p><h2 id="interactive-demo-title" className="font-display text-3xl font-bold tracking-[-.05em] sm:text-5xl">Try a conversation.</h2><p className="mt-3 text-sm leading-relaxed text-white/55">Type a customer question and send it to see a sample reply. This preview is interactive, but it is not connected to a live WhatsApp account.</p></div>
        <div className="grid gap-4 sm:grid-cols-[1fr_210px]">
          <div className="flex justify-center rounded-2xl bg-[#f1eee7] p-4"><InteractivePhone /></div>
          <div className="space-y-3">
            {['Understands Marathi', 'Handles price objection', 'Shares the right catalog', 'Keeps human in the loop'].map((item, index) => (
              <div key={item} className="node-in flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.05] p-3 text-xs" style={{ animationDelay: `${index * 180 + 300}ms` }}><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3acd32] text-black"><Check size={13} /></span>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroAtWassupWordmark() {
  return (
    <svg
      aria-label="AtWassup"
      className="hero-atwassup-wordmark inline-block w-auto shrink-0 align-baseline"
      role="img"
      viewBox="98 160 268 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="hero-atwassup-wordmark-clip" clipPathUnits="userSpaceOnUse">
          <path d="M98 160H323V205H98Z M323 160H366V224H323Z" />
        </clipPath>
      </defs>
      <image
        clipPath="url(#hero-atwassup-wordmark-clip)"
        height="375"
        href={logoPath}
        width="375"
        x="0"
        y="0"
      />
    </svg>
  );
}

function Nav({ onLead }: { onLead: () => void }) {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setOpen(false);
  return (
    <header
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          closeMenu();
          menuButtonRef.current?.focus();
        }
      }}
      className="absolute inset-x-0 top-0 z-40 border-b border-black/5 bg-white/95 shadow-[0_4px_18px_rgba(10,20,10,.06)] backdrop-blur-md"
    >
      <div className="section-shell relative flex h-16 items-center justify-between sm:h-[72px] lg:h-[88px]">
        <a href="#top" data-testid="link-logo" className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 shrink-0 items-center lg:static lg:translate-x-0 lg:translate-y-0">
          <img
            src={logoPath}
            alt="AtWassup — AI WhatsApp Marketing Automation"
            className="header-logo-image h-[72px] w-[min(340px,calc(100vw_-_80px))] object-cover object-[center_52%] sm:h-[76px] sm:w-[min(340px,calc(100vw_-_80px))] lg:h-[84px] lg:w-[min(360px,calc(100vw_-_104px))]"
          />
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          <a data-testid="link-ai-features" href="#features" className="site-nav-link">Features</a>
          <a data-testid="link-how-it-works" href="#how-it-works" className="site-nav-link">How It Works</a>
          <a data-testid="link-pricing" href="#pricing" className="site-nav-link">Pricing</a>
          <a data-testid="link-contact" href="#contact" className="site-nav-link">Contact</a>
        </nav>
        <div className="site-nav-actions hidden lg:flex">
          <button data-testid="button-book-demo" onClick={onLead} className="header-action header-action-primary">Schedule demo</button>
          <a data-testid="button-login" href="https://app.atwassup.com" className="header-action header-action-secondary">Login</a>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          data-testid="button-mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation-panel"
          className="relative z-10 ml-auto flex h-11 w-11 shrink-0 items-center justify-center text-black transition-colors hover:text-[#3acd32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3acd32] lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div
        id="mobile-navigation-panel"
        aria-hidden={!open}
        inert={!open}
        className={`section-shell mobile-menu-shell lg:hidden${open ? ' is-open' : ''}`}
      >
          <nav aria-label="Mobile navigation" className="mobile-menu-panel mb-3 rounded-2xl border border-black/10 bg-white p-3 shadow-xl">
            <a data-testid="mobile-link-ai-features" href="#features" onClick={closeMenu} className="site-nav-link">Features</a>
            <a data-testid="mobile-link-how-it-works" href="#how-it-works" onClick={closeMenu} className="site-nav-link">How It Works</a>
            <a data-testid="mobile-link-pricing" href="#pricing" onClick={closeMenu} className="site-nav-link">Pricing</a>
            <a data-testid="mobile-link-contact" href="#contact" onClick={closeMenu} className="site-nav-link">Contact</a>
            <div className="mobile-menu-actions mt-3 grid grid-cols-2 gap-2">
              <button data-testid="mobile-button-book-demo" onClick={() => { closeMenu(); onLead(); }} className="header-action header-action-primary w-full">Schedule demo</button>
              <a data-testid="mobile-link-login" href="https://app.atwassup.com" onClick={closeMenu} className="header-action header-action-secondary w-full">Login</a>
            </div>
          </nav>
      </div>
    </header>
  );
}

function Home() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [heroFeatureStage, setHeroFeatureStage] = useState<HeroFeatureStage>('broadcast');
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepsCarouselRef = useRef<HTMLDivElement>(null);
  const stepCardRefs = useRef<(HTMLElement | null)[]>([]);
  const heroReveal = useReveal();
  const capabilitiesReveal = useReveal();
  const { ref: capabilitiesSectionRef, isInView: capabilitiesInView } = useSectionInView<HTMLElement>();
  const stepsReveal = useReveal();
  const pricingReveal = useReveal();
  const trustReveal = useReveal();
  const contactCtaReveal = useReveal();
  const contactReveal = useReveal();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    stepCardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStep = (index: number) => {
    const carousel = stepsCarouselRef.current;
    const card = stepCardRefs.current[index];
    if (!carousel || !card) return;
    const cardLeft = card.getBoundingClientRect().left - carousel.getBoundingClientRect().left + carousel.scrollLeft;
    carousel.scrollTo({
      left: cardLeft - (carousel.clientWidth - card.clientWidth) / 2,
      behavior: 'smooth',
    });
  };

  const handleStepsCarouselScroll = (event: UIEvent<HTMLDivElement>) => {
    if (window.matchMedia('(min-width: 640px)').matches) return;
    const carousel = event.currentTarget;
    const center = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    stepCardRefs.current.forEach((card, index) => {
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - center);
      if (distance < closestDistance) {
        closestIndex = index;
        closestDistance = distance;
      }
    });

    setActiveStepIndex((current) => current === closestIndex ? current : closestIndex);
  };

  return (
    <main className="noise min-h-[100dvh] bg-[#fcfbf8]" id="top">
      <Nav onLead={() => setLeadOpen(true)} />
      <section className="relative overflow-hidden pb-8 pt-20 sm:pb-10 sm:pt-28 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:pb-[14px] lg:pt-[72px]">
        <div className="section-shell hero-shell relative grid items-start gap-3 sm:gap-6 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-x-5 lg:gap-y-0">
          <div ref={heroReveal} className="reveal hero-heading">
            <h1 className="mt-2 flex max-w-[720px] flex-col gap-y-1.5 font-display text-[clamp(1.45rem,7.25vw,1.9rem)] font-bold leading-[.96] tracking-[-.08em] text-black sm:mt-6 sm:text-[clamp(2rem,5.3vw,5.5rem)] lg:mt-0 lg:gap-y-0 lg:text-[clamp(2.25rem,3.5vw,3.25rem)]">
              <span className="block">Make your business</span>
              <span className="-mt-2 block lg:mt-0">smarter with <HeroAtWassupWordmark /></span>
              <HeroHeadlineRotator />
            </h1>
          </div>
          <div className="hero-details">
            <p className="mt-0 max-w-[540px] text-justify text-base leading-relaxed text-black/60 sm:text-lg lg:mt-5 lg:text-base">Start with AtWassup. Connect the WhatsApp Business API and let AI answer customer questions, capture leads, follow up, close sales, and run broadcasts all through AtWassup, your all-in-one WhatsApp AI marketing platform.</p>
            <div className="hero-actions mt-6 lg:mt-5">
              <PrimaryButton onClick={() => setLeadOpen(true)} testId="hero-button-book-demo">Schedule demo</PrimaryButton>
              <a data-testid="hero-link-explore-features" href="#features" className="header-action header-action-secondary min-w-[180px] px-8">Explore Features</a>
            </div>
          </div>
          <div className="hero-showcase-column relative flex justify-center lg:translate-y-6 lg:justify-end">
            <div className="hero-showcase-layout relative z-10">
              <div className="hero-airavata-demo relative z-10 w-full">
                <CommerceDemo onFeatureStageChange={setHeroFeatureStage} />
              </div>
              <HeroFeatureFlow stage={heroFeatureStage} />
            </div>
          </div>
          <div className="hero-proof">
            <div className="mt-0 lg:mt-8" data-testid="hero-meta-business-partner">
              <p className="mb-1.5 text-lg font-medium leading-6 text-black/60" data-testid="hero-meta-business-partner-copy">
                <span>We are an official Meta Business Partner</span>
                <img src={verifiedBusinessBadge} alt="" aria-hidden="true" className="ml-1.5 inline-block h-5 w-5 align-middle object-contain" />
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <img
                  src={metaBusinessPartnerPath}
                  alt="Meta Business Partner"
                  className="hero-meta-logo h-[52px] w-[135px] shrink-0 object-contain object-left sm:h-16 sm:w-[180px]"
                  data-testid="hero-meta-business-partner-logo"
                />
                <img
                  src={metaTechProviderPath}
                  alt="Meta Tech Provider"
                  className="hero-meta-logo h-[52px] w-[135px] shrink-0 object-contain object-left sm:h-16 sm:w-[180px]"
                  data-testid="hero-meta-tech-provider-logo"
                />
              </div>
            </div>
            <div className="mt-4 max-w-[520px]" data-testid="hero-whatsapp-profile-showcase">
              <div className="flex items-center gap-1.5 px-2 py-4 sm:gap-2.5 sm:px-3">
                <ChevronLeft aria-hidden="true" className="h-5 w-5 shrink-0 text-[#111b21] sm:h-[22px] sm:w-[22px]" />
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d1e1d2] bg-[#dceadd] text-base font-semibold text-[#447b54] sm:h-12 sm:w-12 sm:text-lg">
                  Y
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                    <span className="min-w-0 text-sm font-semibold leading-tight text-[#111b21] sm:text-lg">Your Business / Brand Name</span>
                    <img src={verifiedBusinessBadge} alt="Verified business" className="h-[18px] w-[18px] shrink-0 object-contain sm:h-5 sm:w-5" />
                  </div>
                  <span className="block text-[15px] leading-5 text-black/60 sm:text-base">AI Smart WhatsApp Marketing</span>
                </div>
                <span role="img" aria-label="WhatsApp video and phone call buttons" className="relative h-[30px] w-[74px] shrink-0">
                  <FigmaSvgCrop x={288} y={58} width={88} height={36} className="hero-profile-actions-art" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(node) => { capabilitiesSectionRef.current = node; }}
        className={`feature-motion-section relative overflow-hidden bg-[#101110] py-9 text-white sm:py-11${capabilitiesInView ? ' is-in-view' : ''}`}
        id="features"
      >
        <div className="feature-orbit pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full border border-[#3acd32]/15" />
        <div ref={capabilitiesReveal} className="section-shell reveal relative">
          <div className="feature-heading-row">
            <div className="max-w-[720px]">
              <SectionLabel tone="dark">One channel · ten capabilities</SectionLabel>
              <h2 className="font-display text-5xl font-bold leading-[.94] tracking-[-.07em] sm:text-5xl">
                <span className="sr-only">One channel. So much more.</span>
                <span className="feature-heading-visual" aria-hidden="true">
                  <span className="feature-heading-line">
                    {'One channel.'.split('').map((character, index) => (
                      <span key={`first-${index}`} className="feature-heading-character" style={{ animationDelay: `${index * 18}ms` }}>{character === ' ' ? '\u00a0' : character}</span>
                    ))}
                    <span className="feature-heading-cursor feature-heading-cursor-first" />
                  </span>
                  <br />
                  <span className="feature-heading-line text-[#3acd32]">
                    {'So much more.'.split('').map((character, index) => (
                      <span key={`second-${index}`} className="feature-heading-character" style={{ animationDelay: `${340 + index * 18}ms` }}>{character === ' ' ? '\u00a0' : character}</span>
                    ))}
                    <span className="feature-heading-cursor feature-heading-cursor-second" />
                  </span>
                </span>
              </h2>
              <p className="mt-4 max-w-[720px] text-sm leading-relaxed text-white/55">AtWassup brings onboarding, automation, support, campaigns, commerce, and analytics together on WhatsApp.</p>
            </div>
            <div className="feature-stat">
              <span className="feature-counter font-display text-8xl font-bold leading-[.78] tracking-[-.1em] text-[#3acd32]" aria-label="10">
                <span className="sr-only">10</span>
                <span className="feature-counter-window" aria-hidden="true">
                  <span className="feature-counter-stack feature-counter-tens">
                    {['0', '1'].map((digit, index) => <span key={`tens-${index}`} className="feature-counter-digit">{digit}</span>)}
                  </span>
                  <span className="feature-counter-stack feature-counter-ones">
                    {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit, index) => <span key={`ones-${index}`} className="feature-counter-digit">{digit}</span>)}
                  </span>
                </span>
              </span>
              <span className="feature-stat-label pb-0.5 text-xs font-semibold leading-relaxed text-white/55">connected capabilities<br />one WhatsApp channel</span>
            </div>
          </div>
          <div className="feature-groups" aria-label="AtWassup capabilities">
            <svg className="feature-connector feature-connector-desktop" viewBox="0 0 1000 20" preserveAspectRatio="none" aria-hidden="true">
              <path className="feature-connector-main" d="M860 0H0" />
              <path className="feature-connector-branch feature-connector-branch-1" d="M0 0V16" />
              <path className="feature-connector-branch feature-connector-branch-2" d="M333 0V16" />
              <path className="feature-connector-branch feature-connector-branch-3" d="M666 0V16" />
            </svg>
            <span className="feature-connector-dot" aria-hidden="true" />
            {capabilityGroups.map((group, groupIndex) => (
              <CapabilityGroupPanel key={group.id} group={group} groupIndex={groupIndex} />
            ))}
          </div>
        </div>
      </section>

      <ChatbotInquiryDemo />

      <ClinicAppointmentDemo />

      <section className="bg-[#fcfbf8] pb-24 pt-20 sm:pb-32 sm:pt-24" id="how-it-works">
        <div ref={stepsReveal} className="section-shell reveal">
          <div className="max-w-[680px]"><SectionLabel>Simple to get started</SectionLabel><h2 className="font-display text-5xl font-bold leading-[.94] tracking-[-.07em] sm:text-7xl">From first setup to <span className="text-[#3acd32]">better conversations.</span></h2><p className="mt-6 max-w-[520px] text-base leading-relaxed text-black/55">A clear path from connecting your number to growing the way you use WhatsApp.</p></div>
          <div
            ref={stepsCarouselRef}
            onScroll={handleStepsCarouselScroll}
            role="region"
            aria-label="Getting started steps. Swipe horizontally to move one page at a time."
            className="steps-book mt-14 -mx-5 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-[8vw] pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          >
            {processSteps.map(({ title, text }, index) => (
              <article ref={(node) => { stepCardRefs.current[index] = node; }} key={title} className="steps-page group relative w-[84vw] shrink-0 snap-center overflow-hidden rounded-[22px] border border-black/10 bg-white p-6 transition duration-300 hover:border-[#3acd32]/60 hover:shadow-[0_14px_32px_rgba(58,205,50,.12)] sm:w-auto sm:min-w-0 sm:shrink sm:snap-none sm:p-7" style={{ animationDelay: `${index * 200}ms` }} data-testid={`step-card-${index + 1}`}>
                <div className="mb-7 flex items-start justify-between">
                  <span className="font-display text-6xl font-bold tracking-[-.08em] text-[#3acd32] drop-shadow-[0_0_14px_rgba(58,205,50,.25)]">0{index + 1}</span>
                  <span aria-hidden="true" className="mt-3 h-3 w-3 rounded-full bg-[#3acd32] shadow-[0_0_18px_rgba(58,205,50,.9)] transition duration-300 group-hover:scale-125" />
                </div>
                <div className="mb-5 h-px w-14 bg-[#3acd32] shadow-[0_0_12px_rgba(58,205,50,.55)] transition-all duration-300 group-hover:w-24" />
                <h3 className="font-display text-2xl font-bold tracking-[-.04em]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-black/50">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 sm:hidden" aria-label="Step navigation">
            <div className="flex items-center gap-1.5">
              {processSteps.map(({ title }, index) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => scrollToStep(index)}
                  aria-label={`Show step ${index + 1}: ${title}`}
                  aria-current={activeStepIndex === index ? 'step' : undefined}
                  className={`h-2 rounded-full transition-all ${activeStepIndex === index ? 'w-7 bg-[#3acd32]' : 'w-2 bg-black/20 hover:bg-[#3acd32]'}`}
                  data-testid={`step-dot-${index + 1}`}
                />
              ))}
            </div>
            <span className="text-[10px] font-semibold text-black/40">Swipe to turn the page</span>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f2f9e9] py-8 sm:py-10" id="pricing">
        <div ref={pricingReveal} className="section-shell reveal">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>Simple pricing</SectionLabel>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-[-.055em] sm:text-[2.5rem]">
              One plan. <span className="text-[#3acd32]">Clear costs.</span>
            </h2>
            <p className="mt-1 text-sm text-black/60">
              ₹15,000/year + applicable GST + Meta message charges = your total.
            </p>
          </div>
          <div className="mx-auto mt-5 grid max-w-6xl gap-6 lg:grid-cols-[.78fr_1.22fr] lg:gap-9">
            <div className="border-b border-black/15 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#3acd32]">You pay AtWassup</p>
              <p className="mt-2 font-display text-4xl font-bold leading-none tracking-[-.07em] sm:text-[2.75rem]">
                <span className="pricing-price-reveal">₹15,000</span><span className="ml-2 align-baseline font-sans text-xs font-semibold tracking-normal text-black/50">/ year</span>
              </p>
              <p className="mt-1 text-[11px] text-black/50">GST, if applicable</p>
              <p className="mt-4 text-xs font-medium leading-relaxed text-black/65">
                Every feature included <span className="px-1 text-[#3acd32]">·</span> No tiers <span className="px-1 text-[#3acd32]">·</span> No hidden fees
              </p>
              <button
                onClick={() => setLeadOpen(true)}
                data-testid="button-annual-plan-demo"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#3acd32] px-4 py-2.5 text-xs font-bold text-black transition hover:-translate-y-0.5"
              >
                Book a demo <ArrowRight size={14} />
              </button>
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#3acd32]">You pay Meta</p>
                <p className="text-[11px] text-black/50">Per message · Meta’s rates · no AtWassup markup</p>
              </div>
              <div className="mt-2 grid grid-cols-[1fr_auto] items-center gap-x-4 text-xs sm:text-sm">
                <div className="border-b border-black/10 py-2 font-medium">Marketing</div><div className="border-b border-black/10 py-2 text-right font-semibold">₹0.8631</div>
                <div className="border-b border-black/10 py-2 font-medium">Utility</div><div className="border-b border-black/10 py-2 text-right font-semibold">₹0.115</div>
                <div className="border-b border-black/10 py-2 font-medium">Authentication (India)</div><div className="border-b border-black/10 py-2 text-right font-semibold">₹0.115</div>
                <div className="py-2 font-medium">Service replies</div><div className="py-2 text-right font-semibold">₹0.115 after free quota</div>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-black/55">
                First 1,000 service replies free each month, per business number. Example: 10,000 utility messages = ₹1,150 to Meta.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-4 flex max-w-6xl flex-wrap items-center gap-x-2 border-t border-black/15 pt-3 text-xs">
            <span className="font-bold text-[#3acd32]">Others:</span>
            <span className="text-black/55">packages + possible markups</span>
            <span className="mx-1 text-[#3acd32]">→</span>
            <span className="font-bold text-[#252a27]">AtWassup:</span>
            <span className="text-black/65">one plan, Meta rate only</span>
          </div>
        </div>
      </section>

      <section className="bg-[#252a27] py-24 text-white sm:py-32">
        <div ref={trustReveal} className="section-shell reveal grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><SectionLabel tone="dark">The right foundations</SectionLabel><h2 className="max-w-[470px] font-display text-5xl font-bold leading-[.94] tracking-[-.07em] sm:text-6xl">Built around how your team <span className="text-[#3acd32]">really works.</span></h2><p className="mt-6 max-w-[390px] text-sm leading-relaxed text-white/55">Work with the official WhatsApp Business Platform, connect the systems your team already relies on, and bring people into the conversation when needed.</p></div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { title: 'Guided setup', text: 'Support for API onboarding, Meta verification, and Green Tick assistance.' },
                { title: 'Your tools stay connected', text: 'Integrate with your website, CRM, software, or customer database.' },
                { title: 'People stay in control', text: 'Give agents a shared live-chat workspace and a clear handoff from automation.' },
              ].map(({ title, text }, index) => (
                <article key={title} className={`trust-card trust-card-${index} group relative overflow-hidden rounded-[22px] border border-[#3acd32]/20 bg-[#3acd32]/[.035] p-5 transition duration-300 hover:border-[#3acd32]/65 hover:bg-[#3acd32]/[.07] sm:p-6`} data-testid={`card-trust-${index}`}>
                  <span aria-hidden="true" className="pointer-events-none absolute -right-1 top-3 font-display text-8xl font-bold leading-none text-[#3acd32]/[.09]">0{index + 1}</span>
                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#3acd32]">0{index + 1} / ATWASSUP</span>
                  </div>
                  <div className="my-7 h-px w-14 bg-[#3acd32] shadow-[0_0_12px_rgba(58,205,50,.65)] transition-all duration-300 group-hover:w-24" />
                  <h3 className="relative font-display text-lg font-bold tracking-[-.03em]">{title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/60">{text}</p>
                  <svg className="trust-card-cursor" viewBox="0 0 20 24" aria-hidden="true">
                    <path d="M2 1.5v17l4.7-4.2 3.3 7 3.1-1.5-3.5-6.7 6.3-.5L2 1.5Z" fill="white" stroke="#252a27" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="home-cta-section relative overflow-hidden bg-[#3acd32] py-12 sm:py-[4.5rem]" id="contact-cta">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[32px] border-black/10" />
        <div className="absolute bottom-[-100px] left-[-30px] h-72 w-72 rounded-full border-[32px] border-black/10" />
        <div ref={contactCtaReveal} className="home-cta-content section-shell relative reveal text-center">
          <SectionLabel>Talk with the AtWassup team</SectionLabel>
          <h2 className="home-cta-heading mx-auto font-display font-bold tracking-[-.08em]">
            Make WhatsApp work harder for your <span className="underline decoration-[5px] underline-offset-[10px]">business.</span>
          </h2>
          <p className="home-cta-description mx-auto text-base leading-relaxed text-black/65">
            Book a walkthrough of the platform, talk through your use case, and find the plan that fits.
          </p>
          <div className="home-cta-actions flex flex-wrap justify-center gap-3">
            <button data-testid="final-button-book-demo" onClick={() => setLeadOpen(true)} className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white hover:text-black">
              Book a demo <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a data-testid="final-link-pricing" href="#pricing" className="inline-flex items-center gap-2 rounded-full border border-black/20 px-6 py-4 text-sm font-bold text-black transition hover:-translate-y-1 hover:bg-black hover:text-white">
              Explore plans <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-black/5 bg-[#f7f8f3] py-16 sm:py-24" id="contact">
        <div ref={contactReveal} className="section-shell relative reveal">
          <div className="grid items-stretch gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
            <div className="order-2 lg:order-1">
              <ContactWhatsAppForm />
            </div>
            <div className="order-1 flex w-full max-w-[640px] flex-col lg:order-2">
              <div className="mb-4">
                <h2 className="max-w-[560px] font-display text-3xl font-bold leading-[1.02] tracking-[-.045em] text-black sm:text-[34px]">
                  Turn WhatsApp chats into <span className="text-[#3acd32]">business growth.</span>
                </h2>
                <p className="mt-2 max-w-[550px] text-sm leading-5 text-black/65">
                  Capture new numbers, answer questions with AI, and keep customer details ready for follow-up.
                </p>
                <div className="mt-3 grid gap-1.5">
                  {[
                    { text: 'Customer numbers saved from the first message', icon: socialFacebookPath },
                    { text: 'AI answers common questions automatically', icon: socialInstagramPath },
                    { text: 'Names and custom details captured in chat', icon: socialYoutubePath },
                    { text: 'Opted-in contacts ready for targeted campaigns', icon: socialLinkedinPath },
                  ].map(({ text, icon }) => (
                    <div key={text} className="flex items-center gap-2.5 text-[13px] font-semibold leading-5 text-black/80">
                      <img src={icon} alt="" aria-hidden="true" className="h-[18px] w-[18px] shrink-0 object-contain" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_12px_32px_rgba(15,23,42,.05)]">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3acd32]/12 text-[#3acd32]">
                    <MapPin size={17} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[.12em] text-black/45">Office address</p>
                    <address className="mt-1.5 not-italic text-[13px] font-medium leading-5 text-black">
                      Hubtown Greenwood CHS,<br />
                      Flat no. 805/A Wing, 8th Floor,<br />
                      Pokhran Road No. 1, Vartak Nagar,<br />
                      Thane (W), 400606
                    </address>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 border-t border-black/8 pt-3 sm:grid-cols-2">
                  <a href="tel:+919167959756" className="flex min-w-0 items-center gap-2.5 rounded-xl bg-[#f7f8f3] px-3 py-2.5 text-[13px] font-semibold text-black transition hover:bg-[#3acd32]/10">
                    <Phone size={15} className="shrink-0 text-[#3acd32]" aria-hidden="true" />
                    <span>+91 91679 59756</span>
                  </a>
                  <a href="mailto:info@atwassup.com" className="flex min-w-0 items-center gap-2.5 rounded-xl bg-[#f7f8f3] px-3 py-2.5 text-[13px] font-semibold text-black transition hover:bg-[#3acd32]/10">
                    <Mail size={15} className="shrink-0 text-[#3acd32]" aria-hidden="true" />
                    <span className="break-all">info@atwassup.com</span>
                  </a>
                </div>
              </div>

              <div className="relative mt-3 min-h-[150px] flex-1 overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-[0_12px_32px_rgba(15,23,42,.05)]">
                <iframe
                  title="Map to the AtWassup office in Thane"
                  src={officeMapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={officeMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 text-xs font-bold text-black shadow-md transition hover:bg-[#3acd32]"
                >
                  <MapPin size={14} aria-hidden="true" />
                  Open in Google Maps
                </a>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <a
                  href="https://www.instagram.com/at.wassup/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="AtWassup on Instagram"
                  className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-black/10 bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,.04)] transition hover:border-[#3acd32] hover:bg-[#3acd32]/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3acd32]/12 text-[#3acd32]">
                    <Instagram size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold text-black">Instagram</span>
                    <span className="block truncate text-xs text-black/55">@at.wassup</span>
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/atwassup"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="AtWassup on LinkedIn"
                  className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-black/10 bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,.04)] transition hover:border-[#3acd32] hover:bg-[#3acd32]/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3acd32]/12 text-[#3acd32]">
                    <Linkedin size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-bold text-black">LinkedIn</span>
                    <span className="block truncate text-xs text-black/55">AtWassup</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        id="footer"
        className="relative overflow-hidden border-t border-black/5 bg-white pt-12 pb-[calc(1rem+env(safe-area-inset-bottom))] font-sans text-black sm:pt-14 sm:pb-5"
        data-testid="footer"
      >
        <div className="relative mx-auto w-[calc(100%-40px)] max-w-[1440px] sm:w-[calc(100%-64px)] lg:w-[calc(100%-80px)]">
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 pb-3 md:gap-x-10 md:gap-y-9 xl:grid-cols-[1.2fr_.7fr_1.2fr_.85fr_1.2fr] xl:gap-x-7">
            <div className="order-1 col-span-2 md:order-5 md:col-span-1 xl:order-1">
              <a href="#top" aria-label="AtWassup home" data-testid="footer-link-home">
                <img
                  src={logoPath}
                  alt="AtWassup — AI WhatsApp Marketing Automation"
                  className="h-[90px] w-full max-w-[320px] object-cover object-[center_52%]"
                />
              </a>
              <p className="mt-2 max-w-[290px] text-base leading-relaxed text-black">
                WhatsApp Business API, AI chatbot, and Flow solutions.
              </p>
              <div className="mt-5 flex items-center">
                <img
                  src={metaBusinessPartnerPath}
                  alt="Meta Business Partner"
                  data-testid="footer-meta-business-partner"
                  className="h-[56px] w-[165px] object-contain object-left"
                />
              </div>
              <div className="mt-5 flex items-center gap-3" role="group" aria-label="Social media">
                {[
                  { name: 'Facebook', image: socialFacebookPath },
                  { name: 'Instagram', image: socialInstagramPath },
                  { name: 'YouTube', image: socialYoutubePath },
                  { name: 'LinkedIn', image: socialLinkedinPath },
                ].map(({ name, image }) => (
                  <span
                    key={name}
                    role="img"
                    aria-label={`${name} link to be added`}
                    title={`${name} link coming soon`}
                    data-testid={`footer-social-${name.toLowerCase()}`}
                    className="flex h-10 w-10 items-center justify-center transition-opacity hover:opacity-75"
                  >
                    <img src={image} alt="" className="h-8 w-8 object-contain" />
                  </span>
                ))}
              </div>
            </div>

            <nav aria-label="Footer navigation" className="order-2 md:order-1 xl:order-2">
              <h2 className="text-sm font-bold uppercase tracking-[.12em] text-black">Explore</h2>
              <ul className="mt-4 space-y-3.5 text-base font-medium text-black">
                <li><a data-testid="footer-link-features" href="#features" className="transition hover:text-black">Features</a></li>
                <li><a data-testid="footer-link-how-it-works" href="#how-it-works" className="transition hover:text-black">How it works</a></li>
                <li><a data-testid="footer-link-pricing" href="#pricing" className="transition hover:text-black">Pricing</a></li>
                <li><a data-testid="footer-link-contact" href="#contact" className="transition hover:text-black">Contact</a></li>
              </ul>
            </nav>

            <div className="order-4 col-span-2 md:order-2 md:col-span-1 xl:order-3" data-testid="footer-company-contact">
              <h2 className="text-sm font-bold uppercase tracking-[.12em] text-black">Contact</h2>
              <div className="mt-4 space-y-4">
                <a
                  href="tel:+919167959756"
                  data-testid="footer-contact-phone"
                  className="flex items-center gap-3 text-base font-medium text-black transition hover:text-black"
                >
                  <img src={contactPhonePath} alt="" className="h-6 w-6 shrink-0 object-contain" />
                  +91 91679 59756
                </a>
                <a
                  href="mailto:info@atwassup.com"
                  data-testid="footer-contact-email"
                  className="flex items-center gap-3 text-base font-medium text-black transition hover:text-black"
                >
                  <img src={contactEmailPath} alt="" className="h-6 w-6 shrink-0 object-contain" />
                  info@atwassup.com
                </a>
                <a
                  href={officeMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-link-directions"
                  className="flex items-start gap-3 text-base font-medium leading-6 text-black transition hover:text-black"
                >
                  <img src={contactLocationPath} alt="" className="mt-0.5 h-6 w-6 shrink-0 object-contain" />
                  <span>
                    Hubtown Greenwood CHS, Flat no. 805/A Wing, 8th Floor, Pokhran Road No. 1, Vartak Nagar, Thane (W), 400606
                  </span>
                </a>
              </div>
            </div>

            <nav aria-label="Legal" className="order-3 md:order-3 xl:order-4">
              <h2 className="text-sm font-bold uppercase tracking-[.12em] text-black">Legal</h2>
              <ul className="mt-4 space-y-3.5 text-base font-medium text-black">
                <li>
                  <span
                    data-testid="footer-link-privacy-policy"
                    className="block"
                  >
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span
                    data-testid="footer-link-refund-policy"
                    className="block"
                  >
                    Refund Policy
                  </span>
                </li>
                <li>
                  <span
                    data-testid="footer-link-terms"
                    className="block"
                  >
                    Terms &amp; Conditions
                  </span>
                </li>
              </ul>
            </nav>

            <div className="order-5 col-span-2 md:order-4 md:col-span-1 xl:order-5">
              <h2 className="text-sm font-bold uppercase tracking-[.12em] text-black">Find us</h2>
              <div className="relative mt-4 h-[190px] overflow-hidden rounded-2xl border border-black/10 bg-[#f4f7f1]">
                <iframe
                  title="AtWassup office location in Thane"
                  src={officeMapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-3 pt-4 text-xs text-black sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <div className="flex w-full flex-nowrap items-center gap-2 sm:contents">
              <p className="shrink-0 whitespace-nowrap text-left text-[11px] sm:text-sm">
                © {new Date().getFullYear()} AtWassup. All rights reserved.
              </p>
              <div className="inline-flex shrink-0 items-center gap-1.5" data-testid="footer-made-in-india">
              <img
                src={madeInIndiaFlagPath}
                alt=""
                className="h-6 w-9 object-contain sm:h-9 sm:w-[54px]"
              />
                <span className="whitespace-nowrap text-[11px] font-normal text-black sm:text-sm">Made in India</span>
              </div>
            </div>
            <a
              href="https://www.airavatatechnologies.com/"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-start gap-2 pr-16 text-left text-xs leading-relaxed text-black hover:underline sm:w-auto sm:justify-end sm:pr-20 sm:text-right sm:text-sm"
            >
              <svg
                viewBox="60 30 255 212"
                className="h-8 w-9 shrink-0 scale-110"
                aria-hidden="true"
              >
                <image
                  href={airavataTriangleSourcePath}
                  x="0"
                  y="0"
                  width="375"
                  height="375"
                  preserveAspectRatio="none"
                />
              </svg>
              <span className="min-w-0">A Product Designed and Developed by Airavata Technologies</span>
            </a>
          </div>
        </div>
      </footer>
      <a
        href="https://wa.me/919167959756"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with AtWassup on WhatsApp"
        title="Chat with AtWassup on WhatsApp"
        data-testid="floating-whatsapp-contact"
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#3acd32]/50"
      >
        <img
          src={whatsappContactPath}
          alt=""
          className="h-full w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,.2)]"
        />
      </a>
      {demoOpen && <DemoModal onClose={() => setDemoOpen(false)} />}
      {leadOpen && <LeadModal onClose={() => setLeadOpen(false)} />}
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;