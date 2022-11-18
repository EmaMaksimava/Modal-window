const myModal = $.modal( {
  title: 'Active modal',
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
        console.log('Click on OK');
        myModal.close()
      }
    },
    {
      text: 'Cancel',
      class: 'footer-btn',
      specialClass: 'btn-cancel',
      handler() {
        console.log('Click on Cancel');
        myModal.close()
      }
    }
  ]
});


const listOfCards = renderList(dataOfProducts);