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

describe('HTML 파일을 불러올 수 있어야 한다.', () => {
  let document;
  let serializedHTML;
  beforeAll(() => {
    return JSDOM.fromFile('./src/home.html').then(dom => {
      document = dom.window.document;
      serializedHTML = dom.serialize();
      serializedHTML = removeSpace(serializedHTML)
    });
  });

  test('#hello div에 Hello world라는 글자가 있어야 한다.', () => {
    const div = document.getElementById('hello');
    expect(div.innerHTML).toBe('Hello world');
  });

  test('home.html에서 불러온 string이 home.html과 일치해야 한다.', () => {
    let HTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <div id="hello">Hello world</div>
      </body>
      </html>
    `;

    HTML = removeSpace(HTML);
    expect(serializedHTML).toBe(HTML)
  });
});

function removeSpace(str) {
  let newStr = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') newStr += str[i];
  }
  return newStr.replace(/(\r\n\t|\n|\r\t)/gm, ''); // 줄바꿈 제거
}
  