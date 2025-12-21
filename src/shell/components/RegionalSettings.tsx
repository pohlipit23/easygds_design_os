import React, { useState } from 'react';

interface RegionalSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (settings: RegionalPreferences) => void;
  currentSettings: RegionalPreferences;
}

export interface RegionalPreferences {
  country: string;
  countryCode: string;
  language: string;
  currency: string;
  currencySymbol: string;
}

const countries = [
  { name: 'United Kingdom', code: 'gb' },
  { name: 'United States', code: 'us' },
  { name: 'UAE', code: 'ae' },
  { name: 'Kazakhstan', code: 'kz' },
];

const languages = ['English (UK)', 'Français', 'Deutsch', 'Русский'];

const currencies = [
  { name: 'British Pound', symbol: '£', code: 'GBP' },
  { name: 'US Dollar', symbol: '$', code: 'USD' },
  { name: 'Euro', symbol: '€', code: 'EUR' },
  { name: 'Kazakh Tenge', symbol: '₸', code: 'KZT' },
];

export function RegionalSettings({ isOpen, onClose, onApply, currentSettings }: RegionalSettingsProps) {
  const [settings, setSettings] = useState<RegionalPreferences>(currentSettings);

  const handleApply = () => {
    onApply(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="regional-settings-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl md:rounded-2xl shadow-lg w-full max-w-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <h3 id="regional-settings-title" className="text-lg font-bold text-[#1A3994]">
            Regional Settings
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 hover:bg-stone-100 rounded-full text-stone-600 hover:text-[#1A3994] transition-colors flex items-center justify-center"
            aria-label="Close regional settings"
          >
            <span className="material-icons-round text-xl">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Country Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Country</label>
              <div className="space-y-2">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() =>
                      setSettings({ ...settings, country: country.name, countryCode: country.code })
                    }
                    className={`w-full flex items-center gap-3 px-4 h-11 rounded-lg text-sm font-semibold transition-all ${
                      settings.countryCode === country.code
                        ? 'bg-[#203C94]/10 border border-[#203C94]/20 text-[#203C94]'
                        : 'hover:bg-stone-50 text-stone-900 border border-transparent font-medium'
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w20/${country.code}.png`}
                      className="w-6 rounded shadow-sm"
                      alt={country.code.toUpperCase()}
                    />
                    {country.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Language</label>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSettings({ ...settings, language: lang })}
                    className={`w-full text-left px-4 h-11 rounded-lg text-sm transition-all ${
                      settings.language === lang
                        ? 'bg-[#203C94]/10 border border-[#203C94]/20 text-[#203C94] font-semibold'
                        : 'hover:bg-stone-50 text-stone-900 border border-transparent font-medium'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Currency Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Currency</label>
              <div className="space-y-2">
                {currencies.map((curr) => (
                  <button
                    key={curr.code}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        currency: curr.code,
                        currencySymbol: curr.symbol,
                      })
                    }
                    className={`w-full text-left px-4 h-11 rounded-lg text-sm flex items-center justify-between transition-all ${
                      settings.currency === curr.code
                        ? 'bg-[#203C94]/10 border border-[#203C94]/20 text-[#203C94] font-semibold'
                        : 'hover:bg-stone-50 text-stone-900 border border-transparent font-medium'
                    }`}
                  >
                    <span>{curr.name}</span>{' '}
                    <span className={settings.currency === curr.code ? 'font-bold' : 'text-stone-600'}>
                      {curr.symbol}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-6 h-11 rounded-lg font-bold text-sm text-stone-600 hover:text-[#1A3994] hover:bg-stone-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-8 h-11 rounded-lg font-bold text-sm text-white bg-[#203C94] shadow-md hover:shadow-lg hover:bg-[#1A3994] transition-all active:scale-95"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
}

// Provide a runtime export to guard against accidental value imports elsewhere.
// This is intentionally a harmless placeholder; the real shape is the TypeScript
// `RegionalPreferences` interface above which is erased at runtime.
export const RegionalPreferences = {} as any;
