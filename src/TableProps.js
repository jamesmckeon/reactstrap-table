// @flow

import PagingOptions from "PagingOptions";
import { type ColumnDef } from "ColumnDef";
import SortOptions from "SortOptions";
import { type CellClicked } from "TableCell";

export default class TableProps {
  /**
   *
   *
   * @type {?PagingOptions}
   */
  pagingOptions: ?PagingOptions;
  /**
   * Specified the default sort field for a table
   *
   * @type {?SortOptions}
   */
  initialSortField: ?SortOptions;
  /**
   * A collection of field specifications
   *
   * @type {Array<ColumnDef>}
   */
  columnDefs: Array<ColumnDef>;
  /**
   * Called when a cell is clicked
   *
   * @type {CellClicked}
   */
  cellClicked: CellClicked;
  /**
   * The table data (a valid JSON array)
   *
   * @type {Array<Object>}
   */
  data: Array<Object>;

  hidden: ?boolean;
  tag: string | number;
  bordered: ?boolean;
  borderless: ?boolean;
  striped: ?boolean;
  dark: ?boolean;
  hover: ?boolean;
  responsive: ?boolean;
  size: ?string;
}
