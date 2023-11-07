import defineNumberOfPages from './defineNumberOfPages';

describe('testing defineNumberOfPage', () => {
  test('defineNumberOfPages should return number of page', () => {
    expect(defineNumberOfPages(100, 100)).toBe(1);
    expect(defineNumberOfPages(101, 100)).toBe(2);
    expect(defineNumberOfPages(0, 100)).toBe(0);
    expect(defineNumberOfPages(0)).toBe(0);
    expect(defineNumberOfPages(101)).toBe(2);
    expect(defineNumberOfPages(-1, 100)).toBe(0);
    expect(defineNumberOfPages(60, 50)).toBe(2);
    expect(defineNumberOfPages(104, 50)).toBe(3);
  });
});
