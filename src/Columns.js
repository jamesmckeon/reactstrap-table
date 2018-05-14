// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import SortButton from "./SortButton";
import StyleBuilder from "./StyleBuilder";
import SortButtonGroup from "./SortButtonGroup";

export type BreakPoints = "sm" | "md" | "lg" | "xl";

export class ColumnDef {
  constructor(
    fieldName: string,
    headerText: ?string,
    sortable: ?boolean,
    headerStyle: ?string,
    tooltipText: ?string,
    hiddenBelow: ?BreakPoints
  ) {
    this.FieldName = fieldName;
    this.HeaderText = headerText;
    this.Sortable = sortable || false;
  }
  FieldName: string;
  HeaderText: ?string;
  Sortable: boolean;
  HeaderStyle: ?InlineStyle;
}

export type ColumnProps = {
  columnDef: ColumnDef,
  children?: React.Node
};

export const Column = (props: ColumnProps) => {
  const className = StyleBuilder.styleTableHeader(props.columnDef);
  return (
    <th style={props.columnDef.HeaderStyle || {}} className={className}>
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
