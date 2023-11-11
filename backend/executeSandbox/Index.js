import express from 'express';
import cors from 'cors';
import route from './routes/routes.js';
const app = express();
const port = 8001 || process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", route);
app.use(
      cors({
       origin : "http://localhost:3000",
       methods : ["GET", "POST", "PUT", "DELETE"],
         credentials : true 
      })
);

app.listen(port, () => {    
    console.log(`Server listening on port ${port}!`);
});