let canvas, ctx;
let w, h, cw = 30;
let d, food, score, speed = 130;
let snake = [];
let gameLoop;
let paused = false;
let foodImages = [];
let currentFoodImage;
let snakeHeadImage;
//images could be easily changed to friends faces HAVE FUN!

window.onload = function () {
    canvas = document.getElementById("defaultCanvas");
    ctx = canvas.getContext("2d");

    w = canvas.width;
    h = canvas.height;

    // Load food images
    foodImages = [
        document.getElementById("food1"),
        document.getElementById("food2"),
        document.getElementById("food3"),
        document.getElementById("food4")
    ];

    // Load snake head image
    snakeHeadImage = document.getElementById("snakeHead");

    // Start game immediately, images will load asynchronously
    document.getElementById("restart-btn").addEventListener("click", init);
    document.getElementById("pause-btn").addEventListener("click", togglePause);
    document.addEventListener("keydown", handleKey);
    init();
};

function init() {
    console.log("Init function called - resetting game");
    clearInterval(gameLoop);

    d = "right";
    score = 0;
    snake = [];

    document.getElementById("overlay").style.display = "none";

    createSnake();
    createFood();

    gameLoop = setInterval(paint, speed);
}

function createSnake() {
    for (let i = 4; i >= 0; i--) {
        snake.push({ x: i, y: 0 });
    }
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * (w / cw)),
        y: Math.floor(Math.random() * (h / cw)),
        type: Math.floor(Math.random() * 4)
    };
}

function paint() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "white";
    ctx.strokeRect(0, 0, w, h);

    if (!paused) {
        let nx = snake[0].x;
        let ny = snake[0].y;

        if (d === "right") nx++;
        if (d === "left") nx--;
        if (d === "up") ny--;
        if (d === "down") ny++;

        if (
            nx < 0 || ny < 0 ||
            nx >= w / cw || ny >= h / cw ||
            snake.some(c => c.x === nx && c.y === ny)
        ) {
            endGame();
            return;
        }

        let tail;
        if (nx === food.x && ny === food.y) {
            tail = { x: nx, y: ny };
            score++;
            createFood();
        } else {
            tail = snake.pop();
            tail.x = nx;
            tail.y = ny;
        }

        snake.unshift(tail);
    }

    snake.forEach((c, index) => {
        if (index === 0) {
            // Draw snake head image if loaded, else draw cell
            if (snakeHeadImage.complete && snakeHeadImage.naturalHeight !== 0) {
                ctx.drawImage(snakeHeadImage, c.x * cw, c.y * cw, cw, cw);
            } else {
                paintCell(c.x, c.y, "blue");
            }
        } else {
            paintCell(c.x, c.y, "red");
        }
    });
    // Draw food image (larger size) if loaded, else draw cell
    if (foodImages[food.type] && foodImages[food.type].complete && foodImages[food.type].naturalHeight !== 0) {
        ctx.drawImage(foodImages[food.type], food.x * cw - 2.5, food.y * cw - 2.5, cw + 5, cw + 5);
    } else {
        paintCell(food.x, food.y, "#00ff9c");
    }
}
//The real function

function paintCell(x, y, color = "red", size = cw) {
    ctx.fillStyle = color;
    ctx.fillRect(x * cw, y * cw, size, size);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * cw, y * cw, size, size);
}

function endGame() {
    clearInterval(gameLoop);
    document.getElementById("final_score").textContent = score;
    document.getElementById("overlay").style.display = "flex";
}

function togglePause() {
    paused = !paused;
    const btn = document.getElementById("pause-btn");
    btn.textContent = paused ? "Resume" : "Pause";
}

function handleKey(e) {
    if (paused) return;

    if (e.key === "ArrowLeft" && d !== "right") {
        d = "left";
        e.preventDefault();
    }
    if (e.key === "ArrowUp" && d !== "down") {
        d = "up";
        e.preventDefault();
    }
    if (e.key === "ArrowRight" && d !== "left") {
        d = "right";
        e.preventDefault();
    }
    if (e.key === "ArrowDown" && d !== "up") {
        d = "down";
        e.preventDefault();
    }
}
