const line = document.getElementById("openLine");
const universe = document.getElementById("universe");

line.addEventListener("click", () => {

    document.body.classList.add("portal-active");

    // Universe appears
    setTimeout(() => {

        universe.classList.add("show");

    }, 1500);

    // Portal fades away
    setTimeout(() => {

        document.body.classList.add("portal-finish");

    }, 2200);

});