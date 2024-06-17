type LayoutWidth = "pc" | "tablet" | "mobile";
type ColorKey = "menuBackground";

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
      pc: "1024px",
      tablet: "768px",
      mobile: "375px",
    },
  },
};
