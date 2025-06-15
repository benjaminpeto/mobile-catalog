import { ButtonText, StyledButton } from './button.styles';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant: 'primary' | 'secondary' | 'disabled' | 'link';
}

export default function Button({ text, onClick, icon, variant }: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      disabled={variant === 'disabled'}
    >
      {icon && <span>{icon}</span>}
      <ButtonText>{text}</ButtonText>
    </StyledButton>
  );
}
