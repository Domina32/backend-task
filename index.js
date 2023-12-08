const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const exampleRouter = require("./src/routes/example.route");

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/example", exampleRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
