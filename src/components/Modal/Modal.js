import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

function Modal({ switcher, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleEscape = e => {
    if (e.key === 'Escape') {
      switcher();
    }
  };
  const handleClose = e => {
    if (e.currentTarget === e.target) {
      switcher();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleClose}>
      <div className={s.Modal}>{children}</div>
    </div>,
    document.getElementById('modalRoot'),
  );
}

Modal.propTypes = {
  switcher: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
