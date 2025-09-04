import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get(`/`, async (_req, res) => {
  res.send({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server ready at: http://localhost:${PORT}`);
});

export default app;
