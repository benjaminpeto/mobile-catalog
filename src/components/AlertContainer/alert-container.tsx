import { AlertContainerWrapper } from './alert-container.styles';

export function AlertContainer({ children }: { children: React.ReactNode }) {
  return <AlertContainerWrapper>{children}</AlertContainerWrapper>;
}
