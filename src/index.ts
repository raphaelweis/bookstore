import express from "express";
import users from "./routers/users";
import morgan from "morgan";

const PORT = 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routers
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`);
});

export default app;
