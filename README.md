# Expense Tracker App

An intuitive expense tracking application built with Next.js that simplifies group expense management and facilitates fair settlements among group members.

![Expense Tracker Logo](/public/images/logo.svg)

## Features

### Expense Data Management

- **Expense Logging:** Record details like shop, item, price, tax rate, and consumers involved.
- **Group Expense Tracking:** Monitor expenses for different groups of people.
- **Individual Expenses:** Ability to assign expenses to specific group members.

### Calculation and Settlement

- **Fair Calculation:** Calculates each member's share based on the group's total expenses.
- **Partial Expenses:** Handles expenses related to a subset of group members.
- **Time-based Settlement:** Facilitates settlement calculations for a specific time range (monthly, custom dates).

### User-Friendly Interface

- **Intuitive Dashboard:** Clear visualization of group expenses and settlements.
- **Responsive Design:** Works seamlessly on various devices and screen sizes.

## Screenshots

### User Dashboard View

![Dashboard](/public/images/readme/use_dashboard.png)

### Expense Log

![Expense Log](/public/images/readme/expenses_log.png)

### Settlement Calculation

![Settlement Calculation](/public/images/readme/settlement.png)

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Clone the repository

### Installation

1. Navigate to the project directory.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

### Usage

1. Access the application on your preferred web browser at `http://localhost:3000`.
2. Create a new group or log in to an existing one.
3. Add expenses, specifying details like shop, item, price, consumers involved, and date.
4. Use the settlement feature to calculate fair payments within the group.
5. View reports and settlement breakdowns on the dashboard.

## Technologies Used

- Next.js
- React
- GraphQL
- PostgeSQL
