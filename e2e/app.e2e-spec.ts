import { SmartadminPage } from './app.po';

describe('smartadmin App', function() {
  let page: SmartadminPage;

  beforeEach(() => {
    page = new SmartadminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
