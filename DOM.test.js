const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('가상의 DOM을 만들 수 있어야 한다.', () => {
  test('Hello world라는 글자를 읽을 수 있어야 한다.', () => {
    const dom = new JSDOM(`<!DOCTYPE html><p id="hello">Hello world</p>`);
    const document = dom.window.document;
    const text = document.getElementById('hello').innerHTML;
    expect(text).toBe('Hello world');
  });
});

describe('google을 불러올 수 있어야 한다.', () => {
  let document;
  beforeAll(() => {
    return JSDOM.fromURL("https://www.google.com/").then(dom => {
      document = dom.window.document;
    });
  });
  
  test('구글 로고 그림이 있어야 한다.', () => {
    const logo = document.querySelector('#hplogo');
    expect(logo).toBeTruthy();
  });

  test('로그인 버튼의 글자를 불러올 수 있어야 한다.', () => {
    const login = document.querySelector('#gb_70');
    expect(login.innerHTML).toBe('로그인');
  });
});
  