import express from "express";
import users from "./routes/users";
import morgan from "morgan";

const PORT = 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routers
app.use("/users", users);

app.get(`/`, async (_req, res) => {
  res.send({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`);
});

export default app;
