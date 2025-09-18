# E-commerce Site

Welcome to the E-commerce Site project! This is a full-stack e-commerce application designed to provide a seamless shopping experience for users and an efficient management interface for administrators.

## Features

### User-Facing Features
*   **Product Catalog:** Browse a wide range of products with detailed descriptions.
*   **Blog Section:** Read informative and engaging blog posts.
*   **Contact Form:** Easily get in touch with customer support.
*   **Responsive Design:** Enjoy a consistent experience across various devices (desktops, tablets, mobiles).

### Admin Panel Features
*   **Product Management:** Add, edit, and delete products.
*   **Blog Management:** Create, update, and remove blog posts.
*   **Order Management:** View and update the status of customer orders (e.g., Pending, Completed).
*   **Message Management:** View customer inquiries and mark them as read.
*   **Notification Badges:** Get real-time notifications for unread messages and unattended orders.

## Technologies Used

This project leverages a modern MERN (MongoDB, Express.js, React, Node.js) stack along with other powerful tools:

### Frontend
*   **React:** A JavaScript library for building user interfaces.
*   **React Router DOM:** For declarative routing in React applications.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **React Icons:** Popular icon library for React.
*   **CSS:** For styling and responsive design.

### Backend
*   **Node.js:** JavaScript runtime for server-side logic.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A NoSQL database for storing application data.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **Cloudinary:** Cloud-based image and video management service for media uploads.
*   **dotenv:** To load environment variables from a `.env` file.
*   **cors:** Node.js middleware for enabling Cross-Origin Resource Sharing.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
*   Node.js (v14 or higher)
*   npm (Node Package Manager)
*   MongoDB Atlas account (or a local MongoDB instance)
*   Cloudinary account

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AnilaAnilaN/ReactProject.git
    cd ReactProject
    ```

2.  **Backend Setup:**
    a.  Navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    b.  Install backend dependencies:
        ```bash
        npm install
        ```
    c.  Create a `.env` file in the `backend` directory and add your environment variables. You'll need:
        ```
        MONGO_URI=your_mongodb_connection_string
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        PORT=5000
        ```
        *Replace `your_mongodb_connection_string`, `your_cloudinary_cloud_name`, `your_cloudinary_api_key`, and `your_cloudinary_api_secret` with your actual credentials.*
    d.  Start the backend server:
        ```bash
        npm start
        ```
        The backend server will run on `http://localhost:5000` (or your specified PORT).

3.  **Frontend Setup:**
    a.  Navigate to the `mestore` directory:
        ```bash
        cd ../mestore
        ```
    b.  Install frontend dependencies:
        ```bash
        npm install
        ```
    c.  Start the frontend development server:
        ```bash
        npm run dev
        ```
        The frontend application will open in your browser, usually at `http://localhost:5173`.

## Usage

Once both the backend and frontend servers are running:

*   Open your browser to `http://localhost:5173` to access the e-commerce site.
*   Browse products, read blog posts, and use the contact form.

## Admin Panel

To access the admin panel:

1.  Navigate to `http://localhost:5173/admin`.
2.  Log in with your admin credentials (these would typically be managed in your database).
3.  From the admin dashboard, you can:
    *   Manage products (add, edit, delete).
    *   Manage blog posts (add, edit, delete).
    *   View and update customer order statuses.
    *   View customer messages.
    *   See notification badges for unread messages and unattended orders.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.