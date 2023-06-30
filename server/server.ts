import express, { Response, Request } from 'express';
import { sequelize } from './database';
import userRouter from './routes/users';
import commentRouter from './routes/comments';

const app = express();
const port = process.env.PORT || 6969;

app.use(express.json()); // This line allows the app to parse JSON bodies from requests

app.use('/users', userRouter);
app.use('/comments', commentRouter);

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
