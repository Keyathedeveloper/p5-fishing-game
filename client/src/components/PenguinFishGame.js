import React, { useEffect, useRef } from "react";
import FishObject from "./FishObject";
import Penguin from "./Penguin";

const PenguinFishGame = () => {
  const fishObjectsRef = useRef([]);
  const pondRef = useRef(null);

  useEffect(() => {
    const pondWidth = 800; // Increase the pond width
    const pondHeight = 500; // Increase the pond height

    // Initialize fish
    for (let i = 0; i < 10; i++) {
      const fishSize = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
      const fishX = Math.random() * (pondWidth - fishSize);
      const fishY = Math.random() * (pondHeight - fishSize);
      const fish = new FishObject(fishX, fishY, fishSize); // Use 'new' keyword here
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

  return (
    <div id="game-container" style={{ position: "relative" }}>
      {/* Penguin */}
      <Penguin />

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

      {/* Fish */}
      {fishObjectsRef.current.map((fish, index) => (
        <FishObject key={index} x={fish.x} y={fish.y} size={fish.size} />
      ))}
    </div>
  );
};

export default PenguinFishGame;
