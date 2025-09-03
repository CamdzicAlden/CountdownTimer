//Header icons
const timer = document.getElementById("timer");
const sunMoon = document.getElementById("sunMoon");

//Footer buttons
const startBtn = document.querySelector(".startButton");
const pauseBtn = document.querySelector(".pauseButton");
const resetBtn = document.querySelector(".resetButton");
const resumeBtn = document.querySelector(".resumeButton");
const pauseReset = document.querySelector(".pauseReset");

//Main elements
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const hundredths = document.querySelector(".hundredths");

let currentH = 0, currentMin = 0, currentSec = 0, currentHundr = 0;
let stopwatch;

//Making hover effect for timer icon
timer.onmouseover = () => timer.src = "../icons/TimerWhiteFill.svg"
timer.onmouseleave = () => timer.src = "../icons/TimerWhiteEmpty.svg"

//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = "../icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = "../icons/SunWhiteEmpty.svg";

//Function for updateing stopwatch
function updateStopwatch(){
    if(currentHundr < 99){
        currentHundr++;
        updateHundr();
    }
    else if(currentSec < 59){
        currentSec++;
        currentHundr = 0;
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
    stopwatch = setInterval(updateStopwatch, 10);
    startBtn.style.display = "none";
    pauseReset.style.display = "flex";
}

//Event handler for reset button
function resetStopwatch(){
    clearInterval(stopwatch);
    currentH = 0;
    currentMin = 0;
    currentSec = 0;
    currentHundr = 0;
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
    stopwatch = setInterval(updateStopwatch, 10);
    pauseDisplay();
}

//Function for displaying hundredths in correct format
function updateHundr(){
    hundredths.textContent = currentHundr < 10 ? ".0" + currentHundr : "." + currentHundr;
}

//Function for displaying seconds in correct format
function updateSeconds(){
    seconds.textContent = currentSec < 10 ? "0" + currentSec : currentSec;
    updateHundr();
}

//Function for displaying minutes and seconds in correct format
function updateMinutes(){
    minutes.textContent = currentMin < 10 ? "0" + currentMin : currentMin;
    updateSeconds();
}

//Function for displaying whole stopwatch in correct format
function updateHours(){
    hours.textContent = currentH < 10 ? "0" + currentH : currentH;
    updateMinutes();
}

//Function for changing resume button with pause button
function pauseDisplay(){
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}