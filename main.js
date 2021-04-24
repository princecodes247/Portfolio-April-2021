const page = document.documentElement;
let target = document.querySelectorAll(".heading h1");
let target2 = document.querySelector(".heading");
let form = document.querySelector("form");
const buttons = document.querySelectorAll("button");
let length = 250;
window.addEventListener("scroll", () => {
  if (window.scrollY <= length * 1.5) {
    let t = (length - window.scrollY) / length;
    target2.style.transform = `perspective(300px) scale(${
      window.scrollY / length + 0.8
    }) translateY(-50%)`;
    target.forEach((text) => {
      text.style.opacity = t;
    });
  }
});

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
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
    console.log(e.clientX);
    console.log(e.clientY);
    setTimeout(() => {
      e.target.removeChild(dummy);
    }, 1000);
  });
});
