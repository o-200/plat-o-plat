export interface UserMenuProps {
  showThemeSwitcher?: boolean;
  user?: {
    isLoggedIn: boolean;
    lastName?: string;
    firstName?: string;
    patronymic?: string;
  };
  onLogin?: (data: {
    phone: string;
    telegram: boolean;
    whatsapp: boolean;
  }) => void;
  onRegister?: (data: {
    name: string;
    phone: string;
    telegram: boolean;
    whatsapp: boolean;
  }) => void;
}
