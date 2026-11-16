import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import translateIcon from '../assets/google-translate.svg';
import i18n, { LANGUAGE_STORAGE_KEY, languageOptions, type LanguageCode } from '../i18n';

type LanguageSelectorProps = {
  mobile?: boolean;
};

export default function LanguageSelector({ mobile = false }: LanguageSelectorProps) {
  const { t } = useTranslation();
  const activeLanguage = languageOptions.find(({ code }) => code === i18n.resolvedLanguage) ?? languageOptions[0];
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selectorRef = useRef<HTMLDivElement>(null);

  const normalizedSearch = search.trim().toLocaleLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const filteredLanguages = useMemo(() => languageOptions.filter(({ code, label, englishLabel, short }) => {
    const searchTarget = `${label} ${englishLabel} ${short} ${code}`
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');
    return searchTarget.includes(normalizedSearch);
  }), [normalizedSearch]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!selectorRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const handleLanguageChange = (language: string) => {
    const nextLanguage = language as LanguageCode;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // The selected language still applies for this session if storage is unavailable.
    }
    void i18n.changeLanguage(nextLanguage);
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div
      className={`language-selector relative inline-flex shrink-0 ${mobile ? 'w-full' : ''}`}
      data-testid={mobile ? 'mobile-language-selector' : 'language-selector'}
      ref={selectorRef}
    >
      <button
        type="button"
        aria-label={t('language.choose')}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={mobile ? 'mobile-language-options' : 'desktop-language-options'}
        onClick={() => { setIsOpen((open) => !open); setSearch(''); }}
        className={[
          'inline-flex items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3acd32]/70',
          mobile
            ? 'h-11 w-full justify-start gap-3 rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold text-black'
            : 'h-10 min-w-[72px] justify-center gap-1.5 rounded-md px-2 text-[#111] hover:bg-black/5',
        ].join(' ')}
        data-testid={mobile ? 'button-mobile-language-selector' : 'button-language-selector'}
      >
        <img src={translateIcon} alt="" aria-hidden="true" className="h-[22px] w-[22px] shrink-0 object-contain" />
        {mobile ? (
          <>
            <span>{t('language.label')}</span>
            <span className="ml-auto text-black/55">{activeLanguage.label}</span>
          </>
        ) : (
          <span className="language-selector-trigger-label">{activeLanguage.short}</span>
        )}
        <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className={[
            'z-[80] overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_16px_45px_rgba(20,30,20,.18)]',
            mobile ? 'relative mt-2 w-full' : 'absolute right-0 top-full mt-2 w-[280px]',
          ].join(' ')}
        >
          <div className="relative border-b border-black/10 p-2.5">
            <Search aria-hidden="true" className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
              placeholder={t('language.search', 'Search languages')}
              aria-label={t('language.search', 'Search languages')}
              className="h-9 w-full rounded-lg border border-black/10 bg-white pl-9 pr-3 text-sm text-black outline-none transition focus:border-[#3acd32] focus:ring-2 focus:ring-[#3acd32]/15"
              data-testid={mobile ? 'input-mobile-language-search' : 'input-language-search'}
            />
          </div>
          <div
            id={mobile ? 'mobile-language-options' : 'desktop-language-options'}
            role="listbox"
            aria-label={t('language.choose')}
            className={mobile
              ? 'max-h-[min(240px,calc(100dvh-360px))] overflow-y-auto overscroll-contain p-1.5'
              : 'max-h-[min(360px,calc(100dvh-150px))] overflow-y-auto p-1.5'}
          >
            {filteredLanguages.map(({ code, label, englishLabel }) => {
              const isSelected = code === activeLanguage.code;
              return (
                <button
                  type="button"
                  key={code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleLanguageChange(code)}
                  className={`flex min-h-10 w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none ${isSelected ? 'bg-[#3acd32] font-semibold text-white hover:bg-[#35bd2e] focus-visible:bg-[#35bd2e]' : 'text-[#222] hover:bg-[#3acd32]/10 focus-visible:bg-[#3acd32]/10'}`}
                  data-testid={`language-option-${code}`}
                >
                  <span className="min-w-0 flex-1">{label}</span>
                  <span className={`text-xs font-normal ${isSelected ? 'text-white/80' : 'text-black/45'}`}>{englishLabel}</span>
                </button>
              );
            })}
            {filteredLanguages.length === 0 && (
              <p className="m-0 px-3 py-4 text-sm text-black/55" role="status">{t('language.noResults', 'No languages found')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
