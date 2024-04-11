import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import Penguin from "./Penguin"; // Import the Penguin component
import "./penguin-styles.css"; // Import the styles for the Penguin component

const PenguinFishGame = () => {
  const fishObjectsRef = useRef([]);
  const pondRef = useRef(null); // Ref for the pond

  const [isFishing, setIsFishing] = useState(false);

  useEffect(() => {
    const sketch = (p) => {
      let pondWidth = 800;
      let pondHeight = 500;
      let pondX = 550; // Adjusted position of the pond
      let pondY = 450; // Adjusted position of the pond

      // Initialize fish
      for (let i = 0; i < 10; i++) {
        const fishSize = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        const fishX = Math.random() * (pondWidth - fishSize) + pondX; // Adjusted fish X position
        const fishY = Math.random() * (pondHeight - fishSize) + pondY; // Adjusted fish Y position
        const fish = { x: fishX, y: fishY, size: fishSize };
        fishObjectsRef.current.push(fish);
      }

      p.setup = () => {
        p.createCanvas(pondWidth, pondHeight).parent(pondRef.current); // Assign the pondRef to the canvas
        p.background(135, 206, 235); // Light royal blue color
      };

      p.draw = () => {
        // Draw pond
        p.fill(135, 206, 235); // Light royal blue color
        p.ellipse(p.width / 2, p.height / 2, p.width, p.height);

      // Draw fish
fishObjectsRef.current.forEach((fish) => {
  const fishX = p.random(pondX, pondX + pondWidth); // Random X position within the pond
  const fishY = p.random(pondY, pondY + pondHeight); // Random Y position within the pond

  p.fill(255, 0, 255); // Purple fish
  p.noStroke();
  p.beginShape();
  p.vertex(fishX + fish.size / 2, fishY);
  p.bezierVertex(
    fishX + fish.size / 2,
    fishY - fish.size / 2,
    fishX - fish.size / 2,
    fishY - fish.size / 2,
    fishX - fish.size / 2,
    fishY
  );
  p.bezierVertex(
    fishX - fish.size / 2,
    fishY + fish.size / 2,
    fishX + fish.size / 2,
    fishY + fish.size / 2,
    fishX + fish.size / 2,
    fishY
  );
  p.endShape(p.CLOSE);

  // Draw tail
  p.fill(255, 192, 203); // Pink tail
  p.triangle(
    fishX - fish.size / 2,
    fishY,
    fishX - fish.size / 2 - 20,
    fishY - 10,
    fishX - fish.size / 2 - 20,
    fishY + 10
  );

  // Draw eye
  p.fill(0); // Black eye
  p.ellipse(fishX + fish.size / 4, fishY, fish.size / 10, fish.size / 10);
});

      };
    };

    new p5(sketch);
  }, []);

  const handleFishing = () => {
    setIsFishing(true); // Set state to indicate fishing

    // Wait for 2 seconds and then release the fishing action
    setTimeout(() => {
      setIsFishing(false); // Set state to indicate not fishing
    }, 2000);
  };

  return (
    <div id="game-container" style={{ position: "relative" }}>
      {/* Penguin */}
      <div
        style={{
          width: "100px", // Adjusted width of the penguin container
          height: "100px", // Adjusted height of the penguin container
          position: "absolute",
          top: "-89px", // Adjusted position of the penguin
          left: "45%", // Adjusted position of the penguin
          zIndex: "2", // Ensure the penguin is above other elements
        }}
      >
        <Penguin /> {/* Render the Penguin component */}
      </div>

      {/* Button to trigger fishing */}
      {!isFishing && (
        <button
          onClick={handleFishing}
          style={{
            position: "absolute",
            top: "30px", // Adjusted top position of the button
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "3", // Ensure the button is above other elements
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
          top: "450px", // Adjusted position of the pond
          left: "550px", // Adjusted position of the pond
          transform: "translate(-50%, -50%)",
          zIndex: "1",
          borderRadius: "50%", // Adjusted for oval shape
          overflow: "hidden", // Hide the overflow
        }}
      ></div>
    </div>
  );
};

export default PenguinFishGame;
