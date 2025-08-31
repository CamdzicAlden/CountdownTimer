let sunMoon;

sunMoon = document.getElementById("sunMoon");

//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = "./icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = "./icons/SunWhiteEmpty.svg";