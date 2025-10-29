interface FooterLink {
  label: string;
  href: string;
}

interface SocialMediaLink {
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export interface FooterProps {
  logoSrc?: string;
  logoAlt?: string;
  tagline?: string;
  paymentCardsSrc?: string;
  paymentCardsAlt?: string;
  companyLinks?: FooterLink[];
  resourcesLinks?: FooterLink[];
  supportLinks?: FooterLink[];
  socialMediaLinks?: SocialMediaLink[];
}
