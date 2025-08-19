let sunMoon;

sunMoon = document.getElementById("sunMoon");

sunMoon.onmouseover = () => sunMoon.src = "./icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = "./icons/SunWhiteEmpty.svg";