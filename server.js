const express = require("express");
const morgan = require("morgan");
const app = express();

const PORT = process.env.PORT || 4000;

app.use(morgan("combined"));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
