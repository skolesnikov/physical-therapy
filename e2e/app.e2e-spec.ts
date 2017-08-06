import { PhysicalTherapyPage } from './app.po';

describe('physical-therapy App', () => {
  let page: PhysicalTherapyPage;

  beforeEach(() => {
    page = new PhysicalTherapyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
