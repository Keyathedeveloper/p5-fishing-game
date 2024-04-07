import React, { useState, useEffect, useRef } from "react";
import p5 from "p5";
import FishObject from "./FishObject"; // Import FishObject from its file

const PenguinFishGame = () => {
  const [penguin, setPenguin] = useState({
    x: 400,
    y: 550,
    size: 50,
    speed: 2,
    direction: 0,
  });

  const [fishObjects, setFishObjects] = useState([]);
  const fishObjectsRef = useRef(fishObjects);

  useEffect(() => {
    fishObjectsRef.current = fishObjects;
  }, [fishObjects]);

  useEffect(() => {
    const p5Instance = (p) => {
      p.setup = () => {
        p.createCanvas(800, 600, p.WEBGL);
        for (let i = 0; i < 10; i++) {
          setFishObjects((prevFishObjects) => [
            ...prevFishObjects,
            new FishObject(
              p.random(p.canvasWidth),
              p.random(p.canvasHeight),
              p.generateRandomNumber(20, 50)
            ),
          ]);
        }
      };

      p.draw = () => {
        p.background(220);
        p.fill(255);
        p.ellipse(penguin.x, penguin.y, penguin.size, penguin.size);

        fishObjectsRef.current.forEach((fishObject) => {
          fishObject.update();
          fishObject.display(p);
        });
      };

      p.keyPressed = () => {
        if (p.key === "ArrowUp") {
          setPenguin((prevPenguin) => ({
            ...prevPenguin,
            direction: prevPenguin.direction + Math.PI / 2,
          }));
        } else if (p.key === "ArrowDown") {
          setPenguin((prevPenguin) => ({
            ...prevPenguin,
            direction: prevPenguin.direction - Math.PI / 2,
          }));
        } else if (p.key === " ") {
          setPenguin((prevPenguin) => ({
            ...prevPenguin,
            speed: prevPenguin.speed + 1,
          }));
        }
      };

      p.keyReleased = () => {
        if (p.key === " ") {
          setPenguin((prevPenguin) => ({
            ...prevPenguin,
            speed: prevPenguin.speed - 1,
          }));
        }
      };

      p.updatePenguin = () => {
        setPenguin((prevPenguin) => ({
          ...prevPenguin,
          x: prevPenguin.x + prevPenguin.speed * Math.cos(prevPenguin.direction),
          y: prevPenguin.y + prevPenguin.speed * Math.sin(prevPenguin.direction),
        }));
      };

      p.generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };

      p.preload = () => {};
    };

    new p5(p5Instance);
  }, [penguin]); // Add penguin to the dependency array

  return <div id="game-container" />;
};

export default PenguinFishGame;
