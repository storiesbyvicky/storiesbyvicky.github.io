const openCourt = document.getElementById("openCourt");
const transition = document.getElementById("court-transition");
const flash = document.querySelector(".court-flash");
const crack = document.querySelector(".court-crack");
const universe = document.getElementById("court-universe");

function createCourtAudioContext(){
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if(!AudioContext) return null;

    const context = new AudioContext();
    context.resume();
    return context;
}

function playCourtImpact(context){

    if(!context) return;

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(76, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(34, context.currentTime + .18);
    gain.gain.setValueAtTime(.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.18, context.currentTime + .012);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .28);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + .3);

    oscillator.addEventListener("ended",()=>context.close());
}

if(openCourt){

    openCourt.addEventListener("click",()=>{

        const impactAudio = createCourtAudioContext();

        transition.classList.add("active");

        setTimeout(()=>{

            playCourtImpact(impactAudio);

            document.body.classList.add("court-impact");

            flash.classList.add("flash");

            crack.classList.add("cracked");

        },1050);

        setTimeout(()=>{

            universe.classList.add("show");

        },1550);

        setTimeout(()=>{

            transition.classList.remove("active");

            flash.classList.remove("flash");

            crack.classList.remove("cracked");

            document.body.classList.remove("court-impact");

        },2000);

    });

}

if(universe){

    const files = universe.querySelectorAll(".case-card");
    const observer = new IntersectionObserver((entries, currentObserver)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("file-arrived");
                currentObserver.unobserve(entry.target);

            }

        });

    },{threshold:.28});

    files.forEach(file=>observer.observe(file));

}
