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
        p.background(255, 0); // Transparent background
      };

      p.draw = () => {
        // Draw body
        const hue = p.map(xPos, 0, p.width, 0, 360);
        p.fill(p.color(hue, 255, 255));
        p.noStroke();
        p.beginShape();
        p.vertex(xPos + size / 2, yPos);
        p.bezierVertex(xPos + size / 2, yPos - size / 2, xPos - size / 2, yPos - size / 2, xPos - size / 2, yPos);
        p.bezierVertex(xPos - size / 2, yPos + size / 2, xPos + size / 2, yPos + size / 2, xPos + size / 2, yPos);
        p.endShape(p.CLOSE);

        // Draw tail
        p.fill(255, 255, 0); // Yellow tail
        p.triangle(xPos - size / 2, yPos, xPos - size / 2 - 20, yPos - 10, xPos - size / 2 - 20, yPos + 10);

        // Draw eye
        p.fill(0); // Black eye
        p.ellipse(xPos + size / 4, yPos, size / 10, size / 10);
      };
    };

    new p5(sketch);
  }, []);

  return null; // Since p5 canvas is created directly, return null
};

export default FishObject;
