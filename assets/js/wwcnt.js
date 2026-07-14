const portalButton = document.getElementById("openPortal");
const body = document.body;
const universe = document.getElementById("universe");
const portal = document.getElementById("portal");
const portalVideo = document.getElementById("portalVideo");

if(portalButton && universe){

portalButton.addEventListener("click", () => {

    let hasEntered = false;
    let completionTimer;
    let stalledTimer;

    const enterUniverse = () => {

        if(hasEntered) return;

        hasEntered = true;
        clearTimeout(completionTimer);
        clearTimeout(stalledTimer);

        if(portalVideo) portalVideo.pause();

        universe.classList.add("show");

        setTimeout(() => {

            body.classList.remove("portal-active", "portal-playing");
            if(portal) portal.setAttribute("aria-hidden", "true");
            portalButton.disabled = false;

        },700);

    };

    body.classList.add("portal-active");
    portalButton.disabled = true;

    if(portal) portal.setAttribute("aria-hidden", "false");

    if(portalVideo){

        portalVideo.currentTime = 0;
        body.classList.add("portal-playing");

        portalVideo.addEventListener("ended", enterUniverse, {once:true});
        portalVideo.addEventListener("error", enterUniverse, {once:true});
        portalVideo.addEventListener("stalled", () => {

            stalledTimer = setTimeout(enterUniverse, 1800);

        }, {once:true});

        portalVideo.play().then(() => {

            const duration = Number.isFinite(portalVideo.duration) ? portalVideo.duration * 1000 : 9000;
            completionTimer = setTimeout(enterUniverse, Math.min(Math.max(duration + 1200, 6000), 18000));

        }).catch(() => {

            body.classList.remove("portal-playing");
            setTimeout(enterUniverse, 1300);

        });

    }else{

        setTimeout(enterUniverse, 1800);

    }

});

}
