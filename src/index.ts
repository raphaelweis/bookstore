import express from "express";
import users from "./routers/users";
import books from "./routers/books";
import morgan from "morgan";
import { defaultErrorHandler } from "./errors";

const PORT = 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routers
app.use("/users", users);
app.use("/books", books);

// Error handlers
app.use(defaultErrorHandler);

app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`);
});

export default app;
