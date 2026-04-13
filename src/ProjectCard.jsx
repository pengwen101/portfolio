import { useState } from 'react';

export default function ProjectCard({ rawContent }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cleanContent = rawContent.replace(/\r/g, '');
  const lines = cleanContent.split('\n');
  
  let title = "Untitled Project";
  let image = "";
  let tags = [];
  let actionLinks = [];
  let descriptionLines = [];

  lines.forEach(line => {
    const titleMatch = line.match(/^#\s*(.*)$/); 
    const imageMatch = line.match(/!\[.*?\]\((.*?)\)/);
    const kvMatch = line.match(/^([A-Za-z0-9_ -]+)=(.*)$/i);
    
    if (titleMatch) {
      title = titleMatch[1].trim();
    } else if (imageMatch) {
      const rawPath = imageMatch[1].trim();
      image = rawPath.startsWith('http') 
        ? rawPath 
        : `${import.meta.env.BASE_URL}${rawPath.replace(/^\//, '')}`;
    } else if (kvMatch) {
      const key = kvMatch[1].trim();
      const value = kvMatch[2].trim();
      const lowerKey = key.toLowerCase();
      
      if (lowerKey === 'tags') {
        tags = value.split(',').map(t => t.trim()).filter(Boolean);
      } else {
        actionLinks.push({ label: key, url: value });
      }
    } else {

      if (line.trim() !== '' || descriptionLines.length > 0) {
        descriptionLines.push(line);
      }
    }
  });

  const fullDescription = descriptionLines.join('\n').trim();

  const MAX_LENGTH = 180;
  const shouldTruncate = fullDescription.length > MAX_LENGTH;
  const displayDescription = (shouldTruncate && !isExpanded) 
    ? fullDescription.substring(0, MAX_LENGTH) + '...' 
    : fullDescription;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">

      {image && (
        <div className="w-full h-56 overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
          />
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-600 leading-relaxed mb-3 whitespace-pre-line">
          {displayDescription}
        </p>
    
        {shouldTruncate && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-olive-600 hover:text-olive-800 hover:underline text-sm font-semibold self-start mb-6 transition-colors cursor-pointer"
          >
            {isExpanded ? 'Show less' : 'See more'}
          </button>
        )}

        {actionLinks.length > 0 && (
          <div className="mt-auto pt-4 flex flex-wrap gap-3">
            {actionLinks.map((link, index) => {
              const isPrimary = link.label.toLowerCase().includes('github');
              
              return (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`inline-block px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isPrimary 
                      ? "bg-gray-900 text-white hover:bg-gray-700 hover:shadow-md" 
                      : "bg-olive-50 text-olive-700 border border-olive-200 hover:bg-olive-100 hover:border-olive-300 hover:shadow-sm"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}