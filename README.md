# This repo is the test task for DBB Software Company

## Setup

To deploy application locally run

```bash
npm install & npm start
```

## Description

There is a company; the company can have staff members.
Staff members are characterized by:

- name,
- date when they joined the company,
- base salary (to keep it simple, consider this value to be equal for all staff member types by default)
  There are three types of staff members:

1. Employee,
2. Manager,
3. Sales.
   Any staff member can have a supervisor. Likewise, any staff member except for Employee can have subordinates.

### Salary Calculations

1. Employee salary - base salary plus 3% for each year they have worked with the company, but not more than 30% of the base salary.
2. Manager salary - base salary plus 5% for each year they have worked with the company (but not more than 40% of the base salary), plus 0.5% of the salaries of their first-level subordinates.
3. Sales salary - base salary plus 1% for each year they have worked with the company (but not more than 35% of the base salary) plus 0.3% of the salaries of their subordinates of any level.
   Staff members (except Employees) can have any number of subordinates.

## Requirements

1. Create a nest.js app that describes this model, exposes API, and implements an algorithm that calculates the salary of any staff member at an arbitrary time (as well as calculates the sum of salaries of all staff members of the company).
2. The system must be verified by tests (full code coverage is not necessary, but the tests should demonstrate that the business logic works correctly).
3. In addition, prepare a brief description of the solution for the test assignment, including a description of its architecture, advantages, and drawbacks (what can be changed or improved in the solution to make it ready for real-world usage.)
4. An SQLite as a database could be used or make the data model transient.
