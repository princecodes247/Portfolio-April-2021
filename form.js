document.querySelectorAll(".form-item input").forEach((input) => {
  input.addEventListener("blur", (e) => {
    if (input.value.length === 0) {
      input.classList.remove("input-in");
    }
  });

  input.addEventListener("focus", (e) => {
    input.classList.add("input-in");
  });
});

document.querySelector("form").addEventListener("submit",()=>{
  event.preventDefault()
  let newForm = {
    name: event.target.querySelector("#contact-name").value,
    email: event.target.querySelector("#contact-email").value,
    message: event.target.querySelector("#contact-message").value
  }
  console.log(newForm);
  fetch("https://veldora.herokuapp.com/collections/send/vel854432Myp",{
    method: "POST",
    body: newForm
  }).then(()=>{
    console.log("sent");
    document.querySelector("form button").innerHTML = " Message Sent!"
    setTimeout(()=>{
      document.querySelector("form button").innerHTML = "Submit"
    }, 2000)
  })
})