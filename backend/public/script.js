const contentElement = document.getElementById('content');

function makeCard(url) {
    const cardElement = document.createElement('div');
    cardElement.setAttribute('class', 'card');

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', url);
    cardElement.appendChild(imageElement);

    // const text = document.createTextNode('This is a card');
    // cardElement.appendChild(text);
    
    return cardElement;
}

function loadInitialImages() {
    const req = new XMLHttpRequest();

    // TODO: dispose of listener
    req.addEventListener('readystatechange', () => {
        if (req.readyState === 4) {
            const urls = JSON.parse(req.response).results;

            for (let i=0; i <= 99; i++) {
                contentElement.appendChild(makeCard(urls[i]));
            }
        }
    });

    req.open('GET', 'http://localhost:3000/images');
    req.send();
}

loadInitialImages();