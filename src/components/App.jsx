import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from '../api/api';

export class App extends Component {
  state = {
    page: 1,
    searchName: '',
    images: [],
    status: 'idle',
  };

  componentDidMount() {
    this.setState({ status: 'pending' });
    const { searchName, page } = this.state;
    getImages(searchName, page).then(data => {
      this.setState({ images: data.hits });
      this.setState({ isloading: false });
      this.setState({ status: 'resolved' });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.setState({ status: 'pending' });

      getImages(searchName, page)
        .then(data => {
          // console.log(data);

          this.setState(({ images }) => ({
            images:
              this.state.page === 1
                ? [...data.hits]
                : [...images, ...data.hits],
          }));
          this.setState({ status: 'resolved' });

          if (data.hits.length === 0) {
            toast.warn('Try again');
          } else if (data.hits.length < 12) {
            toast.warn('These are all images we can show!');
            this.setState({ status: 'rejected' });
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ error });
          this.setState({ status: 'rejected' });
          toast.warn('These are all images we can show!');
        });
      // .finally(() => this.setState({ isloading: false }));
    }
  }

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleFformSubmit = searchName => {
    this.setState({ searchName, page: 1 });
  };

  render() {
    const { images, status } = this.state;
    return (
      <div className="App">
        <Searchbar onFormSubmit={this.handleFformSubmit} />
        {images.length === 0 && <h2>No images on your request</h2>}
        {images.length > 0 && <ImageGallery images={this.state.images} />}

        {status === 'pending' && <Loader />}

        {images.length > 0 && status === 'resolved' && (
          <Button onLoadMore={this.handleLoadMore}>Load more</Button>
        )}

        <ToastContainer autoClose={3000} theme="dark" />
      </div>
    );
  }
}
