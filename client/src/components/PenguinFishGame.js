import React, { useEffect, useRef, useState } from "react";
import p5 from 'p5';
import ScoreDashboard from "./ScoreDashboard";
import Penguin from "./Penguin";
import "./penguin-styles.css";
import axios from "axios";
import NavBar from "./NavBar"; // Import the NavBar component

const PenguinFishGame = ({ username, sessionToken }) => {
  const fishObjectsRef = useRef([]);
  const pondRef = useRef(null);
  const [isFishing, setIsFishing] = useState(false);
  const [score, setScore] = useState(0);
  const [fishingMessage, setFishingMessage] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for logged in status

  useEffect(() => {
    // Check if the session token exists
    setIsLoggedIn(!!sessionToken);
  }, [sessionToken]);

  const handleLogout = () => {
    // Logout logic here
    // For example:
    // Clear session token and redirect to login page
    localStorage.removeItem('sessionToken');
    window.location.href = '/';
  };

  useEffect(() => {
    const saveScore = async () => {
      try {
        // Include session token in the request headers if required by the backend
        await axios.post('http://127.0.0.1:5000/save-score', { username, score }, {
          headers: {
            'Authorization': `Bearer ${sessionToken}` // Include the session token
          }
        });
        console.log('Score saved successfully!');
      } catch (error) {
        console.error('Error saving score:', error);
      }
    };
    const saveInterval = setInterval(saveScore, 300000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(saveInterval);
  }, [score, username, sessionToken]); // Include sessionToken in the dependencies array

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        // Include session token in the request headers if required by the backend
        const response = await axios.get('http://127.0.0.1:5000/highscores', {
          headers: {
            'Authorization': `Bearer ${sessionToken}` // Include the session token
          }
        });
        const retrievedHighScores = response.data.map(entry => ({ username: entry.username, score: entry.score_value }));
        setHighScores(retrievedHighScores);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };
    fetchHighScores();
  }, [sessionToken]); // Include sessionToken in the dependencies array

  useEffect(() => {
    const sketch = (p) => {
      let pondWidth = 800;
      let pondHeight = 500;

      // Initialize fish
      for (let i = 0; i < 10; i++) {
        const fishSize = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        const fishX = Math.random() * pondWidth; // Fish X position within the pond
        const fishY = Math.random() * pondHeight; // Fish Y position within the pond
        const fish = { x: fishX, y: fishY, size: fishSize, vx: p.random(-1, 1), vy: p.random(-1, 1) }; // Add velocity properties for fish movement
        fishObjectsRef.current.push(fish);
      }

      p.setup = () => {
        p.createCanvas(pondWidth, pondHeight).parent(pondRef.current); // Assign the pondRef to the canvas
        p.background(135, 206, 235); // Light royal blue color
      };

      p.draw = () => {
        p.clear();

        // Draw green border around the pond
        p.fill(50, 205, 50); // Green color for the border
        p.ellipse(p.width / 2, p.height / 2, p.width + 10, p.height + 10); // Larger ellipse for the border

        // Draw pond
        p.fill(135, 206, 235); // Light royal blue color
        p.ellipse(p.width / 2, p.height / 2, p.width, p.height);

        // Update and draw fish
        fishObjectsRef.current.forEach((fish) => {

          // Update fish position based on velocity
          fish.x += fish.vx;
          fish.y += fish.vy;

          // Ensure fish stay within pond boundaries
          fish.x = p.constrain(fish.x, 0, p.width);
          fish.y = p.constrain(fish.y, 0, p.height);

          // Draw fish
          p.fill(255, 0, 255); // Purple fish
          p.noStroke();
          p.beginShape();
          p.vertex(fish.x + fish.size / 2, fish.y);
          p.bezierVertex(
            fish.x + fish.size / 2,
            fish.y - fish.size / 2,
            fish.x - fish.size / 2,
            fish.y - fish.size / 2,
            fish.x - fish.size / 2,
            fish.y
          );

          p.bezierVertex(
            fish.x - fish.size / 2,
            fish.y + fish.size / 2,
            fish.x + fish.size / 2,
            fish.y + fish.size / 2,
            fish.x + fish.size / 2,
            fish.y
          );

          p.endShape(p.CLOSE);

          // Draw tail
          p.fill(255, 192, 203); // Pink tail
          p.triangle(
            fish.x - fish.size / 2,
            fish.y,
            fish.x - fish.size / 2 - 20,
            fish.y - 10,
            fish.x - fish.size / 2 - 20,
            fish.y + 10
          );

          // Draw eye
          p.fill(0); // Black eye
          p.ellipse(fish.x + fish.size / 4, fish.y, fish.size / 10, fish.size / 10);
        });
      };
    };

    new p5(sketch);
  }, []);

  const handleFishing = () => {
    setIsFishing(true); // Set state to indicate fishing

    // Generate a random number to determine if a fish is caught or not
    const catchProbability = Math.random();

    // 40% chance of catching a fish
    if (catchProbability <= 0.4) {
      const randomIndex = Math.floor(Math.random() * fishObjectsRef.current.length);

      // Remove the caught fish from the array
      fishObjectsRef.current.splice(randomIndex, 1);

      // Increase score when a fish is caught
      setScore((prevScore) => prevScore + 1);

      // Set fishing message
      setFishingMessage("You caught a fish!");
    } else {
      // 60% chance of not catching a fish
      const missedMessages = [
        "You didn't catch any fish this time. Keep trying!",
        "The fish weren't biting this time. Better luck next cast!",
        "Looks like the fish got away. Give it another shot!",
        "You've gotta be a little quicker than that!",
      ];
      const randomMessageIndex = Math.floor(Math.random() * missedMessages.length);
      setFishingMessage(missedMessages[randomMessageIndex]);
    }

    // Clear the timer interval and reset fishing state after 2 seconds
    setTimeout(() => {
      setIsFishing(false); // Set state to indicate not fishing
      setFishingMessage(""); // Clear fishing message
    }, 2000);
  };

  return (
    <div id="game-container" style={{ position: "relative", width: "100%", height: "100%" }}>
      <NavBar handleLogout={handleLogout} isLoggedIn={isLoggedIn} /> {/* Render the NavBar component with handleLogout prop */}
      <h1 style={{ textAlign: 'center', margin: '20px 0', color: 'grey', textShadow: '2px 2px 2px black' }}>🐧HungryPenguin🐧</h1>

      {/* Display Score */}
      <div style={{ position: "absolute", top: "121px", right: "20%" }}>
        <ScoreDashboard score={score} />
      </div>

      {/* Display High Scores */}
      <div style={{ position: "absolute", top: "80px", right: "5%", transform: "translateX(-50%)" }}>
        <h3 style={{ color: "hotpink", fontSize: "20px", marginBottom: "10px" }}>High Scores</h3>
        <ul style={{ listStyleType: "none", padding: 0, backgroundColor: "black", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
          {highScores.length > 0 &&
            highScores.map((score, index) => (
              <li key={index} style={{ marginBottom: "5px", padding: "30px", fontSize: "18px" }}>
                <span style={{ fontWeight: "bold", marginRight: "5px", color: "white" }}>{score.username}</span>
                <span style={{ color: "hotpink" }}>{score.score}</span>
              </li>
            ))}
          {/* Ensure at least four high score entries */}
          {highScores.length < 4 &&
            Array.from({ length: 4 - highScores.length }).map((_, index) => (
              <li key={index} style={{ marginBottom: "5px", padding: "30px", fontSize: "18px" }}>
                <span style={{ color: "hotpink" }}>{score.score}</span>
              </li>
            ))}
        </ul>
      </div>

      {/* Display Fishing Message */}
      {fishingMessage && (
        <div style={{ position: "absolute", top: "80px", left: "30%", transform: "translateX(-50%)" }}>
          <p>{fishingMessage}</p>
        </div>
      )}

      {/* Penguin */}
      <div
        className={`penguin ${isFishing ? "fishing" : ""}`}
        style={{
          width: "100px", // Adjusted width of the penguin container
          height: "100px", // Adjusted height of the penguin container
          position: "absolute",
          top: "5%", // Adjusted position of the penguin
          left: "50%", // Adjusted position of the penguin
          transform: "translate(-50%, -50%)", // Center the penguin
          zIndex: "2", // Ensure the penguin is above other elements
        }}
      >
        <Penguin username={username} /> {/* Render the Penguin component */}
      </div>

      {/* Button to trigger fishing */}
      {!isFishing && (
        <button
          onClick={handleFishing}
          style={{
            position: "absolute",
            top: "185px",
            left: "30%",
            transform: "translateX(-50%)",
            zIndex: "3",
            width: "150px", // Adjust width to make it wider
            height: "80px", // Adjust height to make it taller
            borderRadius: "50px", // Make the edges rounded
            backgroundColor: "#B4A7D6", // Biloba Flower color for the bucket
            border: "2px solid black", // Adjust border
            color: "black", // Black text color
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            padding: "20px 0", // Adjust padding to center text vertically
            boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)" // Add a subtle shadow
          }}
        >
          🎣Go Fishing🎣
        </button>
      )}

      {/* Pond element */}
      <div
        ref={pondRef}
        style={{
          width: "800px",
          height: "500px",
          position: "absolute",
          top: "572px",
          left: "32%",
          transform: "translate(-50%, -50%)",
          zIndex: "1",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      ></div>
    </div>
  );
};

export default PenguinFishGame;
