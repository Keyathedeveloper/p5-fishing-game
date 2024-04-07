import React, { useEffect, useRef } from "react";
import p5 from "p5";
import FishObject from "./FishObject";

const PenguinFishGame = () => {
  const fishObjectsRef = useRef([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let pondWidth = 500; // Width of the oval-shaped pond
      let pondHeight = 300; // Height of the oval-shaped pond

      p.setup = () => {
        const canvas = p.createCanvas(pondWidth, pondHeight);
        canvas.parent("game-container");
        p.loop(); // Re-enable continuous redraw

        // Draw oval-shaped pond
        p.fill(118, 201, 255); // Light blue color
        p.ellipse(p.width / 2, p.height / 2, pondWidth, pondHeight);

        // Initialize fish
        for (let i = 0; i < 10; i++) {
          const fishSize = p.generateRandomNumber(20, 50);
          const fishX = p.random(p.width - pondWidth) + pondWidth / 2;
          const fishY = p.random(p.height - pondHeight) + pondHeight / 2 + 100; // Adjusted to lower the fish
          const fish = new FishObject(fishX, fishY, fishSize);
          fishObjectsRef.current.push(fish);
        }
      };

      p.draw = () => {
        p.background(255, 0); // Transparent background

        // Draw oval-shaped pond
        p.fill(118, 201, 255); // Light blue color
        p.ellipse(p.width / 2, p.height / 2, pondWidth, pondHeight);

        // Update and draw fish
        fishObjectsRef.current.forEach((fishObject) => {
          fishObject.update();
          fishObject.display(p);
        });

        // Draw penguin
        drawPenguin(p);
      };

      const drawPenguin = (p) => {
        // Draw penguin body
        p.fill(255);
        p.ellipse(p.width / 2, p.height / 2, 50, 50);

        // Draw fishing rod
        p.strokeWeight(3);
        p.stroke(0); // Black color
        p.line(p.width / 2 + 20, p.height / 2 - 20, p.width / 2 + 40, p.height / 2 - 40);
      };

      p.generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
    };

    // Create the p5 sketch
    const p5Canvas = new p5(sketch);

    // Cleanup function to stop the sketch when the component unmounts
    return () => {
      p5Canvas.remove();
    };
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
    />
  );
};

export default PenguinFishGame;
