import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handletoggleModal = () => {
    this.setState(p => ({
      isModalOpen: !p.isModalOpen,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <>
        <li className="ImageGalleryItem">
          <img
            className="ImageGalleryItem-image"
            onClick={() => this.handletoggleModal()}
            src={webformatURL}
            alt={tags}
          />
        </li>
        {this.state.isModalOpen && (
          <Modal onClose={this.handletoggleModal}>
            <img className="ModalImg" src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
