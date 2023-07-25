# Just Eat for Business - Angular Exercise

Thank you for taking part in this exercise! If you have any questions, please get in touch.

## Scenario

Imagine we are building a simple web application to track order deliveries. Attached is our first pass on its implementation.
It includes a series of tests that will fail because of missing business logic, and it will be part of your task to add this logic in order to make all tests go green.

Starting the application will run a simple backend with order fixtures, and an Angular web application that fetches and displays a list of orders that are scheduled for delivery.

## Your Task

### Step One - Pull the HTTP logic into a dedicated service

Start by inspecting the homepage component and consider pulling the http call logic into a dedicated service. While you're at it, have a look around and familiarize yourself with the rest of the application.

### Step Two

Implement pagination to make all the included tests pass. The desired behaviour should be covered by the existing integration tests, but feel free to expand the coverage where appropriate.

### Step Three

Adapt the application to accept an optional page size parameter. The behaviour of the page should change to show at most `pageSize` number of orders. So, for example, navigating to the homepage with a query containing `pageSize=13` will show a maximum of 13 orders on the page. If the parameter is not provided, the page should display a maximum of 10 orders.

### Constraints

There are a few rules to follow. Please read and follow them carefully:
- all new components and services must be unit-tested to a production standard (i.e. make sure you cover all interesting cases)
- all new business logic should be tested at least to a level that describes the desired behaviour
- your solution should follow widely accepted idioms for Angular, and Typescript
- follow principles of _clean code_ including _DRY_, _KISS_, _YAGNI_, composition over inheritance, code readability, function length, etc.

## Submitting the solution

Submit your solution compressed in a zip file that includes the source code and a README with your assumptions and any relevant instructions.
Name the zip file **"code-exercise-angular.zip"** and either send it to us via email or a file sharing solution of your choice.
Please avoid including your name, any references to your profile, or any version control history.

## Setting things up locally

The partial implementation was developed using Node v18 and Yarn v1.22.

### Installation

```
yarn install
```

### Running the application

```
yarn start
```

### Running the tests

```
yarn test
```
