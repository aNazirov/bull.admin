import { SwitchHorizontalIcon } from "@heroicons/react/solid";
import { RoleType, THead } from "@utils/enums";

export const navigation = [
  {
    name: "Inboxes",
    href: "#",
    children: [
      { name: "Technical Support", href: "#" },
      { name: "Sales", href: "#" },
      { name: "General", href: "#" },
    ],
  },
  { name: "Reporting", href: "#", children: [] },
  { name: "Settings", href: "#", children: [] },
];

export const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  { name: "Sign out", href: "/login" },
];

export const sidebarNavigation = [
  {
    name: "Jobs",
    href: "/jobs",
    icon: SwitchHorizontalIcon,
    permissions: [
      RoleType.Admin,
    ],
    current: false,
  },
  {
    name: "Transact",
    href: "/transactions",
    icon: SwitchHorizontalIcon,
    permissions: [
      RoleType.Admin,
    ],
    current: false,
  },
];

export const AgencyTableNames = [
  "Title",
  "License",
  "Bank Account",
  "Email",
  THead.edit,
];

export const PaymentTableNames = ["Payments", "Amount", "Type", "Date"];

export const ClientTableNames = [
  "Name",
  "Transactions",
  "Email",
  THead.edit,
];

export const TransactionTableNames = [
  "Agent",
  "Client",
  "Unit",
  "Status",
  "Next job",
  "Payment",
  THead.edit,
];

export const JobTableNames = [
  "Title",
  "Type",
  "Created date",
  "Deadline",
  "Completed",
  THead.edit,
];

export const JobsTableNames = [
  "Transaction Title",
  "Name",
  "Access Roles",
  "DeadLine",
];

export const DeveloperTableNames = ["Name", THead.edit];

export const AgentTableNames = [
  "Name",
  "Email",
  "Agency",
  THead.edit,
];

export const ProjectTableNames = [
  "Title",
  "Developer",
  "Completeness",
  "Email",
  "Levels",
  "Units",
  THead.edit,
];

export const UnitTableNames = [
  "Title",
  "Project",
  "Transactions",
  "Status",
  "Type",
  "Price",
  THead.edit,
];

export const UserTableNames = [
  "Name",
  "Role",
  "Transactions",
  "Email",
  THead.edit,
];
