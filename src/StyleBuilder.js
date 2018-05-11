const styleTableCell = columnDef => {
  return columnDef.hiddenBelow
    ? `d-none d-${columnDef.hiddenBelow}-table-cell`
    : "";
};
export default {
  styleTableHeader: function(columnDef) {
    return styleTableCell(columnDef) + " align-middle";
  },

  styleTableCell: function(columnDef) {
    return styleTableCell(columnDef) + " align-middle";
  }
};
