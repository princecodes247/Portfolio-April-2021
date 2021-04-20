let target = document.querySelectorAll(".heading h1");
let target2 = document.querySelector(".heading");
let length = 200;
window.addEventListener("scroll", () => {
  if (window.scrollY <= length * 1.5) {
    let t = (length - window.scrollY) / length;
    target2.style.transform = `perspective(300px) scale(${
      window.scrollY / length + 1
    })`;
    target.forEach((text) => {
      text.style.opacity = t;
    });
  }
});
