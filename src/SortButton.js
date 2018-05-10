import React, { Component } from "react";
import logo from "logo.svg";
import "App.css";
import { ReactstrapTable, ColumnDef } from "fuck";
import TestData from "testData";

const columnDefs = [
  {
    fieldName: "index",
    headerText: "Column 1",
    sortable: true,
    headerStyle: {
      whiteSpace: "nowrap"
    },
    clickable: true
  },
  {
    fieldName: "index_start_at",
    headerText: "Start At",
    sortable: true,
    headerStyle: {
      whiteSpace: "nowrap"
    }
  },
  {
    fieldName: "name",
    //headerText: "Start At",
    sortable: true,
    headerStyle: {
      whiteSpace: "nowrap"
    }
  }
];
class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.cellClicked = this.cellClicked.bind(this);
  }
  cellClicked(fieldName, value) {
    alert(fieldName + ": " + value);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <ReactstrapTable
          data={TestData}
          striped
          columnDefs={columnDefs}
          cellClicked={this.cellClicked}
        />
      </div>
    );
  }
}

export default App;
