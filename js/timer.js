//Middle timer circle variables
const circle = document.querySelector(".progress");  //Getting top circle
const hours = document.querySelector(".hours");  //Getting hours
const minutes = document.querySelector(".minutes");  //Getting minutes
const seconds = document.querySelector(".seconds");  //Getting seconds
const semicolumn1 = document.querySelector(".semicolumn1"); //Getting first semicolumn
const semicolumn2 = document.querySelector(".semicolumn2"); //Getting second semicolumn

//Bottom button variables
const startBtn = document.querySelector(".startButton");
const resetBtn = document.querySelector(".resetButton");
const pauseBtn = document.querySelector(".pauseButton");
const resumeBtn = document.querySelector(".resumeButton");
const pauseReset = document.querySelector(".pauseReset");

//Header icons variables
const stopwatch = document.getElementById("stopwatch");
const edit = document.getElementById("editTimer");
const headerRight = document.querySelector(".headerRight");

//Code for stopwatch icon hovering
stopwatch.onmouseover = () => stopwatch.src = "./icons/StopwatchWhiteFill.svg"
stopwatch.onmouseleave = () => stopwatch.src = "./icons/StopwatchWhiteEmpty.svg"

const radius = circle.r.baseVal.value;  //Getting progress circle radius base value
const circumference = 2 * Math.PI * radius;  //Calculating circumference of the circle

circle.style.strokeDasharray = circumference;  //Making circle with one big dash 
circle.style.strokeDashoffset = 0;  //Initial offset

let defaultH = 0, defaultMin = 1, defaultSec = 5;
let currentH = defaultH, currentMin = defaultMin, currentSec = defaultSec;
let timer, secondsSum = 0, currentSecondsSum = 0; 

secondsSum = (((defaultH * 60) + defaultMin) * 60) + defaultSec;  //Starting seconds sum

//Function for updateing timer circle
function updateTimer(){
    if(currentH <= 0 && currentMin <= 0 && currentSec <= 0) {
      clearInterval(timer); 
      return;
    } //If time is 0, stop the timer

    if(currentSec > 0){
      currentSec--;  //Reduce seconds by one
      displaySeconds();
    }else if(currentMin > 0){
      currentMin--;  //Reduce minutes by one
      displayMinutes();
      currentSec = 59;
      seconds.textContent = currentSec;
    }else if(currentH > 0){
      currentH--;  //Reduce hours by one
      displayHours();
      currentMin = 59;
      minutes.textContent = currentMin;
    }

    //Current seconds sum
    currentSecondsSum = (((currentH * 60) + currentMin) * 60) + currentSec;  

    //Calculating offset (if left time is 40%, offset will be 60%)
    offset = circumference - (currentSecondsSum/secondsSum) * circumference; 
    circle.style.strokeDashoffset = offset;

}

//Event handler for starting timer
function startTimer(){
    //Start the timer and run function every second
    timer = setInterval(updateTimer, 1000);
    startBtn.style.display = "none";
    hideEdit();
    pauseReset.style.display = "flex";
}

function resetTimer(){
    clearInterval(timer);
    currentH = defaultH;
    currentMin = defaultMin;
    currentSec = defaultSec;

    displayHours();
    displayMinutes();
    displaySeconds();
    showEdit();
    
    circle.style.transition = "none";
    circle.style.strokeDashoffset = 0;
    requestAnimationFrame(() => circle.style.transition = "stroke-dashoffset 1s linear");

    pauseReset.style.display = "none";
    pauseDisplay();
    startBtn.style.display = "inline-block";
}


function pauseTimer(){
      clearInterval(timer);
      resumeDisplay();
}

function resumeTimer(){
    timer = setInterval(updateTimer, 1000);
    pauseDisplay();
}

function displaySeconds(){
  if(currentSec >= 10) seconds.textContent = currentSec;
  else seconds.textContent = "0" + currentSec;
}

function displayMinutes(){
  if(currentMin === 0) {
    minutes.style.display = "none";
    semicolumn2.style.display = "none";
  }else{
    minutes.style.display = "block";
    semicolumn2.style.display = "block";
    if(currentMin >= 10) minutes.textContent = currentMin;
    else minutes.textContent = "0" + currentMin;
  }
}

function displayHours(){
  if(currentH === 0) {
    hours.style.display = "none";
    semicolumn1.style.display = "none";
  }else{
    hours.style.display = "block";
    semicolumn1.style.display = "block";
    if(currentH >= 10) hours.textContent = currentH;
    else hours.textContent = "0" + currentH;
  }
}

function resumeDisplay(){
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
}

function pauseDisplay(){
  resumeBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function hideEdit(){
  edit.style.display = "none";
  headerRight.style.justifyContent = "center";
}

function showEdit(){
  edit.style.display = "block";
  headerRight.style.justifyContent = "space-around";
}


