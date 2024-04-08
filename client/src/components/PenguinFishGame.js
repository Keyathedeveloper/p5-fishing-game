import React, { useEffect, useRef } from "react";
import FishObject from "./FishObject";
import Penguin from "./Penguin";

const PenguinFishGame = () => {
  const fishObjectsRef = useRef([]);
  const pondRef = useRef(null);

  useEffect(() => {
    const pondWidth = 500;
    const pondHeight = 300;

    // Initialize fish
    for (let i = 0; i < 10; i++) {
      const fishSize = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
      const fishX = Math.random() * (pondWidth - fishSize);
      const fishY = Math.random() * (pondHeight - fishSize);
      const fish = new FishObject(fishX, fishY, fishSize);
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

    animateFish();
  }, []);

  return (
    <div id="game-container" style={{ position: "relative" }}>
      {/* Pond */}
      <div
        ref={pondRef}
        id="pond"
        style={{
          width: "500px",
          height: "300px",
          backgroundColor: "#add8e6",
          borderRadius: "50%",
          position: "absolute",
          zIndex: "1",
        }}
      ></div>

      {/* Fish */}
      {fishObjectsRef.current.map((fish, index) => (
        <div
          key={index}
          className="fish"
          style={{
            left: `${fish.x}px`,
            top: `${fish.y}px`,
            width: `${fish.size}px`,
            height: `${fish.size}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 50%, 50%)`,
            borderRadius: "50%",
            position: "absolute",
          }}
        ></div>
      ))}

      {/* Penguin */}
      <Penguin />
    </div>
  );
};

export default PenguinFishGame;
