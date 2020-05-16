import shortid from "shortid";

const colorMap = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

const getRandomColor = () => colorMap[Math.floor(Math.random() * colorMap.length)];

export default (name) => {
  return {
    id: shortid.generate(),
    name,
    color: getRandomColor(),
  };
};
