# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

---

## 🔗 Firebase Integration (Real-Time Chat Demo)

This project includes a sample integration with [Firebase](https://firebase.google.com/):
- **Config and initialization**: See [`src/firebase.js`](src/firebase.js)
- **Real-time chat**: Demo chat uses Firestore database for instant message updates across clients.

### How to set up your Firebase config

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com/).
2. **Register a Web App** in your Firebase Project settings.
3. **Copy the config object** (from the Firebase SDK snippet in your console).
4. **Replace the `FIREBASE_CONFIG`** in [`src/firebase.js`](src/firebase.js) with your credentials.
    - For security, store keys in a `.env.local` file and reference via `process.env`, or use deployment secrets.
    - **DO NOT COMMIT PRIVATE/PRODUCTION KEYS TO PUBLIC REPOS.**
5. **Add a Firestore database** (test mode is OK for demos) and create a collection `chat`.
6. The EscapeSync container will auto-sync chat in real-time between browser tabs/users if Firebase is configured.

**For production:**
- Lock down your Firestore rules to prevent unauthorized writes/reads.
- Use authentication if handling user data.

See extensive code comments in [`src/firebase.js`](src/firebase.js).

---

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
