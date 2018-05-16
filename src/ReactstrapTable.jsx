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

class TableState {
  constructor(props: TableProps) {
    this.HasData = props && props.data && props.data.length > 0;
    this.TotalPages = this.HasData
      ? props.data.length / props.pagesDisplayed
      : 0;
    this.CurrentPage = this.HasData ? 1 : 0;
    this.SortedData = this.HasData ? props.data : [];
    this.ColumnDefs = TableState.getColumnDefs(props);
  }

  TotalPages: number;
  HasData: boolean;
  CurrentPage: number;
  SortedData: Array<Object>;
  ColumnDefs: Array<ColumnDef>;

  // builds column defs
  static getColumnDefs(props: TableProps): Array<ColumnDef> {
    if (!props || !props.data || props.data.length === 0) {
      return [];
    }
    // no columndefs provided, use first row in data
    const row = props.data[0];

    return Object.keys(row).map((fieldName: string) => {
      // find columnDef based on field name
      const def =
        props.columnDefs &&
        props.columnDefs.find(d => d.FieldName === fieldName);

      // if a column def has been provided for this ordinal, use it
      if (def) {
        return def;
      }
      // otherwise, use fieldname for header text
      return new ColumnDef(fieldName, fieldName);
    });
  }
}

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
    responsive: false,
    pagesDisplayed: 5
  };

  state = new TableState(this.props);

  componentWillReceiveProps = (newProps: TableProps) => {
    const newState = new TableState(newProps);
    this.setState(newState);
  };

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

  getColumnDef(fieldName: string) {
    if (!this.state.ColumnDefs) {
      throw new Error("ColumnDefs are missing");
    }
    return this.state.ColumnDefs.find(def => def.FieldName === fieldName);
  }

  getRowCells(row: UniqueRow) {
    let colId = 1;
    return Object.keys(row).map(fieldName => {
      const def = this.getColumnDef(fieldName);

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
          {row[fieldName].toString()}
        </TableCell>
      );
    });
  }
  getBody() {
    if (!this.state.HasData) {
      return [];
    }
    const start = (this.state.CurrentPage - 1) * this.props.pagesDisplayed;
    const end = start + this.props.pagesDisplayed;

    const body = this.state.SortedData.slice(start, end).map(
      (row: UniqueRow) => <tr key={row.Id}>{this.getRowCells(row)}</tr>
    );
    console.log(body);
    return body;
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