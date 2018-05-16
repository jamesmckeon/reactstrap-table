// @flow
import { type ColumnDef } from "./Columns";

export default class StyleBuilder {
  static StyleTableCell = (columnDef: ColumnDef) =>
    columnDef.HiddenBelow ? `d-none d-${columnDef.HiddenBelow}-table-cell` : "";

  static StyleTableHeader = (columnDef: ColumnDef) =>
    `${StyleBuilder.StyleTableCell(columnDef)} align-middle`;
}
