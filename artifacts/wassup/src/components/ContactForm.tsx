import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, Send } from 'lucide-react';
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

const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(120),
  email: z.string().trim().email('Enter a valid email address.').max(254),
  company: z.string().max(160),
  whatsapp: z.string().max(40),
  interest: z.string().min(1, 'Choose a topic.').max(100),
  message: z.string().trim().min(10, 'Please add a little more detail.').max(1000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const fieldClassName =
  'h-12 rounded-xl border-black/10 bg-[#fafbf8] px-4 text-sm shadow-none placeholder:text-black/35 focus-visible:border-[#3acd32] focus-visible:ring-[#3acd32]/25';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const submitRequest = useSubmitDemoRequest();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      whatsapp: '',
      interest: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setErrorMessage('');
    try {
      await submitRequest.mutateAsync({
        data: {
          name: values.name.trim(),
          email: values.email.trim(),
          ...(values.company.trim() ? { company: values.company.trim() } : {}),
          ...(values.whatsapp.trim() ? { whatsapp: values.whatsapp.trim() } : {}),
          interest: values.interest,
          message: values.message.trim(),
        },
      });
      form.reset();
      setSent(true);
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
          : undefined;
      setErrorMessage(
        serverMessage ?? "We couldn't send your message right now. Please try again.",
      );
    }
  };

  if (sent) {
    return (
      <div
        className="flex min-h-[500px] flex-col items-center justify-center rounded-[28px] bg-white p-8 text-center shadow-[0_24px_70px_rgba(0,0,0,.14)] sm:p-12"
        role="status"
        data-testid="status-contact-success"
      >
        <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#3acd32] text-black">
          <Check size={30} />
        </span>
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-black/45">
          MESSAGE SENT
        </p>
        <h3 className="mt-3 font-display text-3xl font-bold tracking-[-.05em] sm:text-4xl">
          Thanks for reaching out.
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/55">
          Your inquiry has been sent to the AtWassup team. We’ll follow up using the contact details you provided.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-sm font-bold transition hover:bg-black hover:text-white"
          data-testid="button-contact-send-another"
        >
          Send another message <ArrowRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] bg-white p-5 shadow-[0_24px_70px_rgba(0,0,0,.14)] sm:p-8">
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#3acd32] text-black">
          <Send size={18} />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-black/45">
            CONTACT ATWASSUP
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold tracking-[-.05em] sm:text-3xl">
            Tell us how we can help.
          </h3>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate data-testid="form-contact">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-semibold text-black/70">Full name *</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="name" placeholder="Your name" maxLength={120} className={fieldClassName} data-testid="input-contact-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-semibold text-black/70">Work email *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" autoComplete="email" placeholder="you@company.com" maxLength={254} className={fieldClassName} data-testid="input-contact-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-semibold text-black/70">Company</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="organization" placeholder="Your business name" maxLength={160} className={fieldClassName} data-testid="input-contact-company" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-xs font-semibold text-black/70">WhatsApp number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" autoComplete="tel" placeholder="+91 90000 00000" maxLength={40} className={fieldClassName} data-testid="input-contact-whatsapp" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-xs font-semibold text-black/70">What are you interested in? *</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className={`${fieldClassName} w-full appearance-none`}
                    data-testid="select-contact-interest"
                  >
                    <option value="">Choose a topic</option>
                    <option value="WhatsApp Business API setup">WhatsApp Business API setup</option>
                    <option value="AI chatbot">AI chatbot</option>
                    <option value="WhatsApp Flows">WhatsApp Flows</option>
                    <option value="Campaigns and integrations">Campaigns and integrations</option>
                    <option value="Other">Something else</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-xs font-semibold text-black/70">How can we help? *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={4}
                    maxLength={1000}
                    placeholder="Tell us a little about your business and what you need."
                    className="min-h-[112px] resize-y rounded-xl border-black/10 bg-[#fafbf8] px-4 py-3 text-sm shadow-none placeholder:text-black/35 focus-visible:border-[#3acd32] focus-visible:ring-[#3acd32]/25"
                    data-testid="input-contact-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              data-testid="error-contact-submit"
            >
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col gap-3 border-t border-black/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-relaxed text-black/45">
              We’ll follow up using the contact details you share.
            </p>
            <button
              type="submit"
              disabled={submitRequest.isPending}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-bold text-white transition hover:bg-[#3acd32] hover:text-black disabled:cursor-wait disabled:opacity-60"
              data-testid="button-contact-submit"
            >
              {submitRequest.isPending ? 'Sending…' : 'Send inquiry'}
              {!submitRequest.isPending && <ArrowRight size={16} />}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
