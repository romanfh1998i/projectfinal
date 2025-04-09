import React, { useEffect, useRef, useState } from 'react';
import './VisualizerPage.css';

const VisualizerPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    // Initialize audio context
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);

    // Create analyser node
    const analyserNode = context.createAnalyser();
    analyserNode.fftSize = 256;
    setAnalyser(analyserNode);

    return () => {
      // Clean up
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      
      if (audioRef.current) {
        const fileURL = URL.createObjectURL(files[0]);
        audioRef.current.src = fileURL;
        audioRef.current.load();
      }
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioContext || !analyser) return;

    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    } else {
      // Resume audio context if it's suspended
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }

      // Connect audio element to analyser
      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      // Start playback
      audioRef.current.play();
      setIsPlaying(true);
      
      // Start visualization
      visualize();
    }
  };

  const visualize = () => {
    if (!canvasRef.current || !analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        // Create gradient for bars
        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, '#00f');
        gradient.addColorStop(0.5, '#0ff');
        gradient.addColorStop(1, '#f00');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  };

  return (
    <div className="visualizer-page">
      <h1>Visualizador de Sonido</h1>
      <p>Sube un archivo de audio para visualizar sus patrones de sonido</p>
      
      <div className="visualizer-container">
        <canvas ref={canvasRef} width={800} height={300} className="visualizer-canvas"></canvas>
        
        <div className="controls">
          <input 
            type="file" 
            accept="audio/*" 
            onChange={handleFileChange} 
            className="file-input"
          />
          
          <button 
            onClick={togglePlayback} 
            className="play-button"
            disabled={!selectedFile}
          >
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </button>
        </div>
        
        <audio ref={audioRef} className="audio-element"></audio>
      </div>
      
      <div className="instructions">
        <h2>Cómo usar el visualizador</h2>
        <ol>
          <li>Haz clic en "Elegir archivo" para seleccionar un archivo de audio de tu dispositivo</li>
          <li>Presiona el botón "Reproducir" para iniciar la visualización</li>
          <li>Observa cómo las barras se mueven al ritmo de la música</li>
          <li>Puedes pausar la reproducción en cualquier momento</li>
        </ol>
      </div>
    </div>
  );
};

export default VisualizerPage;