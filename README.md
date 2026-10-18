# Recipe with Adjustable Servings

A small recipe page for petulla (Albanian fried dough). Change the number of servings and the ingredient quantities scale automatically. Plain HTML, CSS and JavaScript: no build step, no dependencies.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## How it works

- Servings go from 1 to 24, using the + and − buttons or by typing a number.
- Quantities are written once in `index.html` for 4 servings (`data-qty`, `data-unit`). The script multiplies them by `servings / 4`, so repeated changes never accumulate rounding errors.
- Grams and millilitres round to whole numbers, spoons use fractions (¼, ⅓, ½, ⅔, ¾). Items like oil for frying are not scaled.

## Accessibility

- **Keyboard:** native buttons and input, tab order matches the visual order, skip link to the recipe.
- **Focus:** visible `:focus-visible` outline on every interactive element.
- **Announcements:** a visually hidden `role="status"` live region announces the updated quantities (units spelled out, correct singular/plural). The announcement is debounced by 500 ms so quick clicks do not queue up.
- **Limits:** at 1 and 24 the buttons use `aria-disabled` instead of `disabled`, so keyboard focus is not lost.
- **Other:** dark mode and reduced motion follow system preferences; controls are at least 44px.

## Narrow screens: ingredients and method

On wide screens the two sections sit side by side. Below 45rem only one is shown at a time, and a sticky **Ingredients / Method** switch (`aria-pressed`, `aria-controls`) stays at the top, so the other section is one tap away without long scrolling. I chose this over an accordion because a cook switches between the two repeatedly. The trade-off: both cannot be seen at once on a phone.

## Manual checks

- Keyboard-only use, including the skip link and visible focus.
- 320px width: no horizontal scroll, switcher works.
- Screen reader: quantity announcement after pressing +.

## Limitations

One recipe only, the serving count is not saved between visits, and there is no unit conversion.