import { assert } from "chai";
import PagingOptions from "PagingOptions";

describe("PagingOptions", () => {
  describe("constructor", () => {
    it("throws error on invalid pagesDisplayed", () => {
      const c = () => {
        const obj = new PagingOptions(0);
      };

      assert.throws(c, "pagesDisplayed must be > 0");
    });

    it("sets PagesDisplayed", () => {
      const obj = new PagingOptions(3);
      expect(obj.PagesDisplayed).toEqual(3);
    });
    it("provides PagesDisplayed default", () => {
      const obj = new PagingOptions(null);
      expect(obj.PagesDisplayed).toEqual(5);
    });
    it("sets ResultsPerPage", () => {
      const obj = new PagingOptions(5, 11);
      expect(obj.ResultsPerPage).toEqual(11);
    });
    it("provides PagesDisplayed default", () => {
      const obj = new PagingOptions();
      expect(obj.PagesDisplayed).toEqual(10);
    });
  });

  describe("getTotalPages", () => {
    it("returns expected whole number", () => {
      const options = new PagingOptions();
      const actual = options.getTotalPages(66);
      const expected = Math.ceil(66 / options.ResultsPerPage);
      expect(actual).toEqual(expected);
    });
  });
});
