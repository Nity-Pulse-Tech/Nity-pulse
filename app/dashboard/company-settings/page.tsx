
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { dashboardService } from '@/lib/services/dashboardService';
import { CompanySetting } from '@/lib/types/dashboard';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { isAxiosError } from '@/utils/errorUtils';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function CompanySettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState<Partial<CompanySetting>>({
    office_location: '',
    emails: [],
    phones: [],
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    github: '',
    company_tagline: '',
    privacy_policy: '',
    terms_of_service: '',
    cookies_policy: '',
  });

  useEffect(() => {
    const fetchCompanySettings = async () => {
      try {
        const settings = await dashboardService.getCompanySettings();
        setFormData({
          office_location: settings.office_location || '',
          emails: settings.emails || [],
          phones: settings.phones || [],
          facebook: settings.facebook || '',
          twitter: settings.twitter || '',
          instagram: settings.instagram || '',
          linkedin: settings.linkedin || '',
          github: settings.github || '',
          company_tagline: settings.company_tagline || '',
          privacy_policy: settings.privacy_policy || '',
          terms_of_service: settings.terms_of_service || '',
          cookies_policy: settings.cookies_policy || '',
        });
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error('Authentication failed. Please log in again.');
            router.push('/login');
          } else if (error.response?.status === 404) {
            toast.info('No company settings found. Please create new settings.');
            setFormData({
              office_location: '',
              emails: [],
              phones: [],
              facebook: '',
              twitter: '',
              instagram: '',
              linkedin: '',
              github: '',
              company_tagline: '',
              privacy_policy: '',
              terms_of_service: '',
              cookies_policy: '',
            });
          } else {
            toast.error(error.message || 'Failed to fetch company settings');
          }
        } else {
          toast.error('Failed to fetch company settings');
        }
      } finally {
        setIsFetching(false);
      }
    };

    fetchCompanySettings();
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newEmails = [...(prev.emails || [])];
      newEmails[index] = value;
      return { ...prev, emails: newEmails };
    });
  };

  const addEmailField = () => {
    setFormData((prev) => ({
      ...prev,
      emails: [...(prev.emails || []), ''],
    }));
  };

  const removeEmailField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      emails: (prev.emails || []).filter((_, i) => i !== index),
    }));
  };

  const handlePhoneChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newPhones = [...(prev.phones || [])];
      newPhones[index] = value;
      return { ...prev, phones: newPhones };
    });
  };

  const addPhoneField = () => {
    setFormData((prev) => ({
      ...prev,
      phones: [...(prev.phones || []), ''],
    }));
  };

  const removePhoneField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      phones: (prev.phones || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation for emails and phones
    const invalidEmails = (formData.emails || []).filter(
      (email) => email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
    if (invalidEmails.length > 0) {
      toast.error('Please enter valid email addresses.');
      setIsLoading(false);
      return;
    }

    const invalidPhones = (formData.phones || []).filter(
      (phone) => phone && !/^\+?\d{7,15}$/.test(phone)
    );
    if (invalidPhones.length > 0) {
      toast.error('Please enter valid phone numbers (7-15 digits, optional + prefix).');
      setIsLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      if (formData.office_location)
        formDataToSend.append('office_location', formData.office_location);
      if (formData.emails)
        formDataToSend.append('emails', JSON.stringify(formData.emails.filter((email) => email)));
      if (formData.phones)
        formDataToSend.append('phones', JSON.stringify(formData.phones.filter((phone) => phone)));
      if (formData.facebook) formDataToSend.append('facebook', formData.facebook);
      if (formData.twitter) formDataToSend.append('twitter', formData.twitter);
      if (formData.instagram) formDataToSend.append('instagram', formData.instagram);
      if (formData.linkedin) formDataToSend.append('linkedin', formData.linkedin);
      if (formData.github) formDataToSend.append('github', formData.github);
      if (formData.company_tagline)
        formDataToSend.append('company_tagline', formData.company_tagline);
      if (formData.privacy_policy)
        formDataToSend.append('privacy_policy', formData.privacy_policy);
      if (formData.terms_of_service)
        formDataToSend.append('terms_of_service', formData.terms_of_service);
      if (formData.cookies_policy)
        formDataToSend.append('cookies_policy', formData.cookies_policy);

      await dashboardService.createOrUpdateCompanySettings(formDataToSend);
      toast.success('Company settings updated successfully!');
      router.push('/dashboard');
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            if (error.response?.status === 401) {
              toast.error('Authentication failed. Please log in again.');
              router.push('/login');
            } else {
              const data = error.response?.data as { message?: string; non_field_errors?: string[] } | undefined;
              const message =
                data?.message ||
                data?.non_field_errors?.[0] ||
                (data && Object.values(data)[0]) ||
                'Failed to update company settings';
              toast.error(message);
            }
          } else {
        toast.error('Failed to update company settings');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-muted-foreground">Loading company settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="border-input hover:bg-accent">
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Settings</h1>
            <p className="text-muted-foreground">Manage your company information and policies</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Office Location
              </label>
              <Input
                name="office_location"
                value={formData.office_location || ''}
                onChange={handleInputChange}
                placeholder="123 Main St, City, Country"
                className="border-input focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Addresses
              </label>
              {(formData.emails || []).map((email, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    placeholder="contact@example.com"
                    className="border-input focus:ring-ring"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEmailField(index)}
                    className="text-destructive border-destructive hover:bg-destructive/10"
                    disabled={(formData.emails || []).length <= 1}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addEmailField}
                className="mt-2 border-input hover:bg-accent"
              >
                <Plus size={16} className="mr-2" />
                Add Email
              </Button>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Numbers
              </label>
              {(formData.phones || []).map((phone, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    placeholder="+1234567890"
                    className="border-input focus:ring-ring"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePhoneField(index)}
                    className="text-destructive border-destructive hover:bg-destructive/10"
                    disabled={(formData.phones || []).length <= 1}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPhoneField}
                className="mt-2 border-input hover:bg-accent"
              >
                <Plus size={16} className="mr-2" />
                Add Phone
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Facebook URL
              </label>
              <Input
                name="facebook"
                type="url"
                value={formData.facebook || ''}
                onChange={handleInputChange}
                placeholder="https://facebook.com/yourcompany"
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Twitter URL
              </label>
              <Input
                name="twitter"
                type="url"
                value={formData.twitter || ''}
                onChange={handleInputChange}
                placeholder="https://twitter.com/yourcompany"
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Instagram URL
              </label>
              <Input
                name="instagram"
                type="url"
                value={formData.instagram || ''}
                onChange={handleInputChange}
                placeholder="https://instagram.com/yourcompany"
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                LinkedIn URL
              </label>
              <Input
                name="linkedin"
                type="url"
                value={formData.linkedin || ''}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/company/yourcompany"
                className="border-input focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                GitHub URL
              </label>
              <Input
                name="github"
                type="url"
                value={formData.github || ''}
                onChange={handleInputChange}
                placeholder="https://github.com/yourcompany"
                className="border-input focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Tagline
              </label>
              <Input
                name="company_tagline"
                value={formData.company_tagline || ''}
                onChange={handleInputChange}
                placeholder="Your company tagline"
                className="border-input focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Privacy Policy
              </label>
              <Textarea
                name="privacy_policy"
                value={formData.privacy_policy || ''}
                onChange={handleInputChange}
                placeholder="Enter your privacy policy..."
                rows={4}
                className="border-input focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Terms of Service
              </label>
              <Textarea
                name="terms_of_service"
                value={formData.terms_of_service || ''}
                onChange={handleInputChange}
                placeholder="Enter your terms of service..."
                rows={4}
                className="border-input focus:ring-ring"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Cookies Policy
              </label>
              <Textarea
                name="cookies_policy"
                value={formData.cookies_policy || ''}
                onChange={handleInputChange}
                placeholder="Enter your cookies policy..."
                rows={4}
                className="border-input focus:ring-ring"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-x-4 pt-6 border-t border-border gap-4">
            <Link href="/dashboard">
              <Button type="button" variant="outline" className="border-input hover:bg-accent">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
