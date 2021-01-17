/* VARIABLES */
const bg_color = "orange";
const border_color = "black";
const snake_color = "darkgreen";
const snake_border = "black";
const transparent = "#ffffff00";
const gameSpeed = 80;
var t; //variable for controlling settimeout
const startButton = document.getElementById("startButton");

let snake = [
    { x: 400, y: 400 },
    { x: 380, y: 400 },
    { x: 360, y: 400 },
    { x: 340, y: 400 }
]

/**  @type {HTMLCanvasElement} */ //this is here because vs code didnt give me any canvas functions
var gameCanvas = document.getElementById("canvas");
var ctx = gameCanvas.getContext("2d");
/*setting up base settings*/
let score = 0;
let highScore = 0;
let changingDirection = false;//snake is not changing direction so this will be false at start
//horizontal velocity
let dx = 20;
//vertical velocity
let dy = 0;
//food x location
let foodX;
//food y location
let foodY;
createFood();
document.addEventListener("keydown",changeDirection);//when pressing any of the arrow keys this will trigger changeDirection

/* -----FUNCTIONS----- */

function setGame(){/*calling the necessary functions to start the game*/
    main();
}

function main(){
    if(gameHasEnded()) restartGame();
    
    clearTimeout(t);
    changingDirection = false;
    t = setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        snakeAdvance();
        drawSnake();
        main();
    }, gameSpeed);
}

function restartGame(){
    restart = window.confirm("Restart the game ? (cancel will cause Highest score to reset)");
    
    if(restart){
        snake = [
            { x: 400, y: 400 },
            { x: 380, y: 400 },
            { x: 360, y: 400 },
            { x: 340, y: 400 }
        ]
        dx = 20;
        dy = 0;
        if(score > highScore){
            highScore = score;
            document.getElementById("highestScore").innerHTML = highScore;
        }
        score = 0;
        createFood();
        document.getElementById("score").innerHTML = score;
    }
    else{
        location.reload();
    }
}

function snakeAdvance() { // function to make snake advance
    const snakeHead = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    }
    snake.unshift(snakeHead);
    goingThroughWall();
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if(didEatFood){ //if snake's head and food's X and Y coordinate match snake will grow
        score += 10;
        document.getElementById("score").innerHTML = score;
        createFood();
    }
    else{
        snake.pop();//every move of snake will cause to lose last part of its body except eating the food
    }
}

function randomNum(min,max) { //random location generator for food
    return Math.round((Math.random() * (max-min) + min) / 20)*20;
}

//setting food location and checking if food is going to be created on snakes current position if so it will generate another
function createFood() {
    foodX = randomNum(0,gameCanvas.width-20);
    foodY = randomNum(0,gameCanvas.height-20);;

    snake.forEach(function isFoodOnSnake(snakePart) {
        const foodIsOnSnake = snakePart.x === foodX && snakePart.y === foodY
        if(foodIsOnSnake) createFood();
    })
}

function createSnake(snakePart) {//snake color,size and location
    ctx.fillStyle = snake_color;
    ctx.strokeStyle = snake_border;
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function drawSnake() {//displaying the snake
    snake.forEach(createSnake);
}

function drawFood() {//food location and appearance
    ctx.font = '1.25em serif';
    ctx.fillText("\u{1F34E}",foodX-3,foodY+15);// -3 and +15 because other wise apple symbol will overflow canvas
    ctx.strokeStyle = transparent;
    var box = ctx.strokeRect(foodX,foodY,20,20);
}

function clearCanvas() {//canvas settings this function is on main because we need to keep display deleted parts of the snake
    //selecting colors for canvas
    ctx.fillStyle = bg_color;
    ctx.strokeStyle = border_color;
    //applying the colors and drawing 
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function gameHasEnded(){//checking if snake will eat itself
    for(let i=4; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
}

function goingThroughWall(){
    if(snake[0].x > 780){
        snake[0].x = 0;
    }
    if(snake[0].x < 0){
        snake[0].x = 780;
    }
    if(snake[0].y > 780){
        snake[0].y = 0;
    }
    if(snake[0].y < 0){
        snake[0].y = 780;
    }
}

function changeDirection(event) {//direction events
    const LEFT_ARROW = 37;
    const UP_ARROW = 38;
    const RIGHT_ARROW = 39;
    const DOWN_ARROW = 40;
    
    /* this is for preventing snake to reverse, example:assume snake going right if user press immediately down and left button snake will reverse to the left*/
    if(changingDirection) return; 
    changingDirection = true;

    const keyPressed = event.keyCode;

    const goingRight = dx === 20;
    const goingLeft = dx === -20;
    const goingUp = dy === -20;
    const goingDown = dy === 20;

    if(keyPressed === LEFT_ARROW && !goingRight){
        dx = -20;
        dy = 0;
    }
    if(keyPressed === RIGHT_ARROW && !goingLeft){
        dx = 20;
        dy = 0;
    }
    if(keyPressed === UP_ARROW && !goingDown){
        dx = 0;
        dy = -20;
    }
    if(keyPressed === DOWN_ARROW && !goingUp){
        dx = 0;
        dy = 20;
    }
}