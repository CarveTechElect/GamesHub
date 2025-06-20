import "./Scrabble.css";
import Star from "./Star.png";
import { Link } from "react-router-dom";

const Scrabble = () => {
  return (
    <>
      <Link to="/">
        <button className="home-button">Home</button>
      </Link>

      <span className="game-name">SCRABBLE</span>
      <span className="game-name2">SCRABBLE</span>
      <span className="game-name3">SCRABBLE</span>

      <div className="tile-banner-container">
        <div className="banner-set">
          <span className="banner-letter">S</span>
          <span className="banner-number">1</span>
        </div>
        <div className="banner-set">
          <span className="banner-letter">C</span>
          <span className="banner-number">2</span>
        </div>
        <div className="banner-set">
          <span className="banner-letter">R</span>
          <span className="banner-number">1</span>
        </div>
        <div className="banner-set">
          <span className="banner-letter">A</span>
          <span className="banner-number">1</span>
        </div>
        <div className="banner-set">
          <span className="banner-letter">B</span>
          <span className="banner-number">3</span>
        </div>
        <div className="banner-set">
          <span className="banner-letter">B</span>
          <span className="banner-number">3</span>
        </div>
        <div className="banner-set">
          <span className="banner-letter">L</span>
          <span className="banner-number">1</span>
        </div>
        <div className="banner-set">
          <span className="banner-letter">E</span>
          <span className="banner-number">1</span>
        </div>
      </div>

      <div className="player1-tile-board">
        <div className="tile-sub-container">
          <button className="replace-tile">REPLACE</button>
          <button className="complete-tile">COMPLETE</button>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="validate-move-container">
          <button className="validate">DONE</button>
        </div>
      </div>

      <div className="player2-tile-board">
        <div className="tile-sub-container">
          <button className="replace-tile">REPLACE</button>
          <button className="complete-tile">COMPLETE</button>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="validate-move-container">
          <button className="validate">DONE</button>
        </div>
      </div>

      <div className="player3-tile-board">
        <div className="tile-sub-container">
          <button className="replace-tile">REPLACE</button>
          <button className="complete-tile">COMPLETE</button>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="validate-move-container">
          <button className="validate">DONE</button>
        </div>
      </div>

      <div className="player4-tile-board">
        <div className="tile-sub-container">
          <button className="replace-tile">REPLACE</button>
          <button className="complete-tile">COMPLETE</button>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="p1-tile-set">
          <span className="p1-tile-letter">P</span>
          <span className="p1-tile-number">1</span>
        </div>
        <div className="validate-move-container">
          <button className="validate">DONE</button>
        </div>
      </div>

      <div className="tile-legend-container">
        <span className="legend-heading">LETTER DISTRIBUTION</span>
        <div className="legend-set">
          <span className="legend-value">A-9</span>
          <span className="legend-value">B-2</span>
          <span className="legend-value">C-2</span>
          <span className="legend-value">D-2</span>
          <span className="legend-value">E-12</span>
          <span className="legend-value">F-2</span>
          <span className="legend-value">G-3</span>
          <span className="legend-value">H-2</span>
          <span className="legend-value">I-9</span>
          <span className="legend-value">J-1</span>
          <span className="legend-value">K-1</span>
          <span className="legend-value">L-4</span>
          <span className="legend-value">M-2</span>
          <span className="legend-value">N-6</span>
          <span className="legend-value">O-8</span>
          <span className="legend-value">P-2</span>
          <span className="legend-value">Q-1</span>
          <span className="legend-value">R-6</span>
          <span className="legend-value">S-4</span>
          <span className="legend-value">T-6</span>
          <span className="legend-value">U-4</span>
          <span className="legend-value">V-2</span>
          <span className="legend-value">W-2</span>
          <span className="legend-value">X-1</span>
          <span className="legend-value">Y-2</span>
          <span className="legend-value">Z-1</span>
        </div>
        <span className="legend-footer">BLANK-2</span>
      </div>

      <div className="display-panel">
        <div className="display-set">
          <label className="display-label">P1 Score</label>
          <span className="display-value">1</span>
        </div>
        <div className="display-set">
          <label className="display-label">P2 Score</label>
          <span className="display-value">1</span>
        </div>
        <div className="display-set">
          <label className="display-label">P3 Score</label>
          <span className="display-value">1</span>
        </div>
        <div className="display-set">
          <label className="display-label">P4 Score</label>
          <span className="display-value">1</span>
        </div>
      </div>
      <div className="scrabble-container">
        <div className="scrabble-tile-container">
          <span className="tile" id="tw">
            TRIPPLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tw">
            TRIPPLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tw">
            TRIPPLE WORD SCORE
          </span>
          {/* End of First Row */}
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          {/* End of second Row */}
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          {/* End of third Row */}
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          {/* End of Fourth Row */}
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          {/* End of Fifth Row */}
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          {/* End of sixth Row */}
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          {/* End of seventh Row */}
          <span className="tile" id="tw">
            TRIPPLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="center">
            <img src={Star} className="star" />
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tw">
            TRIPPLE WORD SCORE
          </span>
          {/* End of eighth Row */}
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          {/* End of ninth Row */}
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          {/* End of tenth Row */}
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          {/* End of eleventh Row */}
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          {/* End of twelveth Row */}
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          {/* End of thirteenth Row */}
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tl">
            TRIPPLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dw">
            DOUBLE WORD SCORE
          </span>
          <span className="tile"></span>
          {/* End of fourteenth Row */}
          <span className="tile" id="tw">
            TRIPPLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tw">
            TRIPPLE WORD SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="dl">
            DOUBLE LETTER SCORE
          </span>
          <span className="tile"></span>
          <span className="tile"></span>
          <span className="tile" id="tw">
            TRIPPLE WORD SCORE
          </span>
        </div>
      </div>
    </>
  );
};

export default Scrabble;
