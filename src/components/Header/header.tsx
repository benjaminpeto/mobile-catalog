import { MainHeading, ParagraphText, SubHeading } from './header.styles';

export function Header({ text }: { text: string }) {
  return <MainHeading>{text}</MainHeading>;
}

export function SubHeader({ text }: { text: string }) {
  return <SubHeading>{text}</SubHeading>;
}

export function Paragraph({ text }: { text: string }) {
  return <ParagraphText>{text}</ParagraphText>;
}
