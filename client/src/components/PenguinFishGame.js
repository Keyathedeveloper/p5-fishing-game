import React, { useEffect, useRef } from "react";
import FishObject from "./FishObject";
import Penguin from "./Penguin"; // Import Penguin component

const PenguinFishGame = () => {
  const fishObjectsRef = useRef([]);

  useEffect(() => {
    // Initialize fish
    for (let i = 0; i < 10; i++) {
      const fishSize = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
      const fishX = Math.random() * (500 - fishSize);
      const fishY = Math.random() * (300 - fishSize);
      const fish = new FishObject(fishX, fishY, fishSize);
      fishObjectsRef.current.push(fish);
    }
  }, []);

  return (
    <div
      id="game-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Make the container full height of the viewport
      }}
    >
      <Penguin />
      {/* Render Penguin component */}
      <div id="pond" /> {/* Render pond div */}
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
            transform: `rotate(${fish.angle}deg)`,
            transition: "all 1s ease-in-out",
          }}
        ></div>
      ))}
    </div>
  );
};

export default PenguinFishGame;
