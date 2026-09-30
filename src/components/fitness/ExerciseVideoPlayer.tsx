import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, Volume2, Volume1, VolumeX, 
  Maximize, Minimize, RotateCcw, FastForward,
  Sparkles, AlertCircle
} from 'lucide-react';
import { ExerciseVideoInfo } from '../../data/exerciseVideos';

interface ExerciseVideoPlayerProps {
  exercise: ExerciseVideoInfo;
  autoPlay?: boolean;
}

export const ExerciseVideoPlayer: React.FC<ExerciseVideoPlayerProps> = ({
  exercise,
  autoPlay = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState(0);

  // Combine primary videoUrl and fallbackUrls
  const allSources = [
    exercise.videoUrl,
    ...(exercise.fallbackUrls || [])
  ];

  const currentSource = allSources[activeSourceIndex] || exercise.videoUrl;

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Play / Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Seek handler
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  // Jump forwards / backwards
  const handleSkip = (seconds: number) => {
    if (!videoRef.current) return;
    const targetTime = Math.min(Math.max(0, videoRef.current.currentTime + seconds), duration || 100);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  // Volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
    }
  };

  // Mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume > 0 ? volume : 0.8;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Speed change cycle: 1x -> 1.25x -> 1.5x -> 0.75x -> 1x
  const handleSpeedCycle = () => {
    const speeds = [1, 1.25, 1.5, 0.75];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Handle source error to try next source
  const handleVideoError = () => {
    if (activeSourceIndex < allSources.length - 1) {
      setActiveSourceIndex(prev => prev + 1);
    } else {
      setHasError(true);
      setIsBuffering(false);
    }
  };

  // Sync state on timeupdate
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => setCurrentTime(video.currentTime);
    const onLoadedMetadata = () => {
      setDuration(video.duration);
      setHasError(false);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => setIsBuffering(false);
    const onEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('ended', onEnded);
    };
  }, [currentSource]);

  // Handle fullscreenchange listener
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Controls auto-hide timer
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3500);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/30 shadow-2xl group select-none"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        key={currentSource}
        src={currentSource}
        playsInline
        autoPlay={autoPlay}
        onError={handleVideoError}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Buffering Indicator */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs pointer-events-none">
          <div className="w-12 h-12 rounded-full border-3 border-emerald-400 border-t-transparent animate-spin" />
        </div>
      )}

      {/* Error / Fallback Card */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/90 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-emerald-400" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            {exercise.name} Demonstration
          </h4>
          <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
            Follow the guided step-by-step instructions below for optimal form and safety.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setActiveSourceIndex(0);
              if (videoRef.current) {
                videoRef.current.load();
                videoRef.current.play().catch(() => {});
              }
            }}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Retry Video
          </button>
        </div>
      )}

      {/* Center Big Play Button Overlay (when paused) */}
      {!isPlaying && !hasError && (
        <div 
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] cursor-pointer transition-all duration-300 hover:bg-slate-950/30"
        >
          <div className="relative group/play flex items-center justify-center">
            <div className="absolute -inset-2 rounded-full bg-emerald-500/30 blur-md group-hover/play:bg-emerald-400/50 transition-all" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-xl text-slate-950 transform group-hover/play:scale-110 transition-transform">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-slate-950 ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Top Overlay Badge */}
      <div 
        className={`absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
            {exercise.name} Demo
          </span>
        </div>

        {exercise.category && (
          <div className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-700/60 text-[11px] font-semibold text-teal-300">
            {exercise.category}
          </div>
        )}
      </div>

      {/* Bottom Custom Controls Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 sm:p-4 space-y-2 transition-opacity duration-300 ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar / Seek Timeline */}
        <div className="relative flex items-center group/timeline">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Seek video"
            className="w-full h-1.5 sm:h-2 bg-slate-800/80 rounded-full appearance-none cursor-pointer accent-emerald-400 focus:outline-none z-10"
          />
          <div 
            className="absolute left-0 top-0 bottom-0 h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 pointer-events-none"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Control Buttons Row */}
        <div className="flex items-center justify-between gap-2 pt-1 text-white">
          {/* Left: Play/Pause, Replay 5s, Time */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-slate-950 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950 ml-0.5" />
              )}
            </button>

            <button
              onClick={() => handleSkip(-5)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors hidden sm:inline-flex"
              title="Rewind 5s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleSkip(5)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors hidden sm:inline-flex"
              title="Fast Forward 5s"
            >
              <FastForward className="w-4 h-4" />
            </button>

            {/* Time Display */}
            <div className="text-xs font-semibold text-slate-300 tracking-wider">
              <span className="text-emerald-300">{formatTime(currentTime)}</span>
              <span className="text-slate-500 mx-1">/</span>
              <span>{formatTime(duration || 0)}</span>
            </div>
          </div>

          {/* Right: Volume, Speed, Fullscreen */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Volume Control */}
            <div className="flex items-center gap-1.5 group/vol">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : volume < 0.5 ? (
                  <Volume1 className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Volume slider"
                className="w-12 sm:w-16 h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-400 hidden sm:inline-block"
              />
            </div>

            {/* Speed Selector */}
            <button
              onClick={handleSpeedCycle}
              className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700/70 text-[11px] font-bold text-slate-200 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors cursor-pointer"
              title="Change Speed"
            >
              {playbackSpeed}x
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
