export const logosBasePath = '/logos';

export const companyLogoMap: Record<string, string> = {
  'CH-Studio - GEHealthcare': 'ge-healtcare.png',
  'Group Actual': 'actual.png',
  'Bookr.fm': 'bookr.png',
  'Fluidra': 'fluidra.png'
};

export function getCompanyLogo(company: string): string {
  const fileName = companyLogoMap[company] ?? `${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`;
  return `${logosBasePath}/${fileName}`;
}

