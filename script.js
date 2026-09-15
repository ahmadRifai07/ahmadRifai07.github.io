/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");
    const countEl = document.getElementById("preloader-count");
    const barEl = document.getElementById("preloader-bar");

    let progress = 0;

    function step() {

        progress = Math.min(progress + (Math.random() * 1.5 + 0.5), 100);

        countEl.firstChild.textContent = Math.floor(progress);
        barEl.style.width = progress + "%";

        if (progress < 100) {

            setTimeout(step, 50);

        } else {

            setTimeout(() => {

                preloader.classList.add("hide");

                setTimeout(() => preloader.remove(), 900);

            }, 300);

        }

    }

    step();

});


/* =========================
   THEME TOGGLE
========================= */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeToggle.innerHTML =
        '<i class="fas fa-sun"></i>';

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    if (isLight) {

        themeToggle.innerHTML =
            '<i class="fas fa-sun"></i>';

        localStorage.setItem("theme", "light");

    } else {

        themeToggle.innerHTML =
            '<i class="fas fa-moon"></i>';

        localStorage.setItem("theme", "dark");

    }

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close Mobile Menu */

document.querySelectorAll(".navbar a").forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   TYPING ANIMATION
========================= */

const typingElement =
    document.getElementById("typing");

const words = [
    "UI/UX Design",
    "Web Developer",
    "Front-End Developer",
    "Back-End Developer",
    "Full-Stack Developer",
    "Mobile Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord =
        words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

        }

    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );
}

typeEffect();


/* =========================
   SKILL ANIMATION
========================= */

const skillCards =
    document.querySelectorAll(".skills-card");


const skillObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const progress =
                        entry.target.querySelector(
                            ".progress-bar"
                        );

                    progress.style.width =
                        progress.dataset.width;

                }

            });

        },
        {
            threshold: 0.5
        }
    );


skillCards.forEach(card => {

    skillObserver.observe(card);

});


/* =========================
   EDUCATION SCROLL REVEAL (2 arah)
========================= */

const educationItems =
    document.querySelectorAll(".education-item");


const educationObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                // Muncul saat masuk viewport,
                // hilang lagi saat keluar viewport
                // (baik discroll ke bawah maupun ke atas)
                entry.target.classList.toggle(
                    "show",
                    entry.isIntersecting
                );

            });

        },
        {
            threshold: 0.2
        }
    );


educationItems.forEach(item => {

    educationObserver.observe(item);

});


/* =========================
   SCROLL NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".navbar a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================
   BACK TO TOP
========================= */

const backTop =
    document.getElementById("back-top");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   CONTACT FORM
========================= */

// const contactForm =
//     document.getElementById("contact-form");


// contactForm.addEventListener("submit", event => {

//     event.preventDefault();

//     alert(
//         "Terima kasih! Pesan kamu berhasil dikirim."
//     );

//     contactForm.reset();

// });


/* =========================
   BUTTON FILTER
========================= */

// Ambil semua tombol filter dan semua kartu proyek
const buttons = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.project-card');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // 1. pindahkan state aktif ke tombol yang baru diklik
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 2. ambil kategori dari tombol yang diklik
    const filter = btn.dataset.filter;

    // 3. tampilkan kartu yang cocok, sembunyikan yang tidak
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});