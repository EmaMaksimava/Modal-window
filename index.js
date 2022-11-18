let itemToDelete = null;

const myModal = $.modal( {
  title: 'Price of product',
  closable: true,
  content: `
  <h3> Your modal window is so cool!</h3>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam officiis nobis quibusdam.</p>
  `,
  width: '400px',
  footerButtons : [
    {
      text: 'OK',
      class: 'footer-btn',
      specialClass: 'btn-ok',
      handler() {
        myModal.close()
      }
    }
  ]
});

const confirm = $.modal( {
  title: 'Delete',
  closable: true,
  content: `
  <h3> Are you sure? </h3>
  `,
  footerButtons : [
    {
      text: 'Delete',
      class: 'footer-btn',
      specialClass: 'btn-ok',
      handler() {
        console.log('click delete');
        if (itemToDelete) {
          itemToDelete.cardElement.remove();
        }
        itemToDelete = null;
        confirm.close()
      }
    },
    {
      text: 'Cancel',
      class: 'footer-btn',
      specialClass: 'btn-cancel',
      handler() {
        console.log('cleck cancel');
        itemToDelete = null;
        confirm.close();
      }
    }
  ]
})


const listOfCards = renderList(dataOfProducts);

document.addEventListener('click', event => {
  const id = +event.target.dataset.id;
  const product = listOfCards.find(item => item.id === id);

  if(event.target.dataset.btn === 'price') {

    myModal.setContent(`
    <h3 class="product-title">${product.name}</h3>
    <h4 class="product-country"> Country: ${product.country}</h4>
    <h4 class="product-price">Price: ${product.price} zl</h4>
    `)
    myModal.open();
  }

  if(event.target.dataset.del === 'delete') {
    itemToDelete = product;
    confirm.open();
  }
})