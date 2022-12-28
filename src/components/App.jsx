import { Loader } from './Loader/Loader';
import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    console.log('toggle');
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <Searchbar />
        <button type="button" onClick={this.toggleModal}>
          open
        </button>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <p>madal</p>
            <img src="" alt="" />
            <button type="button" onClick={this.toggleModal}>
              close
            </button>
          </Modal>
        )}
        <Loader />
      </div>
    );
  }
}
