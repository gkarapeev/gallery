// Elements
const containerElement = document.getElementById('container');
const contentElement = document.getElementById('content');
const spacerElement = document.getElementById('spacer');

// Variables
const cardHeight = 200;
const gapHeight = 20;
const rowHeight = cardHeight + gapHeight;
const containerHeight = parseInt(window.getComputedStyle(containerElement).height.split('px')[0]);
const itemsPerPage = 16;
const visibleCardCount = itemsPerPage * 3;

let skip = 0;

let totalImgCount;
let totalRowCount;

// Functions
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


// Element Map
let renderedPages = [0, 1, 2];

// Init card nodes
for (let i=0; i <= visibleCardCount - 1; i++) {
    contentElement.appendChild(makeCard('img/loading.png'));
}

// Fetch total
fetch('http://localhost:3000/image-count')
    .then(res => res.json())
    .then(total => {
        totalImgCount = total;
        totalRowCount = totalImgCount / 4;
        spacerElement.style.height = totalRowCount * rowHeight + 'px';
    });

function renderMap() {
    renderedPages.forEach((pageIndex, orderIndex) => {
        const pageImages = imagesForPage(pageIndex);

        const elementsForThisGroup = getNodeGroups()[orderIndex];

        elementsForThisGroup.forEach(
            (node, nodeIndex) => {
                fetch(urlForImage(pageImages[nodeIndex]))
                    .then(res => res.json())
                    .then(imageUrl => {
                        node.firstChild.setAttribute('src', imageUrl);
                    });
            }
        );
    });
}

renderMap();

containerElement.addEventListener('scroll', () => {
    const firstVisibleRowIndex = Math.floor(containerElement.scrollTop / rowHeight);
    const firstPageInViewIndex = Math.floor(firstVisibleRowIndex / 4);

    if (firstPageInViewIndex !== skip) {
        skip = firstPageInViewIndex;
        getNodeGroups()[0].forEach(el => { el.style.transform = 'translate(0,' + offsetForPage(3) + 'px'; });
        renderedPages = renderedPages.map(pageIndex => pageIndex + 1);
        renderMap();
        console.log('jump');
    }
});

function imagesForPage(pageIndex) {
    return Array(16).fill().map((_, index) => pageIndex * 16 + index);
}

function offsetForPage(pageIndex) {
    return pageIndex * containerElement.getBoundingClientRect().height;
}

function rotate(arr) {
    arr.push(arr.shift());
    return arr;
}

function getNodeGroups() {
    return [
        Array.from(contentElement.children).slice(0, 16),
        Array.from(contentElement.children).slice(16, 32),
        Array.from(contentElement.children).slice(32, 48)
    ]
}

function urlForImage(imageIndex) {
    return 'http://localhost:3000/image/' + imageIndex;
}