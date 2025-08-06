export const logosBasePath = '/logos';

export const companyLogoMap: Record<string, string> = {
  'CH-Studio - GEHealthcare': 'ge-healtcare.png',
  'Groupe Actual': 'actual.png',
  'Bookr.fm - Musicdata Studio': 'bookr.png',
  'Fluidra - Blueriiot': 'fluidra.png'
};

export function getCompanyLogo(company: string): string {
  const fileName = companyLogoMap[company] ?? `${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`;
  return `${logosBasePath}/${fileName}`;
}

