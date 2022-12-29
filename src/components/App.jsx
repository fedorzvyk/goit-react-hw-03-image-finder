import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from './Modal/Modal';
import { getImages } from '../api/api';

export class App extends Component {
  state = {
    page: 1,
    searchName: '',
    images: [],
    isloading: false,

    isModalOpen: false,

    largeImage: '',

    total: '',
  };

  // componentDidMount() {
  //   this.setState({ isloading: true });
  //   const { searchName, page } = this.state;

  //   getImages(searchName, page).then(data => {
  //     this.setState({ images: data.hits });
  //     this.setState({ isloading: false });
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.setState({ isloading: true });
      getImages(searchName, page)
        .then(data => {
          console.log(data);
          this.setState({ total: data.totalHits });
          this.setState(({ images }) => ({
            images:
              this.state.page === 1
                ? [...data.hits]
                : [...images, ...data.hits],
          }));
        })
        // .catch(error => {
        //   console.log(error);
        //   this.setState({ error });
        // })
        .finally(() => this.setState({ isloading: false }));
    }
  }

  handletoggleModal = largeImage => {
    if (!largeImage) {
      this.setState({ largeImage: '', isModalOpen: false });
      return;
    }
    this.setState({ largeImage, isModalOpen: true });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleFformSubmit = searchName => {
    this.setState({ searchName, page: 1 });
  };

  render() {
    const { isModalOpen, isloading, images, largeImage, total } = this.state;
    return (
      <div className="App">
        <Searchbar onFormSubmit={this.handleFformSubmit} />
        {images && (
          <ImageGallery
            images={this.state.images}
            onClickImage={this.handletoggleModal}
          />
        )}
        {isloading && <Loader />}
        {isModalOpen && (
          <Modal onClose={this.handletoggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}

        {images.length > 0 && total > images.length && (
          <Button onLoadMore={this.handleLoadMore}>Load more</Button>
        )}
        <ToastContainer autoClose={3000} theme="dark" />
      </div>
    );
  }
}
