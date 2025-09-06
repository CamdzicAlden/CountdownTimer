function toggleWhiteMode(){
    document.body.classList.toggle('white');
    const isWhite = document.body.classList.contains('white');
    sessionStorage.setItem('theme', isWhite ? 'white' : 'dark');
}