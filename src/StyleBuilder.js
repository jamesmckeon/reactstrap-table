// @flow
import { type ColumnDef } from "ColumnDef";

export default class StyleBuilder {
  static StyleTableCell = (columnDef: ColumnDef) =>
    columnDef.hiddenBelow ? `d-none d-${columnDef.hiddenBelow}-table-cell` : "";

  static StyleTableHeader = (columnDef: ColumnDef) =>
    `${StyleBuilder.StyleTableCell(columnDef)} align-middle`;
}
