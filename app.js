// Enemies our player must avoid
// var Enemy = function() --> I changed a bit this form already given {
  
// Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

// I need the coordonates as variables too because of multiple bugs locations
// and the different speed for bugs would be more interesting here
class Enemy {
    constructor (x, y, direction,change) {
        this.sprite = 'images/enemy-bug.png';
        this.x=0+x;
        this.y=y+65; 
        this.step_cell=101;  //it will help for the boundary calculation  
        this.right_limit=this.step_cell*5;
        this.direction=direction;
        this.change=change;
        this.speed=Math.floor((Math.random()*190)+ this.change);
    }   
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
}
const bug1=new Enemy(-this.step_cell,-83,'right',350);
const bug2=new Enemy(this.step_cell*(1.5),83*2-30,'left',220); 
//this -30 will help to move a bit the bug and create a kind of illusion on purpose
// that the bug could hit the hero, but it is not like that, it's interesting when the here is close to the rocks;
const bug3=new Enemy((-this.step_cell*4),83*2,'right',220);
const bug4=new Enemy((-this.step_cell*1),83,'left',180);
const bug5=new Enemy(-this.step_cell,0,'left',200);
const allEnemies=[];
allEnemies.push(bug1,bug2,bug3,bug4,bug5);
console.log(allEnemies);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // --> add also the boundaries like in Hero case, but x_axis is enough here
    if(this.direction==='left'){
        if(this.x <= this.right_limit) {
            this.x+=this.speed*dt;
            }
        else {
            this.x=-101; 
        //a small detail for how the bug enters on the grid,one cell backwards
            }
    }
    if(this.direction==='right') {
        if(this.x > -this.step_cell ) {
            this.sprite='images/enemy-bug-right-side.png';
            this.x-=this.speed*dt;
            }
        else {
            this.x=this.right_limit; 
        //a small detail for how the bug enters on the grid, one cell backwards
        }
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//I added another kind of enemy but separatelly because of different values for properties 
class Rocks {
    constructor(x,y ) {
        this.sprite='images/Rock.png'; 
        this.x_step=101;
        this.y_step=83;
        this.x_start=this.x_step*2;
        this.y_start=this.y_step*4-35;  
        this.x=this.x_start-x;
        this.y=this.y_start-y;   
    }
    render() {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    } 
};

const rock1=new Rocks(101,10); 
const rock2=new Rocks(202,10);
const rock3=new Rocks(0,250);
const rock4=new Rocks(-101,90);
const allRocks=[];
allRocks.push(rock1 ,rock2, rock3,rock4);

// draw each time the girl's image in connection with her position, 
// this is similar to the above already provided piece of code for Enemy;
class Hero {
    constructor() {
        this.sprite='images/char-horn-girl.png';
        this.x_step=101;
        this.y_step=83;
        this.x_start=this.x_step*2;
        this.y_start=this.y_step*4+65;
        this.x=this.x_start;
        this.y=this.y_start;     
        this.won=false;    
    }
    render() {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    }
    handleInput (keycode) {
        switch (keycode) {
            case 'left':
                if(this.x >0){
                    this.x-=this.x_step;
                }
                break;
            case 'right':
                if(this.x <this.x_step*4) {
                    this.x+=this.x_step;
                }
                break;
            case 'up':
                if(this.y>0) {
                this.y-=this.y_step;
                }
                break;
            case 'down':
                if(this.y<this.y_step*5-20){
                this.y+=this.y_step;
                }
                break;
        }
    }
    //  the collision could happen just a bit earlier so make the step smaller to be prompt
    update() {
      for (let enemy of allEnemies) {
        if(this.y===enemy.y) {
            if(enemy.x + enemy.step_cell/2 >=this.x 
                && this.x+this.x_step/2>=enemy .x) {
                    this.reset();
                   // alert('collide!');
                }
         }      
    }
    //here add the blocking because of the rocks
      for(let rock of allRocks) {
        if(this.x===rock.x) {
            if(this.y+this.y_step/2>=rock.y &&  rock.y + rock.y_step >=this.y) {
                this.y=this.y+83;
            }
        }
    }
    if (this.y===-18 && this.x===202) {
         this.won=true;
    }  
}
  reset() {
    this.x=this.x_start;
    this.y=this.y_start;   
 }
};
// I need to return an object 
// and later on NEW from this function(class)
// will help me to store the class into player object;
const player=new Hero();  
class Girl_Heart {
    constructor() {
        this.sprite='images/Heart.png';
        this.x_step=101;
        this.y_step=83;
        this.x=202;
        this.y=0;      
    }
    render() {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
    }
}
const Her_heart=new Girl_Heart();  
  
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
 player.handleInput(allowedKeys[e.keyCode]);
});
