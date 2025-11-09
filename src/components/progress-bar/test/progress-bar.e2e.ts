import { newE2EPage } from '@stencil/core/testing';

describe('progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<progress-bar></progress-bar>');

    const element = await page.find('progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});
