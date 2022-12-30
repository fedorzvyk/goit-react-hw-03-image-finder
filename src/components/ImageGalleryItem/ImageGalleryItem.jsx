import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, ItemImage, ModalImg } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
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
        <GalleryItem>
          <ItemImage
            onClick={() => this.handletoggleModal()}
            src={webformatURL}
            alt={tags}
          />
        </GalleryItem>
        {this.state.isModalOpen && (
          <Modal onClose={this.handletoggleModal}>
            <ModalImg src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
