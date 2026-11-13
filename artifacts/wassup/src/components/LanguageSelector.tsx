import { useTranslation } from 'react-i18next';
import translateIcon from '../assets/google-translate.svg';
import i18n, { LANGUAGE_STORAGE_KEY, languageOptions, type LanguageCode } from '../i18n';

type LanguageSelectorProps = {
  mobile?: boolean;
};

export default function LanguageSelector({ mobile = false }: LanguageSelectorProps) {
  const { t } = useTranslation();
  const activeLanguage = languageOptions.find(({ code }) => code === i18n.resolvedLanguage) ?? languageOptions[0];

  const handleLanguageChange = (language: string) => {
    const nextLanguage = language as LanguageCode;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // The selected language still applies for this session if storage is unavailable.
    }
    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <label
      className={[
        'language-selector relative inline-flex shrink-0 cursor-pointer items-center transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-[#3acd32]/70',
        mobile
          ? 'h-11 w-full justify-start gap-3 rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold text-black'
          : 'h-10 min-w-[58px] justify-center gap-1.5 rounded-full border border-black/10 bg-white px-2 text-xs font-bold text-black hover:border-[#3acd32]',
      ].join(' ')}
      data-testid={mobile ? 'mobile-language-selector' : 'language-selector'}
    >
      <img src={translateIcon} alt="" aria-hidden="true" className="h-[22px] w-[22px] object-contain" />
      {mobile ? (
        <>
          <span>{t('language.label')}</span>
          <span className="ml-auto text-black/55">{activeLanguage.label}</span>
        </>
      ) : (
        <span aria-hidden="true">{activeLanguage.short}</span>
      )}
      <select
        aria-label={t('language.choose')}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        value={activeLanguage.code}
        onChange={(event) => handleLanguageChange(event.currentTarget.value)}
      >
        {languageOptions.map(({ code, label }) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>
    </label>
  );
}
