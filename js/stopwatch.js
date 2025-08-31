const timer = document.getElementById("timer");
const sunMoon = document.getElementById("sunMoon");

timer.onmouseover = () => timer.src = "../icons/TimerWhiteFill.svg"
timer.onmouseleave = () => timer.src = "../icons/TimerWhiteEmpty.svg"

//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = "../icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = "../icons/SunWhiteEmpty.svg";