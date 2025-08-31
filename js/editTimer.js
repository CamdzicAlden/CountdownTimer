const sunMoon = document.getElementById("sunMoon");
const stopwatch = document.getElementById("stopwatch");
const timer = document.getElementById("timer");

//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = "../icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = "../icons/SunWhiteEmpty.svg";
//Code for stopwatch icon hovering
stopwatch.onmouseover = () => stopwatch.src = "../icons/StopwatchWhiteFill.svg"
stopwatch.onmouseleave = () => stopwatch.src = "../icons/StopwatchWhiteEmpty.svg"
//Code for stopwatch icon hovering
timer.onmouseover = () => timer.src = "../icons/TimerWhiteFill.svg"
timer.onmouseleave = () => timer.src = "../icons/TimerWhiteEmpty.svg"