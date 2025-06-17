import { StyledRemoveButton } from './button.styles';

export function RemoveButton({ onClick }: { onClick: () => void }) {
  return <StyledRemoveButton onClick={onClick}>Elimininar</StyledRemoveButton>;
}
