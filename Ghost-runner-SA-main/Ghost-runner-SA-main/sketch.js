var doom, doomImg
var deadlything, deadlythingImg
var ladder, ladderImg
var creak, creakImg
var visiblenot

function preload(){
  doomImg = loadImage("tower.png");
  creakImg = loadImage("door.png");
  ladderImg = loadImage("climber.png");
  deadlythingImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(700,700)
  
  doom = createSprite(350,350)
  doom.addImage(doomImg)
  doom.scale = 1.25

  deadlything = createSprite(350,350)
  deadlything.addImage(deadlythingImg)
  deadlything.scale = .5
  
  creakG = createGroup()

  ladderG = createGroup()

  visiblenotG = createGroup()
}


function draw() {
background(0)

doom.velocityY = 1.5
if(doom.y > 700){
doom.y = 350
}

if(keyDown("space")){
 deadlything.velocityY = -5
}
deadlything.velocityY+=.5 

if(keyDown("a")){
  deadlything.x -= 2.5
}

if(keyDown("d")){
  deadlything.x += 2.5
}

if(deadlything.isTouching(ladderG)){
  deadlything.velocityY = 0
}



spawnCreak()
  drawSprites();
  if(deadlything.isTouching(visiblenotG) || deadlything.y > 700){
    textSize(50)
    fill("cyan")
    text("GAME OVER!!!", 225,350)
    doom.velocityY = 0
    deadlything.destroy()
    ladderG.destroyEach()
    creakG.destroyEach()
    visiblenotG.destroyEach()
    
    
  }
}

function spawnCreak(){
 if(frameCount % 225 === 0){
  creak = createSprite(random(50,650), -5)
  creak.velocityY = 1.5
  creak.addImage(creakImg)
  creak.lifetime = 533
  
  ladder = createSprite(creak.x, creak.y+50)
  ladder.velocityY = 1.5
  ladder.addImage(ladderImg)
  ladder.lifetime = 533

   visiblenot = createSprite(creak.x, ladder.y+10,100,2)
   visiblenot.velocityY = 1.5 
   visiblenot.lifetime = 533
   visiblenot.visible = false
 
   deadlything.depth = creak.depth+1

   creakG.add(creak)

   ladderG.add(ladder)

   visiblenotG.add(visiblenot)

  }
}