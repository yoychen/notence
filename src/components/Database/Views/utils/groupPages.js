import { getMetaValue } from "../../../../slices/pages";

export default (property, pages) => {
  if (!property) {
    return null;
  }

  const { options } = property.additional;
  const pageGroups = options.reduce((groups, option) => {
    return {
      ...groups,
      [option.id]: {
        name: option.name,
        items: [],
      },
    };
  }, {});

  pageGroups.ungrouped = {
    name: "No Status",
    items: [],
  };

  pages.reduce((groups, page) => {
    const groupId = getMetaValue(page.meta, property) || "ungrouped";
    if (groups[groupId]) {
      groups[groupId].items.push(page);
    } else {
      // Handle non-existent group id (the option has been deleted).
      groups.ungrouped.items.push(page);
    }

    return groups;
  }, pageGroups);

  return pageGroups;
};
