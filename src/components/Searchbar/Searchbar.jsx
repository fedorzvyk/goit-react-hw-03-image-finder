import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  Header,
  HeaderForm,
  FormButton,
  FormButtonLabel,
  FormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };

  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchName.trim() === '') {
      return toast.warn('Write something!');
    }
    this.props.onFormSubmit(this.state.searchName);
    // this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;
    return (
      <Header>
        <HeaderForm onSubmit={this.handleSubmit}>
          <FormButton type="submit">
            <FormButtonLabel>Search</FormButtonLabel>
          </FormButton>

          <FormInput
            onChange={this.handleInputChange}
            name="searchName"
            value={searchName}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </HeaderForm>
      </Header>
    );
  }
}
