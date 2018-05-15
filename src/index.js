// @flow

import * as React from "react";
import PropTypes from "prop-types";
import Pager from "reactstrap-pager";
import { Table } from "reactstrap";
import { Column, SortableColumn, ColumnDef } from "./Columns";
import TableCell from "./TableCell";
import moment from "moment";
import { Sorter } from "./Sorter";

const CenteredText = (props: { children: React.Node }) => {
  return (
    <div className="text-center font-italic">
      <hr /> <h5>{props.children}</h5>
      <hr />
    </div>
  );
};

export type TableProps = {
  pagesDisplayed: number,
  columnDefs: Array<ColumnDef>,
  cellClicked: CellClicked,
  data: Array<Object>,
  hidden: boolean,
  tag: string | number,
  bordered?: boolean,
  borderless?: boolean,
  striped?: boolean,
  dark?: boolean,
  hover?: boolean,
  responsive?: boolean,
  Data: Array<Object>
};

class TableState {
  constructor(
    hasData: boolean = false,
    totalPages: number = 0,
    currentPage: number = 0,
    sortedData?: Array<Object>,
    columnDefs?: Array<ColumnDef>
  ) {
    this.TotalPages = totalPages;
    this.HasData = hasData;
    this.CurrentPage = currentPage;
    this.SortedData = sortedData;
    this.ColumnDefs = columnDefs;
  }
  TotalPages: number;
  HasData: boolean;
  CurrentPage: number;

  SortedData: ?Array<Object>;
  ColumnDefs: ?Array<ColumnDef>;
}

export type CellClicked = (fieldName: string, ascending: boolean) => void;

export default class ReactstrapTable extends React.Component<
  TableProps,
  TableState
> {
  state = new TableState();

  /*   {
    HasData: this.hasData(),
    TotalPages: this.totalPages(),
    CurrentPage: 1,
    SortedData: this.props.data,
    ColumnDefs: this.getColumnDefs(this.props.data)
  }; */

  totalPages = () => {
    if (this.props.data) {
      return this.props.data.length / this.props.pagesDisplayed;
    } else {
      return 0;
    }
  };
  pageChanged = (pageNum: number) => {
    this.setState({ CurrentPage: pageNum });
  };

  componentWillReceiveProps = (newProps: TableProps) => {
    this.setState({ ColumnDefs: this.getColumnDefs(newProps.Data) });
  };

  sortClicked = (ordinal: number, sortAscending: boolean) => {
    const data = this.state.SortedData;
    const row = data[0];
    const fieldName = Object.keys(row)[ordinal];
    const sortedData = Sorter.Sort(data, fieldName, sortAscending);
    this.setState({
      SortedData: sortedData
    });
  };

  getColumnDef(fieldName: string) {
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
      <CenteredText>No records</CenteredText>
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
