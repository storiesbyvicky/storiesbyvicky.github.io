const button = document.getElementById("openLine");
const universe = document.getElementById("universe");

button.addEventListener("click", () => {

    document.body.classList.add("crossing");

    setTimeout(() => {

        universe.classList.add("open");

    },2200);

    setTimeout(() => {

        document.body.classList.remove("crossing");

    },2600);

});