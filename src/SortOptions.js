// @flow

export default class SortOptions {
  constructor(fieldName: string, ascending: boolean) {
    this.FieldName = fieldName;
    this.Ascending = ascending;
  }

  FieldName: string;
  Ascending: boolean;
}
