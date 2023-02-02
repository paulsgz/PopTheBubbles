alert("Pop the Bubbles Game\nInstructions: Pop the bubbles and avoid the piranhas, use mouse click for control. Enjoy!!!")
const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

let score = 0;
let gameFrame = 0;
let gamespeed = 2;
let gameover = false;
context.font = '50px Georgia';

let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false
}

canvas.addEventListener('mousedown', function(event) {
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', function() {
    mouse.click = false;
    
});

const playerLeft = new Image();
playerLeft.src = "left.png"; 
const playerRight = new Image();
playerRight.src = "right2.png";


class Player {
    constructor() {
        this.x = 0;
        this.y = canvas.height/2;
        this.radius = 40;
        this.angle = 0;
        this.frame= 0;
        this.frameY = 0;
        this.frameX = 0;
        this.spriteWidth = 745;
        this.spriteHeight = 520;
    }
    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        let theta = Math.atan2(dy,dx);
        this.angle = theta;
        if(mouse.x != this.x) {
            this.x -= dx/30;
        }
        if(mouse.y != this.y) {
            this.y -= dy/30;
        }
    }
        draw() {
            if(mouse.click) {
                context.lineWidth = 0.2;
                context.beginPath();
                context.moveTo(this.x, this.y);
                context.lineTo(mouse.x, mouse.y);
                context.stroke();
            }
            // context.fillStyle ='red';
            // context.beginPath();
            // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // context.fill();
            // context.closePath()
            // context.fillRect(this.x, this.y, this.radius, 10);

            context.save();
            context.translate(this.x,this.y);
            context.rotate(this.angle);
            if(this.x >= mouse.x){
                context.drawImage(playerLeft, this.frameX * this.spriteWidth,0
                    , this.spriteWidth, this.spriteHeight, 0 -50 ,0 - 33,this.spriteWidth/7,this.spriteHeight/7);
            } else {
                context.drawImage(playerRight, this.frameX * this.spriteWidth, 0
                    , this.spriteWidth, this.spriteHeight, 0 -50 ,0 - 33,this.spriteWidth/7,this.spriteHeight/7);
            }
            context.restore();
        }

    }

    const player = new Player();
    const bubblesArr = [];
    const bubbleImage = new Image();
    bubbleImage.src = 'bubble_pop_frame_01.png';
    class Bubble {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 100;
            this.radius = 50;
            this.speed = Math.random() * 5 + 1;
            this.distance;
            this.counter = false;
            this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2';
        }
    update() {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw(){
        // context.fillStyle = 'blue';
        // context.beginPath();
        // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // context.fill();
        // context.closePath();
        // context.stroke();
        context.drawImage(bubbleImage, this.x-70, this.y-70, this.radius*2.8, this.radius*2.8);
    }
    }

    const bubblesPop1 = document.createElement('audio');
    bubblesPop1.src = 'Plop.ogg';
    const bubblesPop2 = document.createElement('audio');
    bubblesPop2.src = 'bubbles-single2.wav';
    const died = document.createElement('audio');
    died.src = '';

    function holdBubbles() {
        if(gameFrame % 50 == 0){
            bubblesArr.push(new Bubble());
        }
        for(let i = 0; i < bubblesArr.length;i++){
            bubblesArr[i].update();
            bubblesArr[i].draw();
        }
        for(let i = 0; i < bubblesArr.length;i++){   
            if(bubblesArr[i].y < 0 - this.radius * 2){
                bubblesArray.splice(i,1);
            }
            if(bubblesArr[i]){
            if(bubblesArr[i].distance < bubblesArr[i].radius + player.radius){
                console.log('collision');
                if(!bubblesArr[i].counted){
                    if(bubblesArr[i].sound == 'sound1'){
                        bubblesPop1.play();
                    } else
                        bubblesPop2.play();
                score++;
                gamespeed++;
                bubblesArr[i].counter = true;
                bubblesArr.splice(i,1);
                }
            }
            }
        }
    }

    const background1 = new Image();
    const background2 = new Image();
    const background3 = new Image();
    const background4 = new Image();
    background1.src = 'background/sea_background.png';
    background2.src = 'background/mid_background.png';
    background3.src = 'background/farground.png';
    background4.src = 'background/foreground.png';
    const BG = {
        x1: 0,
        x2: canvas.width,
        x3: 0,
        x4: canvas.width,
        x5: 0,
        x6: canvas.width,
        x7: 0,
        x8: canvas.width,
        y:0,
        width: canvas.width,
        height: canvas.height
    }
    function holdBackground() {
        if(BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
        else BG.x1 -= 0.5 ;
        if(BG.x2 <= -BG.width + gamespeed ) BG.x2 = BG.width;
        else BG.x2 -= 0.5;
        if(BG.x3 <= -BG.width + gamespeed ) BG.x3 = BG.width;
        else BG.x3 -= 0.8;
        if(BG.x4 <= -BG.width + gamespeed ) BG.x4 = BG.width;
        else BG.x4 -= 0.8;
        if(BG.x5 <= -BG.width+ gamespeed  ) BG.x5 = BG.width;
        else BG.x5 -= 1;
        if(BG.x6 <= -BG.width + gamespeed ) BG.x6 = BG.width;
        else BG.x6 -= 1;
        if(BG.x7 <= -BG.width+ gamespeed  ) BG.x7 = BG.width;
        else BG.x7 -= 1.5;
        if(BG.x8 <= -BG.width + gamespeed ) BG.x8 = BG.width;
        else BG.x8 -= 1.5;
        context.drawImage(background1,BG.x1+10,BG.y,canvas.width,canvas.height)
        context.drawImage(background1,BG.x2,BG.y,canvas.width,canvas.height)
        context.drawImage(background2,BG.x3,BG.y,canvas.width,canvas.height)
        context.drawImage(background2,BG.x4,BG.y,canvas.width,canvas.height)
        context.drawImage(background3,BG.x5,BG.y,canvas.width,canvas.height)
        context.drawImage(background3,BG.x6,BG.y,canvas.width,canvas.height)
        context.drawImage(background4,BG.x7,BG.y,canvas.width,canvas.height)
        context.drawImage(background4,BG.x8,BG.y,canvas.width,canvas.height)
    }

    const enemyImage1 = new Image();
    enemyImage1.src = 'Enemy2.png';
    const enemyImage2 = new Image();
    enemyImage2.src = 'Enemy4.png';
    const enemyImage3 = new Image();
    enemyImage3.src = 'Enemy5.png';


    class Enemy {
        constructor() {
            this.x = canvas.width + 350;
            this.y = Math.random() * (canvas.height -150) + 90;
            this.radius = 40;
            this.speed = Math.random() * 2 + 2;
            this.frame = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.spriteWidth = 454;
            this.spriteHeight = 559;
            let random = Math.random() * 2;
        }
        draw() {
            // context.fillStyle = 'red';
            // context.beginPath();
            // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // context.fill();
            context.drawImage(enemyImage1, this.frameX * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
                this.x - 50 ,this.y - 80,this.spriteWidth/3.4,this.spriteHeight/3.4);
            
            }      
        update() {
            this.x -=this.speed;
            if(this.x < 0 - this.radius *2){
                this.x = canvas.width + 200;
                this.y = Math.random() * (canvas.height - 150) + 90;
                this.speed = Math.random() * 2 + 2;
                this.frameX++;
            }
            if(gameFrame % 12 == 0){
                if(this.frameX >= 3) this.frameX = 0;
              else this.frameX++;
            }
            if(score >= 20) {
                this.speed = Math.random() * 5 + 3;
            }
            if(score >= 40) {
                this.speed = Math.random() * 7 + 4;
            }
            // if(gameFrame % 5 == 0){
            //     this.frame++;
            //     if(this.frame >=12) this.frame = 0;
            //     if(this.frame == 3 || this.frame == 7 || 11){
            //         this.frameX = 0;
            //     } else {
            //         this.frameX++;
            //     }
            //     if(this.frame < 3) this.frameY = 1;
            //     else if (this.frame < 11) this.frameY = 2;
            // }
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx * dx + dy *dy);

            if(distance < this.radius + player.radius){
                player.frameX = 4;
                player.draw();
                this.frameX = 4;
                holdGameOver();
            }
        
        }
    }
    class Enemy2 {
        constructor() {
            this.x = canvas.width + 250;
            this.y = Math.random() * (canvas.height -150) + 90;
            this.radius = 40;
            this.speed = Math.random() * 2 + 2;
            this.frame = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.spriteWidth = 454;
            this.spriteHeight = 559;
            let random = Math.random() * 2;
        }
        draw() {
            // context.fillStyle = 'red';
            // context.beginPath();
            // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // context.fill();
            context.drawImage(enemyImage2, this.frameX * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
                this.x - 50 ,this.y - 80,this.spriteWidth/3.4,this.spriteHeight/3.4);
            
            }      
        update() {
            this.x -=this.speed;
            if(this.x < 0 - this.radius *2){
                this.x = canvas.width + 300;
                this.y = Math.random() * (canvas.height - 150) + 90;
                this.speed = Math.random() * 2 + 2;
                this.frameX++;
            }
            if(gameFrame % 12 == 0){
                if(this.frameX >= 3) this.frameX = 0;
              else this.frameX++;
            }
            if(score >= 20) {
                this.speed = Math.random() * 5 + 3;
            }
            // if(gameFrame % 5 == 0){
            //     this.frame++;
            //     if(this.frame >=12) this.frame = 0;
            //     if(this.frame == 3 || this.frame == 7 || 11){
            //         this.frameX = 0;
            //     } else {
            //         this.frameX++;
            //     }
            //     if(this.frame < 3) this.frameY = 1;
            //     else if (this.frame < 11) this.frameY = 2;
            // }
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx * dx + dy *dy);
            if(distance < this.radius + player.radius){
                player.frameX = 4;
                player.draw();
                this.frameX = 4;
                holdGameOver();
            }
        
        }
    }
    class Enemy3 {
        constructor() {
            this.x = canvas.width - 1150;
            this.y = Math.random() * (canvas.height -150) + 90;
            this.radius = 40;
            this.speed = Math.random() * 2 + 2;
            this.frame = 0;
            this.frameX = 0;
            this.frameY = 0;
            this.spriteWidth = 454;
            this.spriteHeight = 559;
            let random = Math.random() * 2;
        }
        draw() {
            // context.fillStyle = 'red';
            // context.beginPath();
            // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // context.fill();
            context.drawImage(enemyImage3, this.frameX * this.spriteWidth,0,this.spriteWidth,this.spriteHeight,
                this.x - 50 ,this.y - 80,this.spriteWidth/3.4,this.spriteHeight/3.4);
            
            }      
        update() {
            this.x += this.speed;
            if(this.x > canvas.width +50 ){
                this.x = canvas.width - 1150;
                this.y = Math.random() * (canvas.height - 150) + 90;
                this.speed = Math.random() * 2 + 2;
                this.frameX++;
            }
            if(gameFrame % 12 == 0){
                if(this.frameX >= 3) this.frameX = 0;
              else this.frameX++;
            }
            if(score >= 20) {
                this.speed = Math.random() * 5 + 3;
            }
            // if(gameFrame % 5 == 0){
            //     this.frame++;
            //     if(this.frame >=12) this.frame = 0;
            //     if(this.frame == 3 || this.frame == 7 || 11){
            //         this.frameX = 0;
            //     } else {
            //         this.frameX++;
            //     }
            //     if(this.frame < 3) this.frameY = 1;
            //     else if (this.frame < 11) this.frameY = 2;
            // }
            const dx = this.x - player.x;
            const dy = this.y - player.y;
            const distance = Math.sqrt(dx * dx + dy *dy);
            if(distance < this.radius + player.radius){
                player.frameX = 4;
                player.draw();
                this.frameX = 4;
                holdGameOver();
            }
        }
    }
    const enemy1 = new Enemy();
    const enemy2 = new Enemy2();
    const enemy3 = new Enemy3();
    function holdEnemies() {
        enemy1.update();
        enemy1.draw();
        enemy2.update();
        enemy2.draw();
        enemy3.update();
        enemy3.draw();
    }
    function holdGameOver() {
        context.fillStyle = 'white';
        context.fillText('Game Over, You score is: ' + score, 130 , 150)
        gameover = true;
    }
    function winGame() {
        context.fillStyle = 'white';
        context.fillText('You Won' + score, 130 , 150)
    }
    
    function animate(){
        context.clearRect(0,0,canvas.width,canvas.height);
        holdBackground();
        holdBubbles();
        player.update();
        player.draw();
        holdEnemies();
        gameFrame++;
        if(!gameover) 
        {
            requestAnimationFrame(animate);}
        else if(score == 50) {
            winGame();
             }
        context.fillStyle = 'red'
        context.fillText('score: ' + score,10, 50);
    }
    animate();
    
    window.addEventListener('resize', function() {
        canvasPosition =canvas.getBoundingClientRect();
    })