import React from "react";
import PropTypes from "prop-types";
import Pager from "reactstrap-pager";
import { Table } from "reactstrap";
import { Column, SortableColumn, ColumnDef, ColumnDefType } from "./Columns";
import { orderBy } from "lodash";

export { ColumnDefType };

const CenteredText = props => {
  return (
    <div className="text-center font-italic">
      <hr /> <h5>{props.text}</h5>
      <hr />
    </div>
  );
};

export class ReactstrapTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.getColumns = this.getColumns.bind(this);
    this.getBody = this.getBody.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.hasData = this.hasData.bind(this);
    this.totalPages = this.totalPages.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.sortClicked = this.sortClicked.bind(this);
    this.state = {
      HasData: this.hasData(),
      TotalPages: this.totalPages(),
      CurrentPage: 1,
      SortedData: this.props.data
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

  sortClicked(ordinal, sortAscending) {
    const data = this.state.SortedData;
    //get field
    const row = data[0];
    const key = Object.keys(row)[ordinal];

    orderBy(data, [key], [sortAscending ? "asc" : "desc"]);

    this.setState({
      SortedData: orderBy(data, [key], [sortAscending ? "asc" : "desc"])
    });
  }
  //builds column defs
  getColumns() {
    if (!this.state.HasData) {
      return [];
    }
    //no columndefs provided, use first row in data
    const row = this.props.data[0];

    return Object.keys(row).map((r, i) => {
      //if a column def has been provided for this ordinal, use it
      if (this.props.columnDefs && this.props.columnDefs[i]) {
        return this.props.columnDefs[i];
      } else {
        return new ColumnDef(r, r);
      }
    });
  }

  getHeaders() {
    return (
      <tr>
        {this.getColumns().map((c, i) => {
          if (c.sortable) {
            return (
              <SortableColumn
                ordinal={i}
                columnDef={c}
                sortToggled={this.sortClicked}
              >
                {c.headerText}
              </SortableColumn>
            );
          } else {
            return (
              <Column ordinal={i} columnDef={c}>
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
          {Object.keys(row).map(key => {
            return <td>{row[key].toString()}</td>;
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
        <Table {...this.props}>
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
  columnDefs: PropTypes.arrayOf(ColumnDefType)
};

ReactstrapTable.defaultProps = {
  pagesDisplayed: 5
};
