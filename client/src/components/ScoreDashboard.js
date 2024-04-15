import React from 'react';
import './ScoreDashboard.css'; // Import CSS file for styling

const ScoreDashboard = ({ username, score }) => { // Receive username and score as props
  return (
    <div className="scoreboard">
      <h2 className="scoreboard-title">Scoreboard</h2>
      <div className="score-list">
        {/* Display the username and score */}
        <div className="score-item">
          <span className='username'>{username}</span>
          <span className="score-value">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreDashboard;
