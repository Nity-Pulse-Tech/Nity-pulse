'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { dashboardService } from '@/lib/services/dashboardService';
import { Partner } from '@/lib/types/dashboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function CompactPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersData = await dashboardService.getAllPartners();
        setPartners(partnersData.slice(0, 8)); // Show up to 8 partners
      } catch (error) {
        console.error('Error fetching partners:', error);
        setPartners([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-6 bg-background/40">
      <div className="container mx-auto px-4">
        <h2 className="text-base font-medium text-center text-foreground mb-3">Our Partners</h2>
        {partners.length === 0 ? (
          <p className="text-center text-muted-foreground text-xs">No partners available.</p>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
            {partners.map((partner) => (
              <div key={partner.id} className="flex flex-col items-center p-1">
                <div className="relative w-14 h-14 md:w-16 md:h-16 mb-1 rounded-md border border-border overflow-hidden bg-card">
                  <Image
                    src={partner.image || '/fallback-image.jpg'}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 768px) 56px, 64px"
                    className="object-cover"
                    style={{ objectPosition: 'center' }}
                  />
                </div>
                <span className="text-xs text-muted-foreground text-center max-w-[70px] truncate">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}