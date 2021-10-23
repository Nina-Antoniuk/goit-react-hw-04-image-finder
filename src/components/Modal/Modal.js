import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

function Modal({ switcher, children }) {
  useEffect(() => {
    //useCallback, escape
    window.addEventListener('keydown', handleEscape);

    return window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleEscape = e => {
    if (e.code === 'Escape') {
      switcher();
    }
  };

  const handleClose = e => {
    if (e.currentTarget === e.target) {
      switcher();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleClose}>
      <div className="Modal">{children}</div>
    </div>,
    document.getElementById('modalRoot'),
  );
}

Modal.propTypes = {
  switcher: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
