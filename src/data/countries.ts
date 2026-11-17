export interface Country {
  /** ISO 3166-1 alpha-2 */
  code: string;
  name: string;
  nameBn: string;
  /** Dial code without '+' */
  dial: string;
}

export const COUNTRIES: Country[] = [
  { code: 'BD', name: 'Bangladesh', nameBn: 'বাংলাদেশ', dial: '880' },
  { code: 'IN', name: 'India', nameBn: 'ভারত', dial: '91' },
  { code: 'PK', name: 'Pakistan', nameBn: 'পাকিস্তান', dial: '92' },
  { code: 'OM', name: 'Oman', nameBn: 'ওমান', dial: '968' },
  { code: 'AE', name: 'United Arab Emirates', nameBn: 'সংযুক্ত আরব আমিরাত', dial: '971' },
  { code: 'SA', name: 'Saudi Arabia', nameBn: 'সৌদি আরব', dial: '966' },
  { code: 'QA', name: 'Qatar', nameBn: 'কাতার', dial: '974' },
  { code: 'KW', name: 'Kuwait', nameBn: 'কুয়েত', dial: '965' },
  { code: 'NG', name: 'Nigeria', nameBn: 'নাইজেরিয়া', dial: '234' },
  { code: 'EG', name: 'Egypt', nameBn: 'মিসর', dial: '20' },
  { code: 'ZA', name: 'South Africa', nameBn: 'দক্ষিণ আফ্রিকা', dial: '27' },
  { code: 'US', name: 'United States', nameBn: 'যুক্তরাষ্ট্র', dial: '1' },
  { code: 'CA', name: 'Canada', nameBn: 'কানাডা', dial: '1' },
  { code: 'GB', name: 'United Kingdom', nameBn: 'যুক্তরাজ্য', dial: '44' },
  { code: 'IT', name: 'Italy', nameBn: 'ইতালি', dial: '39' },
  { code: 'ES', name: 'Spain', nameBn: 'স্পেন', dial: '34' },
  { code: 'DE', name: 'Germany', nameBn: 'জার্মানি', dial: '49' },
  { code: 'FR', name: 'France', nameBn: 'ফ্রান্স', dial: '33' },
  { code: 'TR', name: 'Turkey', nameBn: 'তুরস্ক', dial: '90' },
  { code: 'CN', name: 'China', nameBn: 'চীন', dial: '86' },
  { code: 'MY', name: 'Malaysia', nameBn: 'মালয়েশিয়া', dial: '60' },
  { code: 'SG', name: 'Singapore', nameBn: 'সিঙ্গাপুর', dial: '65' },
  { code: 'ID', name: 'Indonesia', nameBn: 'ইন্দোনেশিয়া', dial: '62' },
  { code: 'AU', name: 'Australia', nameBn: 'অস্ট্রেলিয়া', dial: '61' },
];

export const getCountry = (code: string): Country =>
  COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];

export const BD_DISTRICTS = [
  { value: 'Dhaka', label: 'ঢাকা', sub: 'Dhaka' },
  { value: 'Chittagong', label: 'চট্টগ্রাম', sub: 'Chittagong' },
  { value: 'Gazipur', label: 'গাজীপুর', sub: 'Gazipur' },
  { value: 'Narayanganj', label: 'নারায়ণগঞ্জ', sub: 'Narayanganj' },
];
