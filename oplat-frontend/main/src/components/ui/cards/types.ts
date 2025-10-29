export interface CardComponentProps {
  title: string;
  content?: string;
  firstService?: string;
  secondService?: string;
  thirdService?: string;
  fourthService?: string;
  width?: string;
  variant?: "basic" | "gradient" | "highlight";
  icon?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  href?: string;
  headerHeight?: string;
}

export type CardContainerProps = {
  children: React.ReactNode;
  rows?: number;
  smCols?: number;
  maxWidth?: string;
  gap?: string;
};
