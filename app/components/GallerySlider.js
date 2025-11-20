'use client';

import { useState } from 'react';

export default function GallerySlider() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        '/assets/img/product/1.png',
        '/assets/img/product/2.png',
        '/assets/img/product/3.png',
        '/assets/img/product/4.png'
    ];

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            {/* Gallery Slider */}
            <div className="gallery-slider-container">
                <div className="gallery-slider" id="gallerySlider" data-slide-show="4" data-lg-slide-show="3" data-md-slide-show="2" data-sm-slide-show="1">
                    {images.map((image, index) => (
                        <div key={index} className="gallery-item" onClick={() => openLightbox(index)}>
                            <div className="gallery-image-wrapper">
                                <img src={image} alt={`Gallery ${index + 1}`} />
                                <div className="gallery-overlay">
                                    <i className="fas fa-search-plus"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-4">
                    <button onClick={() => openLightbox(0)} className="btn">
                        Open Gallery
                    </button>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div className="gallery-lightbox" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <i className="fas fa-times"></i>
                    </button>
                    <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={images[currentIndex]} alt={`Gallery ${currentIndex + 1}`} />
                    </div>
                    <div className="lightbox-counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}
