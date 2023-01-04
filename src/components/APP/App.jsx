import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box } from '../Box';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import { Loader } from '../Loader/Loader';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { getImages } from '../../api/api';
import { Notification } from './App.styled';

export class App extends Component {
  state = {
    page: 1,
    searchName: '',
    images: [],
    status: 'idle',
  };

  // componentDidMount() {
  //   this.setState({ status: 'pending' });
  //   const { searchName, page } = this.state;
  //   getImages(searchName, page).then(data => {
  //     this.setState({ images: data.hits });
  //     this.setState({ isloading: false });
  //     this.setState({ status: 'resolved' });
  //   });
  // }

  async componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    try {
      if (prevState.searchName !== searchName || prevState.page !== page) {
        this.setState({ status: 'pending' });

        await getImages(searchName, page).then(data => {
          // console.log(data);
          if (prevState.searchName !== searchName && data.hits.length !== 0) {
            toast.success(`We find ${data.totalHits} images`);
          }

          this.setState(({ images }) => ({
            images:
              this.state.page === 1
                ? [
                    ...data.hits.map(
                      ({ webformatURL, largeImageURL, id, tags }) => {
                        return { id, webformatURL, largeImageURL, tags };
                      }
                    ),
                  ]
                : [
                    ...images,
                    ...data.hits.map(
                      ({ webformatURL, largeImageURL, id, tags }) => {
                        return { id, webformatURL, largeImageURL, tags };
                      }
                    ),
                  ],
          }));
          this.setState({ status: 'resolved' });

          if (data.hits.length === 0) {
            toast.warn('Try again');
            throw new Error('Try again');
          } else if (data.hits.length < 12) {
            toast.warn('These are all images we can show!');
            throw new Error('These are all images we can show!');
          }
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: 'rejected' });
    }
  }

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleFformSubmit = searchName => {
    this.setState({ searchName, page: 1, images: [] });
  };

  render() {
    const { images, status } = this.state;
    return (
      <Box display="grid" gridGap={5} gridTemplateColumns="1fr">
        <Searchbar onFormSubmit={this.handleFformSubmit} />
        {status === 'rejected' && images.length === 0 && (
          <Notification>Images not found. Please try again</Notification>
        )}
        {images.length > 0 && <ImageGallery images={this.state.images} />}

        {status === 'pending' && <Loader />}

        {images.length > 0 && status === 'resolved' && (
          <Button onLoadMore={this.handleLoadMore}>Load more</Button>
        )}
        <ToastContainer autoClose={3000} theme="dark" />
      </Box>
    );
  }
}
