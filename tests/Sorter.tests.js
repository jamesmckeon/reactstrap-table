// @flow
import moment from "moment";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { assert } from "chai";
import { Sorter } from "../src/Sorter";

configure({ adapter: new Adapter() });

describe("Sorter", () => {
  const getTestData = () => [
    {
      first_name: "Linell",
      last_name: "Bygreaves",
      age: "06",
      birthdate: "1976-08-03T07:55:44Z"
    },
    {
      first_name: "Lorine",
      last_name: "Chillingworth",
      age: "54",
      birthdate: "1995-10-25T01:05:06Z"
    },
    {
      first_name: "Addia",
      last_name: "Davison",
      age: "72",
      birthdate: "1985-12-03T02:01:55Z"
    },
    {
      first_name: "Zora",
      last_name: "Cadamy",
      age: "95",
      birthdate: "1983-02-14T17:59:18Z"
    },
    {
      first_name: "Shalna",
      last_name: "Thwaites",
      age: "33",
      birthdate: "2000-09-17T05:21:14Z"
    },
    {
      first_name: "Vivie",
      last_name: "Marlin",
      age: "10",
      birthdate: "2013-01-09T11:31:26Z"
    },
    {
      first_name: "Garvey",
      last_name: "Dalliwatr",
      age: "83",
      birthdate: "2002-09-12T12:48:04Z"
    },
    {
      first_name: "Sande",
      last_name: "Chat",
      age: "24",
      birthdate: "1989-01-03T02:24:16Z"
    },
    {
      first_name: "Lacie",
      last_name: "Tibbits",
      age: "61",
      birthdate: "2000-10-02T04:46:52Z"
    },
    {
      first_name: "Britta",
      last_name: "Baden",
      age: "47",
      birthdate: "2008-09-11T15:34:44Z"
    }
  ];
  describe("Sort", () => {
    it("sorts string ascending", () => {
      const fieldName = "first_name";
      const result = Sorter.Sort(getTestData(), fieldName, true);

      let previous = result[0][fieldName];
      for (let i = 1; i < result.length; i += 1) {
        const current = result[i][fieldName];
        assert.isTrue(previous < current);

        previous = current;
      }
    });
    it("sorts string descending", () => {
      const fieldName = "first_name";
      const result = Sorter.Sort(getTestData(), fieldName, false);

      let previous = result[0][fieldName];
      for (let i = 1; i < result.length; i += 1) {
        const current = result[i][fieldName];
        assert.isTrue(previous > current);
        previous = current;
      }
    });
  });
  it("sorts number ascending", () => {
    const fieldName = "age";
    const result = Sorter.Sort(getTestData(), fieldName, true);

    let previous = Number(result[0][fieldName]);
    for (let i = 1; i < result.length; i += 1) {
      const current = Number(result[i][fieldName]);
      assert.isBelow(previous, current);
      previous = current;
    }
  });
  it("sorts number descending", () => {
    const fieldName = "age";
    const result = Sorter.Sort(getTestData(), fieldName, false);

    let previous = Number(result[0][fieldName]);
    for (let i = 1; i < result.length; i += 1) {
      const current = Number(result[i][fieldName]);
      assert.isAbove(previous, current);
      previous = current;
    }
  });
  it("sorts date ascending", () => {
    const fieldName = "birthdate";
    const result = Sorter.Sort(getTestData(), fieldName, true);

    let previous = moment(result[0][fieldName]);
    for (let i = 1; i < result.length; i += 1) {
      const current = moment(result[i][fieldName]);
      assert.isTrue(previous.isBefore(current));
      previous = current;
    }
  });
  it("sorts date descending", () => {
    const fieldName = "birthdate";
    const result = Sorter.Sort(getTestData(), fieldName, false);

    let previous = moment(result[0][fieldName]);
    for (let i = 1; i < result.length; i += 1) {
      const current = moment(result[i][fieldName]);
      assert.isTrue(previous.isAfter(current));
      previous = current;
    }
  });
});
