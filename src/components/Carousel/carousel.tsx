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
      <SubHeading $fontSize="20px">Similar Items</SubHeading>

      <CarouselWrapper
        ref={wrapperRef}
        onPointerDownCapture={onPointerDown}
        onPointerMoveCapture={onPointerMove}
        onPointerUpCapture={onPointerUpCapture}
        role="region"
        aria-label="carousel wrapper"
      >
        <CarouselTrack
          ref={trackRef}
          $isDragging={isDragging}
          style={{
            transform: `translateX(${translate}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease',
          }}
          role="list"
          aria-label="carousel track"
        >
          {items.map((child, idx) => (
            <div role="listitem" key={idx}>
              {child}
            </div>
          ))}
        </CarouselTrack>
      </CarouselWrapper>

      <ProgressContainer>
        <ProgressBar role="group" aria-label="carousel progress">
          {Array.from({ length: totalSegments }, (_, i) => (
            <ProgressSegment
              key={i}
              $isActive={i === activeSegment}
              $isVisible={true}
              aria-label={`Segment ${i + 1} of ${totalSegments}`}
            />
          ))}
        </ProgressBar>
      </ProgressContainer>
    </CarouselContainer>
  );
}
