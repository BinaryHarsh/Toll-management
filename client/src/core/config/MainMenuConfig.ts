export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  keenthemesIcon?: string;
  bootstrapIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        bootstrapIcon: "bi-house",
      },
      {
        heading: "File Status",
        route: "/file-Status",
        bootstrapIcon: "bi-clipboard-data",
      },
      {
        heading: "Transaction Validate",
        route: "/transactions",
        bootstrapIcon: "bi-shield-check",
      },
      {
        heading: "Reports",
        route: "/transaction-details-report",
        bootstrapIcon: "bi-file-earmark-check-fill",
      },
      {
        heading: "Cashup",
        route: "/cashup-mid-shift",
        bootstrapIcon: "bi-cash",
      },
      {
        heading: "Shift Management",
        route: "/shifts",
        bootstrapIcon: "bi-person-gear",
      },
      {
        heading: "Role Management",
        route: "/roles",
        bootstrapIcon: "bi-people",
      },
      {
        heading: "User Management",
        route: "/users",
        bootstrapIcon: "bi-gear",
      },
      {
        heading: "Transaction Cancellation",
        route: "/transaction-cancellation",
        bootstrapIcon: "bi-file-earmark-minus",
      },
      {
        heading: "Configuration",
        route: "/configuration",
        keenthemesIcon: "profile-circle",
        bootstrapIcon: "bi-person",
        sub: [
          // {
          //   heading: "Lane Creation",
          //   route: "/lane-creation",
          // },

          // {
          //   heading: "Lane Device Config ",
          //   route: "/lane-device-configuration",
          // },
          {
            heading: "Vehicle Class Creation",
            route: "/vehicle-class-creation",
          },
          {
            heading: "Fare Creation",
            route: "/fare-creation",
          },
        ],
      },
    ],
  },
];

export default MainMenuConfig;
