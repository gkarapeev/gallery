const containerElement = document.getElementById('container');
const contentElement = document.getElementById('content');
const spacerElement = document.getElementById('spacer');
function makeCard(url) {
    const cardElement = document.createElement('li');
    cardElement.setAttribute('class', 'card');

    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', url);
    cardElement.appendChild(imageElement);

    // const text = document.createTextNode('This is a card');
    // cardElement.appendChild(text);
    
    return cardElement;
}

const cardHeight = 200;
const gapHeight = 20;
const rowHeight = cardHeight + gapHeight;
const containerHeight = parseInt(window.getComputedStyle(containerElement).height.split('px')[0]);
const visibleCardCount = 48;

let totalImgCount;
let totalRowCount;

function loadInitialImages() {
    const req = new XMLHttpRequest();

    // TODO: dispose of listener
    req.addEventListener('readystatechange', () => {
        if (req.readyState === 4) {
            const response = JSON.parse(req.response);

            totalImgCount = response.total;
            totalRowCount = totalImgCount / 4;
            spacerElement.style.height = totalRowCount * rowHeight + 'px';

            const urls = response.results;

            for (let i=0; i <= visibleCardCount - 1; i++) {
                contentElement.appendChild(makeCard(urls[i]));
            }
        }
    });

    req.open('GET', 'http://localhost:3000/images');
    req.send();
}

loadInitialImages();

containerElement.addEventListener('scroll', () => {
    const firstVisibleRowIndex = Math.floor(containerElement.scrollTop / rowHeight);
    const firstVisibleImageIndex = firstVisibleRowIndex * 4;

    console.log(firstVisibleImageIndex);
});