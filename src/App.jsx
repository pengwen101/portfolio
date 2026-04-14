import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const markdownModules = import.meta.glob('./markdowns/*.md', { query: '?raw', import: 'default' });
        
        const loadedProjects = await Promise.all(
          Object.entries(markdownModules).map(async ([filePath, resolver], index) => {
            const textContent = await resolver();
     
            const tagsMatch = textContent.match(/^Tags=(.+)$/im);
            const tags = tagsMatch 
              ? tagsMatch[1].split(',').map(t => t.trim()).filter(Boolean) 
              : [];

            return {
              id: index,
              rawContent: textContent,
              tags: tags
            };
          })
        );

        const uniqueTags = [...new Set(loadedProjects.flatMap(p => p.tags))].sort();

        setProjects(loadedProjects);
        setAllTags(uniqueTags);
      } catch (error) {
        console.error("Failed to load markdown files:", error);
      }
    };

    loadProjects();
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = projects.filter((project) => {
    if (selectedTags.length === 0) return true;
    return project.tags.some((tag) => 
      selectedTags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    );
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Serif+Display:ital,wght@0,100..900;1,100..900&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');
      `}</style>

      <div 
        className="min-h-screen bg-gradient-to-br from-olive-50 via-olive-50 to-olive-50/40 text-olive-700 flex flex-col md:flex-row scroll-smooth"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >

        <header className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-olive-100 px-5 py-3 flex justify-between items-center shadow-sm">
          <span className="font-bold text-lg text-olive-800">Amelia W.</span>
        </header>

        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 md:w-80 bg-white/80 backdrop-blur-xl border-r border-olive-100 p-8 flex flex-col justify-start shadow-xl md:shadow-none
          transition-transform duration-300 ease-in-out -tranolive-x-full
          md:tranolive-x-0 md:static md:h-screen md:sticky md:top-0 md:overflow-y-auto
        `}>

          <div className="mb-8">
            <h1 className="text-xl font-bold text-olive-800 mb-3 leading-tight tracking-tight">Amelia Wibisono</h1>
            <p className="text-sm text-olive-600 leading-relaxed mb-5">
              Hi! I'm a data scientist experienced in using data to discover trends and insights. You can find my data-related projects here, ranging from data visualization to recommendation system and natural language processing.
            </p>
            
            <div className="flex gap-4">
              <a href="https://github.com/pengwen101" target="_blank" rel="noreferrer" className="text-olive-400 hover:text-olive-600 hover:scale-110 transition-all w-5 h-5">
                <svg className="w-full h-full" viewBox="0 0 98 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/amelia-wibisono-466758219/" target="_blank" rel="noreferrer" className="text-olive-400 hover:text-[#0A66C2] hover:scale-110 transition-all w-5 h-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </a>
              <a href="https://medium.com/@amelia2004.aw" target="_blank" rel="noreferrer" className="text-olive-400 hover:text-olive-900 hover:scale-110 transition-all w-5 h-5">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 1770 1000">
                <circle cx="500" cy="500" r="500" />
                <ellipse ry="475" rx="250" cy="501" cx="1296"/>
                <ellipse cx="1682" cy="502" rx="88" ry="424"/>
              </svg>
              </a>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full mx-auto px-5 py-8 md:py-10 md:px-10 lg:px-16 overflow-x-hidden">
          <div className="relative md:hidden mb-8">
            <h1 className="text-xl font-bold text-olive-800 mb-3 leading-tight tracking-tight">Amelia Wibisono</h1>
            <p className="text-sm text-olive-600 leading-relaxed mb-5">
              Hi! I use data to discover trends and insights. You can find my data-related projects here, ranging from data visualization to recommendation system and natural language processing.
            </p>
            
            <div className="flex gap-4">
              <a href="https://github.com/pengwen101" target="_blank" rel="noreferrer" className="text-olive-400 hover:text-olive-600 hover:scale-110 transition-all w-5 h-5">
                <svg className="w-full h-full" viewBox="0 0 98 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/amelia-wibisono-466758219/" target="_blank" rel="noreferrer" className="text-olive-400 hover:text-[#0A66C2] hover:scale-110 transition-all w-5 h-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
              </a>
              <a href="https://medium.com/@amelia2004.aw" target="_blank" rel="noreferrer" className="text-olive-400 hover:text-olive-900 hover:scale-110 transition-all w-5 h-5">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="currentColor" viewBox="0 0 1770 1000">
                <circle cx="500" cy="500" r="500" />
                <ellipse ry="475" rx="250" cy="501" cx="1296"/>
                <ellipse cx="1682" cy="502" rx="88" ry="424"/>
              </svg>
              </a>
            </div>
          </div>
          {allTags.length > 0 && (
                <div className="mb-8 p-4 bg-white/70 backdrop-blur-sm rounded-sm border border-olive-100/50 shadow-sm max-w-3xl">
                  <p className="text-xs font-bold text-olive-400 mb-3 uppercase tracking-wider">Filter by Tags</p>
                  <div className="flex flex-wrap gap-2.5">
                    {allTags.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-olive-600 text-white shadow hover:bg-olive-700' 
                              : 'bg-white text-olive-600 border border-olive-100 hover:bg-olive-50 hover:text-olive-700 hover:border-olive-200'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                  {selectedTags.length > 0 && (
                    <button 
                      onClick={() => setSelectedTags([])}
                      className="cursor-pointer mt-5 text-xs text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-md transition-colors font-semibold uppercase tracking-wider"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              )}

          <div id="projects">
            <section>
              <h2 className="text-lg font-semibold text-olive-800 mb-6 border-b border-olive-100 pb-3">Projects ({filteredProjects.length})</h2>
              <div className="grid grid-cols-1 gap-6 max-w-3xl">
                {projects.length === 0 ? (
                  <div className="w-full py-12 text-center text-olive-400 bg-white/70 backdrop-blur-sm rounded-xl border border-olive-100 shadow-sm">
                    <p className="text-sm font-medium animate-pulse">Loading projects...</p>
                  </div>
                ) : filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                     <ProjectCard key={project.id} rawContent={project.rawContent} />
                  ))
                ) : (
                  <div className="w-full py-12 text-center text-olive-500 bg-white/50 backdrop-blur-sm rounded-xl border-2 border-dashed border-olive-100">
                    <p className="text-sm font-medium">No projects found matching the selected tags.</p>
                    <button 
                      onClick={() => setSelectedTags([])}
                      className="mt-3 text-xs font-semibold text-olive-600 hover:text-olive-800 hover:bg-olive-50 px-3 py-1.5 rounded-lg transition-colors underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

        </main>
      </div>
    </>
  );
}