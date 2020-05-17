import Text from "./Text";
import Select from "./Select";
import MultiSelect from "./MultiSelect";

const metaInputs = {
  Text,
  Select,
  MultiSelect,
};

export const getInputNames = () => Object.keys(metaInputs);
export const getInput = (type) => metaInputs[type];
export const getDefaultValue = (type) => getInput(type).defaultValue;
export const getDefaultAdditional = (type) => getInput(type).defaultAdditional || {};
export const getDisplay = (type) => getInput(type).Display;
export const getFilterMethods = (type) => getInput(type).filterMethods || {};
