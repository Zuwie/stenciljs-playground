import { newSpecPage } from '@stencil/core/testing';
import { MyDrawer } from './my-drawer';

describe('my-drawer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer></my-drawer>`,
    });
    expect(page.root).toEqualHtml(`
      <my-drawer>
        <mock:shadow-root>
        </mock:shadow-root>
      </my-drawer>
    `);
  });

  it('renders with open prop', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true"></my-drawer>`,
    });

    expect(page.root).toHaveAttribute('open');
    const drawerContainer = page.root.shadowRoot.querySelector('.drawer-container');
    expect(drawerContainer).toBeTruthy();
  });

  it('renders with left position by default', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true"></my-drawer>`,
    });

    const drawer = page.root.shadowRoot.querySelector('.drawer--left');
    expect(drawer).toBeTruthy();
  });

  it('renders with custom position', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true" position="right"></my-drawer>`,
    });

    const drawer = page.root.shadowRoot.querySelector('.drawer--right');
    expect(drawer).toBeTruthy();
  });

  it('renders with custom width', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true" width="500px"></my-drawer>`,
    });

    const drawer = page.root.shadowRoot.querySelector('.drawer');
    const styles = drawer.getAttribute('style');
    expect(styles).toContain('width: 500px');
  });

  it('renders with custom height for top/bottom positions', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true" position="top" height="400px"></my-drawer>`,
    });

    const drawer = page.root.shadowRoot.querySelector('.drawer');
    const styles = drawer.getAttribute('style');
    expect(styles).toContain('height: 400px');
  });

  it('does not render overlay when showOverlay is false', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true" show-overlay="false"></my-drawer>`,
    });

    const overlay = page.root.shadowRoot.querySelector('.overlay');
    expect(overlay).toBeFalsy();
  });

  it('renders overlay by default', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true"></my-drawer>`,
    });

    const overlay = page.root.shadowRoot.querySelector('.overlay');
    expect(overlay).toBeTruthy();
  });

  it('applies custom drawer class', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true" drawer-class="custom-drawer"></my-drawer>`,
    });

    const drawer = page.root.shadowRoot.querySelector('.drawer.custom-drawer');
    expect(drawer).toBeTruthy();
  });

  it('applies custom overlay class', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true" overlay-class="custom-overlay"></my-drawer>`,
    });

    const overlay = page.root.shadowRoot.querySelector('.overlay.custom-overlay');
    expect(overlay).toBeTruthy();
  });

  it('has correct ARIA attributes', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true"></my-drawer>`,
    });

    const drawer = page.root.shadowRoot.querySelector('.drawer');
    expect(drawer.getAttribute('role')).toBe('dialog');
    expect(drawer.getAttribute('aria-modal')).toBe('true');
    expect(drawer.getAttribute('aria-hidden')).toBe('false');
  });

  it('has correct ARIA attributes when closed', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer></my-drawer>`,
    });

    // When closed, the drawer should not be rendered
    const drawer = page.root.shadowRoot.querySelector('.drawer');
    expect(drawer).toBeFalsy();
  });

  it('renders slot content', async () => {
    const page = await newSpecPage({
      components: [MyDrawer],
      html: `<my-drawer open="true">
        <div>Test Content</div>
      </my-drawer>`,
    });

    const slot = page.root.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  describe('Methods', () => {
    it('should call openDrawer method', async () => {
      const page = await newSpecPage({
        components: [MyDrawer],
        html: `<my-drawer></my-drawer>`,
      });

      const component = page.rootInstance;
      await component.openDrawer();

      expect(component.open).toBe(true);
    });

    it('should call closeDrawer method', async () => {
      const page = await newSpecPage({
        components: [MyDrawer],
        html: `<my-drawer open="true"></my-drawer>`,
      });

      const component = page.rootInstance;
      await component.closeDrawer();

      expect(component.open).toBe(false);
    });

    it('should call toggle method', async () => {
      const page = await newSpecPage({
        components: [MyDrawer],
        html: `<my-drawer></my-drawer>`,
      });

      const component = page.rootInstance;

      // Toggle from closed to open
      await component.toggle();
      expect(component.open).toBe(true);

      // Toggle from open to closed
      await component.toggle();
      expect(component.open).toBe(false);
    });
  });

  describe('Events', () => {
    it('should emit drawerOpened event', async () => {
      const page = await newSpecPage({
        components: [MyDrawer],
        html: `<my-drawer></my-drawer>`,
      });

      const component = page.rootInstance;
      const openedSpy = jest.fn();

      page.root.addEventListener('drawerOpened', openedSpy);

      component.openDrawer();

      // Wait for animation timeout
      await new Promise(resolve => setTimeout(resolve, 350));

      expect(openedSpy).toHaveBeenCalled();
    });

    it('should emit drawerClosed event', async () => {
      const page = await newSpecPage({
        components: [MyDrawer],
        html: `<my-drawer open="true"></my-drawer>`,
      });

      const component = page.rootInstance;
      const closedSpy = jest.fn();

      page.root.addEventListener('drawerClosed', closedSpy);

      component.closeDrawer();

      // Wait for animation timeout
      await new Promise(resolve => setTimeout(resolve, 350));

      expect(closedSpy).toHaveBeenCalled();
    });

    it('should emit drawerToggle event', async () => {
      const page = await newSpecPage({
        components: [MyDrawer],
        html: `<my-drawer></my-drawer>`,
      });

      const component = page.rootInstance;
      const toggleSpy = jest.fn();

      page.root.addEventListener('drawerToggle', toggleSpy);

      component.openDrawer();

      // Wait for animation timeout
      await new Promise(resolve => setTimeout(resolve, 350));

      expect(toggleSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          detail: true,
        }),
      );
    });
  });
});
