import ListView from "./List";

const views = {
  ListView,
};

export const getView = (type) => views[type];
export const getViewNames = () => Object.keys(views);
