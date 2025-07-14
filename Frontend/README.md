# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Frontend Code Overview

The frontend of this project is built using React and Vite. Below is a Git-friendly explanation of the structure and purpose of the codebase:

### Key Features
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server for modern web projects.
- **ESLint**: Ensures code quality and consistency.

### Folder Structure
- `src/`: Contains all the source code for the frontend.
  - `components/`: Reusable React components.
  - `pages/`: Page-level components representing different routes.
  - `assets/`: Static assets like images, fonts, etc.
  - `styles/`: Global and component-specific styles.
  - `App.jsx`: The root component of the application.
  - `main.jsx`: The entry point for the React application.

### Development Workflow
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```bash
   cd HackByte/Frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Contribution Guidelines
- Create a new branch for your feature or bug fix:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- Commit your changes with meaningful messages:
  ```bash
  git commit -m "Add feature: your-feature-name"
  ```
- Push your branch and create a pull request:
  ```bash
  git push origin feature/your-feature-name
  ```

### Additional Notes
- Use ESLint to ensure code quality:
  ```bash
  npm run lint
  ```
- Build the project for production:
  ```bash
  npm run build
  ```

### Codebase Explanation

The codebase is structured to ensure scalability, maintainability, and ease of development. Below is a detailed explanation of its components:

1. **React Components**:
   - The `components/` folder contains reusable UI components that can be shared across different parts of the application. Each component is modular and follows React's functional component paradigm.

2. **Page-Level Components**:
   - The `pages/` folder contains components that represent individual pages or views in the application. These components are typically mapped to routes in the application.

3. **State Management**:
   - If state management is implemented, it will be integrated using React's Context API, Redux, or other libraries. State-related logic is kept separate to ensure a clean architecture.

4. **Routing**:
   - React Router is used for client-side routing. Routes are defined in a central location, and each route maps to a specific page component.

5. **Styling**:
   - The `styles/` folder contains global styles, utility classes, and component-specific styles. CSS modules or styled-components may be used for scoped styling.

6. **Static Assets**:
   - The `assets/` folder contains images, fonts, and other static resources used in the application.

7. **Entry Point**:
   - The `main.jsx` file is the entry point of the application, where the React app is initialized and rendered into the DOM.

8. **Configuration Files**:
   - The project includes configuration files like `vite.config.js` for Vite, `.eslintrc` for ESLint, and `package.json` for managing dependencies and scripts.

9. **Build and Deployment**:
   - The application is built using Vite's optimized build process. The output is a production-ready bundle that can be deployed to any static hosting service.

This structure ensures that the codebase is easy to navigate and extend as the project grows.

### Map Functionality

The application integrates a map feature to enhance user interaction and provide location-based functionalities. Below is an explanation of the map-related features:

1. **Map Integration**:
   - The map is rendered using a third-party library and is initialized in the `MyFam` component.
   - The `useMap` hook is used to set up the map instance and attach it to the DOM.

2. **User Markers**:
   - The `useGenerateUserMarker` hook is used to display markers for family members on the map.
   - Each marker represents the location of a family member, and the markers are dynamically updated based on real-time data.

3. **Geofencing**:
   - The `useMapCircle` hook is used to draw a circular geofence around a selected location.
   - The `useGeofenceAlert` hook monitors user locations and triggers alerts when they enter or exit the geofence.

4. **Search and Autocomplete**:
   - A search box is provided to allow users to search for locations.
   - The search functionality uses the Nominatim API to fetch location suggestions based on user input.
   - Users can select a location from the suggestions, and the map will fly to the selected location.

5. **Current Location**:
   - A "Current Location" button is available to center the map on the user's current location.
   - The application uses the browser's Geolocation API to fetch the user's coordinates and reverse geocodes them to display the location name.

6. **Real-Time Updates**:
   - The `useSocket` hook is used to receive real-time updates about family members' locations via WebSocket.

This map functionality provides an interactive and user-friendly way to visualize and manage family members' locations.
