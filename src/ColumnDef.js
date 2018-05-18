// @flow

type BreakPoints = "sm" | "md" | "lg" | "xl";

export type ColumnDef = {
  /**
   * The name of a field.  Case sensitive.
   *
   * @type {string}
   */
  fieldName: string,
  /**
   * The header text for a column (optional).  If not provided, column header wil be empty
   *
   * @type {string}
   */
  headerText?: string,
  /**
   * If true, a sort glyph/control will be displayed in the column header
   *
   * @type {boolean}
   */
  sortable?: boolean,

  /**
   * A valid React style object that will be applied to the column header cell
   *
   * @type {InlineStyle}
   */
  headerStyle?: InlineStyle,
  /**
   * The tooltip that should be displayed in each table cell for a column
   *
   * @type {string}
   */
  tooltipText?: string,
  /**
   * Specifies the bootstrap breakpoint under which a column should be hidden
   *
   * @type {BreakPoints}
   */
  hiddenBelow?: BreakPoints,

  /**
   * Specifies whether the cellClicked method/event should be raised on the parent Table when a cell in this column is clicked
   *
   * @type {boolean}
   */
  clickable?: boolean
};
