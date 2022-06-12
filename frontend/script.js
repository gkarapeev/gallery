const contentElement = document.getElementById('content');

function makeCard() {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card');

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png');
    cardElement.appendChild(imageElement);

    const text = document.createTextNode('This is a card');
    cardElement.appendChild(text);
    
    return cardElement;
}

for (let i=0; i <= 99; i++) {
    contentElement.appendChild(makeCard());
}
