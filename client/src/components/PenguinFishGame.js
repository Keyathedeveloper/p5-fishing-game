import React, { useEffect, useRef, useState } from "react";
import ScoreDashboard from "./ScoreDashboard";
import p5 from "p5";
import Penguin from "./Penguin";
import "./penguin-styles.css";
import axios from "axios";

const PenguinFishGame = ({ username }) => {
  const fishObjectsRef = useRef([]);
  const pondRef = useRef(null); // Ref for the pond
  const [isFishing, setIsFishing] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [fishingMessage, setFishingMessage] = useState("");
  const [highScores, setHighScores] = useState([]);
  const [powerUpActive, setPowerUpActive] = useState(false);

  // Fetch high scores when the component mounts
  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/highscores');
        setHighScores(response.data);
      } catch (error) {
        console.error('Error fetching high scores:', error);
      }
    };
    fetchHighScores();
  }, []);

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

        // If power-up is active, draw it on the canvas
        if (powerUpActive) {
          // Draw power-up
          p.fill(255, 255, 0); // Yellow color for power-up
          p.stroke(0); // Black outline
          p.strokeWeight(2);
          p.ellipse(p.width / 2, p.height / 2, 50, 50); // Draw power-up at the center of the pond
        }
      };
    };

    new p5(sketch);
  }, [powerUpActive]);

  useEffect(() => {
    let countdownInterval;
    if (isFishing) {
      countdownInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(countdownInterval);
            setIsFishing(false); // Stop fishing when the timer reaches 0
            return 30; // Reset the timer to 30 seconds
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(countdownInterval);
      setTimer(30); // Reset the timer to 30 seconds when fishing stops
    }
    return () => clearInterval(countdownInterval);
  }, [isFishing]);

  const handleFishing = () => {
    setIsFishing(true); // Set state to indicate fishing

    const randomIndex = Math.floor(Math.random() * fishObjectsRef.current.length);
    const caughtFish = fishObjectsRef.current[randomIndex];

    // Check if a power-up is caught
    const isPowerUpCaught = Math.random() < 0.2; // 20% chance of catching a power-up

    if (isPowerUpCaught) {
      setPowerUpActive(true); // Activate the power-up
      setTimeout(() => {
        setPowerUpActive(false); // Deactivate the power-up after 10 seconds
      }, 10000);
    }

    // Display the message based on whether a fish or power-up is caught
    if (caughtFish && !isPowerUpCaught) {
      // Remove the caught fish from the array
      fishObjectsRef.current.splice(randomIndex, 1);
      setScore((prevScore) => prevScore + 1); // Increase score when a fish is caught
      setFishingMessage("You caught a fish!"); // Set message state
    } else if (isPowerUpCaught) {
      setFishingMessage("You caught a power-up!"); // Set message state
    } else {
      const missedMessages = [
        "You didn't catch any fish this time. Keep trying!",
        "The fish weren't biting this time. Better luck next cast!",
        "Looks like the fish got away. Give it another shot!",
        "You've gotta be a little quicker than that!",
      ];
      const randomMessageIndex = Math.floor(Math.random() * missedMessages.length);
      setFishingMessage(missedMessages[randomMessageIndex]); // Set message state
    }

    // Decrement the timer every second
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the timer interval and reset fishing state after 2 seconds
    setTimeout(() => {
      setIsFishing(false); // Set state to indicate not fishing
      clearInterval(timerInterval); // Clear timer interval
      setFishingMessage(""); // Clear fishing message
    }, 2000);
  };


  return (
    <div id="game-container" style={{ position: "relative", width: "100%", height: "100%" }}>
      <h1 style={{ textAlign: 'center', margin: '20px 0', color: 'darkorange', textShadow: '2px 2px 2px black' }}>Welcome to HungryPenguin!</h1>

      {/* Display Score */}
      <ScoreDashboard username={username} score={score} />

      {/* Display High Scores */}
      <div style={{ position: "absolute", top: "80px", right: "30%", transform: "translateX(-50%)" }}>
        <h3>High Scores</h3>
        <ul>
          {highScores.map((score, index) => (
            <li key={index}>{score.username}: {score.score_value}</li>
          ))}
        </ul>
      </div>

      {/* Display Fishing Message */}
      {fishingMessage && (
        <div style={{ position: "absolute", top: "80px", left: "30%", transform: "translateX(-50%)" }}>
          <p>{fishingMessage}</p>
        </div>
      )}

      {/* Display Timer */}
      <div style={{ position: "absolute", top: "550px", right: "590px", fontSize: "20px", color: "pink",
        backgroundColor: "black", padding: "5px 10px", borderRadius: "5px" }}>{timer} s</div>

{/* Penguin */}
<div
        className={`penguin ${isFishing ? "fishing" : ""}`}
        style={{
          width: "100px", // Adjusted width of the penguin container
          height: "100px", // Adjusted height of the penguin container
          position: "absolute",
          top: "50%", // Adjusted position of the penguin
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
          top: "230px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "3",
          width: "100px", // Adjust width to make it wider
          height: "80px", // Adjust height to make it taller
          borderRadius: "50px", // Make the edges rounded
          backgroundColor: "#4CAF50", // Green color for the bucket
          border: "none", // Remove border
          color: "white", // White text color
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
          padding: "20px 0", // Adjust padding to center text vertically
          boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)" // Add a subtle shadow
        }}
      >
        Go Fishing
      </button>

      )}

      {/* Pond element */}
      <div
        ref={pondRef}
        style={{
          width: "800px",
          height: "500px",
          position: "absolute",
          top: "558px",
          left: "20%",
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
