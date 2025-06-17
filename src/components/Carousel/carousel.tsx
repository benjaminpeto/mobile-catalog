'use client';

import { useCarousel } from '@/hooks';

import { SubHeading } from '../Header';
import {
  CarouselContainer,
  CarouselTrack,
  CarouselWrapper,
  ProgressBar,
  ProgressContainer,
  ProgressSegment,
} from './carousel.styles';

interface CarouselProps {
  items: React.ReactNode[];
}

export function Carousel({ items }: CarouselProps) {
  const {
    wrapperRef,
    trackRef,
    isDragging,
    translate,
    onPointerDown,
    onPointerMove,
    onPointerUpCapture,
    totalSegments,
    activeSegment,
  } = useCarousel(items);

  return (
    <CarouselContainer>
      <SubHeading fontSize="20px">Similar Items</SubHeading>

      <CarouselWrapper
        ref={wrapperRef}
        onPointerDownCapture={onPointerDown}
        onPointerMoveCapture={onPointerMove}
        onPointerUpCapture={onPointerUpCapture}
        data-testid="carousel-wrapper"
      >
        <CarouselTrack
          ref={trackRef}
          $isDragging={isDragging}
          style={{
            transform: `translateX(${translate}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
          }}
          data-testid="carousel-track"
        >
          {items}
        </CarouselTrack>
      </CarouselWrapper>

      <ProgressContainer>
        <ProgressBar>
          {Array.from({ length: totalSegments }, (_, i) => (
            <ProgressSegment
              key={i}
              $isActive={i === activeSegment}
              $isVisible={true}
              data-testid="progress-segment"
            />
          ))}
        </ProgressBar>
      </ProgressContainer>
    </CarouselContainer>
  );
}
