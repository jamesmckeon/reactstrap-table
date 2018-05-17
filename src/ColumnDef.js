// @flow

type BreakPoints = "sm" | "md" | "lg" | "xl";

export type ColumnDef = {
  fieldName: string,
  headerText?: string,
  sortable?: boolean,
  headerStyle?: InlineStyle,
  tooltipText?: string,
  hiddenBelow?: BreakPoints,
  clickable?: boolean
};
