import faker from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/table-core";
import { IColumnHeaders } from "./types";

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
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
    id: "firstName_1",
    text: "First Name",
    value: "firstName",
  },
  {
    id: "lastName_2",
    text: "Last Name",
    value: "lastName",
  },
  {
    id: "age_3",
    text: "Age",
    value: "age",
  },
  {
    id: "visits_4",
    text: "Visits",
    value: "visits",
  },
  {
    id: "progress",
    text: "Progress",
    value: "progress",
  },
  {
    id: "status_1",
    text: "Status",
    value: "status",
  },
];

const newPerson = (): Person => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
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

export const personColumnHelper = createColumnHelper<Person>();
export const personColumns = [
  personColumnHelper.accessor("firstName", {
    header: "First Name",
    cell: (props) => props.getValue(),
    meta: {
      dataTestid: "firstName-01",
    },
  }),
  personColumnHelper.accessor("lastName", {
    header: "Last Name",
    cell: (props) => props.getValue(),
    meta: {
      dataTestid: "lastName-01",
    },
  }),
  personColumnHelper.accessor("age", {
    header: "age",
    cell: (props) => props.getValue(),
    filterFn: "equals",
    meta: {
      dataTestid: "age-01",
    },
  }),
];

export const headersInstace: IColumnHeaders[] = [
  {
    id: "instances_list_table_instances_column_id",
    text: "ID",
    value: "id",
    sortable: false,
  },
  {
    id: "instances_list_table_instances_column_name",
    text: "Name",
    value: "name",
    sortable: true,
  },
  {
    id: "instances_list_table_instances_column_status",
    text: "Status",
    value: "status",
    sortable: true,
  },
  {
    id: "instances_list_table_instances_column_availability_zone",
    text: "Availability Zone",
    value: "availability_zone",
    sortable: true,
  },
  {
    id: "instances_list_table_instances_column_image",
    text: "Image",
    value: "image",
    sortable: false,
  },
  {
    id: "instances_list_table_instances_column_machine_type",
    text: "Machine Type",
    value: "machine_type",
    sortable: false,
  },
  {
    id: "instances_list_table_instances_column_internal_ips",
    text: "Internal IP",
    value: "internal_ip",
    sortable: true,
  },
  {
    id: "instances_list_table_instances_column_external_ips",
    text: "External IP",
    value: "external_ip",
    sortable: true,
  },
  {
    id: "instances_list_table_instances_column_storages",
    text: "Storage",
    value: "volume",
    sortable: false,
  },
  {
    id: "instances_list_table_instances_column_created_by",
    text: "Created By",
    value: "created_by",
    sortable: false,
  },
  {
    id: "volumes_table_action",
    text: "Actions",
    value: "actions",
    sortable: false,
  },
];

export const instance = [
  {
    id: "2600d9c3-5039-4b70-8aa0-91608b181964",
    name: "automateResetPass_",
    status: "ACTIVE",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "48f12aa2-974d-49d8-b725-69c8e406911b",
    },
    availability_zone: "bkk1-a",
    internal_ips: [
      {
        ip_address: "120.10.0.10",
      },
      {
        ip_address: "2.2.2.9",
      },
    ],
    external_ips: [
      {
        ip_address: "100.127.3.12",
      },
      {
        ip_address: "100.127.3.14",
      },
    ],
    volumes_attached: ["594801cf-3a66-4b60-95e7-7ed929b83b57"],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: [],
    metadata: {
      authen_type: "password",
      authen_by: "keypair_and_password",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "yes",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "True",
      hw_machine_type: "q35",
      hw_firmware_type: "uefi",
      "nc:ncs_agent": "false",
      "nc:cloudinit_agent": "no",
      image_id: "264b340e-1882-4abe-865f-215014b19865",
      min_disk: "10",
      image_name: "ubuntu-20-v211104",
      os_type: "linux",
      owner: "0bc7e6e9d8294a2786cec51d3447ee3e",
      size: "566886400",
      locked: "0",
    },
    created_at: "2022-08-04T08:51:20Z",
    updated_at: "2022-09-02T04:59:04Z",
  },
  {
    id: "8daceaa4-9ce3-43a9-aab2-dd9702b97d94",
    name: "Instance-5857-4",
    status: "ACTIVE",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "48f12aa2-974d-49d8-b725-69c8e406911b",
    },
    availability_zone: "bkk1-b",
    internal_ips: [
      {
        ip_address: "2.2.2.3",
      },
      {
        ip_address: "192.168.0.3",
      },
    ],
    external_ips: [
      {
        ip_address: "100.127.4.4",
      },
    ],
    volumes_attached: [
      "d289b243-28f5-474b-8a86-2b94eebc3e08",
      "97786d2c-262f-4d75-9ac3-4d705786ca14",
    ],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: ["default", "Ping", "default"],
    metadata: {
      authen_type: "()",
      authen_by: "keypair_and_password",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "yes",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "True",
      hw_machine_type: "q35",
      hw_firmware_type: "uefi",
      "nc:ncs_agent": "false",
      "nc:cloudinit_agent": "no",
      image_id: "264b340e-1882-4abe-865f-215014b19865",
      min_disk: "10",
      image_name: "ubuntu-20-v211104",
      os_type: "linux",
      owner: "0bc7e6e9d8294a2786cec51d3447ee3e",
      size: "566886400",
      locked: "0",
    },
    created_at: "2022-07-27T03:52:37Z",
    updated_at: "2022-09-01T10:39:44Z",
  },
  {
    id: "f382a3e6-d52e-4f6a-a936-c5378d28794d",
    name: "TestInstance-3560-1",
    status: "ACTIVE",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "48f12aa2-974d-49d8-b725-69c8e406911b",
    },
    availability_zone: "bkk1-a",
    internal_ips: [
      {
        ip_address: "10.10.10.8",
      },
    ],
    external_ips: [
      {
        ip_address: "100.127.3.54",
      },
    ],
    volumes_attached: [
      "6e66389d-bbdd-4b3b-82d1-8036ed438b5b",
      "b8abea1b-f817-404c-a414-29441703490f",
      "228c0a8b-341a-443c-a3af-d5b706b75934",
      "8777afcb-bacb-4314-9189-3a205319ab32",
    ],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: [],
    metadata: {
      authen_type: "password",
      authen_by: "keypair_and_password",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "yes",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "True",
      hw_machine_type: "q35",
      hw_firmware_type: "uefi",
      "nc:ncs_agent": "false",
      "nc:cloudinit_agent": "no",
      image_id: "264b340e-1882-4abe-865f-215014b19865",
      min_disk: "10",
      image_name: "ubuntu-20-v211104",
      os_type: "linux",
      owner: "0bc7e6e9d8294a2786cec51d3447ee3e",
      size: "566886400",
      auto_back_up: "0",
      backup_period: "7",
      backup_time: "02:00:00",
      rotation: "2",
      "nc:license_price_per_month": "1200",
      locked: "0",
    },
    created_at: "2022-07-18T05:23:47Z",
    updated_at: "2022-09-01T10:39:44Z",
  },
  {
    id: "d03e5860-a260-4df4-91a1-a4c07349646a",
    name: "windows_test",
    status: "ACTIVE",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "48f12aa2-974d-49d8-b725-69c8e406911b",
    },
    availability_zone: "bkk1-a",
    internal_ips: [
      {
        ip_address: "120.10.0.4",
      },
    ],
    external_ips: [
      {
        ip_address: "100.127.3.4",
      },
    ],
    volumes_attached: [
      "204d6189-e0b0-4fc0-b3eb-5ff9578c24a4",
      "f4527da7-fe57-4aa4-9b20-074667b1c8bd",
      "79f8e0fb-d862-4b75-89ef-abd4feeea69f",
    ],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: ["default"],
    metadata: {
      authen_type: "password",
      authen_by: "password",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "yes",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "true",
      hw_machine_type: "",
      hw_firmware_type: "",
      "nc:ncs_agent": "true",
      "nc:cloudinit_agent": "no",
      image_id: "4d35bfd6-689e-4833-834b-db48ded2bfa2",
      min_disk: "10",
      image_name: "password_img",
      os_type: "windows",
      owner: "7ef38814fba64fbcba74763f1f62e6da",
      size: "13200896",
      locked: "0",
    },
    created_at: "2022-08-02T08:15:17Z",
    updated_at: "2022-09-01T10:39:43Z",
  },
  {
    id: "aeba9a47-3042-495a-8769-378e171ba253",
    name: "automateKeypairs_",
    status: "SHUTOFF",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "e6425c57-6d73-43a9-a963-d70366cc7216",
    },
    availability_zone: "bkk1-a",
    internal_ips: [
      {
        ip_address: "120.10.0.20",
      },
    ],
    external_ips: [],
    volumes_attached: ["4c09d74d-63ee-4102-afb8-c225b62e183b"],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: [],
    metadata: {
      authen_type: "password",
      authen_by: "keypair_and_password",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "yes",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "True",
      hw_machine_type: "q35",
      hw_firmware_type: "uefi",
      "nc:ncs_agent": "false",
      "nc:cloudinit_agent": "no",
      image_id: "264b340e-1882-4abe-865f-215014b19865",
      min_disk: "10",
      image_name: "ubuntu-20-v211104",
      os_type: "linux",
      owner: "0bc7e6e9d8294a2786cec51d3447ee3e",
      size: "566886400",
      locked: "0",
    },
    created_at: "2022-08-04T08:52:35Z",
    updated_at: "2022-09-01T10:39:42Z",
  },
  {
    id: "2bf58571-d52a-4dc6-a762-6c080057a01c",
    name: "automateImagePref_",
    status: "SHUTOFF",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "48f12aa2-974d-49d8-b725-69c8e406911b",
    },
    availability_zone: "bkk1-a",
    internal_ips: [
      {
        ip_address: "120.10.0.30",
      },
      {
        ip_address: "2.2.2.6",
      },
      {
        ip_address: "2.2.2.7",
      },
    ],
    external_ips: [
      {
        ip_address: "100.127.3.11",
      },
      {
        ip_address: "100.127.3.40",
      },
    ],
    volumes_attached: [
      "bc997d45-8267-4e3f-bef5-a58b8c7a814f",
      "7149c872-35d6-4e26-8253-ab08a452d040",
      "4e9423e0-509a-4409-a45b-5f652e7d5761",
    ],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: ["default", "default"],
    metadata: {
      authen_type: "image preference",
      authen_by: "image preference",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "no",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "true",
      hw_machine_type: "",
      hw_firmware_type: "",
      "nc:ncs_agent": "false",
      "nc:cloudinit_agent": "no",
      image_id: "00448af6-7ee0-4704-a023-23dc969e732d",
      min_disk: "10",
      image_name: "Image-9542",
      os_type: "linux",
      owner: "7ef38814fba64fbcba74763f1f62e6da",
      size: "13200896",
      locked: "0",
    },
    created_at: "2022-08-04T08:54:06Z",
    updated_at: "2022-09-01T10:39:41Z",
  },
  {
    id: "2d5b182b-7792-4281-8bc3-e833ec6b1673",
    name: "AZ-a-TestLicense",
    status: "ACTIVE",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "48f12aa2-974d-49d8-b725-69c8e406911b",
    },
    availability_zone: "bkk1-a",
    internal_ips: [
      {
        ip_address: "120.10.0.3",
      },
    ],
    external_ips: [],
    volumes_attached: ["67c66612-a59d-43b7-9e39-e14939f6c794"],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: ["Ping", "RDP"],
    metadata: {
      authen_type: "password",
      authen_by: "password",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "yes",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "true",
      hw_machine_type: "",
      hw_firmware_type: "",
      "nc:ncs_agent": "true",
      "nc:cloudinit_agent": "no",
      image_id: "4d35bfd6-689e-4833-834b-db48ded2bfa2",
      min_disk: "10",
      image_name: "password_img",
      os_type: "windows",
      owner: "7ef38814fba64fbcba74763f1f62e6da",
      size: "13200896",
      locked: "0",
    },
    created_at: "2022-08-26T09:58:21Z",
    updated_at: "2022-09-01T10:39:40Z",
  },
  {
    id: "5ae8eaaf-aa52-43f6-8352-f441ab118635",
    name: "AZ-b-TestLicense",
    status: "ACTIVE",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "48f12aa2-974d-49d8-b725-69c8e406911b",
    },
    availability_zone: "bkk1-b",
    internal_ips: [
      {
        ip_address: "2.2.2.5",
      },
    ],
    external_ips: [],
    volumes_attached: ["8e9ab0b0-0c0a-4954-87ee-37fe0ecbf1ea"],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: ["Ping", "SSH"],
    metadata: {
      authen_type: "image preference",
      authen_by: "image preference",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "no",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "true",
      hw_machine_type: "",
      hw_firmware_type: "",
      "nc:ncs_agent": "false",
      "nc:cloudinit_agent": "no",
      image_id: "756f60ec-a470-4f99-8cbe-f1a09f814f65",
      min_disk: "10",
      image_name: "TestMeta",
      os_type: "linux",
      owner: "7ef38814fba64fbcba74763f1f62e6da",
      size: "13200896",
      locked: "0",
    },
    created_at: "2022-08-29T07:30:28Z",
    updated_at: "2022-09-01T10:39:39Z",
  },
  {
    id: "8d59b9a6-1f0a-4c63-b0f2-07cdef64b6b5",
    name: "testLaunch",
    status: "ERROR",
    project_id: "7ef38814fba64fbcba74763f1f62e6da",
    user_id: "a2d52f13de554b1ab45e42adbe4f206c",
    locked: false,
    image: {},
    machine_type: {
      id: "48f12aa2-974d-49d8-b725-69c8e406911b",
    },
    availability_zone: "",
    internal_ips: [],
    external_ips: [],
    volumes_attached: ["b186863d-c453-4c50-883e-b688d45a3902"],
    user: {
      id: "a2d52f13de554b1ab45e42adbe4f206c",
    },
    task_state: null,
    security_groups: [],
    metadata: {
      authen_type: "('34b56025-e9bf-4115-acc5-d6b77966d458',)",
      authen_by: "keypair_and_password",
      disk_format: "qcow2",
      hw_disk_bus: "scsi",
      hw_qemu_guest_agent: "yes",
      hw_scsi_model: "virtio-scsi",
      hw_vif_model: "virtio",
      hw_vif_multiqueue_enabled: "True",
      hw_machine_type: "q35",
      hw_firmware_type: "uefi",
      "nc:ncs_agent": "false",
      "nc:cloudinit_agent": "no",
      image_id: "264b340e-1882-4abe-865f-215014b19865",
      min_disk: "10",
      image_name: "ubuntu-20-v211104",
      os_type: "linux",
      owner: "0bc7e6e9d8294a2786cec51d3447ee3e",
      size: "566886400",
    },
    created_at: "2022-08-04T10:31:18Z",
    updated_at: "2022-08-04T10:31:35Z",
  },
];
