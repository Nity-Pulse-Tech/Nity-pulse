'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { useEffect } from 'react';

const images = ['/image.png', '/image2.png'];

export default function AutoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) emblaApi.scrollNext();
      else emblaApi.scrollTo(0);
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <div className="overflow-hidden rounded-2xl shadow-lg" ref={emblaRef}>
      <div className="flex">
        {images.map((src, index) => (
          <div className="flex-[0_0_100%] relative w-72 h-72" key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}