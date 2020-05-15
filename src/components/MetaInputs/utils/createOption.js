import shortid from "shortid";
import randomColor from "randomcolor";

export default (name) => {
  return {
    id: shortid.generate(),
    name,
    color: randomColor({
      luminosity: "light",
    }),
  };
};
