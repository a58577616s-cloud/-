
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { DesignProject } from '../types';

const ALL_PROJECTS: DesignProject[] = [
  { id: '1', title: 'Serene Sanctuary', style: 'Minimalist', category: 'Living Room', imageUrl: 'https://picsum.photos/seed/g1/1200/800', description: 'A project centered around the concept of "silent space". We used a palette of warm greys, white linen, and natural white oak to create a living area that feels like a breath of fresh air.' },
  { id: '2', title: 'Industrial Loft', style: 'Industrial', category: 'Office', imageUrl: 'https://picsum.photos/seed/g2/1200/800', description: 'Transforming an old warehouse into a vibrant creative studio. The raw concrete walls were preserved, complemented by custom black steel shelving and leather upholstery.' },
  { id: '3', title: 'Japandi Retreat', style: 'Japandi', category: 'Bedroom', imageUrl: 'https://picsum.photos/seed/g3/1200/800', description: 'Where Scandinavian hygge meets Japanese wabi-sabi. Low-profile furniture and artisanal ceramics define this master bedroom suite.' },
];

const DesignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = ALL_PROJECTS.find(p => p.id === id) || ALL_PROJECTS[0];

  return (
    <div className="animate-in fade-in duration-700 pb-20">
      <div className="h-[60vh] relative overflow-hidden">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-end p-12">
          <div className="max-w-7xl mx-auto w-full text-white">
             <Link to="/gallery" className="text-xs uppercase font-bold tracking-widest mb-4 inline-block hover:opacity-70">← Back to Gallery</Link>
             <h1 className="serif text-5xl md:text-7xl font-bold">{project.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-20">
        <div className="col-span-1 md:col-span-2">
          <h2 className="serif text-3xl font-bold mb-8">About the Project</h2>
          <p className="text-stone-600 text-lg leading-relaxed mb-10">
            {project.description || "Every project at Lumina starts with a deep understanding of our client's vision and the architectural context. For this space, we aimed to balance functional requirements with a poetic aesthetic that remains timeless."}
          </p>
          <div className="grid grid-cols-2 gap-4">
             <img src={`https://picsum.photos/seed/${project.id}a/600/400`} alt="detail" className="rounded-lg shadow-sm" />
             <img src={`https://picsum.photos/seed/${project.id}b/600/400`} alt="detail" className="rounded-lg shadow-sm" />
          </div>
        </div>
        
        <div className="bg-stone-50 p-8 rounded-xl h-fit border border-stone-100 shadow-sm">
          <h3 className="font-bold uppercase text-xs tracking-[0.2em] text-stone-400 mb-8">Project Details</h3>
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-1">Style</p>
              <p className="text-stone-600">{project.style}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-1">Category</p>
              <p className="text-stone-600">{project.category}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-1">Location</p>
              <p className="text-stone-600">Stockholm, SE</p>
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-1">Year</p>
              <p className="text-stone-600">2024</p>
            </div>
          </div>
          <button className="w-full bg-stone-900 text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs mt-12 hover:bg-stone-800 transition-all">
            Inquire about this style
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignDetail;
