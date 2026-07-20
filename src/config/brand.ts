export const brand = {
  name: "NYC Pest Management School",
  shortName: "NYC PMS",
  tagline: "NYSDEC-Approved Pesticide Applicator Training & CEUs",

  logoUrl:
    "https://nycpestmanagementschool.com/wp-content/uploads/2024/10/nyc-pest-management-school-logo-2-300x300-1__2_-removebg-preview-1.webp",
  faviconUrl:
    "https://nycpestmanagementschool.com/wp-content/uploads/2024/10/favico.webp",

  colors: {
    primary: "#0A294D",
    primaryDark: "#071E38",
    primaryLight: "#EAF1F8",
    ink: "#1F2937",
    slate: "#6B7280",
    background: "#FFFFFF",
    surface: "#F8FAFC",
    success: "#22C55E",
    warning: "#F4A623",
    danger: "#EF4444",
  },

  contact: {
    phone: "+1 (718) 284-7378",
    phoneAlt: "(718) 284-7379",
    email: "info@nycpestmanagementschool.com",
    address: "1611 McDonald Ave, Brooklyn, NY 11230",
  },

  social: {
    facebook: "https://www.facebook.com/nycpestmanagementschool",
    instagram: "https://www.instagram.com/nycpestmanagementschool/",
    linkedin: "https://www.linkedin.com/company/nyc-pest-management-school",
    youtube: "https://www.youtube.com/@NYCPestManagementSchool",
  },

  approvingBody: "NYSDEC (New York State Department of Environmental Conservation)",
  leadInstructor: "Fida Abbas, A.C.E. (Associate Certified Entomologist)",

  launchState: {
    code: "NY",
    name: "New York",
  },
} as const;

export type Brand = typeof brand;
