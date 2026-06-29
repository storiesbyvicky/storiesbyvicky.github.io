const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

document.body.prepend(canvas);

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();

window.addEventListener("resize", resize);

const particles = [];

for (let i = 0; i < 80; i++) {

    particles.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        r: Math.random() * 2 + 1,

        dx: (Math.random() - .5) * .25,
        dy: (Math.random() - .5) * .25

    });

}

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();

        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(200,169,106,.15)";

        ctx.fill();

    });

    requestAnimationFrame(animate);

}

document.addEventListener("DOMContentLoaded",()=>{

    const letters=document.querySelectorAll(".falling-text span");

    letters.forEach((letter,index)=>{

        if(letter.classList.contains("space")) return;

        let delay=index*180;

        if(letter.textContent==="."){

            delay+=600;

        }

        setTimeout(()=>{

            letter.style.animation="fallLetter .9s cubic-bezier(.18,.9,.22,1.15) forwards";

            letter.addEventListener("animationend",()=>{

                createImpact(letter);

            },{once:true});

        },delay);

    });

});


function createImpact(letter){

    const rect = letter.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2 + window.scrollX;

    const centerY = rect.bottom + window.scrollY;

    for(let i = 0; i < 8; i++){

        const p = document.createElement("div");

        p.className = "particle";

        p.style.left = centerX + "px";
        p.style.top = centerY + "px";

        const angle = Math.random() * Math.PI * 2;
        const distance = 12 + Math.random() * 18;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        p.style.setProperty("--x", x + "px");
        p.style.setProperty("--y", y + "px");

        p.style.animation = "particle .55s ease-out forwards";

        document.body.appendChild(p);

        p.addEventListener("animationend", () => p.remove());

    }

}
