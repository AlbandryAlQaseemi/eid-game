let canvas = document.getElementById("canvas");
let image = document.getElementById("wiz");
let rocksImg = document.getElementById("rock");
let stonesImg = document.getElementById("stones");
let hammerImg = document.getElementById("hammer");
let angerImg = document.getElementById("anger");
let context = canvas.getContext("2d");

class Player{
    constructor(img,x, y, w, h, velocity){
        this.img = img
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocity = velocity

    }  
    
    draw(){
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}

const player = new Player(image,350, 650,150,150)

player.velocity =6
player.draw()

class Projectile{
    constructor(imgH,x, y, w, h, velocity){
        this.imgH = imgH
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocity = velocity

    }  
    
    draw(){
    context.drawImage(this.imgH, this.x, this.y, this.w, this.h);
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Partitions{
    constructor(img1,x, y, w, h){
        this.img1 = img1
        this.x = x
        this.y = y
        this.w = w
        this.h = h
     
    }  
    draw(){
        context.drawImage(this.img1, this.x, this.y, this.w, this.h);
        }
}

const partition1 = new Partitions(stonesImg,200, 450,100,100)
const partition2 = new Partitions(stonesImg,600, 500,100,100)
partition1.draw()
partition2.draw()

class Enemy{
    constructor(enm,x, y, w, h, velocity){
        this.enm = enm
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocity = velocity

    }  
    
    draw(){
    context.drawImage(this.enm, this.x, this.y, this.w, this.h);
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}
class Boss{
    constructor(img,x, y, w, h, velocity){
        this.img = img
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocity = velocity

    }  
    
    draw(){
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}

const boss = new Boss(angerImg,Math.random()*(canvas.width-300), 15+Math.random()*30,300,300)

boss.draw()






const projectiles = []
const enemies = []


function spawnEnemies(){
    setInterval(()=>{
        const h = 80
        const w = 80
        const x = Math.random()*(canvas.width-w);
        const y= 15+Math.random()*30;
        
        const enmImg = rocksImg
        const velocity = {
            x:0,
            y:1
        }
        enemies.push(new Enemy(enmImg, x,y,w ,h, velocity))
    }, 1000)
}

const bossArr = []

function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width,canvas.height);
    player.draw()
    partition1.draw()
    partition2.draw()
    boss.draw()
   
    projectiles.forEach((projectile) => {
      projectile.update()
    });

 
    


  enemies.forEach((enemy, indexM) => {
      enemy.update()

      projectiles.forEach((projectile ,indexP) => {
      const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
      if(dist - projectile.w - enemy.h <1){
         enemies.splice(indexM, 1)
         projectiles.splice(indexP,1)
      }
    });

    
        const dist1 = Math.hypot(enemy.x - partition1.x, enemy.y - partition1.y)
        if(dist1 - partition1.h < 1){
           enemies.splice(indexM, 1)
           console.log("dist1")
        }
        const dist2 = Math.hypot(enemy.x - partition2.x, enemy.y - partition2.y)
        if(dist2 - partition2.h < 1){
           enemies.splice(indexM, 1)
           console.log("dist2")
         
        }
    
  });
}
window.onkeydown = function(e) {
   if(e.keyCode == 39) { // right 
       player.x += 20
       player.draw()
    } else if(e.keyCode ==37) { // left
        player.x -= 20     
        player.draw()  
    }
    else if(e.keyCode == 32) {
            projectiles.push(
            new Projectile(
                hammerImg,
                player.x+50,
                player.y,
                60,
                60,
                {
               x:0,
               y:-5
                })
        )
        
    }
  }
      
 animate();
 spawnEnemies();
 