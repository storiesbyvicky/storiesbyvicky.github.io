const scene = document.querySelector("#final-scene");
const message = document.querySelector("#final-message");

let started = false;

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting && !started){

            started = true;

            console.log("🎬 Final Scene Started");

            startScene();

        }

    });

},{
    threshold:.65
});

observer.observe(scene);

function startScene(){

    console.log("Loading Scene...");

}