function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
        <div class="modal-btn">
          ${options.closable ? `<i class="fa-regular fa-rectangle-xmark" data-close="true"></i>` : ''}
        </div>
        <div class="modal-title">
          <h2 class="modal-header">${options.title || 'Modal window'}</h2>
        </div>
        <div class="modal-content">
          ${options.content || ''}
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

  const modalMethods = {
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

  $modal.addEventListener('click', event => {
    if(event.target.dataset.close) {
      modalMethods.close()
    }
  })

  return modalMethods;
}