import React, { useState, useEffect, useRef } from "react";
import './Maze.css';
import { Link } from "react-router-dom";
import blackCar from './Black.png';
import redCar from './Red.png';
import blueCar from './Blue.png';
import greenCar from './Green.png';
import purpleCar from './Purple.png';
import navyCar from './Navy.png';
import orangeCar from './Orange.png';
import upButton from './Up.png';
import downButton from './Down.png';
import leftButton from './Left.png';
import rightButton from './Right.png';


const Maze = () => {

       // set current time
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
const [stageIndex, setStageIndex] = useState(0);
const [walls, setWalls] = useState([]); // Set initial walls


useEffect(() => { 
    // walls nexted arrays
const newWalls = [
           {       
            walls: [ // walls for stage one
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
                    { x: 240, y: 0, width: 2, height: 30 },
                    { x: 420, y: 0, width: 2, height: 60 },

                    // first line horizontal walls
                    { x: 0, y: 30, width: 60, height: 2 },
                    { x: 120, y: 30, width: 60, height: 2 },
                    { x: 240, y: 30, width: 30, height: 2 },
                    { x: 300, y: 30, width: 90, height: 2 },
                    { x: 450, y: 30, width: 120, height: 2 },

                    // second line vertical walls
                    { x: 120, y: 30, width: 2, height: 60 },
                    { x: 150, y: 30, width: 2, height: 60 },
                    { x: 210, y: 30, width: 2, height: 30 },
                    { x: 270, y: 30, width: 2, height: 30 },
                    { x: 330, y: 30, width: 2, height: 120 },
                    { x: 450, y: 30, width: 2, height: 30 },
                    { x: 510, y: 30, width: 2, height: 60 },
                    { x: 600, y: 30, width: 2, height: 30 },

                    // second line horizontal walls
                    { x: 30, y: 60, width: 60, height: 2 },
                    { x: 180, y: 60, width: 60, height: 2 },
                    { x: 270, y: 60, width: 30, height: 2 },
                    { x: 360, y: 60, width: 90, height: 2 },
                    { x: 540, y: 60, width: 60, height: 2 },

                    // third line vertical walls
                    { x: 240, y: 60, width: 2, height: 30 },
                    { x: 300, y: 60, width: 2, height: 30 },
                    { x: 360, y: 60, width: 2, height: 60 },
                    { x: 480, y: 60, width: 2, height: 30 },
                    { x: 570, y: 60, width: 2, height: 60 },

                    // third line horizontal walls
                    { x: 30, y: 90, width: 90, height: 2 },
                    { x: 150, y: 90, width: 60, height: 2 },
                    { x: 240, y: 90, width: 30, height: 2 },
                    { x: 390, y: 90, width: 90, height: 2 },
                    { x: 510, y: 90, width: 30, height: 2 },
                    { x: 600, y: 90, width: 30, height: 2 },

                    // fourth line vertical walls
                    { x: 210, y: 90, width: 2, height: 30 },
                    { x: 270, y: 90, width: 2, height: 60 },
                    { x: 450, y: 90, width: 2, height: 30 },

                    // fourth line horizontal walls
                    { x: 0, y: 120, width: 240, height: 2 },
                    { x: 270, y: 120, width: 30, height: 2 },
                    { x: 360, y: 120, width: 30, height: 2 },
                    { x: 450, y: 120, width: 150, height: 2 },

                    // fifth line vertical walls
                    { x: 240, y: 120, width: 2, height: 60 },
                    { x: 390, y: 120, width: 2, height: 120 },
                    { x: 420, y: 120, width: 2, height: 30 },
                    { x: 480, y: 120, width: 2, height: 60 },
                    { x: 540, y: 120, width: 2, height: 60 },
                    { x: 600, y: 120, width: 2, height: 60 },

                    // fifth line horizontal walls
                    { x: 30, y: 150, width: 180, height: 2 },
                    { x: 270, y: 150, width: 90, height: 2 },
                    { x: 420, y: 150, width: 30, height: 2 },

                    // sixth line vertical walls
                    { x: 30, y: 150, width: 2, height: 90 },
                    { x: 300, y: 150, width: 2, height: 90 },
                    { x: 450, y: 150, width: 2, height: 60 },
                    { x: 510, y: 150, width: 2, height: 90 },
                    { x: 570, y: 150, width: 2, height: 60 },

                    // sixth line horizontal walls
                    { x: 60, y: 180, width: 210, height: 2 },
                    { x: 330, y: 180, width: 90, height: 2 },
                    { x: 540, y: 180, width: 30, height: 2 },

                    // seventh line vertical walls
                    { x: 270, y: 180, width: 2, height: 30 },
                    { x: 330, y: 180, width: 2, height: 30 },
                    { x: 420, y: 180, width: 2, height: 30 },

                    // seventh line horizontal walls
                    { x: 60, y: 210, width: 180, height: 2 },
                    { x: 450, y: 210, width: 90, height: 2 },
                    { x: 570, y: 210, width: 60, height: 2 },

                    // eighth line vertical walls
                    { x: 60, y: 210, width: 2, height: 60 },
                    { x: 180, y: 210, width: 2, height: 30 },
                    { x: 240, y: 210, width: 2, height: 30 },
                    { x: 360, y: 210, width: 2, height: 60 },
                    { x: 540, y: 210, width: 2, height: 150 },

                    // eighth line horizontal walls
                    { x: 30, y: 240, width: 30, height: 2 },
                    { x: 90, y: 240, width: 60, height: 2 },
                    { x: 240, y: 240, width: 120, height: 2 },
                    { x: 390, y: 240, width: 90, height: 2 },
                    { x: 540, y: 240, width: 60, height: 2 },
                    
                    // nineth line vertical walls
                    { x: 90, y: 240, width: 2, height: 60 },
                    { x: 150, y: 240, width: 2, height: 30 },
                    { x: 210, y: 240, width: 2, height: 30 },
                    { x: 450, y: 240, width: 2, height: 150 },
                    { x: 480, y: 240, width: 2, height: 30 },
                    { x: 600, y: 240, width: 2, height: 30 },

                    // nineth line horizontal walls
                    { x: 120, y: 270, width: 150, height: 2 },
                    { x: 300, y: 270, width: 120, height: 2 },
                    { x: 480, y: 270, width: 30, height: 2 },

                    // tenth line vertical walls
                    { x: 30, y: 270, width: 2, height: 60 },
                    { x: 180, y: 270, width: 2, height: 30 },
                    { x: 270, y: 270, width: 2, height: 30 },
                    { x: 330, y: 270, width: 2, height: 30 },
                    { x: 420, y: 270, width: 2, height: 60 },
                    { x: 510, y: 270, width: 2, height: 60 },
                    { x: 570, y: 270, width: 2, height: 120 },

                    // tenth line horizontal walls
                    { x: 30, y: 300, width: 90, height: 2 },
                    { x: 180, y: 300, width: 60, height: 2 },
                    { x: 270, y: 300, width: 30, height: 2 },
                    { x: 390, y: 300, width: 30, height: 2 },
                    { x: 450, y: 300, width: 30, height: 2 },
                    { x: 570, y: 300, width: 30, height: 2 },

                    // eleventh line vertical walls
                    { x: 150, y: 300, width: 2, height: 30 },
                    { x: 240, y: 300, width: 2, height: 60 },
                    { x: 300, y: 300, width: 2, height: 60 },
                    { x: 360, y: 300, width: 2, height: 120 },

                    // eleventh line horizontal walls
                    { x: 60, y: 330, width: 150, height: 2 },
                    { x: 240, y: 330, width: 30, height: 2 },
                    { x: 300, y: 330, width: 90, height: 2 },
                    { x: 480, y: 330, width: 30, height: 2 },
                    { x: 600, y: 330, width: 30, height: 2 },

                    // twelveth line vertical walls
                    { x: 60, y: 330, width: 2, height: 90 },
                    { x: 90, y: 330, width: 2, height: 60 },
                    { x: 180, y: 330, width: 2, height: 90 },
                    { x: 390, y: 330, width: 2, height: 30 },
                    { x: 480, y: 330, width: 2, height: 30 },

                    // tweleveth line horizontal walls
                    { x: 0, y: 360, width: 60, height: 2 },
                    { x: 210, y: 360, width: 30, height: 2 },
                    { x: 390, y: 360, width: 60, height: 2 },
                    { x: 510, y: 360, width: 30, height: 2 },
                    { x: 570, y: 360, width: 30, height: 2 },

                    // thirteenth line vertical walls
                    { x: 120, y: 360, width: 2, height: 60 },
                    { x: 150, y: 360, width: 2, height: 30 },
                    { x: 210, y: 360, width: 2, height: 30 },
                    { x: 270, y: 360, width: 2, height: 150 },
                    { x: 330, y: 360, width: 2, height: 30 },
                    { x: 510, y: 360, width: 2, height: 90 },
                    { x: 600, y: 360, width: 2, height: 30 },

                    // thirteenth line horizontal walls
                    { x: 150, y: 390, width: 30, height: 2 },
                    { x: 210, y: 390, width: 30, height: 2 },
                    { x: 270, y: 390, width: 60, height: 2 },
                    { x: 390, y: 390, width: 60, height: 2 },
                    { x: 480, y: 390, width: 30, height: 2 },
                    { x: 540, y: 390, width: 30, height: 2 },

                    // fourteenth line vertical walls
                    { x: 30, y: 390, width: 2, height: 210 },
                    { x: 240, y: 390, width: 2, height: 90 },
                    { x: 540, y: 390, width: 2, height: 30 },

                    // fourteenth line horizontal walls
                    { x: 60, y: 420, width: 90, height: 2 },
                    { x: 180, y: 420, width: 30, height: 2 },
                    { x: 300, y: 420, width: 60, height: 2 },
                    { x: 390, y: 420, width: 90, height: 2 },
                    { x: 540, y: 420, width: 90, height: 2 },

                    // fifteenth line vertical walls
                    { x: 210, y: 420, width: 2, height: 30 },
                    { x: 300, y: 420, width: 2, height: 60 },
                    { x: 390, y: 420, width: 2, height: 30 },
                    { x: 420, y: 420, width: 2, height: 180 },
                    { x: 480, y: 420, width: 2, height: 30 },

                    // fifteenth line horizontal walls
                    { x: 30, y: 450, width: 30, height: 2 },
                    { x: 90, y: 450, width: 120, height: 2 },
                    { x: 300, y: 450, width: 60, height: 2 },
                    { x: 480, y: 450, width: 120, height: 2 },

                    // sixteenth line vertical walls
                    { x: 90, y: 450, width: 2, height: 90 },
                    { x: 180, y: 450, width: 2, height: 60 },
                    { x: 360, y: 450, width: 2, height: 90 },
                    { x: 450, y: 450, width: 2, height: 30 },
                    { x: 600, y: 450, width: 2, height: 60 },

                    // sixteenth line horizontal walls
                    { x: 60, y: 480, width: 30, height: 2 },
                    { x: 120, y: 480, width: 30, height: 2 },
                    { x: 210, y: 480, width: 30, height: 2 },
                    { x: 360, y: 480, width: 30, height: 2 },
                    { x: 450, y: 480, width: 120, height: 2 },

                    // seventeeth line vertical walls
                    { x: 120, y: 480, width: 2, height: 30 },
                    { x: 150, y: 480, width: 2, height: 90 },
                    { x: 210, y: 480, width: 2, height: 60 },
                    { x: 330, y: 480, width: 2, height: 120 },
                    { x: 390, y: 480, width: 2, height: 30 },
                    { x: 480, y: 480, width: 2, height: 60 },
                    { x: 570, y: 480, width: 2, height: 60 },

                    // seventeenth line horizontal walls
                    { x: 30, y: 510, width: 30, height: 2 },
                    { x: 240, y: 510, width: 90, height: 2 },
                    { x: 420, y: 510, width: 30, height: 2 },
                    { x: 510, y: 510, width: 30, height: 2 },

                    // eighteenth line vertical walls
                    { x: 240, y: 510, width: 2, height: 90 },
                    { x: 510, y: 510, width: 2, height: 60 },

                    // eighteenth line horizontal walls
                    { x: 30, y: 540, width: 90, height: 2 },
                    { x: 150, y: 540, width: 60, height: 2 },
                    { x: 240, y: 540, width: 30, height: 2 },
                    { x: 360, y: 540, width: 60, height: 2 },
                    { x: 450, y: 540, width: 30, height: 2 },
                    { x: 570, y: 540, width: 30, height: 2 },

                    // nineteenth line vertical walls
                    { x: 300, y: 540, width: 2, height: 30 },
                    { x: 450, y: 540, width: 2, height: 90 },
                    { x: 540, y: 540, width: 2, height: 60 },
                    { x: 600, y: 540, width: 2, height: 60 },

                    // nineteenth line horizontal walls
                    { x: 60, y: 570, width: 90, height: 2 },
                    { x: 180, y: 570, width: 30, height: 2 },
                    { x: 270, y: 570, width: 120, height: 2 },
                    { x: 480, y: 570, width: 30, height: 2 },
                    { x: 540, y: 570, width: 30, height: 2 },

                    // twentieth line vertical walls
                    { x: 60, y: 570, width: 2, height: 30 },
                    { x: 120, y: 570, width: 2, height: 30 },
                    { x: 180, y: 570, width: 2, height: 30 },
                    { x: 270, y: 570, width: 2, height: 30 },
                    { x: 480, y: 570, width: 2, height: 60 },

                    // twentieth line horizontal walls
                    { x: 120, y: 600, width: 60, height: 2 },
                    { x: 210, y: 600, width: 30, height: 2 },
                    { x: 360, y: 600, width: 60, height: 2 },
                    { x: 510, y: 600, width: 90, height: 2 },

                    // twenty-first line vertical walls
                    { x: 90, y: 600, width: 2, height: 30 },
                    { x: 210, y: 600, width: 2, height: 30 },
                    { x: 300, y: 600, width: 2, height: 30 },

                  ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit position for this stage
        },
        {
            walls: [ // walls for stage two
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 },
                
                    // first line vertical walls
                    { x: 60, y: 0, width: 2, height: 60 },
                    { x: 180, y: 0, width: 2, height: 30 },
                    { x: 240, y: 0, width: 2, height: 150 },
                    { x: 300, y: 0, width: 2, height: 30 },
                    { x: 360, y: 0, width: 2, height: 90 },
                
                    // first line horizontal walls
                    { x: 0, y: 30, width: 30, height: 2 },
                    { x: 90, y: 30, width: 60, height: 2 },
                    { x: 360, y: 30, width: 240, height: 2 },
                
                    // second line vertical walls
                    { x: 150, y: 30, width: 2, height: 30 },
                    { x: 210, y: 30, width: 2, height: 120 },
                    { x: 270, y: 30, width: 2, height: 30 },
                    { x: 330, y: 30, width: 2, height: 30 },
                    { x: 570, y: 30, width: 2, height: 60 },
                
                    // second line horizontal walls
                    { x: 0, y: 60, width: 30, height: 2 },
                    { x: 90, y: 60, width: 30, height: 2 },
                    { x: 150, y: 60, width: 60, height: 2 },
                    { x: 270, y: 60, width: 90, height: 2 },
                    { x: 390, y: 60, width: 150, height: 2 },
                    { x: 600, y: 60, width: 30, height: 2 },
                
                    // third line vertical walls
                    { x: 30, y: 60, width: 2, height: 30 },
                    { x: 120, y: 60, width: 2, height: 210 },
                    { x: 390, y: 60, width: 2, height: 30 },
                    { x: 480, y: 60, width: 2, height: 120 },
                
                    // third line horizontal walls
                    { x: 30, y: 90, width: 60, height: 2 },
                    { x: 120, y: 90, width: 60, height: 2 },
                    { x: 270, y: 90, width: 30, height: 2 },
                    { x: 330, y: 90, width: 30, height: 2 },
                    { x: 390, y: 90, width: 60, height: 2 },
                    { x: 510, y: 90, width: 90, height: 2 },
                
                    // fourth line vertical walls
                    { x: 60, y: 90, width: 2, height: 180 },
                    { x: 180, y: 90, width: 2, height: 60 },
                    { x: 270, y: 90, width: 2, height: 120 },
                    { x: 300, y: 90, width: 2, height: 60 },
                    { x: 330, y: 90, width: 2, height: 60 },
                    { x: 510, y: 90, width: 2, height: 60 },
                
                    // fourth line horizontal walls
                    { x: 0, y: 120, width: 30, height: 2 },
                    { x: 90, y: 120, width: 30, height: 2 },
                    { x: 360, y: 120, width: 90, height: 2 },
                    { x: 540, y: 120, width: 90, height: 2 },
                
                    // fifth line vertical walls
                    { x: 150, y: 120, width: 2, height: 150 },
                    { x: 450, y: 120, width: 2, height: 30 },
                    { x: 570, y: 120, width: 2, height: 30 },
                
                    // fifth line horizontal walls
                    { x: 30, y: 150, width: 60, height: 2 },
                    { x: 210, y: 150, width: 30, height: 2 },
                    { x: 330, y: 150, width: 120, height: 2 },
                
                    // sixth line vertical walls
                    { x: 540, y: 150, width: 2, height: 30 },
                    { x: 600, y: 150, width: 2, height: 30 },
                
                    // sisth line horizontal walls
                    { x: 0, y: 180, width: 30, height: 2 },
                    { x: 90, y: 180, width: 30, height: 2 },
                    { x: 150, y: 180, width: 450, height: 2 },
                
                    // seventh line vertical wall
                    { x: 210, y: 180, width: 2, height: 30 },
                    { x: 330, y: 180, width: 2, height: 60 },
                
                    // seventh line horizontal wall
                    { x: 30, y: 210, width: 60, height: 2 },
                    { x: 360, y: 210, width: 270, height: 2 },
                
                    // eight line vertical wall
                    { x: 180, y: 210, width: 2, height: 30 },
                    { x: 240, y: 210, width: 2, height: 30 },
                    { x: 300, y: 210, width: 2, height: 30 },
                    { x: 360, y: 210, width: 2, height: 90 },
                    { x: 390, y: 210, width: 2, height: 60 },
                    { x: 450, y: 210, width: 2, height: 30 },
                    { x: 510, y: 210, width: 2, height: 30 },
                    { x: 570, y: 210, width: 2, height: 30 },
                
                        // eight line horizontal wall
                    { x: 0, y: 240, width: 30, height: 2 },
                    { x: 60, y: 240, width: 60, height: 2 },
                    { x: 180, y: 240, width: 150, height: 2 },
                
                    // ninth line vertical waLL
                    { x: 420, y: 240, width: 2, height: 60 },
                    { x: 480, y: 240, width: 2, height: 90 },
                    { x: 540, y: 240, width: 2, height: 30 },
                    { x: 600, y: 240, width: 2, height: 30 },
                
                    // ninth line horizontal wall
                    { x: 30, y: 270, width: 30, height: 2 },
                    { x: 120, y: 270, width: 30, height: 2 },
                    { x: 180, y: 270, width: 150, height: 2 },
                    { x: 420, y: 270, width: 180, height: 2 },
                
                    // tenth line vertical wall
                    { x: 90, y: 270, width: 2, height: 30 },
                    { x: 180, y: 270, width: 2, height: 30 },
                    { x: 240, y: 270, width: 2, height: 30 },
                    { x: 300, y: 270, width: 2, height: 120 },
                
                    // tenth line horizontal wall
                    { x: 0, y: 300, width: 90, height: 2 },
                    { x: 120, y: 300, width: 60, height: 2 },
                    { x: 240, y: 300, width: 30, height: 2 },
                    { x: 300, y: 300, width: 120, height: 2 },
                    { x: 510, y: 300, width: 120, height: 2 },
                
                    // eleventh line vertical wall
                    { x: 210, y: 300, width: 2, height: 30 },
                    { x: 270, y: 300, width: 2, height: 240 },
                    { x: 450, y: 300, width: 2, height: 90 },
                
                    // eleventh line horizontal wall
                    { x: 30, y: 330, width: 210, height: 2 },
                    { x: 330, y: 330, width: 90, height: 2 },
                    { x: 480, y: 330, width: 120, height: 2 },
                
                    // twelveth line vertical wall
                    { x: 30, y: 330, width: 2, height: 210 },
                    { x: 90, y: 330, width: 2, height: 60 },
                    { x: 240, y: 330, width: 2, height: 210 },
                    { x: 330, y: 330, width: 2, height: 30 },
                    { x: 420, y: 330, width: 2, height: 30 },
                    { x: 600, y: 330, width: 2, height: 30 },
                
                    // twelveth line horizontal wall
                    { x: 120, y: 360, width: 30, height: 2 },
                    { x: 180, y: 360, width: 30, height: 2 },
                    { x: 330, y: 360, width: 30, height: 2 },
                    { x: 390, y: 360, width: 30, height: 2 },
                    { x: 450, y: 360, width: 120, height: 2 },
                
                    // thirteenth line vertical wall
                    { x: 60, y: 360, width: 2, height: 60 },
                    { x: 150, y: 360, width: 2, height: 60 },
                    { x: 180, y: 360, width: 2, height: 210 },
                    { x: 210, y: 360, width: 2, height: 180 },
                    { x: 360, y: 360, width: 2, height: 90 },
                    { x: 570, y: 360, width: 2, height: 30 },
                
                    // thirteenth line horizontal wall
                    { x: 90, y: 390, width: 30, height: 2 },
                    { x: 300, y: 390, width: 30, height: 2 },
                    { x: 390, y: 390, width: 60, height: 2 },
                    { x: 480, y: 390, width: 60, height: 2 },
                    { x: 570, y: 390, width: 60, height: 2 },
                
                    // fourteenth line vertical wall
                    { x: 330, y: 390, width: 2, height: 30 },
                    { x: 390, y: 390, width: 2, height: 60 },
                    { x: 480, y: 390, width: 2, height: 30 },
                    { x: 540, y: 390, width: 2, height: 90 },
                
                    // fourteenth line horizontal wall
                    { x: 30, y: 420, width: 120, height: 2 },
                    { x: 420, y: 420, width: 60, height: 2 },
                    { x: 540, y: 420, width: 60, height: 2 },
                
                    // fifteenth line vertical wall
                    { x: 300, y: 420, width: 2, height: 120 },
                    { x: 420, y: 420, width: 2, height: 30 },
                    { x: 510, y: 420, width: 2, height: 90 },
                    { x: 600, y: 420, width: 2, height: 30 },
                
                    // fifteenth line horizontal wall
                    { x: 60, y: 450, width: 30, height: 2 },
                    { x: 120, y: 450, width: 60, height: 2 },
                    { x: 330, y: 450, width: 30, height: 2 },
                    { x: 390, y: 450, width: 30, height: 2 },
                    { x: 450, y: 450, width: 30, height: 2 },
                
                    // sixteenth line vertical wall
                    { x: 90, y: 450, width: 2, height: 30 },
                    { x: 120, y: 450, width: 2, height: 90 },
                    { x: 330, y: 450, width: 2, height: 60 },
                    { x: 450, y: 450, width: 2, height: 30 },
                    { x: 480, y: 450, width: 2, height: 90 },
                    { x: 570, y: 450, width: 2, height: 60 },
                
                    // sixteenth line horizontal wall
                    { x: 30, y: 480, width: 60, height: 2 },
                    { x: 360, y: 480, width: 90, height: 2 },
                    { x: 570, y: 480, width: 60, height: 2 },
                
                    // seventeenth line vertical wall
                    { x: 150, y: 480, width: 2, height: 60 },
                
                    // seventeenth line horizontal wall
                    { x: 60, y: 510, width: 30, height: 2 },
                    { x: 330, y: 510, width: 150, height: 2 },
                    { x: 510, y: 510, width: 60, height: 2 },
                
                    // eighteenth line vertical wall
                    { x: 60, y: 510, width: 2, height: 60 },
                    { x: 600, y: 510, width: 2, height: 90 },
                
                    // eighteenth line horizontal wall
                    { x: 90, y: 540, width: 60, height: 2 },
                    { x: 240, y: 540, width: 30, height: 2 },
                    { x: 300, y: 540, width: 90, height: 2 },
                    { x: 420, y: 540, width: 150, height: 2 },
                
                    // nineteenth line vertical wall
                    { x: 390, y: 540, width: 2, height: 90 },
                    { x: 420, y: 540, width: 2, height: 60 },
                    { x: 570, y: 540, width: 2, height: 60 },
                
                    // nineteenth line horizontal wall
                    { x: 0, y: 570, width: 360, height: 2 },
                    { x: 450, y: 570, width: 120, height: 2 },
                
                    // twentieth line vertical wall
                    { x: 300, y: 570, width: 2, height: 30 },
                    { x: 360, y: 570, width: 2, height: 30 },
                
                    // twentieth line horizontal wall
                    { x: 30, y: 600, width: 240, height: 2 },
                    { x: 420, y: 600, width: 120, height: 2 },
                    { x: 600, y: 600, width: 30, height: 2 },
                
                    // twenty-first line vertical wall
                    { x: 270, y: 600, width: 2, height: 30 },
                    { x: 330, y: 600, width: 2, height: 30 },
                    { x: 540, y: 600, width: 2, height: 30 },
            ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit position for this stage
        },
        {
            walls: [ // walls for stage three
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 }, // end exit barrier
                
                    // first line vertical walls
                    { x: 180, y: 0, width: 2, height: 30 },
                    { x: 240, y: 0, width: 2, height: 90 },
                    { x: 300, y: 0, width: 2, height: 30 },
                    { x: 360, y: 0, width: 2, height: 90 },
                    { x: 450, y: 0, width: 2, height: 90 },
                
                    // first line horizontal walls
                    { x: 0, y: 30, width: 90, height: 2 },
                    { x: 120, y: 30, width: 30, height: 2 },
                    { x: 180, y: 30, width: 30, height: 2 },
                    { x: 300, y: 30, width: 30, height: 2 },
                    { x: 450, y: 30, width: 150, height: 2 },
                
                    // second line vertical walls
                    { x: 120, y: 30, width: 2, height: 30 },
                    { x: 150, y: 30, width: 2, height: 30 },
                    { x: 270, y: 30, width: 2, height: 60 },
                    { x: 330, y: 30, width: 2, height: 30 },
                    { x: 390, y: 30, width: 2, height: 30 },
                    { x: 420, y: 30, width: 2, height: 150 },
                
                    // second line horizontal walls
                    { x: 30, y: 60, width: 90, height: 2 },
                    { x: 150, y: 60, width: 60, height: 2 },
                    { x: 300, y: 60, width: 30, height: 2 },
                    { x: 360, y: 60, width: 30, height: 2 },
                    { x: 480, y: 60, width: 120, height: 2 },
                
                    // third line vertical walls
                    { x: 30, y: 60, width: 2, height: 60 },
                    { x: 210, y: 60, width: 2, height: 30 },
                    { x: 480, y: 60, width: 2, height: 60 },
                    { x: 510, y: 60, width: 2, height: 30 },
                    { x: 600, y: 60, width: 2, height: 30 },
                
                    // third line horizontal walls
                    { x: 30, y: 90, width: 120, height: 2 },
                    { x: 180, y: 90, width: 30, height: 2 },
                    { x: 270, y: 90, width: 90, height: 2 },
                    { x: 390, y: 90, width: 30, height: 2 },
                    { x: 540, y: 90, width: 30, height: 2 },
                
                    // fourth line vertical walls
                    { x: 150, y: 90, width: 2, height: 60 },
                    { x: 180, y: 90, width: 2, height: 150 },
                    { x: 390, y: 90, width: 2, height: 30 },
                    { x: 540, y: 90, width: 2, height: 30 },
                    { x: 570, y: 90, width: 2, height: 30 },
                
                    // fourth line horizontal walls
                    { x: 60, y: 120, width: 60, height: 2 },
                    { x: 210, y: 120, width: 180, height: 2 },
                    { x: 420, y: 120, width: 60, height: 2 },
                    { x: 510, y: 120, width: 30, height: 2 },
                    { x: 570, y: 120, width: 60, height: 2 },
                
                    // fifth line vertical walls
                    { x: 60, y: 120, width: 2, height: 60 },
                    { x: 210, y: 120, width: 2, height: 90 },
                    { x: 270, y: 120, width: 2, height: 30 },
                    { x: 510, y: 120, width: 2, height: 30 },
                
                    // fifth line horizontal walls
                    { x: 30, y: 150, width: 30, height: 2 },
                    { x: 90, y: 150, width: 60, height: 2 },
                    { x: 240, y: 150, width: 30, height: 2 },
                    { x: 300, y: 150, width: 60, height: 2 },
                    { x: 450, y: 150, width: 120, height: 2 },
                
                    // sixth line vertical walls
                    { x: 30, y: 150, width: 2, height: 30 },
                    { x: 120, y: 150, width: 2, height: 180 },
                    { x: 300, y: 150, width: 2, height: 90 },
                    { x: 390, y: 150, width: 2, height: 30 },
                    { x: 480, y: 150, width: 2, height: 60 },
                    { x: 600, y: 150, width: 2, height: 30 },
                
                    // sixth line horizontal walls
                    { x: 60, y: 180, width: 30, height: 2 },
                    { x: 210, y: 180, width: 90, height: 2 },
                    { x: 330, y: 180, width: 120, height: 2 },
                    { x: 510, y: 180, width: 120, height: 2 },
                
                    // seventh line vertical walls
                    { x: 90, y: 180, width: 2, height: 30 },
                    { x: 150, y: 180, width: 2, height: 30 },
                    { x: 450, y: 180, width: 2, height: 120 },
                
                    // seventh line horizontal walls
                    { x: 0, y: 210, width: 30, height: 2 },
                    { x: 60, y: 210, width: 30, height: 2 },
                    { x: 150, y: 210, width: 30, height: 2 },
                    { x: 240, y: 210, width: 30, height: 2 },
                    { x: 300, y: 210, width: 60, height: 2 },
                    { x: 480, y: 210, width: 30, height: 2 },
                    { x: 540, y: 210, width: 60, height: 2 },
                
                    // eighth line vertical walls
                    { x: 60, y: 210, width: 2, height: 60 },
                    { x: 240, y: 210, width: 2, height: 30 },
                    { x: 270, y: 210, width: 2, height: 60 },
                    { x: 360, y: 210, width: 2, height: 30 },
                    { x: 390, y: 210, width: 2, height: 30 },
                    { x: 420, y: 210, width: 2, height: 30 },
                    { x: 510, y: 210, width: 2, height: 60 },
                    { x: 540, y: 210, width: 2, height: 60 },
                
                    // eighth line horizontal walls
                    { x: 30, y: 240, width: 30, height: 2 },
                    { x: 90, y: 240, width: 30, height: 2 },
                    { x: 180, y: 240, width: 60, height: 2 },
                    { x: 360, y: 240, width: 30, height: 2 },
                    { x: 450, y: 240, width: 30, height: 2 },
                    { x: 570, y: 240, width: 30, height: 2 },
                
                    // ninth line vertical walls
                    { x: 150, y: 240, width: 2, height: 30 },
                    { x: 330, y: 240, width: 2, height: 30 },
                    { x: 600, y: 240, width: 2, height: 60 },
                
                    // ninth line horizontal walls
                    { x: 0, y: 270, width: 30, height: 2 },
                    { x: 60, y: 270, width: 30, height: 2 },
                    { x: 150, y: 270, width: 30, height: 2 },
                    { x: 210, y: 270, width: 240, height: 2 },
                    { x: 480, y: 270, width: 90, height: 2 },
                
                    // tenth line vertical walls
                    { x: 90, y: 270, width: 2, height: 30 },
                    { x: 180, y: 270, width: 2, height: 30 },
                    { x: 390, y: 270, width: 2, height: 30 },
                
                    // tenth line horizontal walls
                    { x: 0, y: 300, width: 90, height: 2 },
                    { x: 120, y: 300, width: 30, height: 2 },
                    { x: 180, y: 300, width: 120, height: 2 },
                    { x: 330, y: 300, width: 60, height: 2 },
                    { x: 420, y: 300, width: 180, height: 2 },
                
                    // eleventh line vertical walls
                    { x: 150, y: 300, width: 2, height: 60 },
                    { x: 210, y: 300, width: 2, height: 30 },
                    { x: 300, y: 300, width: 2, height: 120 },
                    { x: 420, y: 300, width: 2, height: 60 },
                    { x: 570, y: 300, width: 2, height: 60 },
                
                    // eleventh line horizontal walls
                    { x: 30, y: 330, width: 90, height: 2 },
                    { x: 180, y: 330, width: 30, height: 2 },
                    { x: 240, y: 330, width: 30, height: 2 },
                    { x: 330, y: 330, width: 90, height: 2 },
                    { x: 480, y: 330, width: 60, height: 2 },
                    { x: 600, y: 330, width: 30, height: 2 },
                
                    // twelveth line vertical walls
                    { x: 60, y: 330, width: 2, height: 120 },
                    { x: 90, y: 330, width: 2, height: 30 },
                    { x: 180, y: 330, width: 2, height: 30 },
                    { x: 270, y: 330, width: 2, height: 30 },
                    { x: 390, y: 330, width: 2, height: 90 },
                    { x: 450, y: 330, width: 2, height: 60 },
                    { x: 480, y: 330, width: 2, height: 30 },
                    { x: 540, y: 330, width: 2, height: 30 },
                
                    // twelveth line horizontal walls
                    { x: 210, y: 360, width: 60, height: 2 },
                    { x: 300, y: 360, width: 60, height: 2 },
                    { x: 540, y: 360, width: 60, height: 2 },
                
                    // thirteenth line vertical walls
                    { x: 30, y: 360, width: 2, height: 150 },
                    { x: 120, y: 360, width: 2, height: 30 },
                    { x: 210, y: 360, width: 2, height: 60 },
                    { x: 360, y: 360, width: 2, height: 60 },
                    { x: 510, y: 360, width: 2, height: 30 },
                    { x: 600, y: 360, width: 2, height: 90 },
                
                    // thirteenth line horizontal walls
                    { x: 60, y: 390, width: 120, height: 2 },
                    { x: 240, y: 390, width: 60, height: 2 },
                    { x: 330, y: 390, width: 30, height: 2 },
                    { x: 390, y: 390, width: 90, height: 2 },
                    { x: 510, y: 390, width: 60, height: 2 },
                
                    // fourteenth line vertical walls
                    { x: 270, y: 390, width: 2, height: 210 },
                    { x: 480, y: 390, width: 2, height: 30 },
                    { x: 540, y: 390, width: 2, height: 30 },
                
                    // fourteenth line horizontal walls
                    { x: 90, y: 420, width: 150, height: 2 },
                    { x: 420, y: 420, width: 30, height: 2 },
                    { x: 480, y: 420, width: 60, height: 2 },
                
                    // fifteenth line vertical walls
                    { x: 150, y: 420, width: 2, height: 60 },
                    { x: 180, y: 420, width: 2, height: 90 },
                    { x: 330, y: 420, width: 2, height: 30 },
                    { x: 420, y: 420, width: 2, height: 30 },
                    { x: 570, y: 420, width: 2, height: 60 },
                
                    // fifteenth line horizontal walls
                    { x: 60, y: 450, width: 60, height: 2 },
                    { x: 210, y: 450, width: 390, height: 2 },
                
                    // sixteenth line vertical walls
                    { x: 120, y: 450, width: 2, height: 30 },
                    { x: 390, y: 450, width: 2, height: 30 },
                
                    // sixteenth line horizontal walls
                    { x: 60, y: 480, width: 60, height: 2 },
                    { x: 180, y: 480, width: 60, height: 2 },
                    { x: 300, y: 480, width: 60, height: 2 },
                    { x: 420, y: 480, width: 120, height: 2 },
                    { x: 600, y: 480, width: 30, height: 2 },
                
                    // seventeenth line vertical walls
                    { x: 240, y: 480, width: 2, height: 30 },
                    { x: 360, y: 480, width: 2, height: 30 },
                    { x: 420, y: 480, width: 2, height: 30 },
                    { x: 450, y: 480, width: 2, height: 30 },
                    { x: 540, y: 480, width: 2, height: 90 },
                    { x: 600, y: 480, width: 2, height: 30 },
                
                    // seventeenth line horizontal walls
                    { x: 30, y: 510, width: 150, height: 2 },
                    { x: 270, y: 510, width: 60, height: 2 },
                    { x: 360, y: 510, width: 60, height: 2 },
                    { x: 540, y: 510, width: 60, height: 2 },
                
                    // eighteenth line vertical walls
                    { x: 90, y: 510, width: 2, height: 60 },
                    { x: 150, y: 510, width: 2, height: 60 },
                    { x: 210, y: 510, width: 2, height: 30 },
                    { x: 330, y: 510, width: 2, height: 30 },
                    { x: 390, y: 510, width: 2, height: 60 },
                    { x: 480, y: 510, width: 2, height: 90 },
                    { x: 510, y: 510, width: 2, height: 120 },
                
                    // eighteenth line horizontal walls
                    { x: 0, y: 540, width: 60, height: 2 },
                    { x: 90, y: 540, width: 30, height: 2 },
                    { x: 180, y: 540, width: 60, height: 2 },
                    { x: 330, y: 540, width: 30, height: 2 },
                    { x: 420, y: 540, width: 60, height: 2 },
                    { x: 540, y: 540, width: 30, height: 2 },
                
                    // nineteenth line vertical walls
                    { x: 60, y: 540, width: 2, height: 60 },
                    { x: 180, y: 540, width: 2, height: 60 },
                    { x: 240, y: 540, width: 2, height: 30 },
                    { x: 300, y: 540, width: 2, height: 30 },
                    { x: 600, y: 540, width: 2, height: 60 },
                
                    // nineteenth line horizontal walls
                    { x: 120, y: 570, width: 30, height: 2 },
                    { x: 300, y: 570, width: 150, height: 2 },
                    { x: 570, y: 570, width: 30, height: 2 },
                
                    // twentieth line vertical walls
                    { x: 30, y: 570, width: 2, height: 60 },
                    { x: 120, y: 570, width: 2, height: 60 },
                    { x: 210, y: 570, width: 2, height: 30 },
                    { x: 420, y: 570, width: 2, height: 30 },
                    { x: 570, y: 570, width: 2, height: 30 },
                
                    // twentieth line horizontal walls
                    { x: 60, y: 600, width: 30, height: 2 },
                    { x: 150, y: 600, width: 240, height: 2 },
                    { x: 420, y: 600, width: 60, height: 2 },
                    { x: 510, y: 600, width: 60, height: 2 },
                ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit for next stage
            },
            {
            walls: [ // walls for stage four
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 }, // end exit barrier
                
                    // first line vertical walls
                    { x: 120, y: 0, width: 2, height: 30 },
                    { x: 270, y: 0, width: 2, height: 60 },
                    { x: 300, y: 0, width: 2, height: 30 },
                    { x: 360, y: 0, width: 2, height: 30 },
                    { x: 420, y: 0, width: 2, height: 90 },
                    { x: 540, y: 0, width: 2, height: 30 },

                    // first line horizontal walls
                    { x: 60, y: 30, width: 30, height: 2 },
                    { x: 120, y: 30, width: 30, height: 2 },
                    { x: 180, y: 30, width: 60, height: 2 },
                    { x: 300, y: 30, width: 30, height: 2 },
                    { x: 450, y: 30, width: 90, height: 2 },
                    { x: 570, y: 30, width: 30, height: 2 },

                    // second line vertical walls
                    { x: 30, y: 30, width: 2, height: 60 },
                    { x: 60, y: 30, width: 2, height: 30 },
                    { x: 180, y: 30, width: 2, height: 30 },
                    { x: 240, y: 30, width: 2, height: 60 },
                    { x: 330, y: 30, width: 2, height: 30 },
                    { x: 390, y: 30, width: 2, height: 30 },
                    { x: 600, y: 30, width: 2, height: 30 },

                    // second line horizontal walls
                    { x: 60, y: 60, width: 150, height: 2 },
                    { x: 330, y: 60, width: 60, height: 2 },
                    { x: 450, y: 60, width: 150, height: 2 },

                    // third line vertical walls
                    { x: 120, y: 60, width: 2, height: 60 },
                    { x: 300, y: 60, width: 2, height: 30 },
                    { x: 360, y: 60, width: 2, height: 60 },
                    { x: 450, y: 60, width: 2, height: 60 },
                    { x: 570, y: 60, width: 2, height: 90 },

                    // third line horizontal walls
                    { x: 30, y: 90, width: 60, height: 2 },
                    { x: 150, y: 90, width: 90, height: 2 },
                    { x: 270, y: 90, width: 60, height: 2 },
                    { x: 390, y: 90, width: 30, height: 2 },
                    { x: 480, y: 90, width: 90, height: 2 },

                    // fourth line vertical walls
                    { x: 60, y: 90, width: 2, height: 180 },
                    { x: 180, y: 90, width: 2, height: 30 },
                    { x: 270, y: 90, width: 2, height: 30 },
                    { x: 330, y: 90, width: 2, height: 30 },
                    { x: 390, y: 90, width: 2, height: 90 },
                    { x: 480, y: 90, width: 2, height: 150 },
                    { x: 600, y: 90, width: 2, height: 90 },

                    // fourth line horizontal walls
                    { x: 0, y: 120, width: 30, height: 2 },
                    { x: 90, y: 120, width: 30, height: 2 },
                    { x: 210, y: 120, width: 60, height: 2 },
                    { x: 330, y: 120, width: 30, height: 2 },
                    { x: 420, y: 120, width: 30, height: 2 },
                    { x: 510, y: 120, width: 30, height: 2 },

                    // fifth line vertical walls
                    { x: 30, y: 120, width: 2, height: 60 },
                    { x: 90, y: 120, width: 2, height: 120 },
                    { x: 150, y: 120, width: 2, height: 30 },
                    { x: 210, y: 120, width: 2, height: 30 },
                    { x: 300, y: 120, width: 2, height: 30 },
                    { x: 420, y: 120, width: 2, height: 60 },
                    { x: 510, y: 120, width: 2, height: 150 },

                    // fifth line horizontal walls
                    { x: 120, y: 150, width: 90, height: 2 },
                    { x: 240, y: 150, width: 150, height: 2 },
                    { x: 540, y: 150, width: 30, height: 2 },

                    // sixth line vertical walls
                    { x: 180, y: 150, width: 2, height: 30 },
                    { x: 240, y: 150, width: 2, height: 30 },
                    { x: 360, y: 150, width: 2, height: 60 },
                    { x: 450, y: 150, width: 2, height: 30 },
                    { x: 540, y: 150, width: 2, height: 30 },

                    // sixth line horizontal walls
                    { x: 120, y: 180, width: 60, height: 2 },
                    { x: 210, y: 180, width: 60, height: 2 },
                    { x: 300, y: 180, width: 30, height: 2 },
                    { x: 420, y: 180, width: 30, height: 2 },
                    { x: 540, y: 180, width: 30, height: 2 },
                    { x: 600, y: 180, width: 30, height: 2 },

                    // seventh line vertical walls
                    { x: 120, y: 180, width: 2, height: 60 },
                    { x: 210, y: 180, width: 2, height: 30 },
                    { x: 300, y: 180, width: 2, height: 30 },
                    { x: 570, y: 180, width: 2, height: 30 },

                    // seventh line horizontal walls
                    { x: 30, y: 210, width: 30, height: 2 },
                    { x: 150, y: 210, width: 90, height: 2 },
                    { x: 270, y: 210, width: 30, height: 2 },
                    { x: 330, y: 210, width: 120, height: 2 },
                    { x: 510, y: 210, width: 30, height: 2 },
                    { x: 570, y: 210, width: 30, height: 2 },

                    // eighth line vertical walls
                    { x: 150, y: 210, width: 2, height: 60 },
                    { x: 240, y: 210, width: 2, height: 30 },
                    { x: 270, y: 210, width: 2, height: 120 },
                    { x: 330, y: 210, width: 2, height: 150 },
                    { x: 420, y: 210, width: 2, height: 90 },
                    { x: 540, y: 210, width: 2, height: 90 },

                    // eighth line horizontal walls
                    { x: 0, y: 240, width: 30, height: 2 },
                    { x: 90, y: 240, width: 30, height: 2 },
                    { x: 300, y: 240, width: 30, height: 2 },
                    { x: 420, y: 240, width: 60, height: 2 },
                    { x: 540, y: 240, width: 60, height: 2 },

                    // nineth line vertical walls
                    { x: 180, y: 240, width: 2, height: 120 },
                    { x: 210, y: 240, width: 2, height: 30 },
                    { x: 360, y: 240, width: 2, height: 90 },
                    { x: 390, y: 240, width: 2, height: 120 },

                    // nineth line horizontal walls
                    { x: 30, y: 270, width: 120, height: 2 },
                    { x: 210, y: 270, width: 90, height: 2 },
                    { x: 450, y: 270, width: 60, height: 2 },
                    { x: 570, y: 270, width: 60, height: 2 },

                    // tenth line vertical walls
                    { x: 30, y: 270, width: 2, height: 30 },
                    { x: 480, y: 270, width: 2, height: 60 },
                    { x: 600, y: 270, width: 2, height: 30 },

                    // tenth line horizontal walls
                    { x: 30, y: 300, width: 120, height: 2 },
                    { x: 210, y: 300, width: 60, height: 2 },
                    { x: 300, y: 300, width: 30, height: 2 },
                    { x: 420, y: 300, width: 30, height: 2 },
                    { x: 510, y: 300, width: 60, height: 2 },

                    // eleventh line vertical walls
                    { x: 60, y: 300, width: 2, height: 30 },
                    { x: 150, y: 300, width: 2, height: 90 },

                    // eleventh line horizontal walls
                    { x: 0, y: 330, width: 30, height: 2 },
                    { x: 90, y: 330, width: 30, height: 2 },
                    { x: 180, y: 330, width: 60, height: 2 },
                    { x: 270, y: 330, width: 30, height: 2 },
                    { x: 330, y: 330, width: 30, height: 2 },
                    { x: 390, y: 330, width: 210, height: 2 },

                    // twelveth line vertical walls
                    { x: 30, y: 330, width: 2, height: 60 },
                    { x: 90, y: 330, width: 2, height: 60 },
                    { x: 240, y: 330, width: 2, height: 150 },
                    { x: 300, y: 330, width: 2, height: 30 },
                    { x: 570, y: 330, width: 2, height: 30 },

                    // twelveth line horizontal walls
                    { x: 30, y: 360, width: 60, height: 2 },
                    { x: 120, y: 360, width: 30, height: 2 },
                    { x: 270, y: 360, width: 30, height: 2 },
                    { x: 360, y: 360, width: 30, height: 2 },
                    { x: 420, y: 360, width: 120, height: 2 },
                    { x: 570, y: 360, width: 30, height: 2 },

                    // thirteenth line vertical walls
                    { x: 120, y: 360, width: 2, height: 60 },
                    { x: 210, y: 360, width: 2, height: 90 },
                    { x: 360, y: 360, width: 2, height: 30 },
                    { x: 420, y: 360, width: 2, height: 30 },
                    { x: 540, y: 360, width: 2, height: 30 },
                    { x: 600, y: 360, width: 2, height: 60 },

                    // thirteenth line horizontal walls
                    { x: 180, y: 390, width: 30, height: 2 },
                    { x: 240, y: 390, width: 120, height: 2 },
                    { x: 390, y: 390, width: 120, height: 2 },
                    { x: 540, y: 390, width: 30, height: 2 },

                    // fourteenth line vertical walls
                    { x: 60, y: 390, width: 2, height: 30 },
                    { x: 390, y: 390, width: 2, height: 30 },
                    { x: 510, y: 390, width: 2, height: 30 },
                    { x: 570, y: 390, width: 2, height: 90 },

                    // fourteenth line horizontal walls
                    { x: 30, y: 420, width: 150, height: 2 },
                    { x: 270, y: 420, width: 150, height: 2 },
                    { x: 450, y: 420, width: 30, height: 2 },
                    { x: 510, y: 420, width: 30, height: 2 },
                    { x: 600, y: 420, width: 30, height: 2 },

                    // fifteenth line vertical walls
                    { x: 30, y: 420, width: 2, height: 90 },
                    { x: 150, y: 420, width: 2, height: 60 },
                    { x: 270, y: 420, width: 2, height: 30 },
                    { x: 450, y: 420, width: 2, height: 150 },

                    // fifteenth line horizontal walls
                    { x: 30, y: 450, width: 60, height: 2 },
                    { x: 180, y: 450, width: 30, height: 2 },
                    { x: 270, y: 450, width: 60, height: 2 },
                    { x: 360, y: 450, width: 60, height: 2 },
                    { x: 450, y: 450, width: 150, height: 2 },

                    // sixteenth line vertical walls
                    { x: 120, y: 450, width: 2, height: 60 },
                    { x: 180, y: 450, width: 2, height: 60 },
                    { x: 330, y: 450, width: 2, height: 30 },
                    { x: 360, y: 450, width: 2, height: 120 },

                    // sixteenth line horizontal walls
                    { x: 60, y: 480, width: 60, height: 2 },
                    { x: 150, y: 480, width: 30, height: 2 },
                    { x: 210, y: 480, width: 90, height: 2 },
                    { x: 390, y: 480, width: 60, height: 2 },
                    { x: 480, y: 480, width: 60, height: 2 },

                    // seventeenth line vertical walls
                    { x: 420, y: 480, width: 2, height: 30 },
                    { x: 480, y: 480, width: 2, height: 60 },
                    { x: 540, y: 480, width: 2, height: 30 },
                    { x: 600, y: 480, width: 2, height: 60 },

                    // seventeenth line horizontal walls
                    { x: 30, y: 510, width: 60, height: 2 },
                    { x: 120, y: 510, width: 30, height: 2 },
                    { x: 180, y: 510, width: 210, height: 2 },
                    { x: 510, y: 510, width: 90, height: 2 },

                    // eighteenth line vertical walls
                    { x: 90, y: 510, width: 2, height: 60 },
                    { x: 150, y: 510, width: 2, height: 30 },
                    { x: 270, y: 510, width: 2, height: 60 },

                    // eighteenth line horizontal walls
                    { x: 0, y: 540, width: 60, height: 2 },
                    { x: 150, y: 540, width: 90, height: 2 },
                    { x: 300, y: 540, width: 30, height: 2 },
                    { x: 360, y: 540, width: 60, height: 2 },
                    { x: 480, y: 540, width: 60, height: 2 },
                    { x: 570, y: 540, width: 30, height: 2 },

                    // nineteenth line vertical walls
                    { x: 120, y: 540, width: 2, height: 60 },
                    { x: 180, y: 540, width: 2, height: 60 },
                    { x: 330, y: 540, width: 2, height: 90 },
                    { x: 420, y: 540, width: 2, height: 60 },
                    { x: 540, y: 540, width: 2, height: 60 },

                    // nineteenth line horizontal walls
                    { x: 30, y: 570, width: 120, height: 2 },
                    { x: 210, y: 570, width: 90, height: 2 },
                    { x: 420, y: 570, width: 90, height: 2 },
                    { x: 570, y: 570, width: 60, height: 2 },

                    // twenteeth line vertical walls
                    { x: 60, y: 570, width: 2, height: 30 },
                    { x: 210, y: 570, width: 2, height: 30 },
                    { x: 300, y: 570, width: 2, height: 30 },
                    { x: 390, y: 570, width: 2, height: 30 },
                    { x: 480, y: 570, width: 2, height: 30 },

                    // twenteeth line horizontal walls
                    { x: 0, y: 600, width: 30, height: 2 },
                    { x: 150, y: 600, width: 30, height: 2 },
                    { x: 540, y: 600, width: 30, height: 2 },
                    { x: 330, y: 600, width: 60, height: 2 },
                    { x: 510, y: 600, width: 90, height: 2 },

                    // twenty-first line vertical walls
                    { x: 90, y: 600, width: 2, height: 30 },
                    { x: 150, y: 600, width: 2, height: 30 },
                    { x: 240, y: 600, width: 2, height: 30 },
                    { x: 450, y: 600, width: 2, height: 30 },
                    { x: 510, y: 600, width: 2, height: 30 },

                ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit for next stage
            },
            {
                walls: [ // walls for stage five
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 }, // end exit barrier
                
                    // first line vertical walls
                    { x: 180, y: 0, width: 2, height: 30 },
                    { x: 240, y: 0, width: 2, height: 90 },
                ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit for next stage
            },
            {
                walls: [ // walls for stage six
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 }, // end exit barrier
                
                    // first line vertical walls
                    { x: 180, y: 0, width: 2, height: 30 },
                    { x: 240, y: 0, width: 2, height: 90 },
                ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit for next stage
            }, {
                walls: [ // walls for stage seven
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 }, // end exit barrier
                
                    // first line vertical walls
                    { x: 180, y: 0, width: 2, height: 30 },
                    { x: 240, y: 0, width: 2, height: 90 },
                ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit for next stage
            }, {
                walls: [ // walls for stage eight
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 }, // end exit barrier
                
                    // first line vertical walls
                    { x: 180, y: 0, width: 2, height: 30 },
                    { x: 240, y: 0, width: 2, height: 90 },
                ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit for next stage
            }, {
                walls: [ // walls for stage nine
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 }, // end exit barrier
                
                    // first line vertical walls
                    { x: 180, y: 0, width: 2, height: 30 },
                    { x: 240, y: 0, width: 2, height: 90 },
                ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit for next stage
            }, {
                walls: [ // walls for staGE ten
                    // outside borders
                    { x: 0, y: 30, width: 4, height: 600 }, // left wall
                    { x: 0, y: 0, width: 633, height: 4 }, // top wall
                    { x: 0, y: 627, width: 633, height: 4 }, // bottom wall
                    { x: 629, y: 0, width: 4, height: 600 }, // right wall
                
                    // exit walls
                    { x: 0, y: 6, width: 2, height: 20 }, // start exit barrier
                    { x: 630, y: 605, width: 2, height: 20 }, // end exit barrier
                
                    // first line vertical walls
                    { x: 180, y: 0, width: 2, height: 30 },
                    { x: 240, y: 0, width: 2, height: 90 },
                ],
                    exit: { x: 588, y: 608, width: 60, height: 30 }, // Exit for next stage
            },
];
    setWalls(newWalls);
},[]);


// check collision
const checkCollision = (newX, newY) => {
    if (!walls[stageIndex] || !walls[stageIndex].walls) {
        console.error("Walls data is not available.");
        return false;
    }

    const carWidth = 21; // Make sure this matches your actual car width
    const carHeight = 16; // Make sure this matches your actual car height

    for (let i = 0; i < walls[stageIndex].walls.length; i++) {
        const wall = walls[stageIndex].walls[i];

        if (
            newX < wall.x + wall.width &&
            newX + carWidth > wall.x &&
            newY < wall.y + wall.height &&
            newY + carHeight > wall.y
        ) {
            console.log(`🚧 Collision with Wall ${i + 1}: { x: ${wall.x}, y: ${wall.y}, width: ${wall.width}, height: ${wall.height} }`);
            return true; // Collision detected
        }
    }
    return false; // No collision
};

// handle keypress and movement
const handleKeyPress = (event) => {
    let newX = carPosition.x;
    let newY = carPosition.y;
    let newDirection = carDirection;

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

    // ✅ Prevent movement if collision is detected
    if (!checkCollision(newX, newY)) {
        setCarPosition({ x: newX, y: newY });
        setCarDirection(newDirection);
    } else {
        console.log("❌ Movement blocked due to collision!");
    }
};

// handle click for movement
const handleClick = (direction) => {
    let newX = carPosition.x;
    let newY = carPosition.y;
    let newDirection = carDirection;

    if (direction === "up") {
        newY -= moveStep;
        newDirection = "up";
    }
    if (direction === "down") {
        newY += moveStep;
        newDirection = "down";
    }
    if (direction === "left") {
        newX -= moveStep;
        newDirection = "left";
    }
    if (direction === "right") {
        newX += moveStep;
        newDirection = "right";
    }

    // ✅ Prevent movement if collision is detected
    if (!checkCollision(newX, newY)) {
        setCarPosition({ x: newX, y: newY });
        setCarDirection(newDirection);
    } else {
        console.log("❌ Movement blocked due to collision!");
    }
};

// Attach event listener
useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
        window.removeEventListener("keydown", handleKeyPress);
    };
}, [carPosition, carDirection]);



// wall canvas
useEffect(() => {
    if (!canvasRef.current) return;  // Prevent null errors

    if (!walls.length || !walls[stageIndex]) {
        console.error("Walls data is missing or stageIndex is out of bounds");
        return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "navy";

    if (walls[stageIndex].walls) {
        walls[stageIndex].walls.forEach((wall) => {
            ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
        });
    }
}, [walls, stageIndex]);


// set and reset car position
useEffect(() => {
    if (walls.length > 0) {
        const currentExit = walls[stageIndex].exit;
        if (
            carPosition.x >= currentExit.x &&
            carPosition.x <= currentExit.x + currentExit.width &&
            carPosition.y >= currentExit.y &&
            carPosition.y <= currentExit.y + currentExit.height
        ) {
            if (stageIndex < walls.length - 1) {
                setStageIndex(stageIndex + 1);
                setCarPosition({ x: 8, y: 8 }); // Reset car position for new stage
            }
        }
    }
  }, [carPosition, stageIndex, walls]);

// Timer for start and finish
const [timer, setTimer] = useState(0); // Timer in seconds
const [isRunning, setIsRunning] = useState(false);
const finish = { x: 588, y: 608 };
const start = { x: 8, y: 8 };

// Start timer when car moves from the start position
useEffect(() => {
    if (carPosition.x !== start.x || carPosition.y !== start.y) {
        setIsRunning(true); // Start timer
    } 
}, [carPosition]);

// Timer logic
useEffect(() => {
    let interval;

    if (isRunning) {
        interval = setInterval(() => {
            setTimer((prevTime) => prevTime + 1);
        }, 1000);
    } else {
        clearInterval(interval);
    }

    return () => clearInterval(interval);
}, [isRunning]);

// Stop timer & move to next stage when car reaches the finish
useEffect(() => {
    if (carPosition.x === finish.x && carPosition.y === finish.y) {
        setIsRunning(false); // Stop timer
        setStage((prevStage) => prevStage + 1); // Move to next stage
    }
}, [carPosition]);

// Format the timer
const formatTime = (time) => {
    const hours = Math.floor(time / 3600); // 1 hour = 3600 seconds
    const minutes = Math.floor((time % 3600) / 60); // Remaining seconds after hours, converted to minutes
    const seconds = time % 60; // Remaining seconds after minutes

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

// Set stage number
useEffect(() => {
    const stageNumberElement = document.querySelector(".stage_number");
    if (stageNumberElement) {
        stageNumberElement.textContent = stageIndex + 1; // Since stageIndex starts from 0
    }
}, [stageIndex]);


// handle manual stage change
const handleStageChange = (direction) => {
    setStageIndex((prevIndex) => {
        let newIndex = prevIndex;

        if (direction === "next") {
            newIndex = Math.min(prevIndex + 1, walls.length - 1); // Prevent going out of bounds
        } else if (direction === "prev") {
            newIndex = Math.max(prevIndex - 1, 0); // Prevent negative index
        }

        console.log(`Stage changed to: ${newIndex}`);
        return newIndex;
    });
};


    return (
        <>
        <div className="nav-container">
        <Link to="/" className="button-container">
        <button className="nav-button">Home</button>
        </Link>
        </div>
        
        <div className="maze-container">        
            <div className="panel-container">
                <div className="game_area_heading">Setting</div>
                {/* <div className="set_item">
                    <label className="menu-label">Background</label>
                    <select className="background_color">
                        <option value=""></option>
                    </select>
                </div> */}
                {/* <div className="set_item">
                    <label className="menu-label">Wall</label>
                    <select className="wall_color">
                        <option value=""></option>
                    </select>
                </div> */}
               
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
                {/* <div className="set_item">
                    <label>Track</label>
                    <select id="track_type">
                        <option value=""></option>
                    </select>
                </div> */}
                <div className="set_item">
                    <label className="music">Music</label>
                    <select id="song_list">
                        <option value="">Song 1</option>
                        <option value="">Song 2</option>
                        <option value="">Song 3</option>
                        <option value="">Song 4</option>
                    </select>
                </div>
                {/* <div className="live_container">
                    <label className="live_count">Live</label>
                    <span className="lives">0</span>
                </div> */}
                <div className="timer_container">
                    <label className="timer_count">Time</label>
                    <div className="time_value" id="time_value">{currentTime}</div>
                </div>
                <div className="stopwatch_container">
                    <span className="timer_name">Play Time</span>
                    <span className="timer_number">{formatTime(timer)}</span>
                </div>
                <div className="stage_container">
                    <span className="stage">Stage</span>
                    <span className="stage_number">1</span>
                </div>

                <div className="control_container">
            <div className="left_container">
                <img 
                    src={leftButton} 
                    className="left_button" 
                    alt="leftButton" 
                    onClick={() => handleClick("left")} 
                />
            </div>
            <div className="updown_container">
                <img 
                    src={upButton} 
                    className="up_button" 
                    alt="upButton" 
                    onClick={() => handleClick("up")} 
                />
                <img 
                    src={downButton} 
                    className="down_button" 
                    alt="downButton" 
                    onClick={() => handleClick("down")} 
                />
            </div>
            <div className="right_container">
                <img 
                    src={rightButton} 
                    className="right_button" 
                    alt="rightButton" 
                    onClick={() => handleClick("right")} 
                />
            </div>
            </div>
            <div className="temp_stage_update">
    <button className="prev_stage" onClick={() => handleStageChange("prev")}>Prev</button>
    <button className="next_stage" onClick={() => handleStageChange("next")}>Next</button>
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
    </>
    );
};

export default Maze;