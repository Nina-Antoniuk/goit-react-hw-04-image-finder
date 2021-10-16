import PropTypes from 'prop-types';

function Button({ loadMore }) {
  return (
    <button className="Button" type="button" onClick={loadMore}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMore: PropTypes.func,
};

export default Button;
