import { groupColors } from "./constants";

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * groupColors.length);

  return groupColors[randomIndex];
};
