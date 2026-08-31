export const COUNTRY_CODE_LABELS = {
  "+971": "UAE",
  "+966": "Saudi Arabia",
  "+968": "Oman",
  "+973": "Bahrain",
  "+974": "Qatar",
  "+965": "Kuwait",
  "+91": "India",
  "+92": "Pakistan",
  "+44": "UK",
  "+1": "USA",
};

export function getCountryFromCode(countryCode) {
  const code = String(countryCode || "").trim();

  return COUNTRY_CODE_LABELS[code] || code;
}
