# reactstrap-table
``` javascript
ReactstrapTable.propTypes = {
  hidden: PropTypes.bool,
  pagesDisplayed: PropTypes.number,
  columnDefs: PropTypes.arrayOf(ColumnDefType),
  cellClicked: PropTypes.func,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  size: PropTypes.string,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  striped: PropTypes.bool,
  dark: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool
};

ReactstrapTable.defaultProps = {
  pagesDisplayed: 5
};

 const ColumnDefType = shape({
  fieldName: string.isRequired,
  headerText: string,
  sortable: bool,
  headerStyle: object,
  clickable: bool,
  hiddenDown: oneOf(["xs", "sm", "md", "lg", "xl"])
});

```
