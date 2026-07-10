/* Cinematic diary reader for She Never Forgot */
document.addEventListener("DOMContentLoaded", () => {
    const pages = [
        { label: "Memory I", lines: ["Some people leave.", "Some memories don't."] },
        { label: "Memory II", lines: ["There are conversations", "you continue", "long after they've ended."] },
        { label: "Memory III", lines: ["Sometimes I think", "the silence answered", "more honestly", "than words ever did."] },
        { label: "John", lines: ["I never wrote to be understood.", "I wrote because forgetting frightened me more than remembering."] },
        { label: "Emily", lines: ["She never asked me", "to remember her.", "She simply lived in the places", "memory refused to leave."] },
        { label: "What Remained", lines: ["Time didn't erase us.", "It only taught us", "how to carry what remained."] },
        { label: "The Last Chapter", lines: ["Every ending", "is someone's unfinished memory."] },
        { label: "Beyond these pages", purchase: true },
        { label: "Until the next memory", return: true }
    ];

    const openButton = document.getElementById("openDiary");
    const overlay = document.getElementById("diaryOverlay");
    const diary = document.querySelector(".diary");
    const cover = document.getElementById("diaryCover");
    const closeButton = document.getElementById("closeDiary");
    const previousButton = document.getElementById("previousPage");
    const nextButton = document.getElementById("nextPage");
    const label = document.getElementById("chapterLabel");
    const number = document.getElementById("chapterNumber");
    const content = document.getElementById("pageContent");
    const turnSheet = document.getElementById("pageTurnSheet");
    let pageIndex = 0;
    let lastFocus;
    let isTurning = false;

    if (!openButton || !overlay || !diary || !cover || !content || !turnSheet) return;

    const renderPage = () => {
        const page = pages[pageIndex];
        label.textContent = page.label;
        number.textContent = `${String(pageIndex + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
        previousButton.disabled = pageIndex === 0;
        nextButton.hidden = Boolean(page.return);

        if (page.purchase) {
            content.innerHTML = `
                <div>
                    <p id="diaryTitle" class="purchase-copy">Some stories never end.<br>They simply continue beyond these pages.</p>
                    <div class="purchase-links">
                        <a href="https://notionpress.com/in/read/she-never-forget" target="_blank" rel="noopener noreferrer">Read on Notion Press</a>
                        <a href="https://amzn.in/d/04njsoUP" target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
                        <a href="https://www.flipkart.com/she-never-forget/p/itm6da04b13e9707" target="_blank" rel="noopener noreferrer">Buy on Flipkart</a>
                    </div>
                </div>`;
        } else if (page.return) {
            content.innerHTML = `
                <div>
                    <p id="diaryTitle" class="purchase-copy">The diary closes.<br>The story stays with you.</p>
                    <a class="return-worlds" href="worlds.html">Return to Worlds</a>
                </div>`;
        } else {
            content.innerHTML = `<p id="diaryTitle" class="memory-text">${page.lines.map(line => `<span>${line}</span>`).join("")}</p>`;
        }
    };

    const turnPage = direction => {
        const nextIndex = pageIndex + direction;
        if (isTurning || nextIndex < 0 || nextIndex >= pages.length) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            pageIndex = nextIndex;
            renderPage();
            return;
        }

        isTurning = true;
        const animationClass = direction > 0 ? "turn-forward" : "turn-back";
        turnSheet.classList.add(animationClass);

        window.setTimeout(() => {
            pageIndex = nextIndex;
            renderPage();
        }, 650);

        turnSheet.addEventListener("animationend", () => {
            turnSheet.classList.remove(animationClass);
            isTurning = false;
        }, { once: true });
    };

    const openDiary = () => {
        lastFocus = document.activeElement;
        pageIndex = 0;
        renderPage();
        overlay.classList.add("show");
        overlay.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        requestAnimationFrame(() => diary.classList.add("drop"));
        closeButton.focus();
    };

    const closeDiary = () => {
        overlay.classList.remove("show");
        overlay.setAttribute("aria-hidden", "true");
        diary.classList.remove("drop", "ready");
        cover.classList.remove("open");
        document.body.style.overflow = "";
        if (lastFocus) lastFocus.focus();
    };

    openButton.addEventListener("click", openDiary);
    closeButton.addEventListener("click", closeDiary);
    previousButton.addEventListener("click", () => turnPage(-1));
    nextButton.addEventListener("click", () => turnPage(1));
    diary.addEventListener("animationend", event => { if (event.animationName === "diaryDrop") cover.classList.add("open"); });
    cover.addEventListener("transitionend", event => { if (event.propertyName === "transform" && cover.classList.contains("open")) diary.classList.add("ready"); });
    overlay.addEventListener("click", event => { if (event.target === overlay) closeDiary(); });
    document.addEventListener("keydown", event => {
        if (!overlay.classList.contains("show")) return;
        if (event.key === "Escape") closeDiary();
        if (event.key === "ArrowRight") turnPage(1);
        if (event.key === "ArrowLeft") turnPage(-1);
    });
});
