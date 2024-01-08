# AggieProfs

AggieProfs is a React-based web application inspired by "Rate My Professor," specifically designed for Texas A&M University. It enables students to search for professors, view their RateMyProfessor Ratings, Course information, and grade distributions all within a modern, single-page application interface.

## Getting Started

These instructions will guide you through getting a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Git (optional, if you're cloning the repository)

### Installing

Follow these step-by-step instructions to set up your development environment:

#### Step 1: Clone the Repository
- Clone the repository using Git:
git clone https://github.com/binhdocao/AggieProfs/

#### Step 2: Navigate to the Project Directory
- Change to the project directory:
cd AggieProfs


#### Step 3: Install Dependencies
- Install all the necessary Node.js modules as defined in 'package.json':
yarn install


#### Step 4: Start the Development Server
- Start the React development server, typically on localhost:3000:
yarn start


This command will open your default web browser to `http://localhost:3000`, where you can view and interact with your React application.

## Building for Production

To build the application for production, run:
yarn build


This will create a `build` directory with a production build of your app.

## Features

- View Course Data
- View Professor RMP Data
- Get recommended best professor to take based on GPA

## Resources Utilized

- Scraped RateMyProfessor data from https://www.ratemyprofessors.com/school/1003
- Utilized PostMan to intercept Request from https://anex.us/grades/
- MongoDB for storing RMP data.



## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).
