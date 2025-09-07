//Function for switching between dark and white mode
function toggleWhiteMode(){
    document.body.classList.toggle('white');  //toggle method adds it if it doesnt exist and removes if does
    const isWhite = document.body.classList.contains('white');  //Check if contains
    sessionStorage.setItem('theme', isWhite ? 'white' : 'dark');  //Store theme in session storage
}