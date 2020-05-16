import PropTypes from "prop-types";

const Display = ({ value }) => value;
Display.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Display;
