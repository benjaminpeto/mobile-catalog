'use client';

import { useRouter } from 'next/navigation';

import {
  StyledBackButton,
  StyledBackButtonWrapper,
  StyledChevronLeftSvg,
} from './button.styles';

export function BackButton() {
  const router = useRouter();

  return (
    <StyledBackButtonWrapper>
      <StyledBackButton onClick={() => router.back()}>
        <StyledChevronLeftSvg
          width="10"
          height="17"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.82328 0.646484L5.53039 1.35359L1.88394 5.00004L5.53039 8.64648L4.82328 9.35359L0.469727 5.00004L4.82328 0.646484Z"
            fill="black"
          />
        </StyledChevronLeftSvg>
        Back
      </StyledBackButton>
    </StyledBackButtonWrapper>
  );
}
