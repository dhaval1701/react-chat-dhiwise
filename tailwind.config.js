module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: { 50: "#fafafa", 200: "#efefef", 600: "#737373", "300_01": "#dbdbdb" },
        black: { "900_01": "#000000", "900_19": "#00000019" },
        white: { A700: "#ffffff" },
        light_blue: { A700: "#0095f6" },
      },
      boxShadow: {},
      fontFamily: { roboto: "Roboto" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
