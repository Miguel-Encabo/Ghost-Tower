var towerImg, tower;

var doorImg, door, doorGroup;

var climberImg, climber, climberGroup;

var ghostImg, ghost;

var spookySound;

var gameState = "play";

var invisibleBlock, invisibleBlockGroup;


function preload(){
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png");
    spookySound = loadSound("spooky.wav");
}

function setup(){
    createCanvas(600,600);
    
    tower = createSprite(300,300);
    tower.addImage(towerImg);
    tower.velocityY = 1;

    ghost = createSprite(200,200,50,50);
    ghost.scale = 0.3;
    ghost.addImage(ghostImg);

    climberGroup = new Group();
    doorGroup = new Group();
    invisibleBlockGroup = new Group();
}

function draw(){
    background("black");
    
    if(gameState === "play"){
        if(tower.y > 400){
            tower.y = 300;
        }
        if(keyDown("space")){
            ghost.velocityY = -1;
        }
        ghost.velocityY = ghost.velocityY + 0.8;

        if(keyDown("right_arrow")){
            ghost.x = ghost.x + 3;
        }

        if(keyDown("left_arrow")){
            ghost.x = ghost.x - 3;
        }
        spawnDoors();
        
        if(climberGroup.isTouching(ghost)){
            ghost.velocityY = 0;
        }

        if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
            ghost.destroy();
            gameState = "end";
        }

        drawSprites();
    }

    if(gameState === "end"){
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over",230,250);
    }

    
}

function spawnDoors(){
    if(frameCount % 240 === 0){
        door = createSprite(200,-50);
        door.x = Math.round(random(120,400));
        door.addImage(doorImg);
        door.velocityY = 1;
        door.lifetime = 800;
        doorGroup.add(door);

        climber = createSprite(200,10);
        climber.x = door.x;
        climber.addImage(climberImg);
        climber.velocityY = 1;
        climber.lifetime = 800;
        climberGroup.add(climber);

        invisibleBlock = createSprite(200,15);
        invisibleBlock.x = door.x;
        invisibleBlock.velocityY = 1;
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 2;
        invisibleBlock.lifetime = 800;
        invisibleBlockGroup.add(invisibleBlock);


        door.depth = ghost.depth;
        ghost.depth += 1;
    }
}