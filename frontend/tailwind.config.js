export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background))",
        surface: "rgb(var(--surface))",
        foreground: "rgb(var(--foreground))",
        primary: "rgb(var(--primary))",
        muted: "rgb(var(--muted))",
        border: "rgb(var(--border))",
      },
      fontFamily: {
        rodfat: ["Rodfat", "sans-serif"],
        "boston-caps": ["BostonCaps", "sans-serif"],
        ghrathe: ["Ghrathe", "serif"],
        cinzel: ["Cinzel", "serif"],
        "cinzel-decorative": ["Cinzel Decorative", "serif"],
        karina: ["Karina", "cursive"],
        kastroo: ["Kastroo", "serif"],
        "techno-hideo": ["TechnoHideo", "sans-serif"],
        supercrawler: ["SuperCrawler", "sans-serif"],
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        slideDown: "slideDown 0.3s ease-out",
      },
      keyframes: {
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      backgroundColor: {
        glass: "rgba(0, 0, 0, 0.4)",
      },
      backdropBlur: {
        glass: "20px",
      },
      borderColor: {
        glass: "rgba(255, 255, 255, 0.1)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #d4af37, #e6c65c)",
        "dark-gradient": "linear-gradient(180deg, #000000, #111111)",
        "scnd-gradient": "linear-gradient(180deg, #111111, #000000 )",
        "glass-gradient":
          "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
      },
    },
  },
  plugins: [],
}
