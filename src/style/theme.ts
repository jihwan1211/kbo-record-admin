type LayoutWidth = "large" | "medium" | "small";
type ColorKey = "menuBackground" | "error" | "success" | "disabled";

interface Theme {
  color: {
    [key in ColorKey]: string;
  };
  borderRadius: {
    default: string;
  };
  menu: {
    color: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
  };
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}

export const theme: Theme = {
  color: {
    menuBackground: "#2c3539",
    error: "#DC143C",
    success: "#32cd32",
    disabled: "#C0C0C0",
  },
  borderRadius: {
    default: "4px",
  },
  menu: {
    color: "#ffffe0",
    backgroundColor: "#2c3539",
    hoverBackgroundColor: "#455a64",
  },
  layout: {
    width: {
      large: "1020px",
      medium: "760px",
      small: "320px",
    },
  },
};
