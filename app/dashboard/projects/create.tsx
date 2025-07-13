'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CreateProject() {
  const [form, setForm] = useState({
    name: '',
    description: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    // TODO: Persist new project to backend or file
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    window.location.href = '/login';
  };

  return (
    <div className="max-w-xl mx-auto bg-card dark:bg-card p-8 rounded-xl shadow-lg border border-border">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">Create New Project</h1>
        <Button onClick={handleLogout} variant="destructive">Logout</Button>
      </div>
      {success && <div className="mb-4 text-green-600 dark:text-green-400">Project created! (Not really saved)</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Project Name" value={form.name} onChange={handleChange} required className="bg-background dark:bg-gray-800 text-black dark:text-white" />
        <Input name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="bg-background dark:bg-gray-800 text-black dark:text-white" />
        <div className="flex gap-2">
          <Button type="submit" className="btn-primary">Create</Button>
          <Link href="/dashboard/projects"><Button type="button" variant="outline">Cancel</Button></Link>
        </div>
      </form>
    </div>
  );
} 