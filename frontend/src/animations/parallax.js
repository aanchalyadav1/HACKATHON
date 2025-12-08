export function initParallax() {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    document.documentElement.style.setProperty(
      "--pY-slow",
      scrollY * 0.1 + "px"
    );

    document.documentElement.style.setProperty(
      "--pY-mid",
      scrollY * 0.2 + "px"
    );

    document.documentElement.style.setProperty(
      "--pY-fast",
      scrollY * 0.35 + "px"
    );
  });
}
