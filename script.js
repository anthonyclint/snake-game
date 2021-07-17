
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); //rederiza o arquivo em 2d
let box = 32; // quadradinhos de 32 pixels
let snake = [];

snake[0]={
    x: 8 * box,
    y: 8 * box
}

let direction = "right"; // a cobra começa o jogo indo para a direita

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() // função que gera o fundo
{
    context.fillStyle = "lightblue"; // cor do fundo
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo do jogo
}

function criarSnake() // função que gera a cobra
{
    for(i=0; i<snake.length; i++)
    {
        context.fillStyle = "green"; // cor da cobra
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() // função que gera a comida
{
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) // função que cria o movimento
{
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarGame() // função que inicializa o jogo
{
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i=1; i < snake.length; i++)
    {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y)
        {
            clearInterval(game); // encerra o loop
            alert("GAME OVER!\nClique no título para recomeçar.");
        }
    }

    criarBG(); // gera o fundo
    criarSnake(); // gera a cobra
    drawFood(); // gera a comida

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    if(snakeX != food.x || snakeY != food.y) // se as coordenadas da cobra forem diferentes da coordenada da comida
    {
        snake.pop(); // elimina o quadradinho anterior ao avanço, pois a cobra ainda tem o mesmo tamanho
    }
    else // caso a cobra tenha se alimentado, então a comida deve mudar de coordenada
    {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(iniciarGame, 100);