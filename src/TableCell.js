import React from "react";
import PropTypes from "prop-types";
import { UncontrolledTooltip } from "reactstrap";
import { ColumnDefType } from "./Columns";
import StyleBuilder from "./StyleBuilder";

const cellClass = hideDown => {
  if (hideDown) {
    return `d-none d-${hideDown}-table-cell`;
  } else {
    return "align-middle";
  }
};

const TableCell = props => {
  this.cellClicked = e => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(
        e.currentTarget.attributes["data-fieldname"].value,
        e.target.text
      );
    }
  };

  return props.columnDef.clickable ? (
    <td className={StyleBuilder.styleTableCell(props.columnDef)}>
      <a
        data-fieldname={props.columnDef.fieldName}
        href=""
        onClick={this.cellClicked}
        id={props.id}
      >
        {props.children}
      </a>
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

TableCell.propTypes = {
  columnDef: PropTypes.shape(ColumnDefType).isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired
};

export default TableCell;
