# Account Opening Process

This project demonstrates an account opening process that involves multiple stages. Each stage represents a specific API call, and each stage's name can be changed to be more appropriate for the business logic.

- Whenever a account opening process is initiated for an agent, a seriese of API calls are made.  
- Let just say any one of the api calls fails in the process same agent can again initiate an account opening request.   
- I another senario let assume same agent again initiates a new account opening process, this time he will get update at what stage primary request is.

## Project Structure

- `database.json`: A JSON file that simulates a database to store agent information.
- `index.js`: The main JavaScript file containing the logic for the account opening process.

## Functions and Modules

### Modules

- `crypto`: Used to generate a random ID for the agent.
- `fs`: Used to read from and write to the `database.json` file.

### Functions

#### `readAgents`
Reads agents from the `database.json` file.

#### `commit`
Commits changes to the `database.json` file.

#### `slow`
Simulates a delay of 2 seconds.

#### `serverGateway`
Contains multiple stages (from `stage1` to `stage12`). Each stage performs specific actions and updates the agent's status.

#### `serverDatabase`
Handles database operations including getting, setting, updating stage status, and setting an agent as failed.

#### `webserviceAccOpen`
Main function to open an account, processing through all stages.

This could be compared to controllers.

#### `main`
Entry point of the application that initiates the account opening process.

## Key
#### `error_switch`
Assign values like stage1, stage2... stage12. assigning values in any of the stage in serverGateway to fail.

#### `default_id`
Assign any value to store in the database.
If not assigned a random number will be generated.

## Usage

1. Clone the repository.
2. Ensure you have Node.js installed.
3. Run `npm install` to install any required dependencies.
4. Run `node index.js` to start the account opening process.

## Error Handling

The process includes error handling at each stage. If an error occurs at any stage, the agent's status is set to failed in the database.

## Simulating Errors

You can simulate errors by setting the `errorSwitch` variable to the desired stage name (e.g., `stage1`, `stage2`, etc.).

## Example

To run the account opening process, execute:

```bash
node index.js
