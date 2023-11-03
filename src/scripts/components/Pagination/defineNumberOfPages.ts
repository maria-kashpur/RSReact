export default function defineNumberOfPages(pages: number, limit = 100) {
  if (pages === 0) return 0;
  const head = Math.trunc(pages / limit);
  const tail = pages % limit;
  return tail === 0 ? head : head + 1;
}
