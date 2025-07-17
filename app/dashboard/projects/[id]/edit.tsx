'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';



const initialProjects = [
  { id: '1', name: 'Project Alpha', description: 'First project description.' },
  { id: '2', name: 'Project Beta', description: 'Second project description.' },
];

export default function EditProject() {
  const params = useParams();
  const project = initialProjects.find(p => p.id === params?.id) || initialProjects[0];
  const [form, setForm] = useState({ ...project });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    // TODO: Persist changes to backend or file
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    window.location.href = '/login';
  };

  return (
    <div className="max-w-xl mx-auto bg-card dark:bg-card p-8 rounded-xl shadow-lg border border-border">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">Edit Project</h1>
        <Button onClick={handleLogout} variant="destructive">Logout</Button>
      </div>
      {success && <div className="mb-4 text-green-600 dark:text-green-400">Project updated! (Not really saved)</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Project Name" value={form.name} onChange={handleChange} required className="bg-background dark:bg-gray-800 text-black dark:text-white" />
        <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="bg-background dark:bg-gray-800 text-black dark:text-white" />
        <div className="flex gap-2">
          <Button type="submit" className="btn-primary">Save Changes</Button>
          <Link href="/dashboard/projects"><Button type="button" variant="outline">Cancel</Button></Link>
        </div>
      </form>
    </div>
  );
}
