import { newE2EPage } from '@stencil/core/testing';

describe('progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<progress-bar></progress-bar>');

    const element = await page.find('progress-bar');
    expect(element).toHaveClass('hydrated');
  });

  it('progresses to 100', async () => {
    const page = await newE2EPage();
    await page.setContent("<progress-bar progress='0'></progress-bar>");

    const element = await page.find('progress-bar');

    expect(element).toHaveClass('hydrated');
    expect(element).toEqualAttribute('data-state', 'running');
    expect(element).toEqualAttribute('data-value', '0');

    setTimeout(async () => {
      expect(element).toEqualAttribute('data-state', 'completed');
      expect(element).toEqualAttribute('data-value', '100');

      const progressBarFill = await page.find('progress-bar >>> .progress-bar-fill');
      expect(progressBarFill).toEqualAttribute('style', 'width: 100%;');
    }, 1000);
  });
});
