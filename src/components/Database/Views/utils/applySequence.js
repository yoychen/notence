const findPage = (pages, pageId) => pages.find((page) => page.id === pageId);

export default (pages, sequence) => {
  const sequentialPages = sequence
    .map((pageId) => findPage(pages, pageId))
    .filter((page) => page !== undefined);
  const excludedPages = pages.filter((page) => sequence.indexOf(page.id) === -1);

  return [...sequentialPages, ...excludedPages];
};
