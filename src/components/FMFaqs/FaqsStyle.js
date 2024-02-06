export const accordionStyles = {
  titleAccordion: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.5rem",
    color: "black",
  },

  boxAccordion: {
    borderRadius: "0.5rem",
    color: "#717171",
    fontSize: "14px",
    boxShadow:
      "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
    marginBottom: "1rem",
    padding: "0 40px 0 40px",
    // Add styles for mobile breakpoint
    "@media (max-width: 767px)": {
      padding: "0", // Adjust padding for smaller screens
    },
  },
};
