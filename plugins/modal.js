Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}

const $ = {}

function noop() {};

function _createModalBtns(buttons = []) {
  if(buttons.lenght === 0) {
    return document.createElement('div');
  }

  const footer = document.createElement('div');
  footer.classList.add('modal-footer');

  buttons.forEach( btn => {
    const $btn = document.createElement('button');
    $btn.innerText = btn.text;
    $btn.classList.add(`${btn.class}`);
    $btn.classList.add(`${btn.specialClass || 'secondary'}`);
    $btn.onclick = btn.handler || noop

    footer.appendChild($btn);
  })

  return footer
}

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
        <div class="modal-content" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `)

  const footerBtns = _createModalBtns(options.footerButtons);
  footerBtns.appendAfter(modal.querySelector('[data-content]'))
  document.body.appendChild(modal);
  return modal;
}

$.modal = function(options) {
  const ANIMATION_SPEED = 400;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modalMethods = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed');
      }
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
    }
  }

  const listenerClose = event => {
    if(event.target.dataset.close) {
      modalMethods.close()
    }
  }

  $modal.addEventListener('click', listenerClose)

  return Object.assign(modalMethods, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', listenerClose);
      destroyed = true;
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    }
  })
}