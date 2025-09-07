//Header icons variables
const sunMoon = document.getElementById("sunMoon");
const stopwatch = document.getElementById("stopwatch");
const timer = document.getElementById("timer");

//Input fields variables
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

//Footer buttons variables
const okBtn = document.querySelector(".startButton");
const footerButtons = document.querySelector(".footerButtons");

//Dark/white mode variable
let theme = sessionStorage.getItem("theme");
theme = theme ? theme : "dark";

if(theme === "white"){
  document.body.classList.add("white");
}

displayIcons();


//Making hover effect for white mode sun icon
sunMoon.onmouseover = () => sunMoon.src = (theme === "white") ? "../icons/MoonBlackFill.svg" : 
"../icons/SunWhiteFill.svg";
sunMoon.onmouseleave = () => sunMoon.src = (theme === "white") ? "../icons/MoonBlackEmpty.svg" : 
"../icons/SunWhiteEmpty.svg";

//Code for stopwatch icon hovering
stopwatch.onmouseover = () => stopwatch.src = (theme === "white") ? "../icons/StopwatchBlackFill.svg" : 
"../icons/StopwatchWhiteFill.svg";
stopwatch.onmouseleave = () => stopwatch.src = (theme === "white") ? "../icons/StopwatchBlackEmpty.svg" : 
"../icons/StopwatchWhiteEmpty.svg";

//Making hover effect for timer icon
timer.onmouseover = () => timer.src = (theme === "white") ? "../icons/TimerBlackFill.svg" : 
"../icons/TimerWhiteFill.svg";
timer.onmouseleave = () => timer.src = (theme === "white") ? "../icons/TimerBlackEmpty.svg" : 
"../icons/TimerWhiteEmpty.svg";

//Function for handling time input (preventing invalid entry)
function handleTimeInput(e, nextField = null, type = "minSec"){
    let value = e.target.value.replace(/\D/g, '');  //Replace non digits characters with ''

    const maxValue = (type === "minSec") ? 59 : 99;  //Max value depending on type

    //If empty
    if(value.length === 0){
        e.target.value = "00";
        if(nextField) document.getElementById(nextField).focus();
        else document.activeElement.blur();
    //If 1 character
    }else if(value.length === 1){
        if(parseInt(value, 10) > ((type === "minSec") ? 5 : maxValue)){
            e.target.value = "0" + value;
            if(nextField) document.getElementById(nextField).focus();
            else document.activeElement.blur();
        }else{
            e.target.value = value;
        }
    //If 2 characters
    }else if(value.length === 2){
        if(parseInt(value, 10) > maxValue) value = maxValue.toString();
        e.target.value = value;
        if(nextField) document.getElementById(nextField).focus();
        else document.activeElement.blur();
    //If more than 2
    }else{
        e.target.value = value.slice(0,2);
    }
}

//Function for attaching all event listeners
function attachEventListeners(field, nextField = null, type = "minSec"){
    field.addEventListener("input", e => handleTimeInput(e, nextField, type));
    field.addEventListener("focus", e => e.target.select());
    field.addEventListener("blur", e => {
      if(e.target.value.length === 1){
        e.target.value = "0" + e.target.value;
      }
    })
}

//Attaching event listeners
attachEventListeners(hours, "minutes", "hours");
attachEventListeners(minutes, "seconds");
attachEventListeners(seconds);

//Function for setting timer after OK is pressed
function setTimer(){
    //Making timerData object
    const timerData = {
        h: clearZeros(hours.value),
        m: clearZeros(minutes.value),
        s: clearZeros(seconds.value),
    }

    //Save timerData object to session storage
    sessionStorage.setItem("timerData", JSON.stringify(timerData));
    window.location.href = "../index.html";  //Change to timer page
}

//Function for cancel button press
function cancel(){
    window.location.href = "../index.html";
}

//Function for clearing zeros
function clearZeros(textInput){
    return (textInput[0] === "0") ? textInput.slice(1) : textInput;  //If first character is zero, remove it
}

//Function for displaying icons
function displayIcons(){
  theme = sessionStorage.getItem("theme");

  if(theme === "white"){
    sunMoon.src = "../icons/MoonBlackEmpty.svg";
    timer.src = "../icons/TimerBlackEmpty.svg";
    stopwatch.src = "../icons/StopwatchBlackEmpty.svg";
  }else{
    sunMoon.src = "../icons/SunWhiteEmpty.svg";
    timer.src = "../icons/TimerWhiteEmpty.svg";
    stopwatch.src = "../icons/StopwatchWhiteEmpty.svg";
  }
}