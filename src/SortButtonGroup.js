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
    <ButtonGroup
      vertical
      size="sm"
      style={{ marginLeft: ".5em" }}
      className="float-right"
    >
      <Button outline onClick={this.upClicked}>
        <FontAwesomeIcon
          icon={UpIcon}
          transform={iconSize}
          //className="sort-icon"
        />
      </Button>
      <Button outline onClick={this.downClicked}>
        <FontAwesomeIcon
          icon={DownIcon}
          transform={iconSize}
          //className="sort-icon"
        />
      </Button>
    </ButtonGroup>
  );
};

SortButton.props = {
  sortClicked: PropTypes.func.isRequired
};

export default SortButton;
