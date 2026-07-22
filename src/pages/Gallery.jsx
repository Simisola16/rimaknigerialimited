import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { projects, getProjectById } from '../data/projectsData';

export default function Gallery() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Determine active project from URL ?project=proj-1 or default to first project / all
  const requestedProjId = searchParams.get('project');
  const [activeTab, setActiveTab] = useState(() => {
    if (requestedProjId && (requestedProjId === 'all' || getProjectById(requestedProjId))) {
      return requestedProjId;
    }
    return projects[0]?.id || 'all';
  });

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxTitle, setLightboxTitle] = useState('');

  // Sync state if URL search params change
  useEffect(() => {
    const projParam = searchParams.get('project');
    if (projParam && (projParam === 'all' || getProjectById(projParam))) {
      setActiveTab(projParam);
    }
  }, [searchParams]);

  // Tab switcher helper
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ project: tabId });
    }
  };

  // Get displayed images and project context
  const selectedProject = activeTab !== 'all' ? getProjectById(activeTab) : null;
  
  // Prepare gallery items
  const galleryItems = React.useMemo(() => {
    if (selectedProject) {
      return selectedProject.images.map((src, idx) => ({
        src,
        index: idx,
        projectId: selectedProject.id,
        projectTitle: selectedProject.title,
        location: selectedProject.location,
        client: selectedProject.client,
      }));
    }
    // All projects combined
    return projects.flatMap((proj) =>
      proj.images.map((src, idx) => ({
        src,
        index: idx,
        projectId: proj.id,
        projectTitle: proj.title,
        location: proj.location,
        client: proj.client,
      }))
    );
  }, [selectedProject]);

  // Open Lightbox
  const openLightbox = (items, startIndex, title) => {
    setLightboxImages(items);
    setLightboxIndex(startIndex);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  // Lightbox key controls
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, lightboxImages.length]);

  return (
    <section className="relative bg-[#0D0524] min-h-screen py-24 lg:py-32 section-base text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00CCFF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#060214] rounded-full blur-[160px] pointer-events-none" />

      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        {/* Top Header & Breadcrumb Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-[#E4F3F7]/10 pb-8">
          <div>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-xs font-body tracking-[0.2em] text-[#00CCFF] uppercase hover:text-white transition-colors duration-200 mb-3 group"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Portfolio
            </button>
            <h1 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] text-[#FFFFFF] leading-tight">
              CONSTRUCTION <span className="text-gradient-gold">GALLERY</span>
            </h1>
            <p className="font-body text-[#E4F3F7]/70 max-w-2xl text-sm md:text-base mt-2 leading-relaxed">
              Step-by-step visual documentation of Rimak's building construction projects, highlighting structural engineering, masonry, finishes, and perimeter installations.
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="btn-primary flex-shrink-0 self-start md:self-auto text-xs py-3 px-6"
          >
            Explore All Projects
          </button>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-body tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'all'
                ? 'bg-[#00CCFF] text-[#060214] font-semibold shadow-[0_0_20px_rgba(0,204,255,0.4)] scale-105'
                : 'bg-[#E4F3F7]/5 text-[#E4F3F7]/70 border border-[#E4F3F7]/10 hover:border-[#00CCFF]/50 hover:text-white'
            }`}
          >
            All Projects ({projects.reduce((acc, p) => acc + p.images.length, 0)} Photos)
          </button>

          {projects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => handleTabChange(proj.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-body tracking-wider uppercase transition-all duration-300 ${
                activeTab === proj.id
                  ? 'bg-[#00CCFF] text-[#060214] font-semibold shadow-[0_0_20px_rgba(0,204,255,0.4)] scale-105'
                  : 'bg-[#E4F3F7]/5 text-[#E4F3F7]/70 border border-[#E4F3F7]/10 hover:border-[#00CCFF]/50 hover:text-white'
              }`}
            >
              {proj.shortTitle || proj.title} ({proj.images.length} Photos)
            </button>
          ))}
        </div>

        {/* Selected Project Info Banner (if filtered to a specific project) */}
        {selectedProject && (
          <div className="mb-12 glass-card gold-border rounded-sm p-6 md:p-8 bg-[#060214]/80 backdrop-blur-md border border-[#00CCFF]/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00CCFF]/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="text-xs font-body tracking-[0.25em] text-[#00CCFF] uppercase px-3 py-1 rounded-full bg-[#00CCFF]/10 border border-[#00CCFF]/30">
                {selectedProject.category}
              </span>
              <span className="text-xs font-body tracking-widest text-[#E4F3F7]/60">
                Project #{selectedProject.number} · {selectedProject.year}
              </span>
            </div>

            <h2 className="font-display text-2xl md:text-4xl text-white mb-3">
              {selectedProject.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 my-4 border-y border-[#E4F3F7]/10 text-xs font-body">
              <div>
                <span className="text-[#E4F3F7]/50 block uppercase tracking-wider text-[0.65rem]">Location</span>
                <span className="text-[#E4F3F7] font-medium">{selectedProject.location}</span>
              </div>
              <div>
                <span className="text-[#E4F3F7]/50 block uppercase tracking-wider text-[0.65rem]">Client</span>
                <span className="text-[#E4F3F7] font-medium">{selectedProject.client}</span>
              </div>
              <div>
                <span className="text-[#E4F3F7]/50 block uppercase tracking-wider text-[0.65rem]">Duration</span>
                <span className="text-[#E4F3F7] font-medium">{selectedProject.duration}</span>
              </div>
              <div>
                <span className="text-[#E4F3F7]/50 block uppercase tracking-wider text-[0.65rem]">Status</span>
                <span className="text-[#00CCFF] font-semibold">✓ {selectedProject.status}</span>
              </div>
            </div>

            <p className="font-body text-[#E4F3F7]/80 text-sm leading-relaxed mb-4">
              {selectedProject.scope}
            </p>

            {selectedProject.processNote && (
              <div className="flex items-start gap-3 p-3 rounded bg-[#00CCFF]/10 border-l-2 border-[#00CCFF]">
                <svg className="flex-shrink-0 mt-0.5 text-[#00CCFF]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="font-body text-xs text-[#00CCFF]/90 leading-relaxed">
                  {selectedProject.processNote}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Gallery Image Grid */}
        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={`${item.projectId}-${idx}`}
                onClick={() =>
                  openLightbox(
                    galleryItems,
                    idx,
                    item.projectTitle
                  )
                }
                className="group relative h-64 rounded-sm overflow-hidden border border-[#E4F3F7]/10 bg-[#060214] cursor-pointer shadow-lg hover:border-[#00CCFF]/50 transition-all duration-300"
              >
                {/* Construction Image */}
                <img
                  src={item.src}
                  alt={`${item.projectTitle} construction photo ${item.index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060214]/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[0.65rem] font-body tracking-widest px-2.5 py-1 rounded bg-[#060214]/80 text-[#00CCFF] border border-[#00CCFF]/30 backdrop-blur-sm">
                    #{item.index + 1}
                  </span>
                  <span className="text-[0.65rem] font-body tracking-wider px-2 py-0.5 rounded bg-black/60 text-[#E4F3F7]/70 backdrop-blur-sm">
                    {item.location}
                  </span>
                </div>

                {/* Hover Zoom Icon & Title */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between transition-all duration-300 transform group-hover:translate-y-0">
                  <div>
                    <p className="font-display text-white text-sm line-clamp-1">
                      {item.projectTitle}
                    </p>
                    <p className="font-body text-[#E4F3F7]/60 text-[0.7rem]">
                      Click to view full screen
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#00CCFF] text-[#060214] flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-[#E4F3F7]/10 rounded">
            <p className="font-body text-[#E4F3F7]/60 text-base">No construction images found for this category.</p>
          </div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      {lightboxOpen && lightboxImages.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-[#060214]/98 backdrop-blur-2xl transition-opacity duration-300"
          onClick={(e) => e.target === e.currentTarget && setLightboxOpen(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4F3F7]/10 flex-shrink-0">
            <div>
              <span className="text-[#00CCFF] text-xs font-body uppercase tracking-[0.25em]">
                {lightboxTitle || 'Construction Progress'}
              </span>
              <p className="text-white text-sm font-display mt-0.5">
                Image {lightboxIndex + 1} of {lightboxImages.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[#E4F3F7]/50 text-xs font-body hidden sm:inline-block">
                Use ← → arrow keys to navigate
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full border border-[#E4F3F7]/20 flex items-center justify-center text-white hover:border-[#00CCFF] hover:bg-[#00CCFF]/10 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Viewer Area */}
          <div className="flex-1 relative flex items-center justify-center p-4 min-h-0">
            {/* Previous Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)}
              aria-label="Previous photo"
              className="absolute left-4 z-20 w-12 h-12 rounded-full bg-[#0D0524]/80 border border-[#E4F3F7]/20 text-white flex items-center justify-center hover:border-[#00CCFF] hover:bg-[#00CCFF]/20 transition-all duration-200 shadow-2xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Current Image */}
            <div className="max-w-5xl max-h-[75vh] w-full flex items-center justify-center relative">
              <img
                key={lightboxIndex}
                src={lightboxImages[lightboxIndex]?.src}
                alt={`${lightboxTitle} photo ${lightboxIndex + 1}`}
                className="max-h-[75vh] max-w-full object-contain rounded shadow-2xl transition-all duration-300 animate-fadeIn"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev + 1) % lightboxImages.length)}
              aria-label="Next photo"
              className="absolute right-4 z-20 w-12 h-12 rounded-full bg-[#0D0524]/80 border border-[#E4F3F7]/20 text-white flex items-center justify-center hover:border-[#00CCFF] hover:bg-[#00CCFF]/20 transition-all duration-200 shadow-2xl"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex-shrink-0 border-t border-[#E4F3F7]/10 px-6 py-4 overflow-x-auto bg-[#060214]/90">
            <div className="flex gap-2.5 w-max mx-auto">
              {lightboxImages.map((imgItem, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-14 h-11 rounded overflow-hidden transition-all duration-200 ${
                    idx === lightboxIndex
                      ? 'ring-2 ring-[#00CCFF] scale-105 opacity-100'
                      : 'opacity-40 hover:opacity-80'
                  }`}
                >
                  <img
                    src={imgItem.src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
