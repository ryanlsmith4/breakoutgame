/* eslint-disable no-undef */
/* eslint-disable no-alert */
// Define canvas and get the context

// Ball class
// Paddle class
// Brick class
// score
// lives
// game
class Game {
  constructor() {
    this.canvas = document.getElementById('canvas')
    this.ball = new Ball(this.canvas.width/2, this.canvas.height - 30);

  }
}


class Ball {
  constructor(x, y, radius = 10) {
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.yd = -2;
    this.radius = radius;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }
}

class Paddle {
  constructor(x, y, Height = 10, Width = 75, color = red) {
    this.x = x;
    this.y = y;
    this.Height = Height;
    this.Width = Width;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, game.canvas.height - this.height, this.width, this.height);
    ctx.fill();
    ctx.closePath();
  }

  moveLeft() {
    this.x - 7;
  }

  moveRight() {
    this.x + 7;
  }
}

//WORK IN PROGRESS
class Brick {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.status = 1;
  }
}

class Score {
  constructor(color = 'Blue', font = '16px Arial') {
    this.x = 8;
    this.y = 20;
    this.color = color;
    this.font = font;
    this.score = 0;
  }

  render(ctx) {
    ctx.font = this.font
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.score}`, this.x, this.y)
  }

  update(points) {
    this.score += points
  }

  reset() {
    this.score = 0;
  }
}

class Lives {
  constructor(color = 'Red', lives = 3, font = '16px Arial') {
    this.x = game.width - 65;
    this.y = 20;
    this.color = color;
    this.lives = lives;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }

  loseLife() {
    this.life - 1;
  }

  reset() {
    this.life = lives;
  }
}

class Background {
  this.background = document.getElementById('back')
  this.
}













const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ball = new Ball(canvas.width/2, canvas.height - 30)

let score = 0;
let lives = 3;

// declare Ball variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

// declare paddle variables
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

// declare brick variables
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Color Array for bricks
const colors = ['red', 'green', 'brown', 'orange', 'cadetblue'];

// Color Array for paddle
const padColors = ['blue', 'black', 'silver', 'lime', 'yellow'];

// Color variables
let counter = 0;
const COUNTER_LIMIT = 180;
const amountOfColors = colors.length;
let currentColor = 0;

// Logic to create bricks
const bricks = [];
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    bricks[c][r] = {
      x: 0,
      y: 0,
      status: 1,
    };
  }
}


// These ES6 functions don't get hoisted. Must put them before the event listene
// =============================================================================
const keyDownHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
};

const keyUpHandler = (e) => {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
};

// KeyEvent Listeners

document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

//  Functions for BreakoutJS
// =============================================================================
const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            alert('YOU WIN CONGRATULATIONS');
            document.location.reload();
          }
        }
      }
    }
  }
};

const drawBall = () => {
  ball.render(ctx)
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  if (counter >= COUNTER_LIMIT) {
    if (currentColor === amountOfColors - 1) {
      currentColor = 0;
    } else {
      currentColor += 1;
    }
    counter = 0;
  }
  ctx.fillStyle = padColors[currentColor];

  ctx.fill();
  ctx.closePath();
};


const drawBricks = () => {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      if (bricks[c][r].status === 1) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        if (counter >= COUNTER_LIMIT) {
          if (currentColor === amountOfColors - 1) {
            currentColor = 0;
          } else {
            currentColor += 1;
          }
          counter = 0;
        }
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = colors[currentColor];

        ctx.fill();
        ctx.closePath();

      }
      counter += 1;
    }
  }
};

const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText(`Lives:  ${lives}`, canvas.width - 65, 20);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }

  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth);
      }
    }
  }
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
};


draw();
