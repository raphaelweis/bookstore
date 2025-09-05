import express from "express";
import users from "./routes/users";

const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/users", users);

app.get(`/`, async (_req, res) => {
  res.send({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`);
});

export default app;
