// @flow

export const parseNumber = (val: any): ?number => {
  if (typeof val === "number" && Number.isFinite(val)) {
    return val;
  } else if (typeof val === "string") {
    // if val starts with "-0" and includes a non-zero, remove the "0"'s
    // -01 = -1
    // -0010 = -10
    // -0010.10 = -10.10
    // -0000000 = -0000000
    let cleanVal = val.trim();

    if (
      cleanVal.startsWith("-0") &&
      cleanVal.includes("0") &&
      RegExp("[1-9]").test(cleanVal)
    ) {
      // get the index of the first non zero after the hyphen
      const end = cleanVal.slice(1).search(RegExp("[1-9]"));
      cleanVal = cleanVal.slice(2, end);
    }
    return cleanVal.replace(RegExp("[^0-9.]", "g"), "").trim();
  }
  return null;
};
export const isNumber = (val: any): boolean => {
  const result = parseNumber(val);
  return !Number.isNaN(parseFloat(result)) && Number.isFinite(result);
};
