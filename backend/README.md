## Backend

The backend is written using express.js this can be ran using the command `node index.js` from the backend folder. This application is a little more complete than the frontend. This has some endpoints already set up and swagger docs available. The swagger docs can be accessed through a web browser by going to `http://localhost:3000/docs`. On this page you can call the endpoints to see what the response would be. Currently the endpoints use a sqlite database to presist the data.

There are four endpoints set up two for state. This referes to the columns in the UI mock up (e.g. todo, doing and done). The two endpoints return all the states or a state by ID. The other two tasks that are setup in the same way. 

When the application is run there is a function that will populate the database with some data. So running the backend and then navigating to the swagger docs will allow you to call and endpoint and return a response.