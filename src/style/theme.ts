type LayoutWidth = "pc" | "tablet" | "mobile";

interface Theme {
  layout: {
    width: {
      [key in LayoutWidth]: string;
    };
  };
}

export const theme: Theme = {
  layout: {
    width: {
      pc: "1024px",
      tablet: "768px",
      mobile: "375px",
    },
  },
};
