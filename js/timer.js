//Code for stopwatch icon hovering
let stopwatch;
stopwatch = document.getElementById("stopwatch");

stopwatch.onmouseover = () => stopwatch.src = "./icons/StopwatchWhiteFill.svg"
stopwatch.onmouseleave = () => stopwatch.src = "./icons/StopwatchWhiteEmpty.svg"


//Code for middle timer circle
const circle = document.querySelector(".progress");  //Getting top circle
const text = document.getElementById("timeText");  //Getting middle text
const radius = circle.r.baseVal.value;  //Getting progress circle radius base value
const circumference = 2 * Math.PI * radius;  //Calculating circumference of the circle

circle.style.strokeDasharray = circumference;  //Making circle with one big dash 
circle.style.strokeDashoffset = 0;  //Initial offset

let time = 30;
let current = time, timer;


//Function for updateing timer circle
function updateTimer(){
    if(current <= 0) {
      clearInterval(timer); 
      return;
    } //If time is 0, stop the timer

    current--;  //Reduce time by one
    text.textContent = current;  //Updateing middle text

    //Calculating offset (if left time is 40%, offset will be 60%)
    offset = circumference - (current/time) * circumference; 
    circle.style.strokeDashoffset = offset;

}


const startBtn = document.querySelector(".startButton");
const resetBtn = document.querySelector(".resetButton");
const pauseBtn = document.querySelector(".pauseButton");
const resumeBtn = document.querySelector(".resumeButton");
const pauseReset = document.querySelector(".pauseReset");

//Event handler for starting timer
function startTimer(){
    //If timer is not already running, start the timer and run function every second
    if(current === time) timer = setInterval(updateTimer, 1000);
    startBtn.style.display = "none";
    pauseReset.style.display = "flex";
}

function resetTimer(){
    clearInterval(timer);
    current = time;
    text.textContent = current;
    
    circle.style.transition = "none";
    circle.style.strokeDashoffset = 0;
    requestAnimationFrame(() => circle.style.transition = "stroke-dashoffset 1s linear");

    pauseReset.style.display = "none";
    startBtn.style.display = "inline-block";
}


function pauseTimer(){
      clearInterval(timer);
      pauseBtn.style.display = "none";
      resumeBtn.style.display = "inline-block";
}

function resumeTimer(){
    timer = setInterval(updateTimer, 1000);
    resumeBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
}


