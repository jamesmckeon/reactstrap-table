// @flow

export default class SortOptions {
  constructor(fieldName: string, ascending?: boolean) {
    this.FieldName = fieldName;
    this.Ascending = ascending || false;
  }

  FieldName: string;
  Ascending: boolean;
}
