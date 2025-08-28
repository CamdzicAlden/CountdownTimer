let stopwatch;

stopwatch = document.getElementById("stopwatch");

stopwatch.onmouseover = () => stopwatch.src = "./icons/StopwatchWhiteFill.svg"
stopwatch.onmouseleave = () => stopwatch.src = "./icons/StopwatchWhiteEmpty.svg"


const circle = document.querySelector(".progress");
const text = document.getElementById("timeText");
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = 0;

let time = 30;
let current = time, timer;

function updateTimer(){
    current--;
    text.textContent = current;

    const offset = circumference - (current/time) * circumference;
    circle.style.strokeDashoffset = offset;

    if(current <= 0) clearInterval(timer);
}

function startTimer(){
    if(current === time) timer = setInterval(updateTimer, 1000);
}



