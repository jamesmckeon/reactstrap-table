// @flow

import * as React from "react";
import StyleBuilder from "StyleBuilder";
import SortControl from "SortControl";
import type ColumnDef from "ColumnDef";

export type ColumnProps = {
  columnDef: ColumnDef,
  children?: React.Node
};

const Column = (props: ColumnProps) => {
  const className = StyleBuilder.StyleTableHeader(props.columnDef);
  return (
    <th style={props.columnDef.HeaderStyle || {}} className={className}>
      {props.children}
    </th>
  );
};

Column.defaultProps = {
  children: null
};

export default Column;

export type SortClicked = (fieldName: string, ascending: boolean) => void;

export type SortableColumnProps = ColumnProps & { sortClicked: SortClicked };

export const SortableColumn = (props: SortableColumnProps) => {
  const sortClicked = (ascending: boolean) => {
    props.sortClicked(props.columnDef.FieldName, ascending);
  };

  const className = StyleBuilder.StyleTableHeader(props.columnDef);
  return (
    <th style={props.columnDef.HeaderStyle || {}} className={className}>
      {props.children} <SortControl onClick={sortClicked} />
    </th>
  );
};
