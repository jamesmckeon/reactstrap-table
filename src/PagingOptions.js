// @flow

/**
 *
 *
 * @export
 * @class PagingOptions
 */
export default class PagingOptions {
  /**
   * Creates an instance of PagingOptions.
   * @param {5} pagesDisplayed
   * @param {10} resultsPerPage
   * @memberof PagingOptions
   */
  constructor(pagesDisplayed: ?number, resultsPerPage: ?number) {
    if (pagesDisplayed != null && pagesDisplayed < 1) {
      throw new Error("pagesDisplayed must be > 0");
    }

    if (pagesDisplayed != null) {
      this.PagesDisplayed = pagesDisplayed;
    }

    if (resultsPerPage != null) {
      this.ResultsPerPage = resultsPerPage;
    }
  }
  /**
   * The number of pages displayed by the Pager component
   *
   * @type {number}
   * @memberof PagingOptions
   */
  PagesDisplayed: number = 5;
  /**
   * The number of records that should be displayed on a single page
   *
   * @type {number}
   * @memberof PagingOptions
   */
  ResultsPerPage: number = 10;
  /**
   * Calculates the total number of pages in a dataset based on the values of  ResultsPerPage
   *
   * @param {number} recordCount
   */
  getTotalPages = (recordCount: number) => {
    if (this.PagesDisplayed === 1) {
      return recordCount;
    }
    return Math.ceil(recordCount / this.ResultsPerPage);
  };
}
