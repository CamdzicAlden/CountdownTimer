let timer;

timer = document.getElementById("timer");

timer.onmouseover = () => timer.src = "./icons/TimerWhiteFill.svg"
timer.onmouseleave = () => timer.src = "./icons/TimerWhiteEmpty.svg"
