import faker from "@faker-js/faker";
import { IColumnHeaders } from "./types";

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  address: Address;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};

export type Address = {
  houseNo: string;
  street: string;
  streetPrefix: string;
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export const headersPerson: IColumnHeaders[] = [
  {
    id: "table_person_firstName",
    text: "First Name",
    value: "firstName",
  },
  {
    id: "table_person_lastName",
    text: "Last Name",
    value: "lastName",
  },
  {
    id: "table_person_age",
    text: "Age",
    value: "age",
  },
  {
    id: "table_person_visits",
    text: "Visits",
    value: "visits",
  },
  {
    id: "table_person_houseNo",
    text: "Building Number",
    value: "houseNo",
  },
  {
    id: "table_person_street",
    text: "Street",
    value: "street",
  },
  {
    id: "table_person_visits",
    text: "Visits",
    value: "visits",
  },
  {
    id: "table_person_progress",
    text: "Progress",
    value: "progress",
  },
  {
    id: "table_person_status",
    text: "Status",
    value: "status",
  },
];

const newPerson = (): Person => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    address: {
      houseNo: faker.address.buildingNumber(),
      street: faker.address.streetName(),
      streetPrefix: faker.address.streetPrefix(),
    },
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0],
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
