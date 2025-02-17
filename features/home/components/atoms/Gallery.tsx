import React from 'react';
import Image from 'next/image';

const images = [
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
];

function Gallery() {
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image src={image} alt={`Gallery image ${index + 1}`} width={300} height={200} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
