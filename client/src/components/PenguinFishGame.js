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
  const fishObjectsRef = useRef([]);

  useEffect(() => {
    const p5Instance = (p) => {
      p.setup = () => {
        p.createCanvas(800, 600);
        for (let i = 0; i < 10; i++) {
          const fish = new FishObject(
            p.random(p.width),
            p.random(p.height),
            p.generateRandomNumber(20, 50)
          );
          fishObjectsRef.current.push(fish);
          setFishObjects((prevFishObjects) => [...prevFishObjects, fish]);
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

        updatePenguin(p); // Call the updatePenguin function directly
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

      const updatePenguin = (p) => { // Define updatePenguin inside the p5Instance
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
  }, []); // Removed penguin from the dependency array

  return <div id="game-container" />;
};

export default PenguinFishGame;
