import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Button, ButtonToolbar } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import UpIcon from "@fortawesome/fontawesome-free-solid/faAngleUp";
import DownIcon from "@fortawesome/fontawesome-free-solid/faAngleDown";
import "./index.css";
const iconSize = "shrink-3";
const SortButton = props => {
  this.upClicked = () => {
    props.sortClicked(true);
  };
  this.downClicked = () => {
    props.sortClicked(false);
  };
  return (
    <div className="d-inline">
      <FontAwesomeIcon
        icon={UpIcon}
        onClick={this.upClicked}
        transform={iconSize}
        className="sort-icon"
      />

      <FontAwesomeIcon
        icon={DownIcon}
        onClick={this.downClicked}
        transform={iconSize}
        className="sort-icon"
      />
    </div>
  );
};

SortButton.props = {
  sortClicked: PropTypes.func.isRequired
};

export default SortButton;
