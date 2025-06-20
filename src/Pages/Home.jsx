import React from "react";
import mazeIcon from './Maze.png';
import scrabbleIcon from './Scrabble.png';
import pictureIcon from './Picture-Puzzle.png';
import numIcon from './Num-Puzzle.png';
import './Home.css';
import { Link } from "react-router-dom";
import conroller from './controllers.svg';

const Home = () => {
    return (
        <div className='game-container'>
        <div className="heading-container">
              <img src={conroller} alt="controllerIcon" className="controller" />
              <span className='heading'>Games Hub</span>
           </div>
            <div className='game-icons-container'>
                <div className='maze'>
                    <Link to="/maze">
                        <img src={mazeIcon} alt='maze-icon' className='icons' />
                    </Link>
                </div>
                <div className='scrabble'>
                    <Link to="/scrabble">
                        <img src={scrabbleIcon} alt='scrabble-icon' className='icons' />
                    </Link>
                </div>
                <div className='pic-puzzle'>
                    <Link to="/picpuzzle">
                        <img src={pictureIcon} alt='picture-icon' className='icons' />
                    </Link>
                </div>
                <div className='num-puzzle'>
                    <Link to="/wordpuzzle">
                        <img src={numIcon} alt='num-icon' className='icons' />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
