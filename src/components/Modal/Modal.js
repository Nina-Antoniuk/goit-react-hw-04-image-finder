import { Component } from 'react';
import { createPortal } from 'react-dom';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = e => {
    if (e.code === 'Escape') {
      this.props.switcher();
    }
  };

  handleClose = e => {
    if (e.currentTarget === e.target) {
      this.props.switcher();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleClose}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      document.getElementById('modalRoot'),
    );
  }
}

export default Modal;
