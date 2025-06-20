import React, { useState, useEffect, useRef } from "react";
import './Maze.css';
import blackCar from './Black.png';
import redCar from './Red.png';
import blueCar from './Blue.png';
import greenCar from './Green.png';
import purpleCar from './Purple.png';
import navyCar from './Navy.png';
import orangeCar from './Orange.png';

const Maze1 = () => {
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    );
    const [selectedCarColor, setSelectedCarColor] = useState("black");
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);


const handleColorChange = (event) => {
        setSelectedCarColor(event.target.value);
    };

    const getCarImage = () => {
        switch (selectedCarColor) {
            case "red": return redCar;
            case "blue": return blueCar;
            case "green": return greenCar;
            case "purple": return purpleCar;
            case "orange": return orangeCar;
            case "navy": return navyCar;
            default: return blackCar;
        }
    };

// Keypress, movement and collision handling
const [carPosition, setCarPosition] = useState({ x: 8, y: 8 });
const [carDirection, setCarDirection] = useState("right"); // Default direction
const moveStep = 10; // Movement step size
const [walls, setWalls] = useState([]);

useEffect(() => {
    const newWalls = [
        {
            walls: [
                 // outside borders
                 { x: 0, y: 30, width: 4, height: 600 }, // left wall
                 { x: 0, y: 0, width: 633, height: 4 }, // top wall
                 { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                 { x: 629, y: 0, width: 4, height: 600 }, // right wall
             
                 // exit walls
                { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                { x: 630, y: 605, width: 2, height: 20 }, // finish point barrier
             
                 // first line vertical walls
                 { x: 90, y: 0, width: 2, height: 60 },
            ],
            exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit position for this stage
        },
        {
            walls: [
                 // outside borders
                 { x: 0, y: 30, width: 4, height: 600 }, // left wall
                 { x: 0, y: 0, width: 633, height: 4 }, // top wall
                 { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                 { x: 629, y: 0, width: 4, height: 600 }, // right wall
             
                 // exit walls
                { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                { x: 630, y: 605, width: 2, height: 20 }, // finish point barrier
             
                 // first line vertical walls
                 { x: 90, y: 0, width: 2, height: 60 },
            ],
            exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit position for this stage
        },
        {
            walls: [
                 // outside borders
                 { x: 0, y: 30, width: 4, height: 600 }, // left wall
                 { x: 0, y: 0, width: 633, height: 4 }, // top wall
                 { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                 { x: 629, y: 0, width: 4, height: 600 }, // right wall
             
                 // exit walls
                { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                { x: 630, y: 605, width: 2, height: 20 }, // finish point barrier
             
                 // first line vertical walls
                 { x: 90, y: 0, width: 2, height: 60 },
            ],
            exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit position for this stage
        },
    ];

    setWalls(newWalls);
}, []);

const checkCollision = (newX, newY) => {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];

        if (
            newX < wall.x + wall.width &&
            newX + 21 > wall.x && // Assuming car width
            newY < wall.y + wall.height &&
            newY + 16 > wall.y // Assuming car height
        ) {
            console.log(`🚧 Collision with Wall ${i + 1}: { x: ${wall.x}, y: ${wall.y}, width: ${wall.width}, height: ${wall.height} }`);
            return true; // Collision detected
        }
    }
    return false; // No collision
};


const handleKeyPress = (event) => {
    let newX = carPosition.x;
    let newY = carPosition.y;
    let newDirection = carDirection; // Declare newDirection

    if (event.key === "ArrowUp") {
        newY -= moveStep;
        newDirection = "up";
    }
    if (event.key === "ArrowDown") {
        newY += moveStep;
        newDirection = "down";
    }
    if (event.key === "ArrowLeft") {
        newX -= moveStep;
        newDirection = "left";
    }
    if (event.key === "ArrowRight") {
        newX += moveStep;
        newDirection = "right";
    }

    console.log(`Trying to move to (${newX}, ${newY}), Direction: ${newDirection}`);

    if (!checkCollision(newX, newY)) {
        setCarPosition({ x: newX, y: newY });
        setCarDirection(newDirection); // Update direction
        console.log(`Moved to (${newX}, ${newY})`);
    } else {
        console.log("Movement blocked due to collision.");
    }
};

useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
}, [carPosition, carDirection]);

useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "navy";

    // Draw walls from state
    walls.forEach((wall) => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}, [walls]);



    return (
        <div className="maze-container">
            <div className="panel-container">
                <div className="game_area_heading">Setting</div>
                <div className="set_item">
                    <label className="menu-label">Background</label>
                    <select className="background_color">
                        <option value=""></option>
                    </select>
                </div>
                <div className="set_item">
                    <label className="menu-label">Wall</label>
                    <select className="wall_color">
                        <option value=""></option>
                    </select>
                </div>
               
                <div className="set_item">
                    <label className="menu-label">Character Color</label>
                    <select id="character_color" value={selectedCarColor} onChange={handleColorChange}>
                        <option value="black">Black</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="navy">Navy</option>
                    </select>
                </div>
                <div className="set_item">
                    <label>Track</label>
                    <select id="track_type">
                        <option value=""></option>
                    </select>
                </div>
                <div className="set_item">
                    <label className="music">Music</label>
                    <select id="song_list">
                        <option value="">Song 1</option>
                        <option value="">Song 2</option>
                        <option value="">Song 3</option>
                        <option value="">Song 4</option>
                    </select>
                </div>
                <div className="live_container">
                    <label className="live_count">Live</label>
                    <span className="lives">0</span>
                </div>
                <div className="timer_container">
                    <label className="timer_count">Time</label>
                    <div className="time_value" id="time_value">{currentTime}</div>
                </div>
                <div className="stopwatch_container">
                    <span className="timer_name">Timer</span>
                    <span className="timer_number">00:00</span>
                </div>
                <div className="stage_container">
                    <span className="stage">Stage</span>
                    <span className="stage_number">1</span>
                </div>
            </div>
            <div className="display_container">
            <div className="display_area">
            <div className="markscontainer">
                <span className="startmark">START</span>
                <span className="finishmark">FINISH</span>
            </div>
                            
                    {/* Canvas for game rendering */}
                    <canvas
                    ref={canvasRef}
                    width={633}  // Exact match with display_area
                    height={633} // Exact match with display_area
                    className="game-canvas"
                />

                    {/* Character image */}
                    <img
                        src={getCarImage()}
                        alt="car"
                        className="car"
                        style={{ 
                        left: `${carPosition.x}px`, 
                        top: `${carPosition.y}px`,
                        transform: 
            carDirection === "up" ? "rotate(270deg)" :
            carDirection === "right" ? "rotate(0deg)" :
            carDirection === "down" ? "rotate(90deg)" :
            "rotate(180deg)" // Left 
            }}
                    />
                    </div>
            
            </div>
        </div>
    );
};

export default Maze1;