// @flow

import { isNumber, parseNumber } from "NumberUtils";
import "./TestUtils";

describe("NumberUtils", () => {
  describe("isNumber", () => {
    it("1", () => {
      expect(isNumber(1)).toBeTruthy();
    });
    it("1 1", () => {
      expect(isNumber("1 1")).toBeFalsy();
    });
    it("1 as string", () => {
      expect(isNumber("1")).toBeTruthy();
    });

    it("01", () => {
      expect(isNumber("01")).toBeTruthy();
    });

    it(".5", () => {
      expect(isNumber(0.5)).toBeTruthy();
      expect(isNumber(".5")).toBeTruthy();
    });
    it("-1", () => {
      expect(isNumber(-1)).toBeTruthy();
    });
    it("-1 as string", () => {
      expect(isNumber("-1")).toBeTruthy();
    });
    it("0 as string", () => {
      expect(isNumber("0")).toBeTruthy();
    });
    it("0", () => {
      expect(isNumber(0)).toBeTruthy();
    });

    it("-001", () => {
      expect(isNumber("-01")).toBeTruthy();
    });
    it("a", () => {
      expect(isNumber("a")).toBeFalsy();
    });
    it("1a", () => {
      expect(isNumber("1a")).toBeFalsy();
    });
    it("1976-01-01", () => {
      expect(isNumber("1976-01-01")).toBeFalsy();
    });
    it("date object", () => {
      expect(isNumber(new Date())).toBeFalsy();
    });
    it("null", () => {
      expect(isNumber(null)).toBeFalsy();
    });
    it("1-", () => {
      expect(isNumber("1-")).toBeFalsy();
    });
    it("NaN", () => {
      expect(isNumber(NaN)).toBeFalsy();
    });
    it("undefined", () => {
      expect(isNumber(undefined)).toBeFalsy();
    });
    it("-", () => {
      expect(isNumber("-")).toBeFalsy();
    });
    it(".", () => {
      expect(isNumber(".")).toBeFalsy();
    });
    it(".1.", () => {
      expect(isNumber(".1.")).toBeFalsy();
    });
  });

  describe("ParseNumber", () => {
    it("1e+2", () => {
      expect(parseNumber("1e+2")).toEqual(100);
    });
    it("1", () => {
      expect(parseNumber(1)).toEqual(1);
    });

    it(".5", () => {
      expect(parseNumber("0.5")).toEqual(0.5);
    });

    it("-1", () => {
      expect(parseNumber("-1")).toEqual(-1);
    });
    it("0", () => {
      expect(parseNumber(0)).toEqual(0);
    });
    it("0 as string", () => {
      expect(parseNumber("0")).toEqual(0);
    });

    it("-01", () => {
      expect(parseNumber("-01")).toEqual(-1);
    });
    it("-001", () => {
      expect(parseNumber("-01")).toEqual(-1);
    });
    it("a", () => {
      expect(parseNumber("a")).toBeNullOrUndefined();
    });
  });
});
