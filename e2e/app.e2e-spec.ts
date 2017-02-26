import { ColorCheckPage } from './app.po';

describe('color-check App', function() {
  let page: ColorCheckPage;

  beforeEach(() => {
    page = new ColorCheckPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
