// @flow

import { isNumber } from "NumberUtils";

describe("NumberUtils", () => {
  describe("isNumber", () => {
    it("1", () => {
      expect(isNumber(1)).toBeTruthy();
      expect(isNumber("1")).toBeTruthy();
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
    it("-01", () => {
      expect(isNumber("-01")).toBeTruthy();
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
  });
});
