import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import SortButton from "./SortButton";
import SortButtonGroup from "./SortButtonGroup";
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
  clickable: bool,
  hiddenDown: oneOf(["xs", "sm", "md", "lg", "xl"]),
  tooltipText: string
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

const headerClass = hideDown => {
  if (hideDown) {
    return `d-none d-${hideDown}-table-cell align-middle`;
  } else {
    return "align-middle";
  }
};
export const Column = props => {
  this.className = headerClass(props.columnDef.hiddenDown);
  return (
    <th style={props.columnDef.headerStyle} className={this.className}>
      {props.children}
    </th>
  );
};

export const SortableColumn = props => {
  this.sortClicked = ascending => {
    props.sortClicked(props.ordinal, ascending);
  };

  this.className = headerClass(props.columnDef.hiddenDown);
  return (
    <th style={props.columnDef.headerStyle} className={this.className}>
      {props.children} <SortButtonGroup sortClicked={this.sortClicked} />
    </th>
  );
};

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
