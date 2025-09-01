const timer = document.getElementById("timer");
const sunMoon = document.getElementById("sunMoon");

const startBtn = document.querySelector(".startButton");
const pauseBtn = document.querySelector(".pauseButton");
const resetBtn = document.querySelector(".resetButton");
const resumeBtn = document.querySelector(".resumeButton");
const pauseReset = document.querySelector(".pauseReset");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

let currentH = 0, currentMin = 0, currentSec = 0;
let stopwatch;

//Making hover effect for timer icon
timer.onmouseover = () => timer.src = "../icons/TimerWhiteFill.svg"
timer.onmouseleave = () => timer.src = "../icons/TimerWhiteEmpty.svg"

//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = "../icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = "../icons/SunWhiteEmpty.svg";

function updateStopwatch(){
    if(currentSec < 59){
        currentSec++;
        updateSeconds();
    }else if(currentMin < 59){
        currentMin++;
        currentSec = 0;
        updateMinutes();
    }else if(currentH < 99){
        currentH++;
        currentMin = 0;
        updateHours();
    }
}

function startStopwatch(){
    stopwatch = setInterval(updateStopwatch, 1000);
    startBtn.style.display = "none";
    pauseReset.style.display = "flex";
}

function resetStopwatch(){
    clearInterval(stopwatch);
    currentH = 0;
    currentMin = 0;
    currentSec = 0;
    updateHours(); //This method is calling all update methods
    pauseDisplay();
    pauseReset.style.display = "none";
    startBtn.style.display = "inline-block";
}

function pauseStopwatch(){
    clearInterval(stopwatch);
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "inline-block";
}

function resumeStopwatch(){
    stopwatch = setInterval(updateStopwatch, 1000);
    pauseDisplay();
}

function updateSeconds(){
    if(currentSec < 10) seconds.textContent = "0" + currentSec;
    else seconds.textContent = currentSec;
}
function updateMinutes(){
    if(currentMin < 10) minutes.textContent = "0" + currentMin;
    else minutes.textContent = currentMin;
    updateSeconds();
}
function updateHours(){
    if(currentH < 10) hours.textContent = "0" + currentH;
    else hours.textContent = currentH;
    updateMinutes();
}

function pauseDisplay(){
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}