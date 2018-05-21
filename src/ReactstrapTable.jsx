// @flow

import * as React from "react";
import Sorter from "Sorter";
import Pager from "reactstrap-pager";
import { Table } from "reactstrap";
import Column, { SortableColumn } from "Columns";
import { type ColumnDef } from "ColumnDef";
import TableCell from "TableCell";
import TableProps from "TableProps";

const CenteredText = (props: { children: React.Node }) => (
  <div className="text-center font-italic">
    <hr /> <h5>{props.children}</h5>
    <hr />
  </div>
);

type TableState = {
  ShowPager: boolean,
  TotalPages: number,
  HasData: boolean,
  CurrentPage: number,
  SortedData: Array<Object>,
  ColumnDefs: Array<ColumnDef>
};

type UniqueRow = {
  reactKey: number
};

/**
 * Validates that data contains fieldName
 * 
 * @param {Array<Object>} data 
 * @param {string} fieldName 
 * @returns true if the first element in data has a field matching fieldName
 */
const checkField = (data: Array<Object>, fieldName: string) =>{
  if (!data || data.length < 1){
    throw new Error('data is empty');
  }

  if (!fieldName){
    throw new Error('fieldName is empty')
  }

  const row = data[0];
  return Object.keys(row).some(k => k === fieldName);
}

const buildState = (props: TableProps): TableState => {

  const getColumnDefs = (): Array<ColumnDef> => {
    if (!props || !props.data || props.data.length === 0) {
      return [];
    }
    // no columndefs provided, use first row in data
    const row = props.data[0];

    // iterate over each column in row except for reactKey
    return  Object.keys(row)
      .filter(f => f !== "reactKey")
      .map((fieldName: string) => {

        // find columnDef based on field name
        const def =
          props.columnDefs ?
          props.columnDefs.find((d: ColumnDef) => d.fieldName === fieldName): null;

        // if a column def has been provided for this ordinal, use it
        if (def) {
          return def;
        }
        // otherwise, use fieldname for header text
        return { fieldName, headerText: fieldName };
      });


  };

  const formatData = (data: Array<Object>): Array<UniqueRow> => {
    if (data && data.length > 0) {
      let id = 1;
      const ret = data.map((r: Object) => {
        const newRow = r;
        newRow.reactKey = id;
        id += 1;
        return newRow;
      });

      return ret;
    }
    return data;
  };

  const state = {};
  state.HasData = props.data ? props.data.length > 0 : false;

  state.TotalPages = state.HasData ? 1 : 0;
  if (props.pagingOptions && props.data) {
    state.TotalPages = props.pagingOptions.getTotalPages(props.data.length);
  }
  state.CurrentPage = state.HasData ? 1 : 0;

  let sortedData = props.data;

  if (sortedData && props.initialSort){
    if (!checkField(sortedData, props.initialSort.FieldName)) { 
      throw new Error('field "' + props.initialSort.FieldName + '" not found in data');

   }
   sortedData = Sorter.Sort(sortedData, props.initialSort.FieldName, props.initialSort.Ascending);
   }


  state.SortedData = sortedData ? formatData(sortedData) : [];
  state.ColumnDefs = getColumnDefs();
  state.ShowPager = state.TotalPages != null && state.TotalPages > 1;

  return state;
};

/**
 * A React component that renders an HTML table with optional paging and sorting using reactstrap
 *
 * @export
 * @class ReactstrapTable
 * @extends {React.Component<TableProps, TableState>}
 */
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

  state = buildState(this.props);

  componentWillReceiveProps = (newProps: TableProps) => {
    const newState = buildState(newProps);
    this.setState(newState);
  };

  getHeaders = () => {
    if (!this.state.ColumnDefs) {
      throw new Error("ColumnDefs are missing");
    }

    return (
      <tr>
        {this.state.ColumnDefs.map((c: ColumnDef, i) => {
          if (c.sortable) {
            return (
              <SortableColumn
                key={c.fieldName}
                ordinal={i}
                columnDef={c}
                sortClicked={this.sortClicked}
              >
                {c.headerText}
              </SortableColumn>
            );
          }
          return (
            <Column key={c.fieldName} ordinal={i} columnDef={c}>
              {c.headerText}
            </Column>
          );
        })}
      </tr>
    );
  };

  getColumnDef = (fieldName: string) => {
    if (!this.state.ColumnDefs) {
      throw new Error("ColumnDefs are missing");
    }
    return this.state.ColumnDefs.find(def => def.fieldName === fieldName);
  };

  getRowCells = (row: UniqueRow) => {
    let colId = 1;
    // iterate over each column in row except for reactKey
    return Object.keys(row)
      .filter(f => f !== "reactKey")
      .map(fieldName => {
        const def = this.getColumnDef(fieldName);

        if (!def) {
          throw new Error("missing columnDef");
        }
        colId += 1;

        return (
          <TableCell
            id={`r${row.reactKey}c${colId}`}
            key={colId}
            onClick={this.props.cellClicked}
            columnDef={def}
          >
            {row[fieldName].toString()}
          </TableCell>
        );
      });
  };
  getBody = () => {
    if (!this.state.HasData) {
      return [];
    }

    let data = this.state.SortedData;

    if (this.props.pagingOptions) {
      const start =
        (this.state.CurrentPage - 1) * this.props.pagingOptions.PagesDisplayed;
      const end = start + this.props.pagingOptions.PagesDisplayed;
      data = data.slice(start, end);
    }

    const body = data.map((row: UniqueRow) => (
      <tr key={row.reactKey}>{this.getRowCells(row)}</tr>
    ));

    return body;
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

  render = () => {
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
        {this.state.ShowPager && (
          <Pager
            {...this.props}
            totalPages={this.state.TotalPages}
            pageChanged={this.pageChanged}
          />
        )}
      </div>
    ) : (
      <CenteredText>No records</CenteredText>
    );
  };
}
