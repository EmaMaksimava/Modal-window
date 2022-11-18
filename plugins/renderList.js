function _createCard(options) {
  const cardsWrap = document.querySelector('.cards-wrapper');
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('card-shadow');
  card.style.width="18rem";
  card.insertAdjacentHTML('afterbegin', `
    <img src=${options.image} class="card-img-top" alt=${options.name}>
    <div class="card-body">
      <h5 class="card-title">${options.name}</h5>
      <p class="card-text">${options.info}</p>
      <h6 class="card-title">${options.country}</h6>
      <button class="btn btn-primary" data-btn="price" data-id="${options.id}">Watch price</button>
      <button class="btn btn-danger" data-del="delete" data-id="${options.id}">Delete</button>
    </div>
  `)
  cardsWrap.appendChild(card);
  return card;
}

const renderList = function(list) {
  return list.map(item => {
    const cardElement = _createCard(item);
    Object.assign(item, {
      cardElement
    })
    return item;
  })

}