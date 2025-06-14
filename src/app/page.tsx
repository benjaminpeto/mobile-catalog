import { Description, PageContainer, StyledImage, Title } from './page.styles';

export default function Home() {
  return (
    <PageContainer>
      <Title>Mobile Catalog</Title>
      <Description>A catalog of mobile devices</Description>
      <StyledImage
        src="/mbst.svg"
        alt="Mobile Catalog"
        width={500}
        height={300}
      />
    </PageContainer>
  );
}
