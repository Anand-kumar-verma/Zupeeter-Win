function descendingComparator(a, b, orderBy) {
  if (Number(b[orderBy]) < Number(a[orderBy])) {
    return -1;
  }
  if (Number(b[orderBy]) > Number(a[orderBy])) {
    return 1;
  }
  return 0;
}
export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
