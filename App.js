const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

app.use("/", require("./routes/login"));
app.use("/", require("./routes/profile"));
app.use("/note", require("./routes/note"));

app.use((error, req, res, next) => {
  return res.json(error)
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
