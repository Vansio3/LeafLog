# LeafLog - Tree Mapping PWA

LeafLog is a lightweight, offline-first Progressive Web App (PWA) designed for mapping and cataloging trees. Whether you're spotting interesting trees in your neighborhood or tracking trees you've planted, LeafLog provides a simple interface to record their location, species, notes, and even a photo, all accessible directly from your browser or installed on your device.

**Live Demo/Access:** [https://vansio3.github.io/LeafLog/](https://vansio3.github.io/LeafLog/) 

## Key Features

*   **Map-Based Logging:** Add trees directly to an interactive map.
*   **Add Spotted or Planted Trees:**
    *   Use the intuitive Floating Action Button (FAB) to select "Spot" or "Plant".
    *   Drag and drop the tree type onto the map to pinpoint its location.
*   **Tree Details:** Record essential information for each tree:
    *   Type (Spotted/Planted)
    *   Species
    *   Notes/Observations
    *   Photo (optional, stored as Data URL)
    *   Date Added
*   **Edit & Delete:** Easily modify tree details or remove entries.
*   **Interactive Map:**
    *   View all logged trees with custom markers.
    *   Click on a tree marker to view its details in a popup.
    *   Quickly edit, delete, or manage reminders from the popup.
*   **Custom Icons:**
    *   Distinct custom icon for the user's current location.
    *   Custom icon for tree markers on the map.
*   **User Location:** Center the map on your current GPS location.
*   **Map Layer Toggle:** Switch between Satellite and OpenStreetMap (Street View) base layers. The app remembers your preference.
*   **Sidebar Navigation:**
    *   Access lists of "Spotted Trees", "Planted Trees", and "Reminders".
    *   Quickly view counts for each category.
    *   Jump to a tree's location on the map from the sidebar list.
*   **Reminders:** Mark trees that need attention (e.g., for watering, inspection).
*   **Offline Functionality (PWA):**
    *   Designed to work offline after the initial load.
    *   Tree data is stored locally, allowing you to add and view trees without an internet connection.
*   **Persistent Storage:** All tree data is saved in the browser's `localStorage`.
*   **Installable (PWA):** Add LeafLog to your home screen on supported devices for an app-like experience.
*   **Responsive Design:** Adapts to various screen sizes, from mobile to desktop.
*   **No External Dependencies for Core Logic:** Runs entirely client-side once assets are loaded.

## Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
*   **Mapping:** [Leaflet.js](https://leafletjs.com/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Font Awesome](https://fontawesome.com/)
*   **PWA:** Service Worker, Web App Manifest

## Getting Started (Local Development)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Vansio3/LeafLog.git
    cd LeafLog
    ```
2.  **Serve the application:**
    Since this is a client-side application, you need a simple HTTP server to run it locally and for the Service Worker to register correctly.
    *   Using `npx` (Node.js required):
        ```bash
        npx serve
        ```
    *   Using Python 3:
        ```bash
        python -m http.server
        ```
    *   Or any other local web server.
3.  **Open in your browser:**
    Navigate to the local address provided by your server (e.g., `http://localhost:8080` or `http://localhost:3000`).

    **Note for Service Worker:** The Service Worker (`service-worker.js`) is expected to be served from the `/LeafLog/` path if you intend to deploy to a subdirectory like `username.github.io/LeafLog/`. If deploying to the root of a domain, you might need to adjust the registration path in `index.html` and the scope in `manifest.json`.

## How to Use

1.  **Open the App:** Access LeafLog through the provided URL or your local server.
2.  **Allow Location (Optional):** Grant location permissions to see your current position on the map.
3.  **Add a Tree:**
    *   Tap the main `+` FAB at the bottom right.
    *   Sub-FABs for "Spot" (binoculars) and "Plant" (seedling) will appear.
    *   Press and hold (or click and drag) one of the sub-FABs.
    *   Drag it onto the desired location on the map.
    *   Release to open the "Add New Tree" form.
    *   Fill in the species, notes (optional), and add a photo (optional).
    *   Tap "Save Tree".
4.  **View & Manage Trees:**
    *   Trees appear as markers on the map. Click a marker to open its detail popup.
    *   From the popup, you can edit, delete, or toggle a reminder for the tree.
    *   Open the sidebar menu (hamburger icon in the header) to see lists of Spotted, Planted, and Reminder trees. Click "View" next to a tree to pan to it on the map and open its popup.
5.  **Toggle Map Layers:** Use the map icon FAB at the top right to switch between satellite and street map views.
6.  **Locate Me:** Tap the location arrow FAB to center the map on your current position.
7.  **Offline Use:** Once loaded, you can use the app to add and view trees even without an internet connection. Data syncs when you're back online (if applicable, though currently it's all local).

## Contributing

Contributions are welcome! If you have suggestions or want to improve LeafLog:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourAmazingFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
5.  Push to the branch (`git push origin feature/YourAmazingFeature`).
6.  Open a Pull Request.

## License

Please add a `LICENSE` file to your repository (e.g., MIT License). For example:
This project is licensed under the MIT License - see the `LICENSE` file for details.
