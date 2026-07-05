/* ==========================================================
   DIARY V3
   Stories by Vicky
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const openBtn = document.getElementById("openDiary");

    const overlay = document.getElementById("diaryOverlay");

    const diary = document.querySelector(".diary");

    const cover = document.getElementById("diaryCover");

    const paper = document.querySelector(".paper-inner");

    const continueBtn = document.getElementById("continueStory");

    if (
        !openBtn ||
        !overlay ||
        !diary ||
        !cover ||
        !paper ||
        !continueBtn
    ){
        console.warn("Diary component not found.");
        return;
    }

    /* ==========================================
       OPEN DIARY
    ========================================== */

    openBtn.addEventListener("click", (e) => {

        e.preventDefault();

        overlay.classList.add("show");

        requestAnimationFrame(() => {

            diary.classList.add("drop");

        });

    });

    /* ==========================================
       DROP FINISHED
    ========================================== */

    diary.addEventListener("animationend", (e) => {

        if(e.animationName !== "diaryDrop") return;

        cover.classList.add("open");

    });

    /* ==========================================
       COVER OPENED
    ========================================== */

    cover.addEventListener("transitionend", () => {

        paper.classList.add("show");

        setTimeout(() => {

            continueBtn.classList.add("show");

        },500);

    });

    /* ==========================================
       CONTINUE
    ========================================== */

    continueBtn.addEventListener("click", () => {

        overlay.classList.remove("show");

        setTimeout(() => {

            diary.classList.remove("drop");

            cover.classList.remove("open");

            paper.classList.remove("show");

            continueBtn.classList.remove("show");

            document.getElementById("memory-one").scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        },500);

    });

});