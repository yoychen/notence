import { combineReducers } from "redux";
import databases from "../slices/databases";
import views from "../slices/views";
import pages from "../slices/pages";
import properties from "../slices/properties";

export default combineReducers({
  databases,
  views,
  pages,
  properties,
});
