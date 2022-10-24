// Pick random colours for graph
export const getRandomColor = () => {
  const colours = [
    "#FF0000",
    "#FF8000",
    "#FFFF00",
    "#00FF00",
    "#00FFFF",
    "#1233FF",
    "#7F00FF",
    "#FF00FF",
    "#FF007F",
    "#000000",
    "#808080",
  ];

  return colours[Math.floor(Math.random() * colours.length)];
};
