import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface CreateBlogAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { user_query: string; category: string; language: string; source: string; prompt_version: string }) => Promise<void>;
}

export default function CreateBlogAIModal({ isOpen, onClose, onSubmit }: CreateBlogAIModalProps) {
  const [formData, setFormData] = useState({
    user_query: '',
    category: '',
    language: 'en',
    source: 'internal',
    prompt_version: 'v1',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      toast.success('Blog creation task started successfully');
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start blog creation task';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Blog Post with AI</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="user_query">User Query</Label>
            <Input
              id="user_query"
              value={formData.user_query}
              onChange={(e) => handleChange('user_query', e.target.value)}
              placeholder="Enter your blog topic or prompt"
              required
              maxLength={1000}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="Enter blog category"
              required
              maxLength={100}
            />
          </div>
          <div>
            <Label htmlFor="language">Language</Label>
            <Select value={formData.language} onValueChange={(value: string) => handleChange('language', value)}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="source">Source</Label>
            <Select value={formData.source} onValueChange={(value: string) => handleChange('source', value)}>
              <SelectTrigger id="source">
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="internal">Internal</SelectItem>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="prompt_version">Prompt Version</Label>
            <Input
              id="prompt_version"
              value={formData.prompt_version}
              onChange={(e) => handleChange('prompt_version', e.target.value)}
              placeholder="Enter prompt version (e.g., v1)"
              required
              maxLength={10}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Create Blog'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}