//Header icons
const timer = document.getElementById("timer");
const sunMoon = document.getElementById("sunMoon");

//Footer buttons
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

//Function for updateing stopwatch
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
        currentSec = 0;
        updateHours();
    }
}

//Event handler for start button (for starting stopwatch)
function startStopwatch(){
    stopwatch = setInterval(updateStopwatch, 1000);
    startBtn.style.display = "none";
    pauseReset.style.display = "flex";
}

//Event handler for reset button
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

//Event handler for pause button
function pauseStopwatch(){
    clearInterval(stopwatch);
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "inline-block";
}

//Event handler for resume button
function resumeStopwatch(){
    stopwatch = setInterval(updateStopwatch, 1000);
    pauseDisplay();
}

//Function for displaying seconds in correct format
function updateSeconds(){
    if(currentSec < 10) seconds.textContent = "0" + currentSec;
    else seconds.textContent = currentSec;
}

//Function for displaying minutes and seconds in correct format
function updateMinutes(){
    if(currentMin < 10) minutes.textContent = "0" + currentMin;
    else minutes.textContent = currentMin;
    updateSeconds();
}

//Function for displaying whole stopwatch in correct format
function updateHours(){
    if(currentH < 10) hours.textContent = "0" + currentH;
    else hours.textContent = currentH;
    updateMinutes();
}

//Function for changing resume button with pause button
function pauseDisplay(){
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}