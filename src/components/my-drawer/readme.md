# my-drawer



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute                | Description                                     | Type                                     | Default   |
| --------------------- | ------------------------ | ----------------------------------------------- | ---------------------------------------- | --------- |
| `closeOnEscape`       | `close-on-escape`        | Whether pressing Escape key closes the drawer   | `boolean`                                | `true`    |
| `closeOnOverlayClick` | `close-on-overlay-click` | Whether clicking the overlay closes the drawer  | `boolean`                                | `true`    |
| `drawerClass`         | `drawer-class`           | Custom CSS class for the drawer content         | `string`                                 | `''`      |
| `height`              | `height`                 | Height of the drawer (for top/bottom positions) | `string`                                 | `'320px'` |
| `open`                | `open`                   | Whether the drawer is open                      | `boolean`                                | `false`   |
| `overlayClass`        | `overlay-class`          | Custom CSS class for the overlay                | `string`                                 | `''`      |
| `position`            | `position`               | Position of the drawer                          | `"bottom" \| "left" \| "right" \| "top"` | `'left'`  |
| `showOverlay`         | `show-overlay`           | Whether to show the overlay backdrop            | `boolean`                                | `true`    |
| `width`               | `width`                  | Width of the drawer (for left/right positions)  | `string`                                 | `'320px'` |


## Events

| Event          | Description                                  | Type                   |
| -------------- | -------------------------------------------- | ---------------------- |
| `drawerClosed` | Event emitted when drawer closes             | `CustomEvent<void>`    |
| `drawerOpened` | Event emitted when drawer opens              | `CustomEvent<void>`    |
| `drawerToggle` | Event emitted when drawer open state changes | `CustomEvent<boolean>` |


## Methods

### `closeDrawer() => Promise<void>`

Closes the drawer

#### Returns

Type: `Promise<void>`



### `openDrawer() => Promise<void>`

Opens the drawer

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggles the drawer open/closed state

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
