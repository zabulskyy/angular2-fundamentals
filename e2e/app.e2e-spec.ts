import { Angular2FundamentalsPage } from './app.po';

describe('angular2-fundamentals App', () => {
  let page: Angular2FundamentalsPage;

  beforeEach(() => {
    page = new Angular2FundamentalsPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
