// src/services/newsletterService.ts

import api from '@/lib/api';

export const subscribeToNewsletter = async (email: string) => {
  const response = await api.post('/api/newsletter/subscribe/', { email });
  return response.data;
};
