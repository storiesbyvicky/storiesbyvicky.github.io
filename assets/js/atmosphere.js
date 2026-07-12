/*=========================================================
    STORIES BY VICKY
    ATMOSPHERE ENGINE v3
=========================================================*/

(() => {

const canvas = document.getElementById("atmosphere");

if (!canvas) return;

const ctx = canvas.getContext("2d");

/* Force the canvas to behave like a background */

canvas.style.position = "fixed";
canvas.style.inset = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "-1";

canvas.setAttribute("aria-hidden", "true");
canvas.style.display = "block";
/*=========================================================
    ENGINE
=========================================================*/

const Engine = {

    width: 0,
    height: 0,

    animation: null,

    currentLayer: null,

    background: "#0B0B0B"

};

/*=========================================================
    CANVAS
=========================================================*/

function resizeCanvas(){

    const dpr = window.devicePixelRatio || 1;

    Engine.width = window.innerWidth;
    Engine.height = window.innerHeight;

    canvas.width = Engine.width * dpr;
    canvas.height = Engine.height * dpr;

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    ctx.setTransform(dpr,0,0,dpr,0,0);

}

window.addEventListener("resize",()=>{

    resizeCanvas();

    if(Engine.currentLayer){

        Engine.currentLayer.build();

    }

});

/*=========================================================
    RANDOM
=========================================================*/

function random(min,max){

    return Math.random() * (max-min) + min;

}

/*=========================================================
    BASE LAYER
=========================================================*/

class Layer{

    constructor(){

        this.items=[];

    }

    build(){}

    update(){}

    draw(){}

}

/*=========================================================
    STAR LAYER
=========================================================*/

class Star {

    constructor(){

        this.reset();

    }

    reset(){

        this.x = random(0, Engine.width);
        this.y = random(0, Engine.height);

        const type = Math.random();

if(type < 0.75){

    // Small distant stars
    this.radius = random(0.4,1);
    this.alpha = random(0.15,0.35);

}
else if(type < 0.95){

    // Normal stars
    this.radius = random(1,1.8);
    this.alpha = random(0.45,0.75);

}
else{

    // Bright stars
    this.radius = random(1.8,2.6);
    this.alpha = random(0.85,1);

}

        this.twinkle = random(0,Math.PI*2);

        this.speedX = random(-0.03,0.03);
        this.speedY = random(-0.03,0.03);

    }

    update(){

        this.twinkleSpeed = random(0.008,0.025);

        this.twinkle += this.twinkleSpeed;

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0) this.x = Engine.width;
        if(this.x > Engine.width) this.x = 0;

        if(this.y < 0) this.y = Engine.height;
        if(this.y > Engine.height) this.y = 0;

    }

    draw(){

        ctx.save();

        ctx.shadowBlur = this.radius * 4;

        ctx.shadowColor = "rgba(255,255,255,.6)";

        ctx.globalAlpha =
            this.alpha +
            Math.sin(this.twinkle)*0.2;

        ctx.fillStyle="#FFFFFF";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.restore();

    }

}

class StarLayer extends Layer{

    build(){

        this.items=[];

        for(let i=0;i<170;i++){

            this.items.push(
                new Star()
            );

        }

        this.shootingStar = new ShootingStar();

    }

    update(){

        this.items.forEach(star => {

        star.update();

        });

        this.shootingStar.update(1 / 60);

    }

    draw(){

        this.items.forEach(star=>{

            star.draw();

        });

        this.shootingStar.draw();

    }

}

/*=========================================================
    SHOOTING STAR
=========================================================*/

class ShootingStar {

    constructor() {
        this.reset(true);
    }

    reset(initial = false) {

        this.active = false;

        this.wait =
            initial
                ? random(5, 12)
                : random(15, 30);

        this.timer = 0;

        this.duration = random(0.8, 1.2);

        this.startX = random(Engine.width * 0.55, Engine.width * 0.95);
        this.startY = random(0, Engine.height * 0.35);

        this.endX = this.startX - random(180, 320);
        this.endY = this.startY + random(80, 160);

    }

    update(delta) {

        this.timer += delta;

        if (!this.active) {

            if (this.timer >= this.wait) {

                this.active = true;
                this.timer = 0;

            }

            return;

        }

        if (this.timer >= this.duration) {

            this.reset();

        }

    }

    draw() {

        if (!this.active) return;

        const t = this.timer / this.duration;

        const x = this.startX + (this.endX - this.startX) * t;
        const y = this.startY + (this.endY - this.startY) * t;

        ctx.save();

        ctx.lineWidth = 1.4;

        ctx.strokeStyle = "rgba(229,194,122,.65)";

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#E5C27A";

        ctx.beginPath();

        ctx.moveTo(x, y);

        ctx.lineTo(
            x + 55,
            y - 30
        );

        ctx.stroke();

        ctx.fillStyle = "#FFF9E6";

        ctx.beginPath();

        ctx.arc(x, y, 1.8, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();

    }

}

/*=========================================================
    GOLD LAYER
=========================================================*/

class GoldMote {

    constructor(){

        this.reset();

    }

    reset(){

    this.x = random(0, Engine.width);
    this.y = random(0, Engine.height);

    const layer = Math.random();

    if(layer < 0.82){

        // Background dust
        this.radius = random(0.4,0.8);
        this.alpha = random(0.08,0.16);
        this.maxSpeed = 0.045;

    }
    else if(layer < 0.98){

        // Mid layer
        this.radius = random(0.8,1.5);
        this.alpha = random(0.12,0.22);
        this.maxSpeed = 0.08;

    }
    else{

        // Foreground
        this.radius = random(2,3);
        this.alpha = random(0.45,0.70);
        this.maxSpeed = 0.03;

    }

    this.speedX = random(-this.maxSpeed,this.maxSpeed);
    this.speedY = random(-this.maxSpeed,this.maxSpeed);

    this.drift = random(0,Math.PI*2);

}

    update(){

    this.drift += 0.006;

    this.speedX += Math.cos(this.drift) * 0.00012;
    this.speedY += Math.sin(this.drift) * 0.00012;

    this.speedX *= 0.998;
    this.speedY *= 0.998;

    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < -10) this.x = Engine.width + 10;
    if(this.x > Engine.width + 10) this.x = -10;

    if(this.y < -10) this.y = Engine.height + 10;
    if(this.y > Engine.height + 10) this.y = -10;

}

    draw(){

        ctx.save();

        ctx.globalAlpha = this.alpha;

        ctx.shadowBlur = this.radius * 6;
        ctx.shadowColor = "rgba(200,169,106,0.9)";

        ctx.fillStyle = "#E5C27A";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}

class GoldLayer extends Layer{

    build(){

        this.items = [];

        for(let i=0;i<250;i++){

            this.items.push(
                new GoldMote()
            );

        }

    }

    update(){

        this.items.forEach(mote=>{

            mote.update();

        });

    }

    draw(){

        this.items.forEach(mote=>{

            mote.draw();

        });

    }

}

/*=========================================================
    CREATOR LAYER
=========================================================*/

class DustParticle{

    constructor(){

        this.reset();

    }

    reset(){

        this.x = random(0,Engine.width);
        this.y = random(0,Engine.height);

        this.radius = random(0.2,0.8);

        this.alpha = random(0.03,0.12);

        this.vx = random(-0.05,0.05);
        this.vy = random(-0.05,0.05);

        this.drift = random(0,Math.PI*2);

    }

    update(){

        this.drift += 0.003;

        this.vx += Math.cos(this.drift)*0.00015;
        this.vy += Math.sin(this.drift)*0.00015;

        this.vx *= .996;
        this.vy *= .996;

        this.x += this.vx;
        this.y += this.vy;

        if(this.x<-10) this.x=Engine.width+10;
        if(this.x>Engine.width+10) this.x=-10;

        if(this.y<-10) this.y=Engine.height+10;
        if(this.y>Engine.height+10) this.y=-10;

    }

    draw(){

        ctx.save();

        ctx.globalAlpha=this.alpha;

        ctx.fillStyle="#DDD8CC";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.restore();

    }

}

/*=========================================================
    PAPER FIBER
=========================================================*/

class Fiber{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=random(0,Engine.width);
        this.y=random(0,Engine.height);

        this.length = random(5,12);

        this.rotation=random(0,Math.PI*2);

        this.rotationSpeed=random(-0.0008,0.0008);

        this.alpha = random(.015,.05);

        this.vx=random(-0.03,0.03);
        this.vy=random(-0.03,0.03);

        this.drift=random(0,Math.PI*2);

    }

    update(){

        this.drift+=0.002;

        this.vx+=Math.cos(this.drift)*0.00012;
        this.vy+=Math.sin(this.drift)*0.00012;

        this.vx*=0.997;
        this.vy*=0.997;

        this.x+=this.vx;
        this.y+=this.vy;

        this.rotation+=this.rotationSpeed;

        if(this.x<-10) this.x=Engine.width+10;
        if(this.x>Engine.width+10) this.x=-10;

        if(this.y<-10) this.y=Engine.height+10;
        if(this.y>Engine.height+10) this.y=-10;

    }

    draw(){

        ctx.save();

        ctx.translate(this.x,this.y);

        ctx.rotate(this.rotation);

        ctx.globalAlpha=this.alpha;

        ctx.strokeStyle="#D7D1C5";

        ctx.lineWidth=.8;

        ctx.beginPath();

        ctx.moveTo(-this.length/2,0);

        ctx.lineTo(this.length/2,0);

        ctx.stroke();

        ctx.restore();

    }

}

/*=========================================================
    DEPTH DUST
=========================================================*/

class DepthDust{

    constructor(){

        this.reset();

    }

    reset(){

        this.x=random(0,Engine.width);
        this.y=random(0,Engine.height);

        this.radius=random(18,45);

        this.alpha=random(.015,.03);

        this.vx=random(-0.01,0.01);
        this.vy=random(-0.01,0.01);

    }

    update(){

        this.x+=this.vx;
        this.y+=this.vy;

        if(this.x<-50) this.x=Engine.width+50;
        if(this.x>Engine.width+50) this.x=-50;

        if(this.y<-50) this.y=Engine.height+50;
        if(this.y>Engine.height+50) this.y=-50;

    }

    draw(){

        ctx.save();

        ctx.globalAlpha=this.alpha;

        ctx.shadowBlur=this.radius;

        ctx.shadowColor="#FFFFFF";

        ctx.fillStyle="#FFFFFF";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2
        );

        ctx.fill();

        ctx.restore();

    }

}

/*=========================================================
    CREATOR LAYER
=========================================================*/

class CreatorLayer extends Layer{

    build(){

        this.items=[];

        for(let i=0;i<260;i++){

            this.items.push(
                new DustParticle()
            );

        }

        for(let i=0;i<140;i++){

            this.items.push(
                new Fiber()
            );

        }

        for(let i=0;i<2;i++){

            this.items.push(
                new DepthDust()
            );

        }

    }

    update(){

        this.items.forEach(item=>{

            item.update();

        });

    }

    draw(){

        this.items.forEach(item=>{

            item.draw();

        });

    }

}

/*=========================================================
    ENGINE LOOP
=========================================================*/

function loop(){

    ctx.clearRect(
        0,
        0,
        Engine.width,
        Engine.height
    );

    if(Engine.currentLayer){

        Engine.currentLayer.update();
        Engine.currentLayer.draw();

    }

    Engine.animation = requestAnimationFrame(loop);

}

/*=========================================================
    PUBLIC API
=========================================================*/

window.createAtmosphere = function(type){

    if(Engine.animation){

        cancelAnimationFrame(Engine.animation);
        Engine.animation = null;

    }

    switch(type){

        case "stars":

            Engine.currentLayer = new StarLayer();
            break;

        case "gold":

            Engine.currentLayer = new GoldLayer();
            break;

        case "creator":

            Engine.currentLayer = new CreatorLayer();
            break;

        default:

            Engine.currentLayer = new StarLayer();

    }

    Engine.currentLayer.build();

    loop();

};

/*=========================================================
    OPTIONAL HELPERS
=========================================================*/

window.destroyAtmosphere = function(){

    if(Engine.animation){

        cancelAnimationFrame(Engine.animation);
        Engine.animation = null;

    }

    ctx.clearRect(
        0,
        0,
        Engine.width,
        Engine.height
    );

    Engine.currentLayer = null;

};

window.refreshAtmosphere = function(){

    resizeCanvas();

    if(Engine.currentLayer){

        Engine.currentLayer.build();

    }

};

/*=========================================================
    PAUSE WHEN TAB IS HIDDEN
=========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        if(Engine.animation){

            cancelAnimationFrame(
                Engine.animation
            );

            Engine.animation = null;

        }

    }else{

        if(
            !Engine.animation &&
            Engine.currentLayer
        ){

            loop();

        }

    }

});

/*=========================================================
    INITIALIZE
=========================================================*/

resizeCanvas();

})();
