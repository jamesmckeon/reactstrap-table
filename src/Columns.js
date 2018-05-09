import React from "react";
import ReactDOM from "react-dom";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import UpIcon from "@fortawesome/fontawesome-free-solid/faChevronUp";
import DownIcon from "@fortawesome/fontawesome-free-solid/faChevronDown";
import PropTypes from "prop-types";
import {
  shape,
  number,
  string,
  oneOf,
  bool,
  object,
  isRequired
} from "prop-types";

export const ColumnDefType = shape({
  fieldName: string.isRequired,
  headerText: number,
  sortable: bool,
  headerStyle: object
});

export function ColumnDef(fieldName, headerText, sortable, headerStyle) {
  if (!fieldName) {
    throw new Error("fieldName is required");
  }
  this.sortable = sortable || false;
  this.headerText = headerText || "";
  this.headerStyle = headerStyle || {};
}

export const Column = props => {
  return (
    <th
      key={props.ordinal}
      style={props.columnDef.headerStyle}
      onClick={props.onClick}
    >
      {props.children}
    </th>
  );
};

export class SortableColumn extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { Asc: true };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.sortToggled(this.props.ordinal, this.state.Asc);
    this.setState({ Asc: !this.state.Asc });
  }
  render() {
    return (
      <Column
        key={this.props.ordinal}
        columnDef={this.props.columnDef}
        onClick={this.onClick}
      >
        {this.props.children}{" "}
        <FontAwesomeIcon icon={this.state.Asc ? UpIcon : DownIcon} />
      </Column>
    );
  }
}

SortableColumn.propTypes = {
  sortToggled: PropTypes.func.isRequired,
  ordinal: PropTypes.number.isRequired,
  columnDef: ColumnDefType.isRequired
};

Column.propTypes = {
  ordinal: PropTypes.number.isRequired,
  columnDef: ColumnDefType.isRequired,
  onClick: PropTypes.func
};
