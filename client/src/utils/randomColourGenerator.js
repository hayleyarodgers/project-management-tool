// Pick random colours for graph
export const getRandomColor = () => {
  const colours = [
    "#FF1233",
    "#FF8000",
    "#FFDE12",
    "#12FF68",
    "#00FFFF",
    "#1233FF",
    "#7F00FF",
    "#FF12A9",
    "#000000",
    "#808080",
  ];

  return colours[Math.floor(Math.random() * colours.length)];
};
