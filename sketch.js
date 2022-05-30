var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg, bgImg, player, playerImg, b1, b2, germ, germ1, germ2, germ3, germsGroup,bg1,bg1Img, va, vaImg
var gameOver, gameOverImg
var pfpImg, pfp, frame, frameImg
var fuel=240;
var life=240;
var fuelTank, fuelImg, fuelGroup
var counter=3

function preload(){
  
  frameImg=loadImage('images/frame.png')
  pfpImg=loadImage('images/pfp.jpg')
  bg1Img=loadImage('images/bg.jpg')
  bgImg=loadImage('images/road.jpg')
  playerImg=loadImage('images/player.png')
  germ1=loadImage('images/germ1.gif')
  germ2=loadImage('images/germ2.gif')
  germ3=loadImage('images/germ3.gif')
  gameOverImg=loadImage('images/gameOver.png')
  

}

function setup() {

 createCanvas(windowWidth,windowHeight);

 //bg1=createSprite(windowWidth/2,windowHeight/2)
 //bg1.addImage(bg1Img)
 //bg1.scale=4

 bg=createSprite(windowWidth/2,windowHeight/2)
 bg.addImage(bgImg)
 
 bg.velocityY=10
 
 player=createSprite(windowWidth/2,windowHeight-150)
 player.addImage(playerImg)
 player.scale=.25
 player.rotation=270

 b1=createSprite(300,windowHeight/2,750,windowHeight)
 b1.visible=false
 b2=createSprite(1600,windowHeight/2,700,windowHeight)
 b2.visible=false

 germsGroup = new Group();
 fuelGroup = new Group();

 gameOver=createSprite(windowWidth/2,windowHeight/2)
 gameOver.addImage(gameOverImg);
 gameOver.visible=false
 gameOver.scale=.3

 pfp=createSprite(120,120,100,100)
 pfp.addImage(pfpImg)
 pfp.scale=.56

 

 frame=createSprite(120,120,100,100)
 frame.addImage(frameImg)
 frame.scale=.8

}

function draw() {
  background(0); 
  
  player.setCollider('rectangle',0,0,600,230)

  //player.debug= true
  fill('white')
  stroke('white')
 rect(pfp.x+100,pfp.y-40,240,20)

 rect(pfp.x+100,pfp.y+20,240,20)

 fill('red')

 rect(pfp.x+100,pfp.y-40,life,20)

 fill('yellow')
 rect(pfp.x+100,pfp.y+20,fuel,20)

  if(gameState=== PLAY){

    if(frameCount % 5===0 ){
   fuel=fuel-.5
    }

  if(bg.y>windowHeight+500){
    bg.y=windowHeight/2
  }
 
if(keyDown("d")){
  player.x=player.x+10
}

if(keyDown("a")){
  player.x=player.x-10
}

player.collide(b1);
player.collide(b2);

if(player.isTouching(germsGroup)){

  if(life>0){
    life=life-80
  }
}

spawnObstacles()
}
else if(gameState===END){
  bg.velocityY=0;
  germsGroup.setVelocityYEach(0);
  germsGroup.setLifetimeEach(-1);
  gameOver.visible=true
}

drawSprites();

} 


function spawnObstacles() {
  if(frameCount % 15 === 0) {
    var germ = createSprite(random(750,1200),-5,10,40);
    
    germ.velocityY = 18;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: germ.addImage(germ1);
              break;
      case 2: germ.addImage(germ2);
              break;
      case 3: germ.addImage(germ3);
              break;
      
      default: break;
    }
       
    germ.scale = 0.2;
    germ.lifetime = 300;
    
    germsGroup.add(germ);
  }
}