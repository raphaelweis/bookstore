import express from "express";
import users from "./routers/users";
import books from "./routers/books";
import bills from "./routers/bills";
import morgan from "morgan";
import { defaultErrorHandler } from "./middlewares/errors";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", users);
app.use("/books", books);
app.use("/bills", bills);

app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`);
});

export default app;
