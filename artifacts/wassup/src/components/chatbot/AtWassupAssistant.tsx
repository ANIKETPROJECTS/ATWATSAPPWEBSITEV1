import { type FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubmitDemoRequest } from '@workspace/api-client-react';
import { Check, X } from 'lucide-react';
import assistantIcon from '@assets/AIRAVATA_TECHNOLOGIES_LOGO_(5)_1794762850056.svg';
import whatsappIcon from '@assets/2111774_1794764261230.svg';
import phoneIcon from '@assets/597177_(1)_1794766988189.svg';
import sendIcon from '@assets/10322482_1794765030209.svg';
import brandLogoPath from '../../assets/airavata-technologies-logo.svg';
import i18n, { languageOptions, type LanguageCode } from '../../i18n';
import { assistantCopy, detectAssistantIntent, type AssistantIntent } from './assistant-copy';
import './atwassup-assistant.css';

type ChatMessage = {
  id: number;
  role: 'assistant' | 'visitor';
  text: string;
};

const AUTO_OPEN_DELAY = 8_000;
const AUTO_OPEN_KEY = 'atwassup-assistant-auto-opened';

function getActiveLanguage(resolved: string | undefined): LanguageCode {
  resolved = resolved ?? i18n.language ?? 'en';
  const exactMatch = languageOptions.find(({ code }) => code === resolved);
  if (exactMatch) return exactMatch.code;
  return languageOptions.find(({ code }) => code === resolved.split('-')[0])?.code ?? 'en';
}

function isAutoOpenHandled() {
  try {
    return window.sessionStorage.getItem(AUTO_OPEN_KEY) === 'true';
  } catch {
    return false;
  }
}

function markAutoOpenHandled() {
  try {
    window.sessionStorage.setItem(AUTO_OPEN_KEY, 'true');
  } catch {
    // Session storage can be unavailable in private browsing; keep the widget usable.
  }
}

export default function AtWassupAssistant() {
  const { mutateAsync: submitRequest } = useSubmitDemoRequest();
  const { i18n: translationInstance } = useTranslation();
  const language = getActiveLanguage(translationInstance.resolvedLanguage);
  const copy = assistantCopy[language];
  const isRtl = language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [requestSent, setRequestSent] = useState(false);
  const interactionRef = useRef(false);
  const replyTimeoutRef = useRef<number | null>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const lastQuestionRef = useRef('');

  useEffect(() => {
    if (isAutoOpenHandled()) return;
    const timer = window.setTimeout(() => {
      if (interactionRef.current) return;
      markAutoOpenHandled();
      setIsOpen(true);
    }, AUTO_OPEN_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const list = messageListRef.current;
    if (list) list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping, showContactForm, requestSent]);

  useEffect(() => {
    if (!isOpen || draft || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimatedPlaceholder(copy.input);
      return;
    }

    let index = 0;
    let deleting = false;
    let timeoutId = 0;

    const typeNext = () => {
      if (!deleting) {
        index += 1;
        setAnimatedPlaceholder(copy.input.slice(0, index));
        if (index >= copy.input.length) {
          deleting = true;
          timeoutId = window.setTimeout(typeNext, 1250);
          return;
        }
        timeoutId = window.setTimeout(typeNext, 82);
        return;
      }

      index -= 1;
      setAnimatedPlaceholder(copy.input.slice(0, index));
      if (index <= 0) {
        deleting = false;
        timeoutId = window.setTimeout(typeNext, 480);
        return;
      }
      timeoutId = window.setTimeout(typeNext, 35);
    };

    setAnimatedPlaceholder('');
    timeoutId = window.setTimeout(typeNext, 350);
    return () => window.clearTimeout(timeoutId);
  }, [copy.input, draft, isOpen]);

  useEffect(() => () => {
    if (replyTimeoutRef.current) window.clearTimeout(replyTimeoutRef.current);
  }, []);

  const openAssistant = () => {
    interactionRef.current = true;
    markAutoOpenHandled();
    setIsOpen(true);
  };

  const closeAssistant = () => {
    interactionRef.current = true;
    markAutoOpenHandled();
    setIsOpen(false);
  };

  const answerQuestion = (question: string, forcedIntent?: AssistantIntent) => {
    const normalizedQuestion = question.trim();
    if (!normalizedQuestion || isTyping) return;
    lastQuestionRef.current = normalizedQuestion;
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'visitor', text: normalizedQuestion },
    ]);
    setDraft('');
    setShowContactForm(false);
    setFormError('');
    setIsTyping(true);

    const intent = forcedIntent ?? detectAssistantIntent(normalizedQuestion, language);
    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: Date.now() + 1, role: 'assistant', text: copy.answers[intent] },
      ]);
      setIsTyping(false);
    }, 520);
  };

  const handleSubmitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const whatsapp = String(form.get('whatsapp') ?? '').trim();

    if (!name || !whatsapp) {
      setFormError(copy.contactRequired);
      return;
    }

    setIsSubmitting(true);
    setFormError('');
    try {
      await submitRequest({
        data: {
          name,
          whatsapp,
          message: `Website assistant question: ${lastQuestionRef.current.slice(0, 800)}`,
        },
      });
      setRequestSent(true);
      setShowContactForm(false);
    } catch {
      setFormError(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`atw-assistant${isOpen ? ' is-open' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {isOpen && (
        <section
          className="atw-assistant-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="atw-assistant-title"
          data-testid="panel-site-assistant"
        >
          <header className="atw-assistant-header">
            <div className="atw-assistant-brand">
              <h2 id="atw-assistant-title" className="sr-only">{copy.title}</h2>
              <svg
                aria-label="AtWassup"
                className="atw-assistant-header-logo"
                role="img"
                viewBox="0 155 375 80"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <clipPath id="atw-assistant-header-logo-clip" clipPathUnits="userSpaceOnUse">
                    <path d="M0 155H95V235H0Z M98 160H323V205H98Z M323 160H366V224H323Z" />
                  </clipPath>
                </defs>
                <image
                  clipPath="url(#atw-assistant-header-logo-clip)"
                  height="375"
                  href={brandLogoPath}
                  width="375"
                  x="0"
                  y="0"
                />
              </svg>
            </div>
            <div className="atw-assistant-header-actions">
              <a
                href="https://wa.me/919167959756"
                target="_blank"
                rel="noreferrer"
                className="atw-assistant-header-contact"
                aria-label={copy.whatsappContact}
                data-testid="assistant-header-whatsapp"
              >
                <img src={whatsappIcon} alt="" aria-hidden="true" />
              </a>
              <a
                href="tel:+919167959756"
                className="atw-assistant-header-contact"
                aria-label={copy.callContact}
                data-testid="assistant-header-call"
              >
                <img src={phoneIcon} alt="" aria-hidden="true" />
              </a>
              <button
                type="button"
                className="atw-assistant-close"
                onClick={closeAssistant}
                aria-label={copy.close}
                data-testid="button-close-site-assistant"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          <div className="atw-assistant-messages" ref={messageListRef} aria-live="polite">
            <div className="atw-assistant-welcome">
              <p>{copy.greeting}</p>
            </div>
            {messages.map((message) => (
              <div
                className={`atw-assistant-message ${message.role === 'visitor' ? 'from-visitor' : 'from-assistant'}`}
                key={message.id}
                data-testid={`assistant-message-${message.role}-${message.id}`}
              >
                {message.text}
              </div>
            ))}
            {messages.length === 0 && !showContactForm && (
              <div className="atw-assistant-suggestions">
                {copy.suggestions.map((suggestion, index) => {
                  const action = (['pricing', 'features', 'contact'] as const)[index];
                  return (
                    <button
                      type="button"
                      key={action}
                      onClick={() => {
                        if (action === 'contact') {
                          lastQuestionRef.current = suggestion;
                          setShowContactForm(true);
                          setFormError('');
                        } else {
                          answerQuestion(suggestion, action);
                        }
                      }}
                      data-testid={`assistant-suggestion-${action}`}
                    >
                      {suggestion}
                    </button>
                  );
                })}
              </div>
            )}
            {isTyping && (
              <div className="atw-assistant-typing" aria-label={copy.typing}>
                <span /><span /><span />
              </div>
            )}
            {messages.length > 0 && !isTyping && !requestSent && (
              <button
                type="button"
                className="atw-assistant-contact-cta"
                onClick={() => { setShowContactForm(true); setFormError(''); }}
                data-testid="button-assistant-contact"
              >
                {copy.requestFollowup}
              </button>
            )}
            {showContactForm && !requestSent && (
              <form className="atw-assistant-contact-form" onSubmit={handleSubmitContact} data-testid="form-assistant-contact">
                <p>{copy.contactIntro}</p>
                <input name="name" required maxLength={120} autoComplete="name" placeholder={copy.name} aria-label={copy.name} />
                <input name="whatsapp" type="tel" required maxLength={40} autoComplete="tel" placeholder={copy.whatsapp} aria-label={copy.whatsapp} />
                {formError && <p className="atw-assistant-form-error" role="alert">{formError}</p>}
                <button type="submit" disabled={isSubmitting} data-testid="button-assistant-submit">
                  {isSubmitting ? copy.sending : copy.submit}
                </button>
              </form>
            )}
            {requestSent && (
              <div className="atw-assistant-success" role="status" data-testid="assistant-contact-success">
                <Check size={17} aria-hidden="true" />
                <span>{copy.success}</span>
              </div>
            )}
          </div>

          {!showContactForm && !requestSent && (
            <form
              className="atw-assistant-composer"
              onSubmit={(event) => { event.preventDefault(); answerQuestion(draft); }}
            >
              <input
                value={draft}
                onChange={(event) => setDraft(event.currentTarget.value)}
                maxLength={500}
                placeholder={animatedPlaceholder}
                aria-label={copy.input}
                data-testid="input-assistant-question"
              />
              <button type="submit" aria-label={copy.send} disabled={!draft.trim() || isTyping} data-testid="button-assistant-send">
                <img src={sendIcon} alt="" aria-hidden="true" />
              </button>
            </form>
          )}
        </section>
      )}

      <button
        type="button"
        className="atw-assistant-trigger"
        onClick={isOpen ? closeAssistant : openAssistant}
        aria-label={isOpen ? copy.close : copy.title}
        aria-expanded={isOpen}
        data-testid="button-open-site-assistant"
      >
        <img src={assistantIcon} alt="" aria-hidden="true" />
      </button>
    </div>
  );
}
