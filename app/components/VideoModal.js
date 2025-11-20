'use client';

export default function VideoModal() {
    const openModal = () => {
        const modal = document.getElementById('videoModal');
        if (modal) modal.style.display = 'flex';
    };

    const closeModal = () => {
        const modal = document.getElementById('videoModal');
        const video = document.getElementById('customVideo');
        if (modal) modal.style.display = 'none';
        if (video) video.pause();
    };

    const handleBackdropClick = (e) => {
        if (e.target.id === 'videoModal') {
            closeModal();
        }
    };

    return (
        <>
            {/* Video Play Button */}
            <button
                className="play-btn custom-video-btn background-image"
                onClick={openModal}
            >
                <i className="fas fa-solid fa-play"></i>
            </button>

            {/* Custom Video Modal */}
            <div id="videoModal" className="video-modal" onClick={handleBackdropClick}>
                <div className="video-modal-content">
                    <button className="video-modal-close" onClick={closeModal}>
                        <i className="fas fa-times"></i>
                    </button>
                    <video id="customVideo" controls autoPlay>
                        <source src="https://pub-136a6ffe10df4ddd84e9c429892fb554.r2.dev/Avid.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </>
    );
}
