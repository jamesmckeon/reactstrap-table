// @flow

import * as React from "react";
import ReactDOM from "react-dom";

import StyleBuilder from "./StyleBuilder";
import SortButtonGroup from "./SortControl";
import {
  default as SortControl,
  type SortClicked as SortButtonClicked
} from "./SortControl";

export type BreakPoints = "sm" | "md" | "lg" | "xl";

export class ColumnDef {
  constructor(
    fieldName: string,
    headerText: ?string,
    sortable: ?boolean,
    headerStyle: ?InlineStyle,
    tooltipText: ?string,
    hiddenBelow: ?BreakPoints,
    clickable: ?boolean
  ) {
    this.FieldName = fieldName;
    this.HeaderText = headerText;
    this.Sortable = sortable || false;
    this.HeaderStyle = headerStyle || null;
    this.HiddenBelow = hiddenBelow || null;
    this.TooltipText = tooltipText || null;
    this.Clickable = clickable || false;
  }
  FieldName: string;
  HeaderText: ?string;
  Sortable: boolean;
  HeaderStyle: ?InlineStyle;
  HiddenBelow: ?BreakPoints;
  TooltipText: ?string;
  Clickable: boolean;
}

export type ColumnProps = {
  columnDef: ColumnDef,
  children?: React.Node,
  ordinal: number
};

export const Column = (props: ColumnProps) => {
  const className = StyleBuilder.StyleTableHeader(props.columnDef);
  return (
    <th style={props.columnDef.HeaderStyle || {}} className={className}>
      {props.children}
    </th>
  );
};

export type SortClicked = (ordinal: number, ascending: boolean) => void;

export type SortableColumnProps = ColumnProps & { sortClicked: SortClicked };

export const SortableColumn = (props: SortableColumnProps) => {
  const sortClicked = (ascending: boolean) => {
    props.sortClicked(props.ordinal, ascending);
  };

  const className = StyleBuilder.StyleTableHeader(props.columnDef);
  return (
    <th style={props.columnDef.HeaderStyle || {}} className={className}>
      {props.children} <SortControl onClick={sortClicked} />
    </th>
  );
};
