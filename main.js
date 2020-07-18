const objModel = document.querySelector('a-obj-model');
const btn = document.querySelector('#startBtn');

//-----AEVENT LISTENERS------

objModel.addEventListener('animationcomplete', ()=> {
  let fromY = objModel.getAttribute('position').y;
  let toY = fromY === 1 ? 1.04 : 1;

  objModel.setAttribute('animation', {
    property: 'position',
    from: {x: 0, y: fromY, z: -3},
    to: {x: 0, y: toY, z: -3},
    dur: 2000,
    easing: 'linear'
  });
});

btn.addEventListener('click', ()=> {
  const arrow = document.querySelector('#arrow');
  const textGlobe = document.querySelector('#textGlobe');

  arrow.setAttribute('visible', 'true');
  textGlobe.setAttribute('value', 'sale morr@ \n buena suerte')
  btn.setAttribute('visible', 'false');

  renderCards(getHand());
});

//----FÜNKTIONALITI----

function getHand() {
  let hand = [];

  for (let i = 0; i < 5; i ++) {
    let randomCard = Math.floor(Math.random()*78);

    hand.includes(randomCard) 
    ? i--
    : hand.push(randomCard);
  }

  return hand;
}

function renderCards(hand) {
  hand.forEach((card, i) => {
    let img = document.createElement('img');
    let id = i+1;
    let revealed = false;
  
    img.setAttribute('id', `card${id}`);
    img.setAttribute('src', `images/deck/${card}.jpg`);
    document.querySelector('a-assets').appendChild(img);
  
    let cardEl = document.createElement('a-box');
    cardEl.setAttribute('class', 'card');
    cardEl.setAttribute('width', 1.5); 
    cardEl.setAttribute('height', 3);
    cardEl.setAttribute('depth', 0.01);
    cardEl.setAttribute('multisrc', `src4:#deckback;src5:#card${id}`);
    const {pos, rot} = getElementProperties(id);
    cardEl.setAttribute('position', pos);
    cardEl.setAttribute('rotation', rot);
    document.querySelector('a-scene').appendChild(cardEl);
  
    cardEl.addEventListener('mouseenter', ()=> {
      cardEl.setAttribute('scale', {x: 1.5, y: 1.5, z: 1.5});
    });
  
    cardEl.addEventListener('mouseleave', ()=> {
      cardEl.setAttribute('scale', {x: 1, y: 1, z: 1});
    });
  
    cardEl.addEventListener('click', ()=> {
      let r = cardEl.getAttribute('rotation');
      
      if (!revealed) {
        cardEl.setAttribute('animation', {
          property: 'rotation',
          to: {x: r.x, y: r.y + 180, z: r.z},
          duration: 3000,
          easing: 'linear'
        });
      }
  
      revealed = true;
    });
  
    cardEl.addEventListener('animationcomplete', ()=> {
      cardEl.removeAttribute('animation');
    })
  });
}

function getElementProperties(id) {
  switch(id) {
    case 1:
      return {pos: {x: 2, y: 2, z: -1.5}, rot: {x: 0, y: -60, z: getCardPos()}};
    case 2:
      return {pos: {x: 2, y: 2, z: 1}, rot: {x: 0, y: -120, z: getCardPos()}};
    case 3:
      return {pos: {x: 0, y: 2, z: 2.5}, rot: {x: 0, y: -180, z: getCardPos()}};
    case 4:
      return {pos: {x: -2.3, y: 2, z: 1}, rot: {x: 0, y: 120, z: getCardPos()}};
    case 5:
      return {pos: {x: -2, y: 2, z: -1.5}, rot: {x: 0, y: 60, z: getCardPos()}}
  }
}

function getCardPos() {
  return Math.floor(Math.random()*2) == 0 ? 0 : 180;
}