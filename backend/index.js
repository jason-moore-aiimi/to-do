const express = require('express');
const Task = require('./models/task');
const State = require('./models/state');
const sequelize = require('./store/database')
const data = require('./store/data')
const stateRoutes = require('./routes/state')
const taskRoutes = require('./routes/task')
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger-ui');
const app = express();
const port = 3000;


sequelize.sync({ force: true }).then(() => {
    State.bulkCreate(data.STATES);
    Task.bulkCreate(data.TASKS);
    console.log('Database tables created!');
});

console.log(specs);
app.use(express.json());
app.use("/task", taskRoutes);
app.use("/state", stateRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
