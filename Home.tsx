
import React from 'react';
import { Link } from 'react-router-dom';
import { DesignProject } from '../types';

const RECENT_PROJECTS: DesignProject[] = [
  { id: '1', title: 'Serene Sanctuary', style: 'Minimalist', category: 'Living Room', imageUrl: 'https://picsum.photos/seed/interior1/800/600', description: 'A peaceful living space focused on natural light and raw textures.' },
  { id: '2', title: 'Industrial Loft', style: 'Industrial', category: 'Office', imageUrl: 'https://picsum.photos/seed/interior2/800/600', description: 'Exposed brick and metal accents meet comfort in this creative workspace.' },
  { id: '3', title: 'Japandi Retreat', style: 'Japandi', category: 'Bedroom', imageUrl: 'https://picsum.photos/seed/interior3/800/600', description: 'The perfect blend of Japanese aesthetics and Scandinavian functionality.' },
];

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <img 
          src="https://picsum.photos/seed/hero/1920/1080" 
          alt="Hero Interior" 
          className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-[10s] hover:scale-105"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-lg">
            Elevate Your <br /> Living Space
          </h1>
          <p className="text-lg md:text-xl max-w-2xl font-light opacity-90 mb-10 tracking-wide">
            Where sophisticated architecture meets visionary interior design. Experience the future of home aesthetics.
          </p>
          <div className="flex gap-4">
            <Link to="/gallery" className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-stone-100 transition-all shadow-xl">
              View Portfolio
            </Link>
            <Link to="/ai-lab" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all backdrop-blur-sm">
              Try AI Concept
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Styles Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h5 className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Curated Excellence</h5>
            <h2 className="serif text-4xl md:text-5xl font-bold">Latest Masterpieces</h2>
          </div>
          <Link to="/gallery" className="text-stone-900 font-bold border-b-2 border-stone-900 pb-1 mt-6 md:mt-0 hover:text-stone-600 hover:border-stone-600 transition-all">
            See All Works →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {RECENT_PROJECTS.map((project) => (
            <Link key={project.id} to={`/design/${project.id}`} className="group">
              <div className="relative overflow-hidden aspect-[4/5] mb-6 rounded-lg shadow-sm">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">
                  {project.style}
                </div>
              </div>
              <h3 className="serif text-2xl font-bold mb-2 group-hover:text-stone-600 transition-colors">{project.title}</h3>
              <p className="text-stone-500 text-sm">{project.category}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Teaser Section */}
      <section className="bg-stone-900 text-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h5 className="text-stone-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">AI-Driven Design</h5>
            <h2 className="serif text-4xl md:text-6xl font-bold mb-8 leading-tight">Can't Find Your Style? Let AI Create It.</h2>
            <p className="text-stone-400 text-lg mb-10 leading-relaxed">
              Our advanced AI Lab allows you to generate photorealistic interior design concepts simply by describing your dream room. From "Mid-century modern library" to "Cyberpunk bedroom," the possibilities are endless.
            </p>
            <Link to="/ai-lab" className="inline-block bg-white text-stone-900 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-stone-200 transition-all">
              Launch AI Lab
            </Link>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
             <img src="https://picsum.photos/seed/ai1/400/400" alt="AI Gen" className="rounded-lg w-full aspect-square object-cover opacity-60 hover:opacity-100 transition-opacity" />
             <img src="https://picsum.photos/seed/ai2/400/400" alt="AI Gen" className="rounded-lg w-full aspect-square object-cover opacity-60 hover:opacity-100 transition-opacity mt-8" />
             <img src="https://picsum.photos/seed/ai3/400/400" alt="AI Gen" className="rounded-lg w-full aspect-square object-cover opacity-60 hover:opacity-100 transition-opacity -mt-8" />
             <img src="https://picsum.photos/seed/ai4/400/400" alt="AI Gen" className="rounded-lg w-full aspect-square object-cover opacity-60 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
