'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { dashboardService } from '@/lib/services/dashboardService';
import { Partner } from '@/lib/types/dashboard';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const partnersData = await dashboardService.getAllPartners();
        setPartners(partnersData.slice(0, 6)); // Limit to 6 partners for display
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Partners</h2>
        {partners.length === 0 ? (
          <p className="text-center text-muted-foreground">No partners available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div key={partner.id} className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md">
                <div className="relative w-32 h-32 mb-4">
                  <Image
                    src={partner.image || '/fallback-image.jpg'}
                    alt={partner.name}
                    fill
                    sizes="128px"
                    className="object-contain rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{partner.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}