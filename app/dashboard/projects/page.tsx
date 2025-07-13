'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const initialProjects = [
  { id: '1', name: 'Project Alpha', description: 'First project description.' },
  { id: '2', name: 'Project Beta', description: 'Second project description.' },
];

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState(initialProjects);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
      // TODO: Persist deletion to backend or file
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    window.location.href = '/login';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">Projects</h1>
        <div className="flex gap-2">
          <Link href="/dashboard/projects/create">
            <Button className="btn-primary">Add New Project</Button>
          </Link>
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
      </div>
      <div className="grid gap-6">
        {projects.length === 0 && <p className="text-black/60 dark:text-white/60">No projects found.</p>}
        {projects.map(project => (
          <Card key={project.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-card dark:bg-card text-black dark:text-white border border-border">
            <div>
              <h2 className="text-xl font-semibold text-black dark:text-white">{project.name}</h2>
              <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Link href={`/dashboard/projects/${project.id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Button variant="destructive" onClick={() => handleDelete(project.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 