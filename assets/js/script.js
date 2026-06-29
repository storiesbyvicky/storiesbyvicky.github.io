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
