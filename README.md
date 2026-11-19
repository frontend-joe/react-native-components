# React Native Components

A catalogue of React Native component examples, the native sibling of `react-components`.
Expo (SDK 58) + Expo Router, plain JS/JSX.

## Run

```bash
yarn ios      # iOS simulator (Expo Go)
yarn android
yarn web
```

## Structure

```
src/
  app/
    _layout.jsx              # root Stack
    index.jsx                # catalogue list (sorted, searchable)
    [category]/[name].jsx    # renders whichever component matches the path
  routes.js                  # the registry: name, path, Component
  components/
    index.js                 # re-exports every category
    <category>/
      index.js               # re-exports each component in the category
      <Name>/
        <Name>.jsx           # the reusable component (props in, StyleSheet styles)
        <Name>Example.jsx    # optional demo wrapper with sample data / page background
        image.jpg ...        # assets live next to the component
  theme/colors.js            # catalogue shell colours
```

## Adding a component

1. Create `src/components/<category>/<Name>/<Name>.jsx` (plus `<Name>Example.jsx` if it needs demo data).
2. Export it from `src/components/<category>/index.js` (and add the category to `src/components/index.js` if it's new).
3. Add an entry to `src/routes.js`:

   ```js
   { name: "Card3", path: "/cards/card-3", Component: Card3Example },
   ```

   `path` must be `/<category>/<name>`. Example screens have no header (swipe right to go back), so pad for the top safe area with `useSafeAreaInsets()` if content sits near the top.

## Porting from the web catalogue

- CSS files become `StyleSheet.create` at the bottom of the component file.
- `<div>` → `View`, text must be inside `Text`, `<button>` → `Pressable`, `<img>` → `Image`.
- CSS gradients → `expo-linear-gradient`. CSS keyframes → `Animated` (use `useNativeDriver: true` for transform/opacity).
- Design for phone width first. Horizontal web layouts usually stack vertically.
- Downscale images before adding them (`sips -Z 1200 file.jpg`). The web originals can be several MB.
- `StyleSheet.absoluteFill` / `absoluteFillObject` no longer exist in RN 0.88. Use `{ position: "absolute", inset: 0 }`.
