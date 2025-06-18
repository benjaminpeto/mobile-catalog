import { ButtonText, StyledButton } from './button.styles';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant: 'primary' | 'secondary' | 'disabled' | 'link';
  className?: string;
}

export function Button({
  text,
  onClick,
  icon,
  variant,
  className,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      disabled={variant === 'disabled'}
      className={className}
    >
      {icon && <span>{icon}</span>}
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  );
}
