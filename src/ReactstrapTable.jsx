// @flow

import * as React from "react";
import Sorter from "Sorter";
import Pager from "reactstrap-pager";
import { Table } from "reactstrap";
import Column, { SortableColumn, ColumnDef } from "Columns";
import TableCell, { type CellClicked } from "TableCell";

const CenteredText = (props: { children: React.Node }) => (
  <div className="text-center font-italic">
    <hr /> <h5>{props.children}</h5>
    <hr />
  </div>
);

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
  Data: Array<Object>,
  size: string
};

type TableState = {
  TotalPages: number,
  HasData: boolean,
  CurrentPage: number,
  SortedData: Array<Object>,
  ColumnDefs: Array<ColumnDef>
};

type UniqueRow = {
  Id: number
};

export default class ReactstrapTable extends React.Component<
  TableProps,
  TableState
> {
  static defaultProps = {
    bordered: false,
    borderless: false,
    striped: false,
    dark: false,
    hover: false,
    responsive: false
  };

  // if dataset doesn't have an id property, add one for React element key mapping

  state = {
    HasData: this.hasData(),
    TotalPages: this.totalPages(),
    CurrentPage: 1,
    SortedData: this.formatData(this.props.data),
    ColumnDefs: this.getColumnDefs(this.props.data)
  };

  componentWillReceiveProps = (newProps: TableProps) => {
    this.setState({ ColumnDefs: this.getColumnDefs(newProps.Data) });
  };

  getColumnDef(fieldName: string) {
    if (!this.state.ColumnDefs) {
      throw new Error("ColumnDefs are missing");
    }
    return this.state.ColumnDefs.find(def => def.FieldName === fieldName);
  }
  // builds column defs
  getColumnDefs(data: Array<Object>) {
    if (!data || data.length === 0) {
      return [];
    }
    // no columndefs provided, use first row in data
    const row = data[0];

    return (
      Object.keys(row).map <
      Object >
      (fieldName => {
        // find columnDef based on field name
        const def =
          this.props.columnDefs &&
          this.props.columnDefs.find(d => d.FieldName === fieldName);

        // if a column def has been provided for this ordinal, use it
        if (def) {
          return def;
        }
        // otherwise, use fieldname for header text
        return new ColumnDef(fieldName, fieldName);
      })
    );
  }

  getHeaders() {
    if (!this.state.ColumnDefs) {
      throw new Error("ColumnDefs are missing");
    }
    return (
      <tr>
        {this.state.ColumnDefs.map((c, i) => {
          if (c.Sortable) {
            return (
              <SortableColumn
                key={c.FieldName}
                ordinal={i}
                columnDef={c}
                sortClicked={this.sortClicked}
              >
                {c.HeaderText}
              </SortableColumn>
            );
          }
          return (
            <Column key={c.FieldName} ordinal={i} columnDef={c}>
              {c.HeaderText}
            </Column>
          );
        })}
      </tr>
    );
  }

  getBody() {
    if (!this.state.SortedData) {
      return [];
    }
    const start = (this.state.CurrentPage - 1) * this.props.pagesDisplayed;
    const end = start + this.props.pagesDisplayed;
    let colId = 0;
    return this.state.SortedData.slice(start, end).map((row: UniqueRow) => (
      <tr key={row.Id}>
        {Object.keys(row).map(key => {
          const def = this.getColumnDef(key);

          if (!def) {
            throw new Error("missing columnDef");
          }
          colId += 1;
          return (
            <TableCell
              id={`r${row.Id}c${colId}`}
              key={colId}
              onClick={this.props.cellClicked}
              columnDef={def}
            >
              {row[key].toString()}
            </TableCell>
          );
        })}
      </tr>
    ));
  }
  /**
   *
   *Adds Id field to data
   * @param {Array<Object>} data
   * @returns {Array<UniqueRow>}
   */
  formatData = (data: Array<Object>): Array<UniqueRow> => {
    if (data && data.length > 0) {
      if (!data[0].id) {
        let id = 1;
        return data.map((r: Object) => {
          const newRow = r;
          newRow.id = id;
          id += 1;
          return newRow;
        });
      }
    }
    return data;
  };

  sortClicked = (fieldName: string, sortAscending: boolean) => {
    if (!this.state.SortedData) {
      throw new Error("no data to sort");
    }
    const data = this.state.SortedData;

    const sortedData = Sorter.Sort(data, fieldName, sortAscending);
    this.setState({
      SortedData: sortedData
    });
  };

  pageChanged = (pageNum: number) => {
    this.setState({ CurrentPage: pageNum });
  };
  totalPages = () => {
    if (this.props.data) {
      return this.props.data.length / this.props.pagesDisplayed;
    }
    return 0;
  };
  hasData = () => (this.props.data ? this.props.data.length > 0 : false);

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
