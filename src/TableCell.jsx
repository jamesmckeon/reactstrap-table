// @flow

import * as React from "react";

import { UncontrolledTooltip, Button } from "reactstrap";
import { type ColumnDef } from "ColumnDef";
import StyleBuilder from "StyleBuilder";

export type CellClicked = (fieldName: string, val: string) => void;
type TableCellProps = {
  onClick?: CellClicked,
  id: string,
  columnDef: ColumnDef,
  children: React.Node
};

const TableCell = (props: TableCellProps) => {
  const onCellClicked = (e: any) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(
        e.currentTarget.attributes["data-fieldname"].value,
        e.target.text
      );
    }
  };

  return props.columnDef.clickable ? (
    <td className={StyleBuilder.StyleTableCell(props.columnDef)}>
      <Button
        color="link"
        data-fieldname={props.columnDef.fieldName}
        href=""
        onClick={onCellClicked}
        id={props.id}
      >
        {props.children}
      </Button>
      {props.columnDef.tooltipText && (
        <UncontrolledTooltip target={props.id} placement="top">
          {props.columnDef.tooltipText}
        </UncontrolledTooltip>
      )}
    </td>
  ) : (
    <td id={props.id}>{props.children}</td>
  );
};

TableCell.defaultProps = {
  onClick: null
};

export default TableCell;
