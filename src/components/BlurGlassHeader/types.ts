export interface Logo {
  src: string;
  alt: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderContent {
  logo: Logo;
  nav: NavItem[];
}

export interface HeaderData {
  header: HeaderContent;
}