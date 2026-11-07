import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSubmitDemoRequest } from '@workspace/api-client-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DevicePreviewFrame } from '@/components/hero/DevicePreview';
import { FigmaSvgCrop } from '@/components/hero/FigmaChrome';
import avatarLogoPath from '../assets/airavata-technologies-mark.svg';
import '@/components/hero/airavata-demo.css';
import './contact-whatsapp-form.css';

const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(120),
  whatsapp: z
    .string()
    .trim()
    .min(8, 'Enter your WhatsApp number.')
    .max(40, 'Enter a valid mobile number.')
    .refine((value) => {
      const normalized = value.replace(/[\s()-]/g, '');
      return /^\+?[1-9]\d{7,14}$/.test(normalized);
    }, 'Enter a valid mobile number with 8–15 digits.'),
  email: z
    .string()
    .trim()
    .email('Enter a valid email address, such as name@example.com.')
    .max(254, 'Email must be 254 characters or fewer.'),
  message: z.string().trim().min(10, 'Add a little more detail.').max(1000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultValues: ContactFormValues = {
  name: '',
  whatsapp: '',
  email: '',
  message: '',
};

export default function ContactWhatsAppForm() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(280);
  const [sentName, setSentName] = useState('');
  const submitRequest = useSubmitDemoRequest();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (window.location.hash !== '#contact') return;
    const frame = requestAnimationFrame(() => {
      document.getElementById('contact')?.scrollIntoView({
        block: 'start',
        behavior: 'instant',
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const update = () => {
      const availableWidth = stage.clientWidth - 28;
      const fitHeight = Math.floor((window.innerHeight - 50) / (19.5 / 9 + 20 / 390));
      setScreenWidth(Math.max(220, Math.min(340, availableWidth, fitHeight)));
    };
    const observer = new ResizeObserver(update);
    observer.observe(stage);
    window.addEventListener('resize', update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await submitRequest.mutateAsync({
        data: {
          name: values.name.trim(),
          whatsapp: values.whatsapp.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        },
      });
      setSentName(values.name.trim());
      form.reset(defaultValues);
    } catch (error) {
      const errorData =
        typeof error === 'object' && error !== null && 'data' in error
          ? (error as { data?: unknown }).data
          : undefined;
      const serverMessage =
        typeof errorData === 'object' &&
        errorData !== null &&
        'error' in errorData &&
        typeof errorData.error === 'string'
          ? errorData.error
          : "We couldn't send your details right now. Please try again.";
      form.setError('root', { message: serverMessage });
    }
  };

  const screenScale = screenWidth / 252;
  const screenHeight = Math.round(524 * screenScale);

  return (
    <div className="contact-wa-stage" ref={stageRef} data-testid="contact-whatsapp-preview">
      <div className="contact-wa-orbit" aria-hidden="true" />
      <div className="contact-wa-device">
        <DevicePreviewFrame screenWidth={screenWidth} hideStatusBar>
          <div className="demo-phone-screen" style={{ height: screenHeight }}>
            <div className="demo-screen-content" style={{ transform: `scale(${screenScale})` }}>
              <div className="demo-status-bar" aria-hidden="true">
                <FigmaSvgCrop x={0} y={0} width={393} height={42} className="demo-status-art" />
              </div>
              <div className="demo-chat-header">
                <FigmaSvgCrop x={3} y={58} width={22} height={36} className="demo-back-art" />
                <div className="demo-shop-avatar contact-wa-avatar">
                  <img src={avatarLogoPath} alt="" className="contact-wa-avatar-image" />
                </div>
                <div className="demo-shop-name">
                  <strong>AtWassup</strong>
                  <small>business account</small>
                </div>
                <FigmaSvgCrop x={288} y={58} width={88} height={36} className="demo-header-actions-art" />
              </div>

              <div
                className="demo-chat-body contact-wa-chat"
                role="log"
                aria-label="WhatsApp contact conversation with the AtWassup chatbot"
                data-testid="contact-whatsapp-chat"
              >
                <FigmaSvgCrop x={146} y={280} width={101} height={21} className="demo-date-art" />
                <div className="demo-message from-business contact-wa-message">
                  <span className="contact-wa-sender">AtWassup</span>
                  <span className="demo-message-copy">Happy to help. Share a few details and our team will follow up with you.</span>
                  <span className="demo-incoming-meta"><time>10:41 AM</time></span>
                </div>

                {sentName ? (
                  <div className="contact-wa-success-flow" role="status" data-testid="status-contact-sent">
                    <div className="demo-message from-customer contact-wa-message">
                      <span className="demo-message-copy">I’ve shared my details.</span>
                      <span className="demo-outgoing-meta"><time>10:42 AM</time></span>
                    </div>
                    <div className="demo-message from-business contact-wa-message">
                      <span className="contact-wa-sender">AtWassup</span>
                      <span className="demo-message-copy">
                        Thanks, {sentName.split(/\s+/)[0]}! Your inquiry is with our team. We’ll reach out soon.
                      </span>
                      <span className="demo-incoming-meta"><time>10:42 AM</time></span>
                    </div>
                    <div className="contact-wa-success-card">
                      <span className="contact-wa-success-check"><Check size={13} strokeWidth={3} /></span>
                      <span><strong>Details sent</strong><small>We’ll be in touch shortly.</small></span>
                    </div>
                    <button
                      type="button"
                      className="contact-wa-reset"
                      onClick={() => setSentName('')}
                      data-testid="button-contact-start-again"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      className="contact-wa-form-card"
                      onSubmit={form.handleSubmit(onSubmit)}
                      noValidate
                      data-testid="form-contact-whatsapp"
                    >
                      <div className="contact-wa-card-heading">
                        <strong>Contact Form</strong>
                      </div>

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="contact-wa-field">
                            <FormLabel className="contact-wa-label">Name</FormLabel>
                            <FormControl>
                              <Input {...field} required autoComplete="name" placeholder="Your full name" maxLength={120} className="contact-wa-input" data-testid="input-contact-name" />
                            </FormControl>
                            <FormMessage className="contact-wa-error" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem className="contact-wa-field">
                            <FormLabel className="contact-wa-label">Number</FormLabel>
                            <FormControl>
                              <Input {...field} required type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 90000 00000" maxLength={40} className="contact-wa-input" data-testid="input-contact-number" />
                            </FormControl>
                            <FormMessage className="contact-wa-error" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="contact-wa-field">
                            <FormLabel className="contact-wa-label">Email</FormLabel>
                            <FormControl>
                              <Input {...field} required type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} className="contact-wa-input" data-testid="input-contact-email" />
                            </FormControl>
                            <FormMessage className="contact-wa-error" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="contact-wa-field">
                            <FormLabel className="contact-wa-label">What can we help with?</FormLabel>
                            <FormControl>
                              <Textarea {...field} required rows={2} maxLength={1000} placeholder="Tell us what you need…" className="contact-wa-input contact-wa-textarea" data-testid="input-contact-custom" />
                            </FormControl>
                            <FormMessage className="contact-wa-error" />
                          </FormItem>
                        )}
                      />

                      {form.formState.errors.root?.message && (
                        <p className="contact-wa-submit-error" role="alert" data-testid="error-contact-submit">
                          {form.formState.errors.root.message}
                        </p>
                      )}

                      <button
                        type="submit"
                        className="contact-wa-submit"
                        disabled={submitRequest.isPending}
                        data-testid="button-contact-submit"
                      >
                        <Send size={10} aria-hidden="true" />
                        {submitRequest.isPending ? 'Sending…' : 'Send details'}
                      </button>
                    </form>
                  </Form>
                )}
              </div>

              <div className="demo-chat-footer" aria-hidden="true">
                <FigmaSvgCrop x={0} y={1625} width={393} height={45} className="demo-composer-art" />
              </div>
            </div>
          </div>
        </DevicePreviewFrame>
      </div>
    </div>
  );
}
