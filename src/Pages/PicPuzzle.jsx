import React, { useEffect, useState } from 'react';
import './PicPuzzle.css';
import { Link } from 'react-router-dom';
import AnimalOne from './Animal1.png';
import AnimalTwo from './Animal2.png';
import AnimalThree from './Animal3.png';
import AnimalFour from './Animal4.png';
import AnimalFive from './Animal5.png';
import AnimalSix from './Animal6.png';
import AnimalSeven from './Animal7.png';
import AnimalEight from './Animal8.png';


const gridSize = 5;
const tileSize = 160;
const totalTiles = gridSize * gridSize;

const imageStages = [AnimalOne, AnimalTwo, AnimalThree, AnimalFour, AnimalFive, AnimalSix, AnimalSeven, AnimalEight]; // Extend this list

const PicPuzzle = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(totalTiles - 1);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const currentImage = imageStages[currentStage];

  useEffect(() => {
    const shuffled = shuffleTiles(totalTiles);
    setTiles(shuffled);
    setEmptyIndex(shuffled.indexOf(totalTiles - 1));
    setIsSolved(false);
  }, [currentStage]);

  const shuffleTiles = (count) => {
    const arr = Array.from({ length: count }, (_, i) => i);
    for (let i = arr.length - 2; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const handleTileClick = (index) => {
    if (canMove(index, emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setEmptyIndex(index);
  
      const solved = newTiles.every((val, idx) => val === idx);
      if (solved) {
        setIsSolved(true);
        // Auto-advance to next puzzle after 1.5 seconds
        setTimeout(() => {
          if (currentStage < imageStages.length - 1) {
            setCurrentStage((prev) => prev + 1);
          }
        }, 1500);
      }
    }
  };
  

  const canMove = (index, empty) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(empty / gridSize);
    const emptyCol = empty % gridSize;
    return Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
  };

  const handleReveal = () => {
    setIsRevealed(true);
    setTimeout(() => setIsRevealed(false), 3000);
  };

  const handleNext = () => {
    if (currentStage < imageStages.length - 1) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handlePrev = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };

  return (
    <>
     <Link to="/">
            <button>Home</button>
            </Link>
      <div className="puzzle-info-container">
        <div className="left-container">
          <button className="previous" onClick={handlePrev} disabled={currentStage === 0}>
            PREV
          </button>
        </div>
        <div className="puzzle-info">
          <h2 className="puzzle-pages">Picture Puzzle {currentStage + 1}</h2>
        </div>
        <div className="right-container">
          <button
            className="next"
            onClick={handleNext}
            disabled={currentStage === imageStages.length - 1}
          >
            NEXT
          </button>
        </div>
      </div>

      <div className="puzzle-container" style={{ width: gridSize * tileSize }}>
        {tiles.map((tile, index) => {
          const row = Math.floor(tile / gridSize);
          const col = tile % gridSize;

          return (
            <div
              key={index}
              className={`tile ${tile === totalTiles - 1 ? 'empty' : ''}`}
              style={{
                width: tileSize,
                height: tileSize,
                backgroundImage: tile === totalTiles - 1 ? 'none' : `url(${currentImage})`,
                backgroundSize: `${gridSize * tileSize}px ${gridSize * tileSize}px`,
                backgroundPosition: `-${col * tileSize}px -${row * tileSize}px`,
                visibility: isRevealed ? 'hidden' : 'visible',
              }}
              onClick={() => handleTileClick(index)}
            />
          );
        })}

        {isSolved && <div className="win-banner">🎉 Puzzle Solved!</div>}

        {isRevealed && (
          <img
            src={currentImage}
            alt="Full"
            className="full-reveal"
            style={{
              width: gridSize * tileSize,
              height: gridSize * tileSize,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 5,
              opacity: 0.95,
            }}
          />
        )}
      </div>

      <div className="reveal-container">
        <button className="reveal" onClick={handleReveal}>
          Reveal
        </button>
      </div>
    </>
  );
};

export default PicPuzzle;
