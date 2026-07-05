// =====================================
// MEMORY FADE
// =====================================

const memories = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{threshold:.2});

memories.forEach(section=>{

    section.classList.add("fade-memory");

    observer.observe(section);

});