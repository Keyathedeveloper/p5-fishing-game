import React, { useEffect, useState } from "react";
import p5 from "p5";

const FishGame = () => {
  const [fish, setFish] = useState([]);

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(800, 600, p.WEBGL);
        for (let i = 0; i < 10; i++) {
          setFish((prevFish) => [
            ...prevFish,
            new Fish(p.random(p.width), p.random(p.height), p.random(20, 50)),
          ]);
        }
      };

      p.draw = () => {
        p.background(220);
        fish.forEach((fish) => {
          fish.update();
          fish.display();
        });
      };
    };

    new p5(sketch);
  }, []);

  return <div id="game-container" />;
};

class Fish {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = random(1, 3);
    this.direction = random(TWO_PI);
  }

  update() {
    this.x += this.speed * cos(this.direction);
    this.y += this.speed * sin(this.direction);
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.x = random(width);
      this.y = random(height);
    }
  }

  display() {
    p5.fill(255, 0, 0);
    p5.ellipse(this.x, this.y, this.size, this.size);
  }
}

export default FishGame;
