import { useEffect, useMemo, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronDown, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  parsePhoneNumber,
  type CountryCode,
} from 'libphonenumber-js';
import { useSubmitDemoRequest } from '@workspace/api-client-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { DevicePreviewFrame } from '@/components/hero/DevicePreview';
import { FigmaSvgCrop } from '@/components/hero/FigmaChrome';
import avatarLogoPath from '../assets/airavata-technologies-mark.svg';
import '@/components/hero/airavata-demo.css';
import './contact-whatsapp-form.css';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const flagEmoji = (country: string) =>
  String.fromCodePoint(...country.split('').map((character) => 127397 + character.charCodeAt(0)));
const countryOptions = getCountries()
  .map((country) => ({
    country,
    name: regionNames.of(country) ?? country,
    dialCode: `+${getCountryCallingCode(country)}`,
    flag: flagEmoji(country),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const createContactFormSchema = (country: CountryCode) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, 'Enter your name.')
      .max(120, 'Name must be 120 characters or fewer.'),
    whatsapp: z
      .string()
      .trim()
      .min(1, 'Enter your mobile number.')
      .max(15, 'Enter a valid mobile number.')
      .regex(/^\d*$/, 'Use digits only for your mobile number.')
      .refine(
        (value) => value === '' || isValidPhoneNumber(value, country),
        'Enter a valid mobile number for the selected country.',
      ),
    email: z
      .string()
      .trim()
      .max(254, 'Email must be 254 characters or fewer.')
      .refine(
        (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        'Enter a valid email address, or leave it blank.',
      ),
    message: z.string().trim().max(1000, 'Message must be 1000 characters or fewer.'),
  });

type ContactFormValues = z.infer<ReturnType<typeof createContactFormSchema>>;

const defaultValues: ContactFormValues = {
  name: '',
  whatsapp: '',
  email: '',
  message: '',
};

export default function ContactWhatsAppForm() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [screenWidth, setScreenWidth] = useState(280);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('IN');
  const [countryPickerOpen, setCountryPickerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sentName, setSentName] = useState('');
  const submitRequest = useSubmitDemoRequest();
  const contactFormSchema = useMemo(
    () => createContactFormSchema(selectedCountry),
    [selectedCountry],
  );
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
    const phoneNumber = parsePhoneNumber(values.whatsapp, selectedCountry);
    if (!phoneNumber?.isValid()) {
      form.setError('whatsapp', {
        type: 'validate',
        message: 'Enter a valid mobile number for the selected country.',
      });
      return;
    }

    try {
      const name = values.name.trim();
      const email = values.email.trim();
      const message = values.message.trim();
      await submitRequest.mutateAsync({
        data: {
          whatsapp: phoneNumber.number,
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          ...(message ? { message } : {}),
        },
      });
      setSentName(name);
      setSubmitted(true);
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
  const activeCountry =
    countryOptions.find((option) => option.country === selectedCountry) ?? countryOptions[0];

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

                {submitted ? (
                  <div className="contact-wa-success-flow" role="status" data-testid="status-contact-sent">
                    <div className="demo-message from-customer contact-wa-message">
                      <span className="demo-message-copy">I’ve shared my details.</span>
                      <span className="demo-outgoing-meta"><time>10:42 AM</time></span>
                    </div>
                    <div className="demo-message from-business contact-wa-message">
                      <span className="contact-wa-sender">AtWassup</span>
                      <span className="demo-message-copy">
                        {sentName
                          ? `Thank you, ${sentName.split(/\s+/)[0]}. `
                          : 'Thank you for reaching out. '}
                        Our support team has received your request and will contact you shortly.
                      </span>
                      <span className="demo-incoming-meta"><time>10:42 AM</time></span>
                    </div>
                    <div className="contact-wa-success-card">
                      <span className="contact-wa-success-check"><Check size={13} strokeWidth={3} /></span>
                      <span>
                        <strong>Request received</strong>
                        <small>Our support team will contact you shortly.</small>
                      </span>
                    </div>
                    <div className="demo-message from-business contact-wa-message contact-wa-followup">
                      <span className="contact-wa-sender">Need help sooner?</span>
                      <span className="demo-message-copy">
                        Call <a href="tel:+919167959756">+91 91679 59756</a> or email{' '}
                        <a href="mailto:info@atwassup.com">info@atwassup.com</a>.
                      </span>
                    </div>
                    <button
                      type="button"
                      className="contact-wa-reset"
                      onClick={() => {
                        setSubmitted(false);
                        setSentName('');
                      }}
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
                        render={({ field, fieldState }) => (
                          <FormItem className="contact-wa-field">
                            <FormLabel className="contact-wa-label">
                              Name <span className="contact-wa-required" aria-hidden="true">*</span>
                              <span className="sr-only"> required</span>
                            </FormLabel>
                            <div className={`contact-wa-input-shell${fieldState.error ? ' has-error' : ''}`}>
                              <FormControl>
                                <Input {...field} required autoComplete="name" placeholder="Your full name" maxLength={120} className="contact-wa-input" data-testid="input-contact-name" />
                              </FormControl>
                              <FormMessage className="sr-only" />
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field, fieldState }) => (
                          <FormItem className="contact-wa-field">
                            <FormLabel className="contact-wa-label">
                              Number <span className="contact-wa-required" aria-hidden="true">*</span>
                              <span className="sr-only"> required</span>
                            </FormLabel>
                            <div className="contact-wa-number-control">
                              <Popover open={countryPickerOpen} onOpenChange={setCountryPickerOpen}>
                                <PopoverTrigger asChild>
                                  <button
                                    type="button"
                                    className="contact-wa-country-trigger"
                                    aria-label={`Country code: ${activeCountry.name} ${activeCountry.dialCode}`}
                                    data-testid="button-contact-country"
                                  >
                                    <span aria-hidden="true">{activeCountry.flag}</span>
                                    <span>{activeCountry.dialCode}</span>
                                    <ChevronDown size={11} aria-hidden="true" />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="contact-wa-country-popover"
                                  align="start"
                                  side="bottom"
                                  sideOffset={4}
                                >
                                  <Command>
                                    <CommandInput
                                      placeholder="Search country or code"
                                      aria-label="Search country or calling code"
                                    />
                                    <CommandList className="contact-wa-country-list">
                                      <CommandEmpty>No country found.</CommandEmpty>
                                      <CommandGroup>
                                        {countryOptions.map((option) => (
                                          <CommandItem
                                            key={option.country}
                                            value={`${option.name} ${option.dialCode} ${option.country}`}
                                            onSelect={() => {
                                              setSelectedCountry(option.country);
                                              setCountryPickerOpen(false);
                                            }}
                                            className="contact-wa-country-option"
                                          >
                                            <span className="contact-wa-country-flag" aria-hidden="true">
                                              {option.flag}
                                            </span>
                                            <span className="contact-wa-country-name">{option.name}</span>
                                            <span className="contact-wa-country-dial">{option.dialCode}</span>
                                            {option.country === selectedCountry && (
                                              <Check size={13} aria-hidden="true" />
                                            )}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <div className={`contact-wa-input-shell${fieldState.error ? ' has-error' : ''}`}>
                                <FormControl>
                                  <Input
                                    {...field}
                                    required
                                    type="tel"
                                    inputMode="numeric"
                                    autoComplete="tel-national"
                                    placeholder="Enter your mobile number"
                                    maxLength={15}
                                    className="contact-wa-input"
                                    data-testid="input-contact-number"
                                    onChange={(event) => field.onChange(event.target.value.replace(/\D/g, '').slice(0, 15))}
                                  />
                                </FormControl>
                                <FormMessage className="sr-only" />
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field, fieldState }) => (
                          <FormItem className="contact-wa-field">
                            <FormLabel className="contact-wa-label">Email</FormLabel>
                            <div className={`contact-wa-input-shell${fieldState.error ? ' has-error' : ''}`}>
                              <FormControl>
                                <Input {...field} type="email" autoComplete="email" placeholder="Enter email or leave blank" maxLength={254} className="contact-wa-input" data-testid="input-contact-email" />
                              </FormControl>
                              <FormMessage className="sr-only" />
                            </div>
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
                              <Textarea {...field} rows={2} maxLength={1000} placeholder="A few words are fine…" className="contact-wa-input contact-wa-textarea" data-testid="input-contact-custom" />
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
