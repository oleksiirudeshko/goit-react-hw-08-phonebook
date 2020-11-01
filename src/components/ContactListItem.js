import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";

import phoneOperations from "../redux/phone/phoneOperations";
import phoneSelectors from "../redux/phone/phoneSelectors";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ContactListItem = ({ name, number, onRemove }) => {
  const classes = useStyles();
  return (
    <li>
      <Box
        display="flex"
        justifyContent="space-between"
        width="290px"
        boxShadow={1}
      >
        <span className="name find">
          {name} {number}
        </span>

        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          startIcon={<DeleteIcon />}
          size="small"
          onClick={onRemove}
        >
          x
        </Button>
      </Box>
    </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  ...phoneSelectors.getContactById(state, ownProps.id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRemove: () => dispatch(phoneOperations.removeContact(ownProps.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);
