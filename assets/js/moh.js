const openCourt = document.getElementById("openCourt");
const transition = document.getElementById("court-transition");
const flash = document.querySelector(".court-flash");
const universe = document.getElementById("court-universe");

if(openCourt){

    openCourt.addEventListener("click",()=>{

        transition.classList.add("active");

        document.body.classList.add("court-impact");

        setTimeout(()=>{

            flash.classList.add("flash");

        },180);

        setTimeout(()=>{

            universe.classList.add("show");

        },500);

        setTimeout(()=>{

            transition.classList.remove("active");

            flash.classList.remove("flash");

            document.body.classList.remove("court-impact");

        },900);

    });

}