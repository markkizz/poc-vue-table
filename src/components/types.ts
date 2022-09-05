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

export type FilterField = { id: string; label: string; value: unknown };

export interface IFilterablePerson {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  street: string;
  houseNo: string;
  progress: number;
  status: "relationship" | "complicated" | "single";
}
