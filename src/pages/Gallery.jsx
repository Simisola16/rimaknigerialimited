import React from 'react';
import { useNavigate } from 'react-router-dom';
import galleryImage from '../assets/gallery_mockup.png';

export default function Gallery() {
  const navigate = useNavigate();
  return (
    <section className="relative bg-[#0D0524] py-28 section-base lg:min-h-screen flex items-center justify-center">
      <div className="section-padding relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[#FFFFFF] mb-8">
          Project Gallery
        </h1>
        <img src={galleryImage} alt="Project gallery" className="w-full rounded-sm shadow-lg" />
        <p className="font-body text-[#E4F3F7]/80 mt-6">
          Explore more of our completed projects in the gallery. Click below to return to the portfolio.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary mt-6"
        >
          Back to Portfolio
        </button>
      </div>
    </section>
  );
}
