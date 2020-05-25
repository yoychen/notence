import ListView from "./List";
import BoardView from "./Board";

const views = {
  ListView,
  BoardView,
};

export const getView = (type) => views[type];
export const getViewNames = () => Object.keys(views);
