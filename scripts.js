/* eslint-disable no-undef */
/* eslint-disable no-alert */
// Define canvas and get the context

// Ball class
// Paddle class
// Brick class
// score
// lives
// game
let rightPressed = false;
let leftPressed = false;

class Game {
  constructor(dx = 4, dy = -4) {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.dx = dx;
    this.dy = dy;
    this.rightPressed = false;
    this.leftPressed = false;
    this.score = new Score(this.canvas.width);
    this.lives = new Lives(this.canvas.width);
    this.paddle = new Paddle((this.canvas.width - 75) / 2, this.canvas);
    this.ball = new Ball(this.canvas.width / 2,
    this.canvas.height - 30);
    this.bricks = new Bricks();

  }

  run() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.render(this.ctx);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx, canvas);
    this.score.render(this.ctx);
    this.lives.render(this.ctx);
    this.ball.move();
    this.collisionDetection();
    requestAnimationFrame(this.run.bind(this));
  }

  collisionDetection() {
    if (this.ball.x < this.ball.radius || this.ball.x > this.canvas.width - this.ball.radius) {
      this.ball.dx *= -1;
    }
    if (this.ball.y < this.ball.radius) {
      this.ball.dy *= -1;
    }
    if (this.ball.y > this.canvas.height - this.ball.radius) {
      this.lives.loseLife();
      this.ball.reset();
      if (this.lives.lives === 0) {
        alert('You Blew IT!!!!!');
        document.location.reload();
      }
    }
    if (this.score.score === 15) {
      alert('You Win!~!!');
      document.location.reload();
    }
    if (this.ball.y > this.canvas.height - this.ball.radius - this.paddle.height
       && this.ball.x < this.paddle.x + this.paddle.width && this.ball.x > this.paddle.x) {
      this.ball.dy *= -1;
    }
    for (let c = 0; c < this.bricks.columnCount; c += 1) {
      for (let r = 0; r < this.bricks.rowCount; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1 && this.ball.x > brick.x
          && this.ball.x < brick.x + brick.width) {
          if (this.ball.y + this.ball.radius > brick.y
            && this.ball.y - this.ball.radius < brick.y + brick.height) {
            this.ball.dy *= -1;
            brick.status = 0;
            this.score.update(1);
          }
        }
      }
    }
  }
}

class Ball {
  constructor(x, y, radius = 10) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y;
    this.dx = 2;
    this.dy = -2;
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

  reset() {
    this.x = this.originalX;
    this.y = this.originalY;
    this.dx = 2;
    this.dy = -2;
  }
}

class Paddle {
  constructor(x, canvas, height = 10, width = 75, color = 'red') {
    this.x = x;
    this.y = 10;
    this.height = height;
    this.width = width;
    this.color = color;
    this.canvas = canvas;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.canvas.height - this.height, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    if (leftPressed) {
      this.moveLeft();
    }
    if (rightPressed) {
      this.moveRight();
    }
  }

  moveLeft() {

    if (this.x > 0) {
      this.x -= 7;
    }
  }

  moveRight() {
    if (this.x + this.width < this.canvas.width) {
      this.x += 7;
    }
  }
}

class Brick {
  constructor(c = 0, r = 0, x = 100, y = 100, color = '#0095DD') {
    this.c = c;
    this.r = r;
    this.color = color;
    this.x = x
    this.y = y
    this.status = 1;
    this.width = 75;
    this.height = 20;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    const red = 255 * (this.c / this.r);
    const green = 255 * (this.r / this.c);
    const blue = (this.c * this.r);
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fill();
    ctx.closePath();
  }

}

class Bricks {
  constructor(row = 3, column = 5) {
    this.bricks = []
    this.rowCount = row;
    this.columnCount = column;
    this.padding = 10;
    this.offsetTop = 30;
    this.offsetLeft = 30;
    this.make();
  }

  make() {
    for (let c = 0; c < this.columnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rowCount; r++) {
        this.bricks[c][r] = new Brick(c, r)
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.columnCount; c++) {
      for (let r = 0; r < this.rowCount; r++) {
        if (this.bricks[c][r].status == 1) {
          const brickX = (c * (this.bricks[c][r].width + this.padding)) + this.offsetLeft;
          const brickY = (r * (this.bricks[c][r].height + this.padding)) + this.offsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.bricks[c][r].render(ctx)
        }
      }
    }
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
  constructor(width, color = 'Red', lives = 3, font = '16px Arial') {
    this.x = width - 65;
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
    this.lives -= 1;
  }

  reset(lives = 0) {
    this.lives = lives;
  }
}

// class Background {
//   this.background = document.getElementById('back')
//   this.
// }


const ball = new Ball(canvas.width / 2, canvas.height - 30)

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

const game = new Game();
game.run();


// draw();
