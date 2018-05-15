// @flow
import { ColumnDef } from "./Columns";

export default class StyleBuilder {
  static StyleTableCell = (columnDef: ColumnDef) => {
    return columnDef.HiddenBelow
      ? `d-none d-${columnDef.HiddenBelow}-table-cell`
      : "";
  };

  static StyleTableHeader = (columnDef: ColumnDef) => {
    return this.StyleTableCell(columnDef) + " align-middle";
  };
}
