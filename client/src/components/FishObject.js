import { useEffect } from "react";
import p5 from "p5";

const FishObject = () => {
  useEffect(() => {
    const sketch = (p) => {
      let xPos = p.random(p.width);
      let yPos = p.random(p.height);
      const size = p.random(20, 50);

      p.setup = () => {
        p.createCanvas(800, 500);
        p.background(0, 0); // Transparent background
      };

      p.draw = () => {
        const hue = p.map(xPos, 0, p.width, 0, 360);
        p.fill(p.color(hue, 255, 255));
        p.ellipse(xPos, yPos, size, size);
        xPos += p.random(-3, 3);
        yPos += p.random(-3, 3);
        xPos = p.constrain(xPos, 0, p.width);
        yPos = p.constrain(yPos, 0, p.height);
      };
    };

    new p5(sketch);
  }, []);

  return null; // Since p5 canvas is created directly, return null
};

export default FishObject;
