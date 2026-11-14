import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, Check, ExternalLink, Lock, Stethoscope, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DevicePreviewFrame } from '@/components/hero/DevicePreview';
import { FigmaReadReceipt, FigmaSvgCrop } from '@/components/hero/FigmaChrome';
import '@/components/hero/airavata-demo.css';
import './clinic-appointment-demo.css';

// Illustrative marketing animation only. Clinic, patient, number and doctors are fictional
// placeholders; nothing is booked, stored or sent anywhere.
const CLINIC = 'Everwell Clinic';

const stages = [
  { id: 'ask', ms: 1800 },
  { id: 'botTyping', ms: 1200 },
  { id: 'cta', ms: 2200 },
  { id: 'press', ms: 900 },
  { id: 'formOpen', ms: 1600 },
  { id: 'fillName', ms: 2000 },
  { id: 'fillType', ms: 2000 },
  { id: 'next', ms: 900 },
  { id: 'screen2', ms: 1400 },
  { id: 'fillDoctor', ms: 2200 },
  { id: 'fillDate', ms: 2000 },
  { id: 'fillSlot', ms: 2200 },
  { id: 'submitting', ms: 1400 },
  { id: 'received', ms: 2800 },
  { id: 'ackTyping', ms: 1100 },
  { id: 'ack', ms: 2800 },
  { id: 'question', ms: 2000 },
  { id: 'answerTyping', ms: 1100 },
  { id: 'answer', ms: 5200 },
] as const;

type StageId = (typeof stages)[number]['id'];
const S = Object.fromEntries(stages.map((s, i) => [s.id, i])) as Record<StageId, number>;
const LAST = stages.length - 1;

export default function ClinicAppointmentDemo() {
  const { t, i18n } = useTranslation();
  const phoneTextDirection = i18n.language === 'ar' ? 'rtl' : 'ltr';
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const [screenWidth, setScreenWidth] = useState(280);
  const [reduced, setReduced] = useState(false);
  const [si, setSi] = useState(0);
  const [inView, setInView] = useState(false);
  const [docVisible, setDocVisible] = useState(true);
  const booking = {
    patient: 'Ananya Sharma',
    phone: '+91 90000 00000',
    visitType: t('clinic.form.visit.new'),
    doctor: 'Dr. Kavya Rao',
    specialty: t('clinic.form.specialty.general'),
    date: t('clinic.form.date.tomorrow'),
    time: '11:30 AM',
    ref: 'EW-2087',
  };
  const visitTypes = [t('clinic.form.visit.new'), t('clinic.form.visit.followup')];
  const doctors = [
    { name: 'Dr. Kavya Rao', specialty: t('clinic.form.specialty.general') },
    { name: 'Dr. Arjun Menon', specialty: t('clinic.form.specialty.pediatrics') },
  ];
  const dates = [
    { label: t('clinic.form.date.today'), full: true },
    { label: t('clinic.form.date.tomorrow'), full: false },
    { label: t('clinic.form.date.inTwoDays'), full: false },
  ];
  const slots = [
    { label: '10:30 AM', full: false },
    { label: '11:30 AM', full: false },
    { label: '12:30 PM', full: true },
    { label: '4:00 PM', full: false },
  ];

  useEffect(() => {
    if (window.location.hash !== '#flow-builder') return;
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
      if (q.matches) setSi(LAST);
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
    const t = window.setTimeout(() => setSi((c) => (c >= LAST ? 0 : c + 1)), stages[si].ms);
    return () => window.clearTimeout(t);
  }, [running, si]);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    el.scrollTo({ top: si === 0 ? 0 : el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [si, reduced]);

  const formOpen = !reduced && si >= S.formOpen && si <= S.submitting;
  const screen: 1 | 2 = si >= S.screen2 ? 2 : 1;
  const has = {
    name: si >= S.fillName,
    type: si >= S.fillType,
    doctor: si >= S.fillDoctor,
    date: si >= S.fillDate,
    slot: si >= S.fillSlot,
  };
  const active = si === S.fillName ? 'name' : si === S.fillType ? 'type' : si === S.fillDoctor ? 'doctor' : si === S.fillDate ? 'date' : si === S.fillSlot ? 'slot' : null;
  const received = si >= S.received;
  const botTyping = si === S.botTyping || si === S.ackTyping || si === S.answerTyping;
  const tab = (on: boolean) => (on ? 0 : -1);

  const openForm = () => setSi(S.formOpen);
  const closeForm = () => setSi(S.cta);
  const goNext = () => { if (has.type) setSi(S.screen2); };
  const goBack = () => setSi(S.fillType);
  const submitForm = () => { if (has.slot) setSi(S.submitting); };

  const screenScale = screenWidth / 252;
  const screenHeight = Math.round(524 * screenScale);

  const outcomes = [
    { text: t('clinic.outcome.shared'), on: si >= S.cta },
    { text: t('clinic.outcome.pick'), on: si >= S.fillSlot },
    { text: t('clinic.outcome.received'), on: received },
    { text: t('clinic.outcome.followup'), on: si >= S.answer },
  ];
  const current = outcomes.reduce((acc, o, i) => (o.on ? i : acc), -1);

  const waiting = !received && (formOpen
    ? t(screen === 1 ? 'clinic.wait.patientDetails' : 'clinic.wait.appointmentDetails')
    : si >= S.cta ? t('clinic.wait.patient') : t('clinic.wait.booking'));

  const receipt = [
    { label: t('clinic.receipt.patient'), value: booking.patient },
    { label: t('clinic.receipt.whatsapp'), value: booking.phone },
    { label: t('clinic.receipt.visit'), value: booking.visitType },
    { label: t('clinic.receipt.doctor'), value: booking.doctor, sub: booking.specialty },
    { label: t('clinic.receipt.date'), value: booking.date },
    { label: t('clinic.receipt.time'), value: booking.time },
  ];

  return (
    <section
      ref={sectionRef}
      id="flow-builder"
      aria-labelledby="flow-builder-heading"
      data-testid="section-flow-builder"
      className="flow-builder-section caf-section"
    >
      <div className="section-shell caf-grid" dir="ltr">
        <div className="caf-stage" ref={stageRef} dir="ltr">
          <div className="caf-phone">
            <DevicePreviewFrame
              screenWidth={screenWidth}
              hideStatusBar
              frameColor="#151922"
            >
              <div className="demo-phone-screen" style={{ height: screenHeight }}>
                <div className="demo-screen-content" dir="ltr" style={{ transform: `scale(${screenScale})` }}>
                  <div className="demo-status-bar" aria-hidden="true">
                    <FigmaSvgCrop x={0} y={0} width={393} height={42} className="demo-status-art" />
                  </div>
                  <div className="demo-chat-header">
                    <FigmaSvgCrop x={3} y={58} width={22} height={36} className="demo-back-art" />
                    <div className="demo-shop-avatar"><Stethoscope size={14} strokeWidth={2.2} aria-hidden="true" /></div>
                    <div className="demo-shop-name"><strong>{CLINIC}</strong><small dir="auto">{botTyping ? t('demo.typing') : t('demo.contactInfo')}</small></div>
                    <FigmaSvgCrop x={288} y={58} width={88} height={36} className="demo-header-actions-art" />
                  </div>

                  <div
                    ref={chatRef}
                    className="demo-chat-body caf-chat"
                    role="log"
                    aria-label={t('clinic.demo.conversationAria', { clinic: CLINIC })}
                    data-testid="flow-demo-transcript"
                    tabIndex={0}
                  >
                    <span className="demo-date-pill" dir="auto">{t('demo.today')}</span>

                    <Bubble from="patient" time="10:40 AM" testId="flow-stage-ask" reduced={reduced}>
                      {t('clinic.demo.ask')}
                    </Bubble>

                    {si >= S.cta && (
                      <div className={`demo-message from-business caf-cta-msg${reduced ? '' : ' message-appear'}`} role="group" aria-label={t('demo.businessMessage', { business: CLINIC })} data-testid="flow-stage-cta">
                        <span className="caf-sender">{CLINIC}</span>
                        <span className="demo-message-copy" dir="auto">{t('clinic.demo.invite')}</span>
                        <span className="demo-incoming-meta"><time>10:40 AM</time></span>
                        <button
                          type="button"
                          className={`caf-cta${si === S.press ? ' is-pressed' : ''}`}
                          onClick={openForm}
                          disabled={formOpen || received}
                          data-testid="button-flow-open-form"
                        >
                          <ExternalLink size={10} aria-hidden="true" /> {t('clinic.demo.book')}
                        </button>
                      </div>
                    )}

                    {received && (
                      <div className={`demo-message from-customer caf-response${reduced ? '' : ' message-appear'}`} role="group" aria-label={t('clinic.demo.patientResponseAria')} data-testid="flow-stage-submitted">
                        <span className="caf-response-title"><Check size={9} strokeWidth={3} aria-hidden="true" /> {t('clinic.demo.formSubmitted')}</span>
                        <span className="demo-message-copy" dir="auto">{booking.doctor}, {booking.date.toLocaleLowerCase()}, {booking.time}</span>
                        <span className="demo-outgoing-meta"><time>10:41 AM</time><FigmaReadReceipt /></span>
                      </div>
                    )}

                    {si >= S.ack && (
                      <Bubble from="clinic" time="10:41 AM" testId="flow-stage-ack" reduced={reduced}>
                        {t('clinic.demo.confirmation', { name: booking.patient, doctor: booking.doctor, date: booking.date.toLocaleLowerCase(), time: booking.time, ref: booking.ref })}
                      </Bubble>
                    )}
                    {si >= S.question && (
                      <Bubble from="patient" time="10:42 AM" testId="flow-stage-question" reduced={reduced}>
                        {t('clinic.demo.question')}
                      </Bubble>
                    )}
                    {si >= S.answer && (
                      <Bubble from="clinic" time="10:42 AM" testId="flow-stage-answer" reduced={reduced}>
                        {t('clinic.demo.answer')}
                      </Bubble>
                    )}

                    {botTyping && (
                      <div className="demo-message from-business caf-typing" aria-hidden="true"><span className="caf-dots"><i /><i /><i /></span></div>
                    )}
                  </div>

                  <div className="demo-chat-footer">
                    <div aria-hidden="true">
                      <FigmaSvgCrop x={0} y={1625} width={393} height={45} className="demo-composer-art" />
                    </div>
                  </div>

                  <div
                    className={`caf-sheet${formOpen ? ' is-open' : ''}`}
                    role="dialog"
                    aria-label={t('clinic.form.aria')}
                    aria-hidden={!formOpen}
                    data-testid="flow-form"
                    data-screen={screen}
                    dir={phoneTextDirection}
                  >
                    <div className="caf-sheet-head">
                      {screen === 2
                        ? <button type="button" onClick={goBack} aria-label={t('clinic.form.back')} tabIndex={tab(formOpen)} data-testid="button-flow-back"><ArrowLeft size={12} /></button>
                        : <button type="button" onClick={closeForm} aria-label={t('clinic.form.close')} tabIndex={tab(formOpen)} data-testid="button-flow-close-form"><X size={12} /></button>}
                      <div className="caf-sheet-title">
                        <strong>{screen === 1 ? t('clinic.form.patientDetails') : t('clinic.form.appointmentDetails')}</strong>
                        <small>{CLINIC}</small>
                      </div>
                      <span className="caf-step">{screen}/2</span>
                    </div>
                    <div className="caf-progress" aria-hidden="true"><i style={{ transform: `scaleX(${screen === 1 ? 0.5 : 1})` }} /></div>

                    <div className="caf-screens">
                       <div className={`caf-screen${screen === 1 ? ' is-current' : ' is-left'}`} aria-hidden={screen !== 1} data-testid="flow-form-screen-1">
                        <p className="caf-help">{t('clinic.form.tellWho')}</p>

                        <div className={`caf-q${active === 'name' ? ' is-active' : ''}`} data-testid="flow-field-patient">
                          <span className="caf-q-label">{t('clinic.form.fullName')}</span>
                          <span className={`caf-text${has.name ? ' has-value' : ''}`}>
                            <span key={String(has.name)}>{has.name ? booking.patient : t('clinic.form.enterName')}</span>
                            {active === 'name' && <i className="caf-caret" aria-hidden="true" />}
                          </span>
                        </div>

                        <div className="caf-q" data-testid="flow-field-phone">
                          <span className="caf-q-label">{t('clinic.form.whatsapp')}</span>
                          <span className="caf-text has-value is-locked">
                            <span>{booking.phone}</span>
                            <Lock size={9} aria-hidden="true" />
                          </span>
                          <span className="caf-note">{t('clinic.form.addedFromChat')}</span>
                        </div>

                        <div className={`caf-q${active === 'type' ? ' is-active' : ''}`} data-testid="flow-field-visit-type">
                          <span className="caf-q-label">{t('clinic.form.visitType')}</span>
                          <div className="caf-options">
                            {visitTypes.map((v) => (
                              <span key={v} className={`caf-option${(has.type || active === 'type') && v === booking.visitType ? ' is-on' : ''}`}>
                                <i className="caf-radio" aria-hidden="true" />{v}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                       <div className={`caf-screen${screen === 2 ? ' is-current' : ' is-right'}`} aria-hidden={screen !== 2} data-testid="flow-form-screen-2">
                        <p className="caf-help">{t('clinic.form.pickDoctor')}</p>

                        <div className={`caf-q${active === 'doctor' ? ' is-active' : ''}`} data-testid="flow-field-doctor">
                          <span className="caf-q-label">{t('clinic.form.doctor')}</span>
                          <div className="caf-options">
                            {doctors.map((d) => (
                              <span key={d.name} className={`caf-option caf-doctor${(has.doctor || active === 'doctor') && d.name === booking.doctor ? ' is-on' : ''}`}>
                                <i className="caf-radio" aria-hidden="true" />
                                <span><b>{d.name}</b><small>{d.specialty}</small></span>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={`caf-q${active === 'date' ? ' is-active' : ''}`} data-testid="flow-field-date">
                          <span className="caf-q-label">{t('clinic.form.day')}</span>
                          <div className="caf-chips">
                            {dates.map((d) => (
                              <span key={d.label} className={`caf-chip${d.full ? ' is-full' : ''}${(has.date || active === 'date') && d.label === booking.date ? ' is-on' : ''}`}>
                                {d.label}{d.full && <small>{t('clinic.form.full')}</small>}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className={`caf-q${active === 'slot' ? ' is-active' : ''}`} data-testid="flow-field-time">
                          <span className="caf-q-label">{t('clinic.form.availableSlots')}</span>
                          <div className="caf-chips caf-slots">
                            {slots.map((s) => (
                              <span key={s.label} className={`caf-chip${s.full ? ' is-full' : ''}${(has.slot || active === 'slot') && s.label === booking.time ? ' is-on' : ''}`}>
                                {s.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="caf-sheet-foot">
                      {screen === 1 ? (
                        <button
                          type="button"
                          className={`caf-submit${si === S.next ? ' is-pressed' : ''}`}
                          onClick={goNext}
                          disabled={!has.type}
                          tabIndex={tab(formOpen)}
                          data-testid="button-flow-next"
                        >
                          {t('clinic.form.next')}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={`caf-submit${si === S.submitting ? ' is-pressed' : ''}`}
                          onClick={submitForm}
                          disabled={!has.slot || si === S.submitting}
                          tabIndex={tab(formOpen)}
                          data-testid="button-flow-submit"
                        >
                          {si === S.submitting ? t('clinic.form.submitting') : t('clinic.form.submit')}
                        </button>
                      )}
                      <small>{t('clinic.form.managedBy', { clinic: CLINIC })}</small>
                    </div>
                  </div>
                </div>
              </div>
            </DevicePreviewFrame>
          </div>
        </div>

        <div className="caf-copy" dir={phoneTextDirection}>
          <p className="caf-eyebrow"><span aria-hidden="true" />{t('clinic.eyebrow')}</p>
          <h2 id="flow-builder-heading" className="font-display caf-title">
            {t('clinic.title.first')} <em>{t('clinic.title.second')}</em>
          </h2>
          <p className="caf-lede">{t('clinic.description')}</p>

          <ul className="caf-outcomes" data-testid="flow-outcomes">
            {outcomes.map((o, i) => (
              <li key={o.text} className={`${o.on ? 'is-on' : ''}${!reduced && i === current ? ' is-current' : ''}`}>
                <span className="caf-tick" aria-hidden="true"><Check size={11} strokeWidth={3} /></span>
                {o.text}
              </li>
            ))}
          </ul>

          <div className="caf-inbox" data-testid="flow-received-record" aria-live="polite">
            {received ? (
              <div className="caf-receipt" key="receipt">
                <div className="caf-receipt-head">
                  <span className="caf-receipt-kicker">{t('clinic.receipt.title')}</span>
                  <span className="caf-ref">{booking.ref}</span>
                </div>
                <dl className="caf-receipt-grid">
                  {receipt.map((r) => (
                    <div key={r.label} className="caf-cell" data-testid={`flow-received-${r.label.toLowerCase()}`}>
                      <dt>{r.label}</dt>
                      <dd>{r.value}{r.sub && <small>{r.sub}</small>}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <p className="caf-waiting" key="waiting" data-testid="status-flow-received">
                <span className="caf-waiting-dots" aria-hidden="true"><i /><i /><i /></span>
                {waiting}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ from, time, testId, reduced, children }: { from: 'patient' | 'clinic'; time: string; testId: string; reduced: boolean; children: ReactNode }) {
  const { t } = useTranslation();
  const isPatient = from === 'patient';
  return (
    <div
      className={`demo-message ${isPatient ? 'from-customer' : 'from-business'}${reduced ? '' : ' message-appear'}`}
      role="group"
      aria-label={isPatient ? t('clinic.demo.patientMessageAria') : t('demo.businessMessage', { business: CLINIC })}
      data-testid={testId}
    >
      {!isPatient && <span className="caf-sender">{CLINIC}</span>}
      <span className="demo-message-copy" dir="auto">{children}</span>
      {isPatient
        ? <span className="demo-outgoing-meta"><time>{time}</time><FigmaReadReceipt /></span>
        : <span className="demo-incoming-meta"><time>{time}</time></span>}
    </div>
  );
}
