// @flow
import moment from "moment";
import { isNumber, parseNumber } from "NumberUtils";

export const isDate = (val: any): boolean =>
  !isNumber(val) && moment(val).isValid();

const getComparer = (val: any, fieldName: string, ascending: boolean) => {
  if (!val) {
    throw new Error("val is empty");
  }

  if (!fieldName) {
    throw new Error("fieldName is empty");
  }
  // number check has to preceed date check, as JS will convert numbers to dates
  if (isNumber(val)) {
    return (a: Object, b: Object): number =>
      ascending
        ? parseNumber(a[fieldName]) - parseNumber(b[fieldName])
        : parseNumber(b[fieldName]) - parseNumber(a[fieldName]);
  } else if (isDate(val)) {
    return (a: Object, b: Object): number => {
      const momentA = ascending ? moment(a[fieldName]) : moment(b[fieldName]);
      const momentB = ascending ? moment(b[fieldName]) : moment(a[fieldName]);

      if (momentA.isBefore(momentB)) {
        return -1;
      } else if (momentA.isAfter(momentB)) {
        return 1;
      }
      return 0;
    };
  }
  return (a: Object, b: Object): number => {
    const valA = ascending ? a[fieldName] : b[fieldName];
    const valB = ascending ? b[fieldName] : a[fieldName];

    if (valA < valB) {
      return -1;
    } else if (valA > valB) {
      return 1;
    }
    return 0;
  };
};

export default class Sorter {
  static Sort = (
    data: Array<Object>,
    fieldName: string,
    ascending: boolean
  ): Array<Object> => {
    if (data.length < 2) {
      return data;
    }
    const row = data[0];
    const val = row[fieldName];
    const comparer = getComparer(val, fieldName, ascending);

    data.sort(comparer);
    return data;
  };
}
