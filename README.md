# Recipe with Adjustable Servings

A small, dependency-free recipe website for Petulla, an Albanian fried dough recipe.

The page allows users to change the number of servings and automatically updates the fixed ingredient quantities. It also includes responsive layouts, keyboard accessibility, screen-reader announcements, a mobile ingredients/method switcher, dark-mode support, and reduced-motion support.

The project uses plain HTML, CSS and JavaScript. There is no build system, framework, package installation, or required environment variable.

## Features

- Adjustable servings from 1 to 24.
- Plus and minus buttons for changing servings.
- Number input for entering servings directly.
- Ingredient quantities automatically scale from the base recipe of 4 servings.
- Grams and milliliters are rounded to whole numbers.
- Spoon measurements use common fractions where appropriate.
- Ingredients without fixed quantities are not scaled.
- Singular/plural wording changes between "serving" and "servings".
- Responsive layout for desktop and mobile screens.
- Mobile switcher for viewing ingredients or method without excessive scrolling.
- Keyboard-friendly controls.
- Visible keyboard focus indicators.
- Skip link for keyboard users.
- Screen-reader announcements when ingredient quantities change.
- Dark theme using the user's system colour preference.
- Reduced-motion preference is respected.
- No external libraries or dependencies.

## Project structure

```
recipe-servings/
├── index.html
├── style.css
├── script.js
└── README.md
```

### index.html

Contains the recipe content and the semantic page structure:

- page heading and introduction
- servings controls
- ingredients list
- method steps
- accessibility labels and relationships
- mobile ingredients/method switcher

### style.css

Contains all visual styling, including:

- colours and typography
- recipe panels
- servings controls
- responsive layout
- keyboard focus styles
- mobile layout
- dark mode
- reduced-motion support
- screen-reader-only content

### script.js

Controls the interactive behaviour:

- servings calculation
- ingredient quantity updates
- minimum and maximum servings
- quantity formatting
- screen-reader announcements
- mobile ingredients/method switching

## Requirements

The project has no special runtime requirements.

You need:

- A modern web browser.
- Git, if you want to clone or contribute to the project.

No API key, database, environment variable, Node.js installation, or build tool is required.

## Running the project

### Option 1: Open directly

Clone the repository:

```
git clone <repository-url>
```

Enter the project directory:

```
cd recipe-servings
```

Open `index.html` in a modern web browser.

### Option 2: Run a local server

If you have Node.js installed, you can use a simple local server:

```
npx serve .
```

Then open the local address shown in the terminal.

The project does not require a build step.

## How to use it

1. Open the recipe page.
2. The recipe starts at 4 servings.
3. Use **+** to increase the number of servings.
4. Use **−** to decrease the number of servings.
5. Alternatively, type a number directly into the servings field.
6. The fixed ingredient quantities update automatically.
7. On a narrow screen, use the **Ingredients** and **Method** buttons to switch between the two sections.

The allowed serving range is 1 to 24. Ingredients such as sunflower oil and feta or jam are not scaled because their quantities are intentionally described as "as needed" or "to serve".

## How the quantity calculation works

The original recipe quantities are written for 4 servings.

The JavaScript calculates a scaling factor:

```
scaling factor = requested servings / 4
```

Each ingredient with a fixed quantity is multiplied by this factor.

For example:

```
500 g flour × (6 / 4) = 750 g
```

The original ingredient quantities remain in the HTML using `data-qty` and `data-unit` attributes. JavaScript uses those values as the source for recalculation.

## Accessibility

Accessibility was considered as part of the implementation rather than added only as visual styling.

### Keyboard navigation

The page uses native HTML buttons and an input field so the main controls can be reached and operated with a keyboard.

A skip link allows keyboard users to jump directly to the recipe content.

### Focus visibility

Interactive elements have a visible `:focus-visible` outline.

The focus colour is separate from the main button colour so it remains visible across the light and dark themes.

### Screen-reader announcements

Changing the servings updates the visible ingredient quantities, but a screen reader would not necessarily announce those changes automatically.

The page therefore uses a visually hidden live region:

```html
<p id="status" class="sr-only" role="status" aria-live="polite"></p>
```

JavaScript places a description of the updated quantities into this region.

Announcements are delayed by 500 milliseconds so repeated clicks do not create a long queue of announcements.

### Accessible controls

The servings buttons have descriptive `aria-label` values.

The mobile switcher uses `aria-pressed` to communicate which section is currently selected and `aria-controls` to identify the section controlled by each button.

### Touch targets

Interactive controls have a minimum size of approximately 44px, making them easier to use on touch screens.

## Responsive behaviour

On wider screens, ingredients and method are displayed side by side.

On screens narrower than approximately 45rem, the page switches to a single-panel layout.

The mobile layout provides two buttons:

- Ingredients
- Method

Only the selected section is shown on narrow screens.

The switcher remains sticky near the top of the viewport so the user can move between ingredients and method without repeatedly scrolling through the entire page.

This was chosen instead of a traditional accordion because the recipe is frequently used while cooking, and the user may need to switch between ingredients and instructions repeatedly.

## Visual preferences

### Dark mode

The page uses the browser/operating system preference through:

```css
@media (prefers-color-scheme: dark)
```

A separate dark colour palette is provided for the background, text, panels, borders, buttons, and focus indicator.

There is no manual theme switch because the project currently follows the user's system preference.

### Reduced motion

The page respects:

```css
@media (prefers-reduced-motion: reduce)
```

Animations and transitions are disabled when the user has requested reduced motion.

## Design and implementation decisions

### Why plain HTML, CSS and JavaScript?

The project is intentionally small, so a framework or build system would add complexity without providing a necessary benefit.

Using browser-native HTML, CSS and JavaScript keeps the project easy to understand, run, and modify.

### Why store the base quantities in HTML?

The recipe's original quantities are part of the content, so they remain visible in the HTML through `data-qty` and `data-unit`.

JavaScript calculates the displayed value from those original values rather than repeatedly modifying an already-calculated quantity.

This avoids cumulative calculation errors when the user changes servings several times.

### Why use aria-disabled instead of disabled?

At the minimum and maximum serving limits, the plus or minus button cannot perform another change.

The project uses `aria-disabled` rather than the native `disabled` attribute so the control can retain keyboard focus.

This avoids unexpectedly moving keyboard users away from the control when they reach a limit.

### Why use a mobile switcher?

On a small screen, displaying the complete ingredients list followed by the complete method can require a lot of scrolling.

The mobile switcher keeps the two sections close to the user's current position.

The trade-off is that ingredients and method cannot be viewed simultaneously on a narrow screen.

## Testing

The following manual checks were performed:

- Tested the servings plus button.
- Tested the servings minus button.
- Tested entering a serving number manually.
- Tested the minimum serving value of 1.
- Tested the maximum serving value of 24.
- Checked that ingredient quantities update when servings change.
- Checked that non-scaled ingredients remain unchanged.
- Tested keyboard navigation.
- Tested visible focus indicators.
- Tested the skip link.
- Tested the mobile ingredients/method switcher.
- Tested the responsive layout at approximately 320px width.
- Checked that the page does not require horizontal scrolling at 320px.
- Tested screen-reader quantity announcements.
- Checked dark-mode styling using the system colour preference.
- Checked reduced-motion behaviour.

## Known limitations

This project intentionally keeps the scope small.

- It does not save the user's selected serving count after the page is closed or refreshed.
- It does not provide a user account or database.
- It does not store recipes.
- It does not allow users to add or edit ingredients.
- It does not automatically convert between measurement systems.
- It does not scale ingredients described as "as needed" or "to serve".
- It does not have a manual light/dark theme switch.
- It does not use a backend or API.
- The recipe content is currently limited to the Petulla recipe included in the page.

These are deliberate scope limitations rather than required features of the current project.

## Browser support

The project is designed for modern browsers that support standard HTML, CSS and JavaScript features such as:

- CSS Grid
- CSS custom properties
- `matchMedia`
- `aria-*` attributes
- `:focus-visible`
- `prefers-color-scheme`
- `prefers-reduced-motion`

No transpilation or browser-specific build process is used.

## Future improvements

Possible future improvements include:

- Saving the selected serving count in local storage.
- Supporting additional recipes.
- Adding metric/imperial unit conversion.
- Adding a manual theme switch.
- Adding automated accessibility tests.
- Adding automated tests for quantity calculations.

These features are outside the scope of the current version.

## License

No license has been specified for this project yet.