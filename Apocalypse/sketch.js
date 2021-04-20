var cowboy, cowboyImage, zombie, zombiesGroup, zombieImage, deadZombieImage;
var score = 0;
var explosion1, explosion2, explosion3, explosion4, explosionImage, textR, textImage;
var posX, posY, intro, introImage;
var gameover, gameoverImage;
var gamestate = "begin";
var delay = 80;

function preload(){
    cowboyImage = loadImage("./Cowboy.png");
    deadZombieImage = loadImage("./Dead Zombie.png");
    zombieImage = loadImage("./Zombie.png");
    explosionImage = loadImage("./explosion.png");
    gameoverImage = loadImage("./gameover.png");
    textImage = loadImage("./text.png");
    introImage = loadImage("./intro.png");

}
function setup(){
    canvas = createCanvas(400, 400);
    zombiesGroup = new Group();

    gameover = createSprite(200, 200, 20, 20);
    gameover.addImage(gameoverImage);
    gameover.scale = 0.6;

    textR = createSprite(200, 280, 20, 20);
    textR.addImage(textImage);
    textR.scale = 0.8;

    intro = createSprite(200, 200, 20, 20);
    intro.addImage(introImage);
    intro.scale = 1;
    
    cowboy = createSprite(180, 320, 20, 20);
    cowboy.addImage(cowboyImage)
    cowboy.scale = 0.7;

}
function draw(){
    background("lightgreen")
    
    
    if(gamestate == "begin"){
        intro.visible = true;
        gameover.visible = false;
        textR.visible = false;
        cowboy.visible = false;
        if(keyIsDown(88)){
            gamestate = "play"
        }
    }
    if(gamestate == "play"){
        textR.visible = false;
        gameover.visible = false;
        intro.visible = false;
        cowboy.visible = true;

        if(delay > 0){
            delay -= 1
        }
        textSize(13);
        text("Explosion Cooldown: " + Math.round(delay/5), 250, 20);
        text("Score: " + score, 20, 20);
        if(score < -1){
            gamestate = "end"
        }
        spawnZombies();
    }
    if(gamestate == "end"){
        intro.visible = false;
        textR.visible = true;
        gameover.visible = true;
        cowboy.visible = false;
        score = 0;
        zombiesGroup.setLifetimeEach(0);
        if(keyIsDown(82)){
            gamestate = "play";
        }
    }
    drawSprites();
}
function keyPressed(){
   
    if(gamestate == "play"){

        if(delay == 0){

            if(keyCode == 86){
                explosion1 = createSprite(300, 300, 20, 20);
                explosion1.addImage(explosionImage);
                explosion1.scale = 0.1;
                explosion1.lifetime = 20;
                if(posX > 200 && posY > 200){
                    zombiesGroup.setLifetimeEach(0);
                    score += 1;
                }else{
                    score -= 1;
                }
                delay = 80;
            }
            if(keyCode == 67){
                explosion2 = createSprite(100, 300, 20, 20);
                explosion2.addImage(explosionImage);
                explosion2.scale = 0.1;
                explosion2.lifetime = 20;
                if(posX < 200 && posY > 200){
                    zombiesGroup.setLifetimeEach(0);
                    score += 1;
                }else{
                    score -= 1;
                }
                delay = 80;
            }
            if(keyCode == 84){
                explosion3 = createSprite(300, 100, 20, 20);
                explosion3.addImage(explosionImage);
                explosion3.scale = 0.1;
                explosion3.lifetime = 20;
                if(posX > 200 && posY < 200){
                    zombiesGroup.setLifetimeEach(0);
                    score += 1;
                }else{
                    score -= 1;
                }
                delay = 80;
            }
            if(keyCode == 82){
                explosion4 = createSprite(100, 100, 20, 20);
                explosion4.addImage(explosionImage);
                explosion4.scale = 0.1;
                explosion4.lifetime = 20;
                if(posX < 200 && posY < 200){
                    zombiesGroup.setLifetimeEach(0);
                    score += 1;
                }else{
                    score -= 1;
                }
                delay = 80;
            }
        }
        
    }
    
}
function spawnZombies() {
    
    if (frameCount % 60 === 0) {
      var zombie = createSprite(600,120,40,10);
      zombie.y = Math.round(random(0,400));
      zombie.x = Math.round(random(0,400));
      posX = zombie.x;
      posY = zombie.y;
      console.log(posX);
      console.log(posY);
      zombie.addImage(zombieImage);
      zombie.scale = 0.15;
      zombie.lifetime = 100
      zombie.depth = cowboy.depth - 1;
      zombiesGroup.add(zombie);
    }
}
