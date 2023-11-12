export default function defineNumberOfPages(items: number, limit = 100) {
  if (items <= 0) return 0;
  const head = Math.trunc(items / limit);
  const tail = items % limit;
  return tail === 0 ? head : head + 1;
}
