import React, { useState, useRef, useEffect } from "react";
import "./WordPuzzle.css";
import { Link } from "react-router-dom";

// Define multiple puzzles
const puzzles = [
  {
    id: 1,
    letters: [
     "P", "R", "O", "M", "P", "T", "Z", "J", "T", "K", "O", "N", "J", "M", "R",
     "I", "P", "K", "A", "G", "H", "O", "J", "B", "A", "J", "V", "U", "D", "S",
     "O", "R", "G", "E", "N", "E", "F", "F", "E", "C", "T", "U", "A", "T", "E",
     "N", "O", "E", "G", "X", "C", "X", "X", "F", "G", "B", "V", "I", "O", "K",
     "E", "M", "F", "I", "N", "T", "R", "O", "D", "U", "C", "E", "N", "J", "I",
     "E", "O", "F", "P", "R", "O", "D", "U", "C", "E", "Q", "Y", "E", "W", "D",
     "R", "T", "E", "X", "K", "D", "E", "Y", "A", "W", "M", "U", "S", "Q", "N",
     "S", "E", "C", "H", "B", "L", "N", "W", "N", "A", "M", "O", "S", "L", "I",
     "R", "A", "T", "C", "F", "S", "C", "R", "J", "C", "A", "B", "O", "U", "T",
     "E", "E", "Z", "G", "O", "A", "O", "B", "M", "N", "K", "K", "V", "Z", "T",
     "R", "C", "A", "C", "U", "D", "U", "Q", "S", "T", "E", "P", "T", "U", "S",
     "B", "A", "Z", "X", "N", "O", "R", "Z", "P", "X", "U", "F", "R", "Y", "O",
     "M", "T", "A", "H", "D", "K", "A", "V", "A", "C", "R", "E", "A", "T", "E",
     "B", "B", "R", "I", "N", "G", "G", "J", "W", "C", "A", "X", "G", "K", "W",
     "S", "A", "P", "U", "U", "M", "E", "E", "N", "S", "C", "A", "U", "S", "E"
    ],
    words: ["EFFECTUATE", "ENCOURAGE", "PROMOTE", "PIONEER", "INTRODUCE", "CREATE", "PRODUCE", "PROMPT", "EFFECT", "ABOUT", "BRING", "FOUND", "CAUSE", "SPAWN", "MAKE"]
  },
  {
    id: 2,
    letters: [
      "U", "X", "H", "F", "Y", "R", "O", "W", "Y", "J", "B", "U", "R", "T", "T",
      "V", "Q", "J", "T", "B", "R", "E", "E", "D", "O", "I", "Z", "N", "C", "T",
      "R", "B", "A", "C", "C", "E", "S", "S", "O", "R", "I", "E", "S", "K", "O",
      "F", "G", "N", "Q", "J", "I", "D", "E", "C", "I", "D", "E", "Y", "K", "P",
      "F", "E", "I", "T", "T", "N", "I", "A", "Z", "I", "R", "Z", "R", "P", "S",
      "Y", "N", "K", "C", "R", "V", "F", "E", "W", "N", "N", "L", "E", "F", "T",
      "O", "E", "E", "P", "A", "O", "F", "P", "K", "D", "A", "Z", "S", "E", "A",
      "Y", "R", "S", "N", "N", "K", "B", "M", "U", "U", "F", "G", "U", "Z", "R",
      "I", "A", "S", "D", "S", "E", "P", "L", "V", "C", "I", "V", "L", "J", "T",
      "E", "T", "T", "F", "L", "Y", "W", "J", "E", "E", "Q", "L", "T", "B", "W",
      "L", "E", "Y", "O", "A", "B", "E", "G", "E", "T", "Z", "G", "W", "F", "P",
      "D", "J", "L", "R", "T", "Z", "O", "C", "C", "A", "S", "I", "O", "N", "K",
      "G", "Q", "E", "T", "E", "G", "K", "H", "N", "N", "F", "N", "X", "N", "G",
      "L", "L", "S", "H", "Z", "T", "N", "N", "U", "E", "W", "B", "J", "Y", "S",
      "F", "M", "A", "S", "S", "E", "M", "B", "L", "E", "D", "L", "B", "D", "N"

    ],
    words: ["ACCESSORIES", "TRANSLATE", "GENERATE", "YIELD", "ASSEMBLE", "RESULT", "OCCASSION", "START", "DECIDE", "INVOKE", "INDUCE", "FORTH", "BEGET", "BREED", "STYLE"]
  },
  {
    id: 3,
    letters: [
     "H", "W", "Q", "K", "G", "G", "U", "M", "A", "K", "E", "U", "P", "W", "D",
     "L", "I", "F", "E", "S", "T", "Y", "L", "E", "W", "K", "W", "A", "K", "G",
     "I", "Z", "A", "A", "P", "P", "A", "R", "E", "L", "T", "P", "I", "U", "Q",
     "B", "U", "A", "H", "M", "N", "P", "D", "S", "N", "E", "A", "K", "E", "R",
     "O", "F", "B", "Q", "Y", "L", "U", "X", "U", "R", "Y", "K", "D", "U", "Z",
     "S", "L", "C", "O", "S", "T", "U", "M", "E", "V", "Y", "V", "M", "C", "N",
     "V", "X", "O", "A", "W", "Y", "R", "U", "N", "W", "A", "Y", "W", "V", "Y",
     "K", "X", "U", "J", "T", "M", "E", "T", "I", "Q", "U", "E", "T", "T", "E",
     "R", "R", "T", "U", "C", "B", "U", "C", "F", "S", "N", "E", "B", "N", "D",
      "A", "N", "U", "R", "H", "L", "D", "A", "N", "C", "E", "Q", "D", "G", "R",
      "T", "E", "R", "A", "Z", "N", "G", "G", "P", "U", "B", "U", "O", "H", "E",
      "T", "M", "E", "S", "G", "R", "O", "O", "M", "I", "N", "G", "E", "X", "S",
      "I", "X", "S", "Q", "V", "O", "U", "G", "U", "E", "V", "I", "C", "U", "S",
      "R", "E", "H", "R", "R", "Z", "D", "F", "S", "T", "Y", "L", "I", "S", "T",
      "E", "V", "Q", "R", "Z", "L", "I", "Y", "L", "U", "C", "G", "S", "S", "O" 
    ],
    words: ["ETIQUEETTE", "LIFESTYLE", "GROOMING", "SNEAKER", "COSTUME", "STYLIST", "APPAREL", "COUTURE", "LUXURY", "VOUGUE", "RUNWAY", "MAKEUP", "ATTIRE", "DANCE", "DRESS"]
  },
  {
    id: 4,
    letters: [],
    words: []
  },
  {
    id: 5,
    letters: [],
    words: []
  },
];

const WordPuzzle = () => {
  // Puzzle state
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const currentPuzzle = puzzles[currentPuzzleIndex];
  
  // Selection state
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [foundLetterIndices, setFoundLetterIndices] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [selectionPath, setSelectionPath] = useState([]);
  const [directionLock, setDirectionLock] = useState(null);
  const [originCenter, setOriginCenter] = useState(null);
  
  // Refs
  const containerRef = useRef(null);
  const isMouseDown = useRef(false);

  // Reset states when puzzle changes
  useEffect(() => {
    setFoundWords([]);
    setFoundLetterIndices([]);
    setSelectedLetters([]);
    setShowCompletion(false);
    setDirectionLock(null);
  }, [currentPuzzleIndex]);

  // Check if all words are found
  const checkCompletion = () => {
    return currentPuzzle.words.every(word => 
      foundWords.includes(word.toUpperCase())
    );
  };

  // Mouse down handler
  const handleMouseDown = (index, e) => {
    isMouseDown.current = true;
    setIsSelecting(true);
    setSelectedLetters([index]);
    setSelectionPath([index]);
    
    // Track origin point
    const rect = e.target.getBoundingClientRect();
    setOriginCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setDirectionLock(null);
  };

  // Mouse enter handler
  const handleMouseEnter = (index, e) => {
    if (!isMouseDown.current || !isSelecting) return;

    const lastIndex = selectionPath[selectionPath.length - 1];
    const isAdjacent = checkAdjacent(lastIndex, index);
    
    if (isAdjacent) {
      const rect = e.target.getBoundingClientRect();
      const currentCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      // Calculate direction if starting new selection
      if (selectionPath.length === 1) {
        const newDirection = calculateDirection(originCenter, currentCenter);
        setDirectionLock(newDirection);
      }

      // Check if we're backtracking
      if (selectionPath.length > 1 && selectionPath[selectionPath.length - 2] === index) {
        const newPath = [...selectionPath];
        newPath.pop();
        setSelectionPath(newPath);
        setSelectedLetters(newPath);
      } 
      // Or moving forward in the same direction
      else if (!selectionPath.includes(index)) {
        const newPath = [...selectionPath, index];
        setSelectionPath(newPath);
        setSelectedLetters(newPath);
      }
    }
  };

  // Mouse up handler
  const handleMouseUp = () => {
    if (isSelecting && selectedLetters.length > 1) {
      checkWord();
      if (checkCompletion()) {
        setShowCompletion(true);
      }
    }
    setIsSelecting(false);
    isMouseDown.current = false;
    setSelectionPath([]);
  };

  // Check if two indices are adjacent
  const checkAdjacent = (index1, index2) => {
    const row1 = Math.floor(index1 / 15);
    const col1 = index1 % 15;
    const row2 = Math.floor(index2 / 15);
    const col2 = index2 % 15;
    
    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);
  
    return (
      (rowDiff <= 1 && colDiff <= 1) && // Adjacent cells
      (
        rowDiff === 0 || // Horizontal
        colDiff === 0 || // Vertical
        (rowDiff === 1 && colDiff === 1) // Perfect diagonal
      )
    );
  };

  // Calculate direction between two points
  const calculateDirection = (start, end) => {
    if (!start || !end) return null;
    
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    const directions = {
      0: 'east',
      45: 'southeast',
      90: 'south',
      135: 'southwest',
      180: 'west',
      '-45': 'northeast',
      '-90': 'north',
      '-135': 'northwest'
    };
    
    const snappedAngle = Math.round(angle / 45) * 45;
    return directions[snappedAngle] || null;
  };

  // Check if selected letters form a valid word
  const checkWord = () => {
    const word = selectedLetters
      .map(index => currentPuzzle.letters[index])
      .join('')
      .toUpperCase();

    const reversedWord = word.split('').reverse().join('');

    if (currentPuzzle.words.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setFoundLetterIndices([...foundLetterIndices, ...selectedLetters]);
      highlightFoundWord(word);
    } else if (currentPuzzle.words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
      setFoundWords([...foundWords, reversedWord]);
      setFoundLetterIndices([...foundLetterIndices, ...selectedLetters]);
      highlightFoundWord(reversedWord);
    }

    setSelectedLetters([]);
  };

  // Highlight found word in the list
  const highlightFoundWord = (word) => {
    const wordElements = document.querySelectorAll('.words');
    wordElements.forEach(el => {
      if (el.textContent.toUpperCase() === word) {
        el.style.textDecoration = 'line-through';
        el.style.color = 'green';
      }
    });
  };

  // Navigation functions
  const goToNextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    } else {
      alert("You've reached the last puzzle!");
    }
  };

  const goToPrevPuzzle = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(currentPuzzleIndex - 1);
    } else {
      alert("This is the first puzzle!");
    }
  };

  const moveToNextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    } else {
      alert("Congratulations! You've completed all puzzles!");
    }
  };

  // Global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isMouseDown.current) {
        handleMouseUp();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isSelecting, selectedLetters]);

  return (
    <>
 <Link to="/">
            <button>Home</button>
            </Link>
      <div className="puzzle-info-container">
        <div className="left-container">
          <button 
            className="previous" 
            onClick={goToPrevPuzzle}
            disabled={currentPuzzleIndex === 0}
          >
            PREV
          </button>
        </div>
        <div className="puzzle-info">
          <h2 className="puzzle-pages">Puzzle {currentPuzzleIndex + 1} of {puzzles.length}</h2>
          <p className="words-count">Words found: {foundWords.length}/{currentPuzzle.words.length}</p>
        </div>
        <div className="right-container">
          <button 
            className="next" 
            onClick={goToNextPuzzle}
            disabled={currentPuzzleIndex === puzzles.length - 1}
          >
            NEXT
          </button>
        </div>
      </div>

      <div 
        className="crossword-container" 
        ref={containerRef}
        onMouseUp={handleMouseUp}
      >
        {currentPuzzle.letters.map((letter, index) => (  
          <span
            key={index}
            className={`letters ${
              selectedLetters.includes(index) ? 'selected' : ''
            } ${
              foundLetterIndices.includes(index) ? 'found' : ''
            }`}
            onMouseDown={(e) => handleMouseDown(index, e)}
            onMouseEnter={(e) => handleMouseEnter(index, e)}
          >
            {letter}
          </span>
        ))}
      </div>

      {showCompletion && (
        <div className="completion-modal">
          <h3>Puzzle Complete!</h3>
          <button onClick={moveToNextPuzzle}>
            {currentPuzzleIndex < puzzles.length - 1 
              ? "Next Puzzle" 
              : "Finish Game"}
          </button>
        </div>
      )}

      <ol className="word-list">
        {currentPuzzle.words.map((word, index) => (
          <li 
            key={index} 
            className={`words ${
              foundWords.includes(word.toUpperCase()) ? 'found' : ''
            }`}
          >
            {word.toUpperCase()} 
          </li>
        ))}
      </ol>
    </>
  );
};

export default WordPuzzle;