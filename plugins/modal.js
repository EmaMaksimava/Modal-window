function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
      <div class="modal-window">
        <div class="modal-btn">
          <i class="fa-regular fa-rectangle-xmark"></i>
        </div>
        <div class="modal-title">
          <h2 class="modal-header">Modal Window</h2>
        </div>
        <div class="modal-content">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste doloribus commodi hic ad nemo ullam fugit, ea possimus. Inventore aliquid non commodi suscipit eum voluptate!</p>
        </div>
        <div class="modal-footer">
          <button class="btn-ok footer-btn">OK</button>
          <button class="btn-cancel footer-btn"> Cancel</button>
        </div>
      </div>
    </div>
  `)
  document.body.appendChild(modal);
  return modal;
}

$.modal = function(options) {
  const ANIMATION_SPEED = 400;
  const $modal = _createModal(options);
  let closing = false;

  return {
    open() {
      !closing && $modal.classList.add('open');
    },
    close() {
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      closing = true
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED)
    },
    destroy() {}
  }
}