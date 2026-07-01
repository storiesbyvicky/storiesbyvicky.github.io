const portalButton = document.getElementById("openPortal");
const body = document.body;
const universe = document.getElementById("universe");

portalButton.addEventListener("click", () => {

    // Show portal
    body.classList.add("portal-active");

    // Show universe
    setTimeout(() => {

        universe.classList.add("show");

    },500);

    // Remove portal only
    setTimeout(() => {

        body.classList.remove("portal-active");

    },1800);

});