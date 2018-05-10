import React from "react";
import PropTypes from "prop-types";
import Pager from "reactstrap-pager";
import { Table } from "reactstrap";
import { Column, SortableColumn, ColumnDef, ColumnDefType } from "Columns";
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

    this.getBody = this.getBody.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.hasData = this.hasData.bind(this);
    this.totalPages = this.totalPages.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.sortClicked = this.sortClicked.bind(this);
    this.getColumnDef = this.getColumnDef.bind(this);
    this.cellClicked = this.cellClicked.bind(this);
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
                ordinal={i}
                columnDef={c}
                sortClicked={this.sortClicked}
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

  cellClicked(e) {
    e.preventDefault();
    if (this.props.cellClicked) {
      this.props.cellClicked(
        e.currentTarget.attributes["data-fieldname"].value,
        e.target.text
      );
    }
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
            const def = this.getColumnDef(key);

            return def.clickable ? (
              <td>
                <a
                  data-fieldname={def.fieldName}
                  href=""
                  onClick={this.cellClicked}
                >
                  {row[key].toString()}
                </a>
              </td>
            ) : (
              <td>{row[key].toString()}</td>
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
  columnDefs: PropTypes.arrayOf(ColumnDefType),
  cellClicked: PropTypes.func
};

ReactstrapTable.defaultProps = {
  pagesDisplayed: 5
};
