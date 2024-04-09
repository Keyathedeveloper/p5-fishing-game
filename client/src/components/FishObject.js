// FishObject.js
import React, { useEffect } from "react";
import p5 from "p5";

const FishObject = () => {
  useEffect(() => {
    const sketch = (p) => {
      let xPos = p.random(p.width);
      let yPos = p.random(p.height);
      const size = p.random(20, 50);

      p.setup = () => {
        const canvas = p.createCanvas(800, 500);
        canvas.style("position", "absolute"); // Set canvas position to absolute
        canvas.style("z-index", "2"); // Ensure canvas is in front of the pond
        canvas.style("pointer-events", "none"); // Make canvas ignore pointer events
        p.background(0, 0); // Set transparent background
      };

      p.draw = () => {
        p.fill(255, 0, 0);
        p.ellipse(xPos, yPos, size, size);
        xPos += p.random(-3, 3);
        yPos += p.random(-3, 3);
        xPos = p.constrain(xPos, 0, p.width);
        yPos = p.constrain(yPos, 0, p.height);
      };
    };

    new p5(sketch);
  }, []);

  return <div id="fish-container"></div>;
};

export default FishObject;
