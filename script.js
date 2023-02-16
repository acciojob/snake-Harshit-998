let snake = [[20, 1]];
let food = [5, 5];
let score = 0;
let direction = "right";
let gameInterval = setInterval(moveSnake, 100);

//Move the snake
function moveSnake() {
  let nextPosition = [snake[0][0], snake[0][1]];
  if (direction === "right") {
    nextPosition[1]++;
  } else if (direction === "left") {
    nextPosition[1]--;
  } else if (direction === "up") {
    nextPosition[0]--;
  } else if (direction === "down") {
    nextPosition[0]++;
  }

  //Check for collision with the food
  if (nextPosition[0] === food[0] && nextPosition[1] === food[1]) {
    food = generateFood();
    score++;
    updateScore();
  } else {
    snake.pop();
  }

  //Check for collision with the wall
  if (
    nextPosition[0] < 0 ||
    nextPosition[0] > 39 ||
    nextPosition[1] < 0 ||
    nextPosition[1] > 39
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Your score is " + score);
  }

  //update the snake position
  snake.unshift(nextPosition);
  updateSnake();
}

//generate random food
function generateFood() {
  return [Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)];
}

//update the score
function updateScore() {
  document.getElementById("score").innerHTML = score;
}

//update the snake
function updateSnake() {
  let snakePixels = document.getElementsByClassName("snakeBodyPixel");
  while (snakePixels.length > 0) {
    snakePixels[0].classList.remove("snakeBodyPixel");
  }
  for (let i = 0; i < snake.length; i++) {
    let pixelId = "pixel" + (snake[i][0] * 40 + snake[i][1]);
    let pixel = document.getElementById(pixelId);
    pixel.classList.add("snakeBodyPixel");
  }
}

//handle the arrow key press
document.onkeydown = function (event) {
  if (event.keyCode === 37 && direction !== "right") {
    direction = "left";
  } else if (event.keyCode === 38 && direction !== "down") {
    direction = "up";
  } else if (event.keyCode === 39 && direction !== "left") {
    direction = "right";
  } else if (event.keyCode === 40 && direction !== "up") {
    direction = "down";
  }
};
