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

const getCurrentTime = () => {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  hours = hours > 10 ? hours : "0" + hours;
  minutes = minutes > 10 ? minutes : "0" + minutes;
  let time = hours + ":" + minutes;
  return time;
};
timeBlock.innerText = getCurrentTime();
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
