// Single source of truth for themes. Home renders the picker; App applies
// the class to <html> so every route (Focus, 404) is themed on first paint.
export const THEMES = [
  {
    id: "light",
    label: "Light",
    isDark: false,
    swatch: { bg: "#f5f4f0", card: "#ffffff", text: "#1c1d21" },
  },
  {
    id: "dark",
    label: "Dark",
    isDark: true,
    swatch: { bg: "#121316", card: "#1a1b1e", text: "#f5f5f5" },
  },
  {
    id: "nordic",
    label: "Nordic",
    isDark: true,
    swatch: { bg: "#0f1522", card: "#171f31", text: "#e7ecf7" },
  },
  {
    id: "paper",
    label: "Paper",
    isDark: false,
    swatch: { bg: "#f3eee4", card: "#fbf8f1", text: "#2f2b23" },
  },
  {
    id: "forest",
    label: "Forest",
    isDark: true,
    swatch: { bg: "#101712", card: "#17211a", text: "#e4efe6" },
  },
  {
    id: "sakura",
    label: "Sakura",
    isDark: false,
    swatch: { bg: "#faf1f2", card: "#fffdfd", text: "#30262a" },
  },
];
