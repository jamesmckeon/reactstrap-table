// @flow
import moment from "moment";

export class Sorter {
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

const getComparer = (val: any, fieldName: string, ascending: boolean) => {
  //number check has to preceed date check, as JS will convert numbers to dates
  if (isNumber(val)) {
    return (a: Object, b: Object): number => {
      return ascending
        ? parseFloat(a[fieldName]) - parseFloat(b[fieldName])
        : parseFloat(b[fieldName]) - parseFloat(a[fieldName]);
    };
  } else if (isDate(val)) {
    return (a: Object, b: Object) => {
      const momentA = ascending ? moment(a[fieldName]) : moment(b[fieldName]);
      const momentB = ascending ? moment(b[fieldName]) : moment(a[fieldName]);

      if (momentA.isBefore(momentB)) {
        return -1;
      } else if (momentA.isAfter(momentB)) {
        return 1;
      } else {
        return 0;
      }
    };
  } else {
    return (a: Object, b: Object) => {
      const valA = ascending ? a[fieldName] : b[fieldName];
      const valB = ascending ? b[fieldName] : a[fieldName];

      if (valA < valB) {
        return -1;
      } else if (valA > valB) {
        return 1;
      } else {
        return 0;
      }
    };
  }
};
const isNumber = (val: any): boolean => {
  //https://stackoverflow.com/a/9716488/1342632
  return !isNaN(parseFloat(val)) && isFinite(val);
};

const isDate = (val: any): boolean => {
  return !isNumber(val) && moment(val).isValid();
};
