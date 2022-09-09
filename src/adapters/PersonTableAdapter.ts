/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeData, Person } from "../components/makeData";
import { ITableFilter, ITableHeader } from "@/adapters/abstracts/ITableAdapter";
import { BaseTableAdapter } from "./BaseTableAdapter";

export class PersonTableAdapter extends BaseTableAdapter<Person> {
  conditionalFilter(_filters: ITableFilter<Person>[]): void {
    throw new Error("Method not implemented.");
  }

  headers: ITableHeader<Person>[] = [
    {
      id: "table_person_firstName",
      text: "First Name",
      key: "firstName",
      filterable: true,
    },
    {
      id: "table_person_lastName",
      text: "Last Name",
      key: "lastName",
      filterable: true,
    },
    {
      id: "table_person_age",
      text: "Age",
      key: "age",
    },
    {
      id: "table_person_visits",
      text: "Visits",
      key: "visits",
    },
    {
      id: "table_person_progress",
      text: "Progress",
      key: "progress",
      filterable: true,
    },
    {
      id: "table_person_status",
      text: "Status",
      key: "status",
      filterable: true,
    },
    {
      id: "table_person_house_number",
      text: "House Number",
      key: "houseNo",
      filterable: true,
    },
    {
      id: "table_person_street",
      text: "Street",
      key: "street",
      align: "left",
      filterable: true,
    },
  ];

  initialize() {
    this.initialView = makeData(20);
    super.initialize();
  }
}
