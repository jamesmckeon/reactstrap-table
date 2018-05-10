import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import SortButton from "SortButton";
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
  headerText: string,
  sortable: bool,
  headerStyle: object,
  clickable: bool
});

export function ColumnDef(fieldName, headerText, sortable, headerStyle) {
  if (!fieldName) {
    throw new Error("fieldName is required");
  }
  this.sortable = sortable || false;
  this.headerText = headerText || "";
  this.headerStyle = headerStyle || {};
  this.fieldName = fieldName;
}

export const Column = props => {
  return (
    <th key={props.ordinal} style={props.columnDef.headerStyle}>
      {props.children}
    </th>
  );
};

export class SortableColumn extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.sortClicked = this.sortClicked.bind(this);
  }

  sortClicked(ascending) {
    this.props.sortClicked(this.props.ordinal, ascending);
  }
  render() {
    return (
      <Column key={this.props.ordinal} columnDef={this.props.columnDef}>
        {this.props.children} <SortButton sortClicked={this.sortClicked} />
      </Column>
    );
  }
}

SortableColumn.propTypes = {
  sortClicked: PropTypes.func.isRequired,
  ordinal: PropTypes.number.isRequired,
  columnDef: ColumnDefType.isRequired
};

Column.propTypes = {
  ordinal: PropTypes.number.isRequired,
  columnDef: ColumnDefType.isRequired,
  onClick: PropTypes.func
};
