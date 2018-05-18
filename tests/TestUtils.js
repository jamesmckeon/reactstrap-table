// @flow

export default expect.extend({
  toBeNullOrUndefined(received) {
    return {
      message: () => `expected ${received} to be null or undefined`,
      pass: received === null || typeof received === "undefined"
    };
  }
});
