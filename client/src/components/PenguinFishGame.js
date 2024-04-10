import React, { useEffect, useRef, useState } from "react";
import FishObject from "./FishObject";
import Penguin from "./Penguin";

const PenguinFishGame = () => {
  const fishObjectsRef = useRef([]);
  const pondRef = useRef(null);
  const [isFishing, setIsFishing] = useState(false);

  useEffect(() => {
    const pondWidth = 800; // Increase the pond width
    const pondHeight = 500; // Increase the pond height

    // Initialize fish
    for (let i = 0; i < 10; i++) {
      const fishSize = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
      const fishX = Math.random() * (pondWidth - fishSize);
      const fishY = Math.random() * (pondHeight - fishSize);
      // Create fish objects directly without 'new' keyword
      const fish = { x: fishX, y: fishY, size: fishSize };
      fishObjectsRef.current.push(fish);
    }

    // Start fish animation
    const animateFish = () => {
      fishObjectsRef.current.forEach((fish) => {
        const pondRect = pondRef.current.getBoundingClientRect();
        const minX = pondRect.left + 10;
        const maxX = pondRect.right - fish.size - 10; // Adjusted for fish size
        const minY = pondRect.top + 10;
        const maxY = pondRect.bottom - fish.size - 10; // Adjusted for fish size

        // Update fish position
        fish.x += Math.random() * 6 - 3;
        fish.y += Math.random() * 6 - 3;

        // Ensure fish stay within the pond
        fish.x = Math.max(minX, Math.min(fish.x, maxX));
        fish.y = Math.max(minY, Math.min(fish.y, maxY));
      });

      // Re-render fish
      setTimeout(animateFish, 100);
    };

    animateFish(); // Start the fish animation after initializing fish objects
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
      <Penguin />

      {/* Button to trigger fishing */}
      {!isFishing && (
        <button
          onClick={handleFishing}
          style={{
            position: "absolute",
            top: "-5px", // Adjust the top position as needed
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "3", // Ensure the button is above other elements
          }}
        >
          Go Fishing
        </button>
      )}

      {/* Pond */}
      <div
        ref={pondRef}
        id="pond"
        style={{
          width: "800px", // Set the pond width
          height: "500px", // Set the pond height
          backgroundColor: "#87CEEB", // Light royal blue color
          borderRadius: "50%",
          position: "absolute",
          top: 275, // Adjusted to be below the penguin
          left: "50%", // Centered horizontally
          transform: "translateX(-50%)", // Centered horizontally
          zIndex: "1",
        }}
      ></div>

      {/* Fish Container */}
      <div
        style={{
          width: "800px", // Set the fish container width to match the pond
          height: "500px", // Set the fish container height to match the pond
          position: "absolute",
          top: 275, // Center the fish container vertically
          left: "50%", // Center the fish container horizontally
          transform: "translate(-50%, -50%)", // Center the fish container horizontally and vertically
          zIndex: "2", // Ensure the fish container is above the pond
        }}
      >
        {fishObjectsRef.current.map((fish, index) => (
          <FishObject key={index} x={fish.x} y={fish.y} size={fish.size} />
        ))}
      </div>
    </div>
  );
};

export default PenguinFishGame;
