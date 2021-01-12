import app from './app';
require('dotenv').config()
const PORT = process.env.PORT || 8000

// module.exports = app;
app.listen(PORT);
