const button = document.querySelector('button');
button.addEventListener('click', () => {
    if (button.innerHTML == 'Clicked!') {
        button.innerHTML = 'Click Me!';
        button.style.backgroundColor = 'blue';
        return;
    } else {
    button.innerHTML = 'Clicked!';
    button.style.backgroundColor = 'green';
    }
});