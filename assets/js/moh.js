const openCourt = document.getElementById("openCourt");
const gavelVideo = document.getElementById("gavelVideo");
const transition = document.getElementById("court-transition");
const flash = document.querySelector(".court-flash");
const crack = document.querySelector(".court-crack");
const universe = document.getElementById("court-universe");

const GAVEL_HIT_TIME = 1.55; // set your real hit second
const GAVEL_END_TIME = 3.50; // when transition should disappear

let closeFallbackTimer = null;
let enteredUniverse = false;

function enterUniverse() {
    if (enteredUniverse) return;
    enteredUniverse = true;
    universe?.classList.add("show");
}

function closeCourtTransition() {
    enterUniverse(); // ensure world is shown before closing overlay

    transition?.classList.remove("active");
    flash?.classList.remove("flash");
    crack?.classList.remove("cracked");

    if (gavelVideo) {
        gavelVideo.pause();
        gavelVideo.currentTime = 0;
    }

    if (closeFallbackTimer) {
        clearTimeout(closeFallbackTimer);
        closeFallbackTimer = null;
    }
}

if (openCourt && transition) {
    openCourt.addEventListener("click", () => {
        enteredUniverse = false;
        transition.classList.add("active");

        if (gavelVideo) {
            gavelVideo.currentTime = 0;
            const p = gavelVideo.play();
            if (p) p.catch(() => {});

            const onTimeUpdate = () => {
                if (gavelVideo.currentTime >= GAVEL_HIT_TIME) {
                    flash?.classList.add("flash");
                    crack?.classList.add("cracked");
                    enterUniverse();
                    gavelVideo.removeEventListener("timeupdate", onTimeUpdate);
                }
            };

            gavelVideo.addEventListener("timeupdate", onTimeUpdate);
        } else {
            // fallback if video not available
            setTimeout(() => {
                flash?.classList.add("flash");
                crack?.classList.add("cracked");
                enterUniverse();
            }, 900);
        }

        closeFallbackTimer = setTimeout(closeCourtTransition, GAVEL_END_TIME * 1000 + 500);
    });
}

if (gavelVideo) {
    gavelVideo.addEventListener("ended", closeCourtTransition);
}