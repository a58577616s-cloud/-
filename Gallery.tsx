
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DesignProject, DesignStyle } from '../types';

const ALL_PROJECTS: DesignProject[] = [
  { id: '1', title: 'Serene Sanctuary', style: 'Minimalist', category: 'Living Room', imageUrl: 'https://picsum.photos/seed/g1/800/1200', description: '' },
  { id: '2', title: 'Industrial Loft', style: 'Industrial', category: 'Office', imageUrl: 'https://picsum.photos/seed/g2/800/600', description: '' },
  { id: '3', title: 'Japandi Retreat', style: 'Japandi', category: 'Bedroom', imageUrl: 'https://picsum.photos/seed/g3/800/1000', description: '' },
  { id: '4', title: 'Modern Kitchen', style: 'Modern', category: 'Kitchen', imageUrl: 'https://picsum.photos/seed/g4/800/800', description: '' },
  { id: '5', title: 'Nordic Bath', style: 'Scandinavian', category: 'Bathroom', imageUrl: 'https://picsum.photos/seed/g5/800/1100', description: '' },
  { id: '6', title: 'Velvet Lounge', style: 'Classic', category: 'Living Room', imageUrl: 'https://picsum.photos/seed/g6/800/700', description: '' },
  { id: '7', title: 'Concrete Study', style: 'Industrial', category: 'Office', imageUrl: 'https://picsum.photos/seed/g7/800/900', description: '' },
  { id: '8', title: 'Wabi-Sabi Kitchen', style: 'Japandi', category: 'Kitchen', imageUrl: 'https://picsum.photos/seed/g8/800/1300', description: '' },
  { id: '9', title: 'Glass Villa', style: 'Modern', category: 'Living Room', imageUrl: 'https://picsum.photos/seed/g9/800/800', description: '' },
];

const STYLES: (DesignStyle | 'All')[] = ['All', 'Modern', 'Minimalist', 'Industrial', 'Scandinavian', 'Japandi', 'Classic'];

const Gallery: React.FC = () => {
  const [activeStyle, setActiveStyle] = useState<DesignStyle | 'All'>('All');

  const filteredProjects = activeStyle === 'All' 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.style === activeStyle);

  return (
    <div className="py-20 px-6 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <h1 className="serif text-5xl font-bold mb-4">The Portfolio</h1>
        <p className="text-stone-500 max-w-2xl mx-auto">Explore our collection of award-winning interior designs across various styles and spaces.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {STYLES.map((style) => (
          <button
            key={style}
            onClick={() => setActiveStyle(style)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              activeStyle === style 
                ? 'bg-stone-900 text-white shadow-lg' 
                : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
            }`}
          >
            {style}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="masonry">
        {filteredProjects.map((project) => (
          <Link key={project.id} to={`/design/${project.id}`} className="masonry-item group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
            <div className="relative overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-bold uppercase tracking-widest border border-white px-4 py-2">View Project</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="serif text-xl font-bold mb-1">{project.title}</h3>
              <div className="flex justify-between items-center">
                <span className="text-xs text-stone-400 font-medium uppercase tracking-widest">{project.style}</span>
                <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded uppercase font-bold text-stone-600">{project.category}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-40">
          <p className="text-stone-400 italic">No projects found in this style.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
