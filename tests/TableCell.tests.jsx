// @flow

import TableCell from "TableCell";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import React from "react";

configure({ adapter: new Adapter() });

describe("TableCell", () => {
  // "sm" | "md" | "lg" | "xl";

  it("renders hiddenBelow sm", () => {
    const columnDef = {
      hiddenBelow: "sm",
      fieldName: "test cell"
    };

    const cell = mount(<TableCell id="test" columnDef={columnDef} />)
      .find("td")
      .at(0);

    expect(cell.hasClass("d-none")).toEqual(true);
    expect(cell.hasClass("d-sm-table-cell")).toEqual(true);
  });

  it("renders hiddenBelow md", () => {
    const columnDef = {
      hiddenBelow: "md",
      fieldName: "test cell"
    };

    const cell = mount(<TableCell id="test" columnDef={columnDef} />)
      .find("td")
      .at(0);
    expect(cell.hasClass("d-none")).toEqual(true);
    expect(cell.hasClass("d-md-table-cell")).toEqual(true);
  });

  it("renders hiddenBelow lg", () => {
    const columnDef = {
      hiddenBelow: "lg",
      fieldName: "test cell"
    };

    const cell = mount(<TableCell id="test" columnDef={columnDef} />)
      .find("td")
      .at(0);
    expect(cell.hasClass("d-none")).toEqual(true);
    expect(cell.hasClass("d-lg-table-cell")).toEqual(true);
  });

  it("renders hiddenBelow xl", () => {
    const columnDef = {
      hiddenBelow: "xl",
      fieldName: "test cell"
    };

    const cell = mount(<TableCell id="test" columnDef={columnDef} />)
      .find("td")
      .at(0);
    expect(cell.hasClass("d-none")).toEqual(true);
    expect(cell.hasClass("d-xl-table-cell")).toEqual(true);
  });
});
