import { useEffect, useRef, useState } from 'react';
import { Check, Snowflake } from 'lucide-react';
import { DevicePreviewFrame } from '@/components/hero/DevicePreview';
import { FigmaReadReceipt, FigmaSvgCrop } from '@/components/hero/FigmaChrome';
import '@/components/hero/airavata-demo.css';
import './chatbot-inquiry-demo.css';

type FieldKey = 'phone' | 'name' | 'pincode' | 'address' | 'acType';
type Msg = { from: 'customer' | 'bot'; text: string; time: string; capture?: Partial<Record<FieldKey, string>> };

const BUSINESS = 'CoolCare AC';

// Illustrative only. Number, name and address are fictional placeholders, not real customer data.
const SENDER_NUMBER = '+91 90000 00000';

const script: Msg[] = [
  { from: 'customer', text: 'Hi, my AC is not cooling. Can you send someone to check it?', time: '10:41 AM', capture: { phone: SENDER_NUMBER } },
  { from: 'bot', text: 'Sure, we can help with that. May I have your name?', time: '10:41 AM' },
  { from: 'customer', text: 'It is Rohan Mehta.', time: '10:42 AM', capture: { name: 'Rohan Mehta' } },
  { from: 'bot', text: 'Thanks, Rohan. What is your pincode?', time: '10:42 AM' },
  { from: 'customer', text: '411038, Pune.', time: '10:42 AM', capture: { pincode: '411038, Pune' } },
  { from: 'bot', text: 'We cover 411038. Please share the address for the visit.', time: '10:43 AM' },
  { from: 'customer', text: 'Flat 302, Green Park Society, Kothrud.', time: '10:43 AM', capture: { address: 'Flat 302, Green Park Society, Kothrud' } },
  { from: 'bot', text: 'Got it. Is it a split AC or a window AC?', time: '10:44 AM' },
  { from: 'customer', text: 'Split AC.', time: '10:44 AM', capture: { acType: 'Split AC' } },
  { from: 'bot', text: 'Thank you, Rohan. Your details are saved. Our team will message you here with a visit slot.', time: '10:44 AM' },
];

const fields: { key: FieldKey; label: string }[] = [
  { key: 'phone', label: 'WhatsApp number' },
  { key: 'name', label: 'Customer name' },
  { key: 'pincode', label: 'Pincode' },
  { key: 'acType', label: 'AC type' },
  { key: 'address', label: 'Address' },
];

function deriveRecord(visible: Msg[]) {
  const record: Partial<Record<FieldKey, string>> = {};
  let latest: FieldKey | null = null;
  for (const m of visible) {
    if (m.from !== 'customer' || !m.capture) continue;
    for (const [k, v] of Object.entries(m.capture) as [FieldKey, string][]) {
      record[k] = v;
      latest = k;
    }
  }
  return { record, latest };
}

const typingFor = (m: Msg) => (m.from === 'bot' ? 900 + Math.min(m.text.length * 9, 1100) : 700 + Math.min(m.text.length * 14, 1000));
const LOOP_PAUSE = 5000;

export default function ChatbotInquiryDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const [screenWidth, setScreenWidth] = useState(280);
  const [reduced, setReduced] = useState(false);
  const [count, setCount] = useState(2);
  const [typing, setTyping] = useState<Msg['from'] | null>(null);
  const [inView, setInView] = useState(false);
  const [docVisible, setDocVisible] = useState(true);

  useEffect(() => {
    if (window.location.hash !== '#chatbot') return;
    const frame = requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => {
      const w = stage.clientWidth - 32;
      if (w <= 0) return;
      const fitHeight = Math.floor((window.innerHeight - 40) / (19.5 / 9 + 20 / 390));
      setScreenWidth(Math.max(200, Math.min(340, w, fitHeight)));
    };
    const ro = new ResizeObserver(update);
    ro.observe(stage);
    window.addEventListener('resize', update);
    update();
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => {
    const q = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduced(q.matches);
      if (q.matches) { setCount(script.length); setTyping(null); }
    };
    apply();
    q.addEventListener('change', apply);
    return () => q.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting && e.intersectionRatio >= 0.2), { threshold: 0.2 });
    io.observe(el);
    const onVis = () => setDocVisible(document.visibilityState === 'visible');
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  const running = !reduced && inView && docVisible;

  useEffect(() => {
    if (!running) return;
    let t: number;
    if (count >= script.length) {
      t = window.setTimeout(() => { setCount(0); setTyping(null); }, LOOP_PAUSE);
    } else if (typing) {
      t = window.setTimeout(() => { setTyping(null); setCount((c) => c + 1); }, typingFor(script[count]));
    } else {
      const next = script[count];
      t = window.setTimeout(() => setTyping(next.from), count === 0 ? 500 : next.from === 'customer' ? 1500 : 450);
    }
    return () => window.clearTimeout(t);
  }, [running, count, typing]);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    el.scrollTo({ top: count === 0 ? 0 : el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [count, typing, reduced]);

  const screenScale = screenWidth / 252;
  const screenHeight = Math.round(524 * screenScale);
  const { record, latest } = deriveRecord(script.slice(0, count));
  const savedCount = Object.values(record).filter(Boolean).length;
  const chips = [
    record.pincode && 'Pune',
    record.pincode && '411038',
    record.acType,
  ].filter(Boolean) as string[];
  const outcomes = [
    { text: 'WhatsApp number saved on first message', on: Boolean(record.phone) },
    { text: 'Customer details added as they reply', on: Boolean(record.name && record.pincode) },
    { text: 'Custom attributes ready for follow-up', on: Boolean(record.address && record.acType) },
  ];

  return (
    <section ref={sectionRef} id="chatbot" aria-labelledby="chatbot-heading" data-testid="section-chatbot-works" className="story-chapter story-long-chapter cid-section">
      <div className="story-stage section-shell cid-grid">
        <div className="cid-copy">
          <p className="cid-eyebrow"><span aria-hidden="true" />AI WhatsApp chatbot</p>
          <h2 id="chatbot-heading" className="font-display cid-title">
            Your AI answers. <em>Every detail is saved.</em>
          </h2>
          <p className="cid-lede">It saves the WhatsApp number from the first message, then adds names, locations and custom details as customers reply—ready for follow-up and opted-in marketing.</p>

          <ol className="cid-outcomes" aria-label="What the AI chatbot does">
            {outcomes.map((outcome) => (
              <li className={outcome.on ? 'is-on' : ''} key={outcome.text}>
                <span className="cid-tick" aria-hidden="true"><Check size={11} strokeWidth={3} /></span>
                {outcome.text}
              </li>
            ))}
          </ol>

          <div className="cid-capture" data-testid="chatbot-customer-record">
            <div className="cid-capture-head">
              <h3 className="cid-capture-heading">Saved in AtWassup</h3>
              <span className="cid-record-count">{String(savedCount).padStart(2, '0')} / {String(fields.length).padStart(2, '0')} details</span>
            </div>

            <dl className="cid-attrs">
              {fields.map((f) => {
                const value = record[f.key];
                return (
                  <div
                    key={f.key}
                    className={`cid-attr cid-attr-${f.key}${value ? ' is-filled' : ''}${!reduced && latest === f.key ? ' is-latest' : ''}`}
                    data-testid={`record-field-${f.key}`}
                  >
                    <dt>
                      {f.label}
                    </dt>
                    <dd key={value ?? 'empty'}>
                      {value ?? <span className="cid-pending">{f.key === 'phone' ? 'Waiting for a message' : 'Not shared yet'}</span>}
                    </dd>
                  </div>
                );
              })}
              <div className="cid-attr cid-attr-audience" data-testid="record-field-audience">
                <dt>Audience tags</dt>
                <dd>
                  {chips.length
                    ? <span className="cid-chip-list">{chips.map((chip) => <span key={chip} className="cid-chip">{chip}</span>)}</span>
                    : <span className="cid-pending">Added as details arrive</span>}
                </dd>
              </div>
            </dl>
          </div>
          <p className="cid-foot">Use saved details for targeted WhatsApp marketing to contacts who have opted in.</p>
        </div>

        <div className="cid-stage" ref={stageRef}>
          <div className="cid-phone">
            <DevicePreviewFrame screenWidth={screenWidth} hideStatusBar>
              <div className="demo-phone-screen" style={{ height: screenHeight }}>
                <div className="demo-screen-content" style={{ transform: `scale(${screenScale})` }}>
                  <div className="demo-status-bar" aria-hidden="true">
                    <FigmaSvgCrop x={0} y={0} width={393} height={42} className="demo-status-art" />
                  </div>
                  <div className="demo-chat-header">
                    <FigmaSvgCrop x={3} y={58} width={22} height={36} className="demo-back-art" />
                    <div className="demo-shop-avatar"><Snowflake size={14} strokeWidth={2.2} aria-hidden="true" /></div>
                    <div className="demo-shop-name"><strong>{BUSINESS}</strong><small>{typing === 'bot' ? 'typing...' : 'tap here for contact info'}</small></div>
                    <FigmaSvgCrop x={288} y={58} width={88} height={36} className="demo-header-actions-art" />
                  </div>
                  <div
                    ref={chatRef}
                    className="demo-chat-body cid-chat"
                    role="log"
                    aria-live={running ? 'polite' : 'off'}
                    aria-label={`Illustrative WhatsApp conversation between a customer and ${BUSINESS}`}
                    data-testid="chat-demo-transcript"
                    tabIndex={0}
                  >
                    <FigmaSvgCrop x={146} y={280} width={101} height={21} className="demo-date-art" />
                    {script.slice(0, count).map((m, i) => (
                      <div
                        key={i}
                        className={`demo-message ${m.from === 'customer' ? 'from-customer' : 'from-business'}${reduced ? '' : ' message-appear'}`}
                        data-testid={`chat-demo-message-${i}`}
                        role="group"
                        aria-label={m.from === 'customer' ? 'Customer message' : `${BUSINESS} message`}
                      >
                        {m.from === 'bot' && <span className="cid-sender">{BUSINESS}</span>}
                        <span className="demo-message-copy">{m.text}</span>
                        {m.from === 'customer'
                          ? <span className="demo-outgoing-meta"><time>{m.time}</time><FigmaReadReceipt /></span>
                          : <span className="demo-incoming-meta"><time>{m.time}</time></span>}
                      </div>
                    ))}
                    {typing && (
                      <div className={`demo-message cid-typing ${typing === 'customer' ? 'from-customer' : 'from-business'}`} aria-hidden="true">
                        <span className="cid-dots"><i /><i /><i /></span>
                      </div>
                    )}
                  </div>
                  <div className="demo-chat-footer">
                    <div aria-hidden="true">
                      <FigmaSvgCrop x={0} y={1625} width={393} height={45} className="demo-composer-art" />
                    </div>
                  </div>
                </div>
              </div>
            </DevicePreviewFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
