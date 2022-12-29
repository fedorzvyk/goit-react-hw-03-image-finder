import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  // handleBackDropClick = e => {
  //   if (e.currentTarget === e.target) {
  //     this.props.onClose();
  //   }
  // };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleClose}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
