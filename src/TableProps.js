// @flow

import PagingOptions from "PagingOptions";
import { type ColumnDef } from "ColumnDef";
import SortOptions from "SortOptions";
import { type CellClicked } from "TableCell";
/**
 * Props for the ReactstrapTable component
 *
 * @export
 * @class TableProps
 */
export default class TableProps {
  /**
   * Options for the Pager component.  If not provided, paging is diabled (i.e., the Pager is not displayed)
   *
   * @type {?PagingOptions}
   */
  pagingOptions: ?PagingOptions;
  /**
   * Table data will be sorted as specified by this setting when rendered (if provided)
   *
   * @type {?SortOptions}
   */
  initialSort: ?SortOptions;
  /**
   * A collection of field specifications
   *
   * @type {Array<ColumnDef>}
   */
  columnDefs: ?Array<ColumnDef>;
  /**
   * Called when a cell is clicked
   *
   * @type {CellClicked}
   */
  cellClicked: ?CellClicked;
  /**
   * The table data (a valid JSON array)
   *
   * @type {Array<Object>}
   */
  data: ?Array<Object>;

  hidden: ?boolean;
  tag: ?string | ?number;
  bordered: ?boolean;
  borderless: ?boolean;
  striped: ?boolean;
  dark: ?boolean;
  hover: ?boolean;
  responsive: ?boolean;
  size: ?string;
}
