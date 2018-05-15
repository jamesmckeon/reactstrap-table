// @flow

import * as React from "react";

import { UncontrolledTooltip } from "reactstrap";
import { ColumnDef } from "./Columns";
import StyleBuilder from "./StyleBuilder";

const cellClass = hideDown => {
  if (hideDown) {
    return `d-none d-${hideDown}-table-cell`;
  } else {
    return "align-middle";
  }
};

export type CellClicked = (fieldName: string, val: string) => void;
type TableCellProps = {
  onClick?: CellClicked,
  id: string,
  columnDef: ColumnDef,
  children: React.Node
};

export const TableCell = (props: TableCellProps) => {
  const CellClicked = (e: any) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(
        e.currentTarget.attributes["data-fieldname"].value,
        e.target.text
      );
    }
  };

  return props.columnDef.Clickable ? (
    <td className={StyleBuilder.StyleTableCell(props.columnDef)}>
      <a
        data-fieldname={props.columnDef.FieldName}
        href=""
        onClick={CellClicked}
        id={props.id}
      >
        {props.children}
      </a>
      {props.columnDef.TooltipText && (
        <UncontrolledTooltip target={props.id} placement="top">
          {props.columnDef.TooltipText}
        </UncontrolledTooltip>
      )}
    </td>
  ) : (
    <td id={props.id}>{props.children}</td>
  );
};
