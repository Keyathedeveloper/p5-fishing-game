import React from 'react';
import './ScoreDashboard.css'; // Import CSS file for styling

const ScoreDashboard = () => {
  // Sample data for scores
  const scores = [
    { username: 'Player1', score: 100 },
    { username: 'Player2', score: 150 },
    { username: 'Player3', score: 200 },
  ];

  return (
    <div className="scoreboard">
      <h2 className="scoreboard-title">Scoreboard</h2>
      <div className="score-list">
        {scores.map((score, index) => (
          <div key={index} className="score-item">
            <span className="score-username">{score.username}</span>
            <span className="score-value">{score.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreDashboard;
