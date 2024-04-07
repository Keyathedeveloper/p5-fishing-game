class FishObject {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 1; // Add any additional properties as needed
  }

  update() {
    // Add logic to update fish position, size, etc.
    this.x += this.speed;
    // Add additional logic as needed
  }

  display(p) {
    // Add logic to display fish using p5.js functions
    p.fill(230, 230, 250); // Set fill color to lavender

    // Draw the fish body
    p.ellipse(this.x, this.y, this.size, this.size);

    // Draw the fish tail
    p.triangle(
      this.x - this.size / 2, this.y,               // Left point of the triangle
      this.x - this.size, this.y - this.size / 2,   // Top point of the triangle
      this.x - this.size / 2, this.y + this.size / 2 // Bottom point of the triangle
    );

    // Draw the fish eye
    p.fill(0); // Set eye color to black
    p.ellipse(this.x + this.size / 4, this.y, this.size / 10, this.size / 10);
  }
}

export default FishObject;
