class FishObject {
  constructor(x, y, size, canvasWidth, canvasHeight, p) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = 1;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.p = p;
  }

  update() {
    // Generate random movement
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    // Check if fish is outside the pond
    const pondWidth = 500;
    const pondHeight = 300;
    const pondCenterX = this.p.width / 2;
    const pondCenterY = this.p.height / 2;
    const pondRadiusX = pondWidth / 2;
    const pondRadiusY = pondHeight / 2;

    // Check if fish is outside the pond boundaries
    if (
      this.x < pondCenterX - pondRadiusX ||
      this.x > pondCenterX + pondRadiusX ||
      this.y < pondCenterY - pondRadiusY ||
      this.y > pondCenterY + pondRadiusY
    ) {
      // If fish is outside the pond, adjust its position to be inside the pond
      const distanceX = this.x - pondCenterX;
      const distanceY = this.y - pondCenterY;
      const angleToCenter = Math.atan2(distanceY, distanceX);
      this.x = pondCenterX + pondRadiusX * Math.cos(angleToCenter);
      this.y = pondCenterY + pondRadiusY * Math.sin(angleToCenter);
    }
  }

  display() {
    // Add logic to display fish using p5 functions
    this.p.fill(230, 230, 250); // Set fill color to lavender

    // Draw the fish body
    this.p.ellipse(this.x, this.y, this.size, this.size);

    // Draw the fish tail
    this.p.triangle(
      this.x - this.size / 2, this.y,               // Left point of the triangle
      this.x - this.size, this.y - this.size / 2,   // Top point of the triangle
      this.x - this.size / 2, this.y + this.size / 2 // Bottom point of the triangle
    );

    // Draw the fish eye
    this.p.fill(0); // Set eye color to black
    this.p.ellipse(this.x + this.size / 4, this.y, this.size / 10, this.size / 10);
  }
}

export default FishObject;
