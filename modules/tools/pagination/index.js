export function calculateOffset(curPage, itemsPerPage) {
  if (!curPage || !itemsPerPage) {
    return 0;
  }

  return (curPage - 1) * itemsPerPage;
}
