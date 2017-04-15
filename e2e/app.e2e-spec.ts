import { QssMobilePage } from './app.po';

describe('qss-mobile App', () => {
  let page: QssMobilePage;

  beforeEach(() => {
    page = new QssMobilePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
