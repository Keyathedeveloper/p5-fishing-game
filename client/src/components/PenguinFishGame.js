import React, { useState, useEffect, useRef } from "react";
import p5 from "p5";
import FishObject from "./FishObject";

const PenguinFishGame = () => {
  const [penguin, setPenguin] = useState({
    x: 100,
    y: 300,
    size: 50,
    speed: 2,
    direction: 0,
  });

  const [fishObjects, setFishObjects] = useState([]);
  const fishObjectsRef = useRef([]);

  useEffect(() => {
    const p5Instance = (p) => {
      let pondRadius = 400; // Radius of the circular pond

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.loop(); // Re-enable continuous redraw

        // Draw circular pond
        p.fill(118, 201, 255); // Light blue color
        p.ellipse(p.width / 2, p.height / 2, pondRadius * 2, pondRadius * 2);

        // Initialize fish
        for (let i = 0; i < 10; i++) {
          const fishSize = p.generateRandomNumber(20, 50);
          const fishX = p.random(p.width - 2 * pondRadius) + pondRadius;
          const fishY = p.random(p.height - 2 * pondRadius) + pondRadius;
          const fish = new FishObject(fishX, fishY, fishSize);
          fishObjectsRef.current.push(fish);
          setFishObjects((prevFishObjects) => [...prevFishObjects, fish]);
        }
      };

      p.draw = () => {
        p.background(255, 0); // Transparent background

        // Draw circular pond
        p.fill(118, 201, 255); // Light blue color
        p.ellipse(p.width / 2, p.height / 2, pondRadius * 2, pondRadius * 2);

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
        p.ellipse(penguin.x, penguin.y, penguin.size, penguin.size);

        // Draw fishing rod
        p.strokeWeight(3);
        p.stroke(0); // Black color
        p.line(penguin.x + 20, penguin.y - 20, penguin.x + 40, penguin.y - 40);

        // Draw penguin head, eyes, etc.
        // Add your code to draw penguin head, eyes, etc.
      };

      p.mousePressed = () => {
        // Make penguin fish when clicked
        setPenguin((prevPenguin) => ({
          ...prevPenguin,
          // Add fishing animation or logic here
        }));
      };

      p.generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
    };

    new p5(p5Instance);
  }, []); // Removed penguin from the dependency array

  return <div id="game-container" />;
};

export default PenguinFishGame;
