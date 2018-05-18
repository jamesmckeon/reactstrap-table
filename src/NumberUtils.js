// @flow

export const parseNumber = (val: any): ?number => {
  if (val === null || typeof val === "undefined" || val === "") {
    return null;
  }
  if (typeof val === "number" && Number.isFinite(val)) {
    return val;
  } else if (
    // string containing digits, a single hyphen and/or period and not ending in hyphen or period
    typeof val === "string" &&
    !val.match(RegExp("[^0-9.-]", "g")) &&
    val.split(".").length < 3 &&
    val.split("-").length < 3 &&
    !val.endsWith(".") &&
    !val.endsWith("-")
  ) {
    return parseFloat(
      val
        .trim()
        .replace(RegExp("[^0-9.-]", "g"), "")
        .trim()
    );
  }
  return null;
};
export const isNumber = (val: any): boolean => {
  const result = parseNumber(val);
  return !Number.isNaN(parseFloat(result)) && Number.isFinite(result);
};
