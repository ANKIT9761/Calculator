// for toggling dark mode and light mode.
const imgSelector = document.querySelectorAll(".toggle-button img");
const toggleButton = document.querySelector(".toggle-button");
const topBarImg = document.querySelectorAll(".span-right img");
const timeBlock = document.querySelector(".span-left");

toggleButton.addEventListener("click", (e) => {
  Object.values(toggleButton.children).map((children) => {
    if (children.classList.contains("active")) {
      children.classList.remove("active");
    }
  });
});

let today = new Date();
let time = today.getHours() + ":" + today.getMinutes();
timeBlock.innerText = time;
let activeState = "dark";
let iconState = "light";
for (let img of imgSelector) {
  img.addEventListener("click", (e) => {
    activeState = img.classList.contains("light") ? "light" : "dark";
    iconState = activeState == "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", activeState);
    topBarImg.forEach((icon) => {
      console.log(icon.src);
      icon.src = "../images/" + icon.alt + "_" + iconState + ".svg";
    });

    setTimeout(() => img.classList.add("active"), 0);
  });
}
