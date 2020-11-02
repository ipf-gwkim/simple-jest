const rewire = require('rewire');

describe('function을 불러올 수 있어야 한다.', () => {
  const sumModule = rewire('./src/sum.js');
  const sum = sumModule.__get__('sum');
  
  test('1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
})

describe('prototype function을 불러올 수 있어야 한다.', () => {
  const bookModule = rewire('./src/book.js');
  Book = bookModule.__get__('Book');
  let book;

  test('인스턴스를 생성할 때 넣은 title이 들어 있어야 한다.', () => {
    book = new Book('어린 왕자', 1);
    expect(book.title).toBe('어린 왕자');
  });

  test('prototype function이 작동돼야 한다.', () => {
    book = new Book('어린 왕자', 1);
    book.next();
    book.next();
    expect(book.currentPage).toBe(3);
  });
})