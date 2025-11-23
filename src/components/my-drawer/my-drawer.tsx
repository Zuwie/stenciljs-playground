import { Component, Prop, State, Element, Event, EventEmitter, Method, Watch, h } from '@stencil/core';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

@Component({
  tag: 'my-drawer',
  styleUrl: 'my-drawer.css',
  shadow: true,
})
export class MyDrawer {
  @Element() el: HTMLElement;

  /**
   * Whether the drawer is open
   */
  @Prop({ mutable: true, reflect: true }) open: boolean = false;

  /**
   * Position of the drawer
   */
  @Prop() position: DrawerPosition = 'left';

  /**
   * Width of the drawer (for left/right positions)
   */
  @Prop() width: string = '320px';

  /**
   * Height of the drawer (for top/bottom positions)
   */
  @Prop() height: string = '320px';

  /**
   * Whether clicking the overlay closes the drawer
   */
  @Prop() closeOnOverlayClick: boolean = true;

  /**
   * Whether pressing Escape key closes the drawer
   */
  @Prop() closeOnEscape: boolean = true;

  /**
   * Whether to show the overlay backdrop
   */
  @Prop() showOverlay: boolean = true;

  /**
   * Custom CSS class for the drawer content
   */
  @Prop() drawerClass: string = '';

  /**
   * Custom CSS class for the overlay
   */
  @Prop() overlayClass: string = '';

  @State() isVisible: boolean = false;
  @State() isAnimating: boolean = false;

  /**
   * Event emitted when drawer opens
   */
  @Event() drawerOpened: EventEmitter<void>;

  /**
   * Event emitted when drawer closes
   */
  @Event() drawerClosed: EventEmitter<void>;

  /**
   * Event emitted when drawer open state changes
   */
  @Event() drawerToggle: EventEmitter<boolean>;

  private keydownHandler = (event: KeyboardEvent) => {
    if (this.closeOnEscape && event.key === 'Escape' && this.open) {
      this.closeDrawer();
    }
  };

  componentDidLoad() {
    document.addEventListener('keydown', this.keydownHandler);
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  @Watch('open')
  watchOpen(newValue: boolean) {
    if (newValue) {
      this.openDrawer();
    } else {
      this.closeDrawer();
    }
  }

  /**
   * Opens the drawer
   */
  @Method()
  async openDrawer(): Promise<void> {
    if (this.open && this.isVisible) return;

    this.open = true;
    this.isVisible = true;
    this.isAnimating = true;

    // Prevent body scroll when drawer is open
    document.body.style.overflow = 'hidden';

    // Wait for animation to complete
    setTimeout(() => {
      this.isAnimating = false;
      this.drawerOpened.emit();
      this.drawerToggle.emit(true);
    }, 300);
  }

  /**
   * Closes the drawer
   */
  @Method()
  async closeDrawer(): Promise<void> {
    if (!this.open && !this.isVisible) return;

    this.open = false;
    this.isAnimating = true;

    // Wait for animation to complete before hiding
    setTimeout(() => {
      this.isVisible = false;
      this.isAnimating = false;
      document.body.style.overflow = '';
      this.drawerClosed.emit();
      this.drawerToggle.emit(false);
    }, 300);
  }

  /**
   * Toggles the drawer open/closed state
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.open) {
      await this.closeDrawer();
    } else {
      await this.openDrawer();
    }
  }

  private handleOverlayClick = (event: MouseEvent) => {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.closeDrawer();
    }
  };

  private getDrawerStyles() {
    const styles: { [key: string]: string } = {};

    if (this.position === 'left' || this.position === 'right') {
      styles.width = this.width;
      styles.height = '100%';
    } else {
      styles.width = '100%';
      styles.height = this.height;
    }

    return styles;
  }

  render() {
    if (!this.isVisible && !this.open) {
      return null;
    }

    const drawerClasses = {
      'drawer': true,
      [`drawer--${this.position}`]: true,
      'drawer--open': this.open,
      'drawer--animating': this.isAnimating,
      [this.drawerClass]: !!this.drawerClass,
    };

    const overlayClasses = {
      'overlay': true,
      'overlay--visible': this.open,
      [this.overlayClass]: !!this.overlayClass,
    };

    return (
      <div class="drawer-container">
        {this.showOverlay && <div class={overlayClasses} onClick={this.handleOverlayClick}></div>}
        <div class={drawerClasses} style={this.getDrawerStyles()} role="dialog" aria-modal="true" aria-hidden={!this.open ? 'true' : 'false'}>
          <div class="drawer-content">
            <slot></slot>
          </div>
        </div>
      </div>
    );
  }
}
