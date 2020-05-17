import metaInputs from "../../../MetaInputs";
import { getMetaValue } from "../../../../slices/pages";

const applyFilterRules = (page, filters, properties) => {
  return filters.reduce((included, { propertyId, method, args }) => {
    if (!propertyId || !method) {
      return included;
    }

    const filterProperty = properties.find((property) => property.id === propertyId);
    const filterMethod = metaInputs[filterProperty.type].filterMethods[method];
    const propertyValue = getMetaValue(page.meta, filterProperty);

    return included && filterMethod(propertyValue, args);
  }, true);
};

export default (pages, filters, properties) => {
  return pages.filter((page) => applyFilterRules(page, filters, properties));
};
