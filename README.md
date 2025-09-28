# See Tickets Frontend Challenge

This project is a React application built as a technical challenge. The main objective is to create a user interface that interacts with a Node.js backend to display a list of events and manage application settings. The application demonstrates modern frontend practices, including state management, form handling, and the use of a component library like Material-UI (MUI).

> **Note on Environment Variables**
> For the purpose of this exercise, API endpoints and other configurations are hardcoded. In a production environment, these would be managed through environment variables (`.env` files) for security and flexibility.

---

## ✨ Features

- **Event Listing**: Fetches and displays a list of events from the API. Each event is shown in a responsive, collapsible accordion panel.
- **Event Details**: Shows key information for each event, including its description, location, date, and a list of available tickets.
- **Settings Management**: A comprehensive settings form, accessible via a modal, allows users to view and update application configurations.
- **Responsive Design**: The entire user interface is built to be responsive and functional across various screen sizes, from mobile to desktop.
- **State-Driven UI**: Leverages Redux Toolkit to manage application state, including API data, loading statuses, and modal visibility.

---

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Components**: [Material-UI (MUI)](https://mui.com/)
- **Form Management**: [Formik](https://formik.org/)
- **Schema Validation**: [Yup](https://github.com/jquense/yup)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Package Manager**: [Yarn](https://yarnpkg.com/)

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- You must have [Node.js](https://nodejs.org/) (version 18.x or higher) and [Yarn](https://yarnpkg.com/) installed.
- **Crucially, the corresponding backend project must be running locally**, as this application depends on it for data. The backend should be available at `http://localhost:3000`.

### Installation & Setup

1.  **Clone the repository:**

    ```sh
    git clone <your-repository-url>
    cd st-hiring-frontend
    ```

2.  **Install dependencies:**

    ```sh
    yarn install
    ```

3.  **Run the development server:**

    ```sh
    yarn dev
    ```

4.  **Open the application:**
    The application will be running at `http://localhost:5173` (or the next available port).

---

## 📁 Project Structure

The project follows a feature-based structure to keep the code organized and scalable.

src/
├── app/
│ └── store.ts # Redux store configuration
├── assets/ # Static assets like images
├── components/
│ ├── common/ # Shared components (e.g., buttons)
│ ├── events/ # Components related to the Events feature
│ └── settings/ # Components related to the Settings feature
├── features/
│ ├── events/ # Redux slice for Events
│ └── settings/ # Redux slice for Settings
├── theme.ts # Custom MUI theme configuration
└── App.tsx # Main application component
