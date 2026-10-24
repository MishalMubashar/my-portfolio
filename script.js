document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Rotating text gives the hero movement without a heavy animation library.
  const phrases = ["Python & computer vision", "full-stack application design", "interactive learning experiences", "software that solves problems"];
  const typed = document.getElementById("typedText");
  let phraseIndex = 0, charIndex = phrases[0].length, deleting = false;
  function typeLoop() {
    const phrase = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      typed.textContent = phrase.slice(0, charIndex);
      if (charIndex >= phrase.length) { deleting = true; setTimeout(typeLoop, 1450); return; }
    } else {
      charIndex--;
      typed.textContent = phrase.slice(0, charIndex);
      if (charIndex <= 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
    }
    setTimeout(typeLoop, deleting ? 32 : 58);
  }
  setTimeout(typeLoop, 1500);

  // Project filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    const category = button.dataset.filter;
    projectItems.forEach(item => {
      const visible = category === "all" || item.dataset.category === category;
      item.hidden = !visible;
    });
  }));

  // Pointer-driven 3D tilt; disabled for touch devices and reduced-motion preferences.
  const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (canTilt) {
    document.querySelectorAll(".tilt-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.transform = `perspective(1000px) rotateX(${(0.5-y)*5}deg) rotateY(${(x-0.5)*6}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }
});
