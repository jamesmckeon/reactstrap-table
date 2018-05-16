// @flow

import React from "react";

import { ButtonGroup, Button } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import UpIcon from "@fortawesome/fontawesome-free-solid/faAngleUp";
import DownIcon from "@fortawesome/fontawesome-free-solid/faAngleDown";
import "./index.css";

const iconSize = "shrink-3";

export type SortClicked = (ascending: boolean) => void;
export type SortControlProps = {
  onClick: SortClicked
};

const SortControl = (props: SortControlProps) => {
  const upClicked = () => {
    props.onClick(true);
  };
  const downClicked = () => {
    props.onClick(false);
  };
  return (
    <ButtonGroup
      vertical
      size="sm"
      style={{ marginLeft: ".5em" }}
      className="float-right"
    >
      <Button outline onClick={upClicked}>
        <FontAwesomeIcon
          icon={UpIcon}
          transform={iconSize}
          // className="sort-icon"
        />
      </Button>
      <Button outline onClick={downClicked}>
        <FontAwesomeIcon
          icon={DownIcon}
          transform={iconSize}
          // className="sort-icon"
        />
      </Button>
    </ButtonGroup>
  );
};

export default SortControl;
