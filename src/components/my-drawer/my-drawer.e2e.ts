import { newE2EPage } from '@stencil/core/testing';

describe('my-drawer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer></my-drawer>');

    const element = await page.find('my-drawer');
    expect(element).toHaveClass('hydrated');
  });

  it('opens and closes the drawer', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer></my-drawer>');

    const component = await page.find('my-drawer');

    // Initially closed
    expect(await component.getProperty('open')).toBe(false);

    // Open the drawer
    await component.setProperty('open', true);
    await page.waitForChanges();

    expect(await component.getProperty('open')).toBe(true);

    // Check if drawer content is visible
    const drawerContainer = await page.find('my-drawer >>> .drawer-container');
    expect(drawerContainer).toBeTruthy();
  });

  it('responds to keyboard events', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer open="true"></my-drawer>');

    const component = await page.find('my-drawer');

    // Press Escape key
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    expect(await component.getProperty('open')).toBe(false);
  });

  it('closes on overlay click', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer open="true"></my-drawer>');

    const component = await page.find('my-drawer');
    const overlay = await page.find('my-drawer >>> .overlay');

    expect(await component.getProperty('open')).toBe(true);

    // Click on overlay
    await overlay.click();
    await page.waitForChanges();

    expect(await component.getProperty('open')).toBe(false);
  });

  it('does not close on overlay click when closeOnOverlayClick is false', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer open="true" close-on-overlay-click="false"></my-drawer>');

    const component = await page.find('my-drawer');
    const overlay = await page.find('my-drawer >>> .overlay');

    expect(await component.getProperty('open')).toBe(true);

    // Click on overlay
    await overlay.click();
    await page.waitForChanges();

    // Should still be open
    expect(await component.getProperty('open')).toBe(true);
  });

  it('emits events when opening and closing', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer></my-drawer>');

    const component = await page.find('my-drawer');
    const openedSpy = await component.spyOnEvent('drawerOpened');
    const closedSpy = await component.spyOnEvent('drawerClosed');
    const toggleSpy = await component.spyOnEvent('drawerToggle');

    // Open drawer
    await component.callMethod('openDrawer');
    await new Promise(resolve => setTimeout(resolve, 350)); // Wait for animation

    expect(openedSpy).toHaveReceivedEvent();
    expect(toggleSpy).toHaveReceivedEventDetail(true);

    // Close drawer
    await component.callMethod('closeDrawer');
    await new Promise(resolve => setTimeout(resolve, 350)); // Wait for animation

    expect(closedSpy).toHaveReceivedEvent();
    expect(toggleSpy).toHaveReceivedEventDetail(false);
  });

  it('renders with different positions', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer open="true" position="right"></my-drawer>');

    const drawer = await page.find('my-drawer >>> .drawer--right');
    expect(drawer).toBeTruthy();
  });

  it('renders with custom dimensions', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer open="true" width="400px"></my-drawer>');

    const drawer = await page.find('my-drawer >>> .drawer');
    const styles = await drawer.getComputedStyle();
    expect(styles.width).toBe('400px');
  });

  it('hides overlay when showOverlay is false', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer open="true" show-overlay="false"></my-drawer>');

    const overlay = await page.find('my-drawer >>> .overlay');
    expect(overlay).toBeFalsy();
  });

  it('applies custom classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer open="true" drawer-class="custom-drawer" overlay-class="custom-overlay"></my-drawer>');

    const drawer = await page.find('my-drawer >>> .drawer.custom-drawer');
    const overlay = await page.find('my-drawer >>> .overlay.custom-overlay');

    expect(drawer).toBeTruthy();
    expect(overlay).toBeTruthy();
  });

  it('renders slotted content', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <my-drawer open="true">
        <div class="test-content">Test Content</div>
      </my-drawer>
    `);

    const content = await page.find('my-drawer .test-content');
    expect(content).toBeTruthy();
    expect(content.textContent).toBe('Test Content');
  });

  it('toggles drawer state', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer></my-drawer>');

    const component = await page.find('my-drawer');

    // Initially closed
    expect(await component.getProperty('open')).toBe(false);

    // Toggle to open
    await component.callMethod('toggle');
    await page.waitForChanges();
    expect(await component.getProperty('open')).toBe(true);

    // Toggle to closed
    await component.callMethod('toggle');
    await page.waitForChanges();
    expect(await component.getProperty('open')).toBe(false);
  });

  it('prevents body scroll when drawer is open', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-drawer></my-drawer>');

    const component = await page.find('my-drawer');

    // Open drawer
    await component.callMethod('openDrawer');
    await page.waitForChanges();

    const bodyStyle = await page.evaluate(() => document.body.style.overflow);
    expect(bodyStyle).toBe('hidden');

    // Close drawer
    await component.callMethod('closeDrawer');
    await new Promise(resolve => setTimeout(resolve, 350)); // Wait for animation

    const bodyStyleAfter = await page.evaluate(() => document.body.style.overflow);
    expect(bodyStyleAfter).toBe('');
  });
});
