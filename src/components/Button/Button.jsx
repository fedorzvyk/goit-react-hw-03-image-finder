import { ButtonLoad } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore, children }) => {
  return <ButtonLoad onClick={onLoadMore}>{children}</ButtonLoad>;
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
