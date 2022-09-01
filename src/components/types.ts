export interface IColumnHeaders {
  id?: string;
  text: string;
  value: string;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  class?: string[] | string;
  width?: string;
  filter?: {
    type: "uuid" | "string" | "name" | "datetime" | "option";
  };
  // aditional props
  searchable?: boolean;
}
