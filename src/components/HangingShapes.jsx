// HangingShapes.jsx
import React, { useState } from "react";
import "./HangingShapes.css";
import image1 from "../assets/car.jpg";
import image2 from "../assets/horse.jpg";
import image3 from "../assets/line_mountain.jpg";
import image4 from "../assets/oul.jpg";
import image5 from "../assets/sheep.avif";

const shapes = [
  { type: "circle", left: "10%", rope: "rope-1", image: image1 },
  { type: "square", left: "25%", rope: "rope-2", image: image2 },
  { type: "triangle", left: "40%", rope: "rope-3", image: image3 },
  { type: "diamond", left: "55%", rope: "rope-4", image: image4 },
  { type: "hexagon", left: "70%", rope: "rope-5", image: image5 },
  { type: "star", left: "85%", rope: "rope-6", image: image1 },
];

const badges = [
  { id: 1, name: "Prompt Explorer", icon: "🔍", unlocked: true },
  { id: 2, name: "Visual Storyteller", icon: "📚", unlocked: false },
  { id: 3, name: "Color Master", icon: "🎨", unlocked: false },
  { id: 4, name: "Detail Detective", icon: "🕵️", unlocked: false },
  { id: 5, name: "Creativity Wizard", icon: "🧙‍♀️", unlocked: false },
];

const feedbackMessages = [
  "Nice try! But maybe add more detail about colors 🌈",
  "Almost there, think about the background! ✨",
  "Great start! Try describing the lighting 💡",
  "Ooh, interesting! What about textures? 🖌️",
  "So close! Maybe mention the mood or style 🎭",
  "Fantastic effort! Add some action words 🚀",
];

export default function HangingShapes() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userBadges, setUserBadges] = useState(badges);
  const [attempts, setAttempts] = useState(0);

  const handleShapeClick = (image) => {
    setSelectedImage(image);
    setProgress(0);
    setFeedback("");
    setGeneratedImage(null);
  };

  const playFeedbackAudio = (message) => {
    // This would integrate with a text-to-speech API or audio files
    console.log("Playing audio:", message);
  };

  const updateBadges = () => {
    const newBadges = [...userBadges];
    if (attempts >= 3 && !newBadges[1].unlocked) {
      newBadges[1].unlocked = true;
      setUserBadges(newBadges);
    }
    if (prompt.includes("color") && !newBadges[2].unlocked) {
      newBadges[2].unlocked = true;
      setUserBadges(newBadges);
    }
    if (prompt.length > 50 && !newBadges[3].unlocked) {
      newBadges[3].unlocked = true;
      setUserBadges(newBadges);
    }
  };

  const handleGenerateClick = () => {
    if (!prompt.trim()) return;
    
    // Simulate AI image generation and progress calculation
    setAttempts(prev => prev + 1);
    
    // Mock progress calculation based on prompt length and keywords
    let mockProgress = Math.min(85, prompt.length * 2 + Math.random() * 20);
    if (prompt.includes("color")) mockProgress += 10;
    if (prompt.includes("background")) mockProgress += 10;
    if (prompt.includes("detail")) mockProgress += 5;
    
    setProgress(Math.min(100, mockProgress));
    
    // Random feedback message
    const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
    setFeedback(randomFeedback);
    playFeedbackAudio(randomFeedback);
    
    // Simulate generated image (using selected image as placeholder)
    setGeneratedImage(selectedImage);
    
    updateBadges();
    
    console.log("Generate image with prompt:", prompt);
  };

  return (
    <div className="container">
      <div className="ceiling"></div>
      
      {/* Title and Badges Section */}
      <div className="header-section">
        <h1 className="game-title">🎨 Visual Prompt Challenge ✨</h1>
        <div className="badges-container">
          {userBadges.map((badge) => (
            <div
              key={badge.id}
              className={`badge ${badge.unlocked ? 'unlocked' : 'locked'}`}
              title={badge.name}
            >
              <span className="badge-icon">{badge.icon}</span>
              <span className="badge-name">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="shapes-container">
        <h2 className="section-title">Choose your target image! 🎯</h2>
        {shapes.map((shape, index) => (
          <div
            className="hanging-system"
            style={{ left: shape.left }}
            key={index}
            onClick={() => handleShapeClick(shape.image)}
          >
            <div className="hook"></div>
            <div className={`swing-container ${shape.rope}`}>
              <div className="rope"></div>
              <div className={`shape ${shape.type}`}>
                <div className="shape-inner"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="main-content">
        <div className="left-panel">
          <div className="panel-card">
            <h3 className="panel-title">🎯 Target Image</h3>
            <div className="image-placeholder">
              {selectedImage ? (
                <div className="image-display">
                  <img src={selectedImage} alt="Target Image" />
                </div>
              ) : (
                <div className="placeholder-content">
                  <span className="placeholder-icon">🖼️</span>
                  <p>Select a target image above!</p>
                </div>
              )}
            </div>
            <div className="generation-controls">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you see... be creative! 🌟"
                className="prompt-input"
              />
              <button onClick={handleGenerateClick} className="generate-button">
                Generate Magic! ✨
              </button>
            </div>
          </div>
        </div>
        
        <div className="right-panel">
          <div className="panel-card">
            <h3 className="panel-title">🎨 Your Creation</h3>
            <div className="generated-image-placeholder">
              {generatedImage ? (
                <div className="image-display">
                  <img src={generatedImage} alt="Generated Image" />
                </div>
              ) : (
                <div className="placeholder-content">
                  <span className="placeholder-icon">✨</span>
                  <p>Your generated image will appear here!</p>
                </div>
              )}
            </div>
            
            {/* Progress Meter */}
            {progress > 0 && (
              <div className="progress-section">
                <div className="progress-label">
                  <span>Similarity Match</span>
                  <span className="progress-percentage">{Math.round(progress)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                  <div className="progress-sparkles">
                    <span className="sparkle">✨</span>
                    <span className="sparkle">⭐</span>
                    <span className="sparkle">💫</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Feedback Section */}
            <div className="feedback-placeholder">
              {feedback ? (
                <div className="feedback-content">
                  <div className="feedback-character">🎮</div>
                  <p className="feedback-text">{feedback}</p>
                </div>
              ) : (
                <div className="placeholder-content">
                  <span className="placeholder-icon">💬</span>
                  <p>Game feedback will appear here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
