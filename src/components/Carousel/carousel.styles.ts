'use client';

import styled from 'styled-components';

export const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 147px;
`;

export const CarouselWrapper = styled.div`
  position: relative;
  overflow: visible; /* allow cards to peek */
  width: 100%;
  touch-action: pan-y; /* preserve vertical scrolling */
  margin-top: 40px;
`;

export const CarouselTrack = styled.div<{ $isDragging: boolean }>`
  display: flex;
  width: max-content;
  will-change: transform;
  cursor: ${p => (p.$isDragging ? 'grabbing' : 'grab')};

  /* disable browser image/link drags so we control it */
  a,
  img {
    -webkit-user-drag: none;
    user-drag: none;
    user-select: none;
  }

  > * {
    flex: 0 0 300px;
  }
  @media (max-width: 480px) {
    > * {
      flex: 0 0 350px;
    }
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  margin-top: 40px; /* 40px below carousel */
  display: flex;
  justify-content: center;
`;

export const ProgressBar = styled.div`
  width: 100%;
  max-width: 1200px; /* cap at 1200px */
  height: 1px;
  display: flex;
  background: transparent;
`;

export const ProgressSegment = styled.div<{
  $isActive: boolean;
  $isVisible: boolean;
}>`
  flex: 1;
  height: 100%;
  background: ${p =>
    p.$isActive ? '#000' : p.$isVisible ? '#d0d0d0' : 'transparent'};
  border: ${p =>
    p.$isVisible && !p.$isActive ? '0.5px solid #cccccc' : 'none'};
  transition: all 0.3s ease;
`;
