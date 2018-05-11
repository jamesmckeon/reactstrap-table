import React from "react";
import PropTypes from "prop-types";
import Pager from "reactstrap-pager";
import { Table } from "reactstrap";
import { Column, SortableColumn, ColumnDef, ColumnDefType } from "./Columns";
import TableCell from "./TableCell";
import { orderBy } from "lodash";
import moment from "moment";

const CenteredText = props => {
  return (
    <div className="text-center font-italic">
      <hr /> <h5>{props.text}</h5>
      <hr />
    </div>
  );
};

export default class ReactstrapTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.getBody = this.getBody.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.hasData = this.hasData.bind(this);
    this.totalPages = this.totalPages.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.sortClicked = this.sortClicked.bind(this);
    this.getColumnDef = this.getColumnDef.bind(this);
    this.getSortComparer = this.getSortComparer.bind(this);

    this.state = {
      HasData: this.hasData(),
      TotalPages: this.totalPages(),
      CurrentPage: 1,
      SortedData: this.props.data,
      ColumnDefs: this.getColumnDefs(this.props.data)
    };
  }

  totalPages() {
    if (this.props.data) {
      return this.props.data.length / this.props.pagesDisplayed;
    } else {
      return 0;
    }
  }
  pageChanged(pageNum) {
    this.setState({ CurrentPage: pageNum });
  }

  componentWillReceiveProps(newProps) {
    this.setState({ ColumnDefs: this.getColumnDefs(newProps.Data) });
  }

  getSortComparer(fieldName, val) {
    //https://stackoverflow.com/a/9716488/1342632
    const isNumber = !isNaN(parseFloat(val)) && isFinite(val);

    //number check has to preceed date check, as JS will convert numbers to dates
    if (isNumber) {
      return (a, b) => {
        return parseFloat(a[fieldName]) - parseFloat(b[fieldName]);
      };
    } else if (new moment(val).isValid()) {
      return (a, b) => {
        const momentA = new moment(a[fieldName]);
        const momentB = new moment(b[fieldName]);
        return momentA - momentB;
      };
    } else {
      return (a, b) => {
        // tried "return a[fieldName] - b[fieldName];", but got random results
        const valA = a[fieldName];
        const valB = b[fieldName];

        if (valA < valB) {
          return -1;
        } else if (valA > valB) {
          return 1;
        } else {
          return 0;
        }
      };
    }
  }
  sortClicked(ordinal, sortAscending) {
    const data = this.state.SortedData;
    //get field
    const row = data[0];
    const key = Object.keys(row)[ordinal];
    const val = row[key];

    const comparer = this.getSortComparer(key, val);

    sortAscending ? data.sort(comparer) : data.reverse(comparer);

    this.setState({
      SortedData: data
    });
  }

  getColumnDef(fieldName) {
    return this.state.ColumnDefs.find(def => {
      return def.fieldName === fieldName;
    });
  }
  //builds column defs
  getColumnDefs(data) {
    if (!data || data.length === 0) {
      return [];
    }
    //no columndefs provided, use first row in data
    const row = data[0];

    return Object.keys(row).map((r, i) => {
      //find columnDef based on field name
      const def =
        this.props.columnDefs &&
        this.props.columnDefs.find(d => {
          return d.fieldName === r;
        });

      //if a column def has been provided for this ordinal, use it
      if (def) {
        return def;
      } else {
        return new ColumnDef(r, r);
      }
    });
  }

  getHeaders() {
    return (
      <tr>
        {this.state.ColumnDefs.map((c, i) => {
          if (c.sortable) {
            return (
              <SortableColumn
                key={i}
                ordinal={i}
                columnDef={c}
                sortClicked={this.sortClicked}
              >
                {c.headerText}
              </SortableColumn>
            );
          } else {
            return (
              <Column key={i} ordinal={i} columnDef={c}>
                {c.headerText}
              </Column>
            );
          }
        })}
      </tr>
    );
  }

  getBody() {
    if (!this.state.HasData) {
      return [];
    }
    const start = (this.state.CurrentPage - 1) * this.props.pagesDisplayed;
    const end = start + this.props.pagesDisplayed;
    return this.state.SortedData.slice(start, end).map((row, i) => {
      return (
        <tr key={i}>
          {Object.keys(row).map((key, j) => {
            const def = this.getColumnDef(key);

            return (
              <TableCell
                id={`r${i}c${j}`}
                key={j}
                onClick={this.props.cellClicked}
                columnDef={def}
              >
                {row[key].toString()}
              </TableCell>
            );
          })}
        </tr>
      );
    });
  }

  hasData() {
    return this.props.data ? this.props.data.length > 0 : false;
  }

  render() {
    if (this.props.hidden) {
      return null;
    }
    return this.state.HasData ? (
      <div>
        <Table
          tag={this.props.tag}
          size={this.props.size}
          bordered={this.props.bordered}
          borderless={this.props.borderless}
          striped={this.props.striped}
          dark={this.props.dark}
          hover={this.props.hover}
          responsive={this.props.responsive}
        >
          <thead>{this.getHeaders()}</thead>
          <tbody>{this.getBody()}</tbody>
        </Table>
        <Pager
          {...this.props}
          totalPages={this.state.TotalPages}
          pageChanged={this.pageChanged}
        />
      </div>
    ) : (
      <CenteredText text={"No records"} />
    );
  }
}

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
  responsive: PropTypes.bool,
  columnDefs: PropTypes.arrayOf(ColumnDefType),
  //valid JSON
  data: PropTypes.array,
  cellClicked: PropTypes.func
};

ReactstrapTable.defaultProps = {
  pagesDisplayed: 5
};
