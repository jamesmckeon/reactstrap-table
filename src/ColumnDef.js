// @flow

type BreakPoints = "sm" | "md" | "lg" | "xl";

export default class ColumnDef {
  constructor(
    fieldName: string,
    headerText: ?string,
    sortable: ?boolean,
    headerStyle: ?InlineStyle,
    tooltipText: ?string,
    hiddenBelow: ?BreakPoints,
    clickable: ?boolean
  ) {
    this.FieldName = fieldName;
    this.HeaderText = headerText;
    this.Sortable = sortable || false;
    this.HeaderStyle = headerStyle || null;
    this.HiddenBelow = hiddenBelow || null;
    this.TooltipText = tooltipText || null;
    this.Clickable = clickable || false;
  }
  FieldName: string;
  HeaderText: ?string;
  Sortable: boolean;
  HeaderStyle: ?InlineStyle;
  HiddenBelow: ?BreakPoints;
  TooltipText: ?string;
  Clickable: boolean;
}
