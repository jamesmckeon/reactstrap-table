// @flow

export default expect.extend({
  toBeNullOrUndefined(received, argument) {
    return {
      message: () => `expected ${received} to be null or undefined",
      pass: received === null || typeof received === "undefined"
    };
  }
});
