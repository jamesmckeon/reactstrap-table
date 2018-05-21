// @flow

// import { assert } from "chai";
import ReactstrapTable from "ReactstrapTable";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";
// import sinon from "sinon";

configure({ adapter: new Adapter() });

describe("ReactstrapTable", () => {
  it("uses defaultSort on initial render", () => {
    const data = [
      {
        FieldA: 3,
        FieldB: "a"
      },
      {
        FieldA: 4,
        FieldB: "b"
      },
      {
        FieldA: 1,
        FieldB: "c"
      }
    ];

    const table = mount(
      <ReactstrapTable
        data={data}
        initialSort={{ FieldName: "FieldA", Ascending: true }}
      />
    );

    // console.log(table.html());
    const rows = table.find("tbody > tr");
    const getVal = row =>
      parseInt(
        row
          .find("td")
          .at(0)
          .text(),
        10
      );

    let val = getVal(rows.at(0));

    // compare the value in the first table cell in each row
    for (let i = 1; i < rows.length; i += 1) {
      expect(getVal(rows.at(i))).toBeGreaterThan(val);
      val = getVal(rows.at(i));
    }
  });
  it("uses defaultSort on re-render", () => {
    const data = [
      {
        FieldA: 3,
        FieldB: "a"
      },
      {
        FieldA: 4,
        FieldB: "b"
      },
      {
        FieldA: 1,
        FieldB: "c"
      }
    ];

    const table = mount(
      <ReactstrapTable
        data={data}
        initialSort={{ FieldName: "FieldA", Ascending: true }}
      />
    );

    table.setProps({ data });

    // console.log(table.html());
    const rows = table.find("tbody > tr");
    const getVal = row =>
      parseInt(
        row
          .find("td")
          .at(0)
          .text(),
        10
      );

    let val = getVal(rows.at(0));

    // compare the value in the first table cell in each row
    for (let i = 1; i < rows.length; i += 1) {
      expect(getVal(rows.at(i))).toBeGreaterThan(val);
      val = getVal(rows.at(i));
    }
  });
});
