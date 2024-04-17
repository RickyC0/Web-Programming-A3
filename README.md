# SOEN287 Pet Store Project

This Node.js project is part of the coursework for SOEN287. It features four exercises with a main focus on Ex4 (The Pet Store).

## Project Structure

- `home.js`, `utilities.js`, `main.js`: Main application scripts and utility functions.
- `routes/`: Contains routing logic for the application.
    - `formValidation.js`: Handles form validation logic for Ex3.
    - `nbOfVisits.js`: Tracks the number of visits to the site for Ex2.
    - `users.js`: Manages user-related operations for Ex4.
- `views/`: Stores the EJS templates for rendering the HTML pages.
    - `ex1/`, `ex2/`, `ex3/`, `ex4/`: Exercise-specific views and partials.
- `data/`: Data files for the application, including `pets.txt` and `users.txt`.
- `public/`: Public assets for the website.
    - `assets/pictures/`: Contains image assets like JPG and WEBP files.
    - `css/`: CSS files, with `ex4/style.css` being specific to the pet store.
    - `js/`: Client-side JavaScript files.

## Features

- Exercise 1: Node js functions and data processing.
- Exercise 2: Session cookie.
- Exercise 3: Backend form validation.
- Exercise 4: Pet store functionality, allowing users to search for pets with strict criteria matching. It includes a simple pet search without a scoring algorithm for flexibility in matches.

## Getting Started

To get the project running on your local machine, follow these steps:

1. Ensure that you have Node.js and npm installed.
2. Navigate to the `A3_40234410` directory within the project.
3. Install the project dependencies using `npm install`.
4. Start the server with `node index.js`.
5. Open your browser and navigate to `http://r_rajich@soen287.encs.concordia.ca:5252` to view the application or run it on your local host (If you're not the marker :p)

## Contributing

If you'd like to contribute to the project, please fork the repository and create a pull request, or open an issue with the tag "enhancement".

## License

This project is licensed under the [MIT License](LICENSE.md).

## Acknowledgements

- Thanks to the SOEN287 course staff and instructors for providing guidance on this project.
- Special appreciation to the open-source community for various npm packages that made this project possible.