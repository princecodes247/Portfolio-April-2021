const page = document.documentElement;
let target = document.querySelectorAll(".heading h1");
let target2 = document.querySelector(".heading");

const buttons = document.querySelectorAll("button");
let length = 250;
window.addEventListener("scroll", () => {
  if (window.scrollY <= length * 1.5) {
    let t = (length - window.scrollY) / length;
    target2.style.transform = `perspective(300px) scale(${
      window.scrollY / length + 0.8
    }) translateY(-50%)`;
    target2.style.top = `${(window.scrollY / length) * 165}px`;
    target.forEach((text) => {
      text.style.opacity = t;
    });
  }
});


buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let dummy = document.createElement("div");
    let rect = e.target.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    page.style.setProperty("--mouseX", mouseX + "px");
    page.style.setProperty("--mouseY", mouseY + "px");
    dummy.classList.add("o");
    e.target.appendChild(dummy);
    setTimeout(() => {
      e.target.removeChild(dummy);
    }, 1000);
  });
});
