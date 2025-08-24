import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ReelsSection = styled.div`
  padding: 6rem 2rem 8rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary} 0%, ${({ theme }) => theme.colors.accent} 100%);
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const ReelsGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: 1800px;
  margin: 0 auto;
  flex-wrap: nowrap;
  
  @media (max-width: 1400px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 1200px) {
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ReelCard = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  cursor: pointer;
  background: #000;
  width: 200px;
  height: 300px;
  flex-shrink: 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05) rotate(0deg) !important;
    box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    z-index: 10;
  }
  
  @media (max-width: 1200px) {
    width: 160px;
    height: 240px;
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 180px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.7);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  opacity: ${({ isPlaying }) => isPlaying ? 0 : 1};
  transition: opacity 0.3s ease;
  pointer-events: none;
  
  &::before {
    content: '▶';
    margin-left: 3px;
  }
`;

const ReelInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
  padding: 2rem 1rem 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

const FallbackCard = styled(motion.div)`
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.light};
  aspect-ratio: 9/16;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  h4 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  p {
    opacity: 0.8;
    line-height: 1.5;
  }
`;

const ReelsGallery = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [videoErrors, setVideoErrors] = useState({});
  const [videoLoading, setVideoLoading] = useState({});
  const videoRefs = useRef([]);

  // Updated paths for your actual video files
  const reels = [
    {
      id: 1,
      src: '/reel1.mp4',
      title: 'Fresh Kurtos Making',
      description: 'Watch how we make our signature chimney cakes',
      rotate: -8
    },
    {
      id: 2,
      src: '/reel2.mp4',
      title: 'Coffee Art',
      description: 'Beautiful latte art by our skilled baristas',
      rotate: 5
    },
    {
      id: 3,
      src: '/reel3.mp4',
      title: 'Sweet Moments',
      description: 'Happy customers enjoying our treats',
      rotate: -3
    },
    {
      id: 4,
      src: '/reel4.mp4',
      title: 'Behind the Scenes',
      description: 'A day in the life at Kurtos cafe',
      rotate: 7
    },
    {
      id: 5,
      src: '/reel5.mp4',
      title: 'New Flavors',
      description: 'Taste our latest chimney cake flavors',
      rotate: -6
    },
    {
      id: 6,
      src: '/reel6.mp4',
      title: 'Cozy Atmosphere',
      description: 'Experience the warm vibe of our cafe',
      rotate: 4
    }
  ];

  const handleVideoHover = (index) => {
    const video = videoRefs.current[index];
    if (video && playingVideo !== index) {
      // Pause all other videos
      videoRefs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause();
        }
      });
      
      video.play();
      setPlayingVideo(index);
    }
  };

  const handleVideoLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0; // Reset to beginning
      setPlayingVideo(null);
    }
  };

  const handleVideoEnd = () => {
    setPlayingVideo(null);
  };

  return (
    <ReelsSection>
      <Title>Latest Reels from Our Kitchen</Title>
      <ReelsGrid>
        {reels.map((reel, index) => (
          <ReelCard
            key={reel.id}
            initial={{ opacity: 0, y: 30, rotate: reel.rotate + 10 }}
            whileInView={{ opacity: 1, y: 0, rotate: reel.rotate }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ transform: `rotate(${reel.rotate}deg)` }}
            onMouseEnter={() => handleVideoHover(index)}
            onMouseLeave={() => handleVideoLeave(index)}
          >
            <Video
              ref={el => videoRefs.current[index] = el}
              src={reel.src}
              muted
              playsInline
              loop
              onEnded={handleVideoEnd}
              onError={(e) => {
                console.error(`Error loading video ${reel.src}:`, e);
                setVideoErrors(prev => ({ ...prev, [index]: true }));
              }}
              onLoadStart={() => setVideoLoading(prev => ({ ...prev, [index]: true }))}
              onLoadedData={() => setVideoLoading(prev => ({ ...prev, [index]: false }))}
            />
            {videoErrors[index] && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.8)',
                padding: '1rem',
                borderRadius: '10px'
              }}>
                <p>Video unavailable</p>
                <button 
                  onClick={() => {
                    setVideoErrors(prev => ({ ...prev, [index]: false }));
                    const video = videoRefs.current[index];
                    if (video) video.load();
                  }}
                  style={{
                    background: '#E75480',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Retry
                </button>
              </div>
            )}
            {videoLoading[index] && !videoErrors[index] && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                background: 'rgba(0,0,0,0.8)',
                padding: '1rem',
                borderRadius: '10px'
              }}>
                Loading...
              </div>
            )}
            <PlayOverlay isPlaying={playingVideo === index} />
            <ReelInfo>
              <h4>{reel.title}</h4>
              <p>{reel.description}</p>
            </ReelInfo>
          </ReelCard>
        ))}
      </ReelsGrid>
    </ReelsSection>
  );
};

export default ReelsGallery;
