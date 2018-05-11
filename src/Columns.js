import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import SortButton from "./SortButton";
import StyleBuilder from "./StyleBuilder";
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
  //column will be hidden on breakpoints lower than this
  hiddenBelow: oneOf(["sm", "md", "lg", "xl"]),
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

export const Column = props => {
  this.className = StyleBuilder.styleTableHeader(props.columnDef);
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

  this.className = StyleBuilder.styleTableHeader(props.columnDef);
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
