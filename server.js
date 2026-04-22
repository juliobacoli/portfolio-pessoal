const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/portfolio-pessoal/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/portfolio-pessoal/browser/index.html'));
});

app.listen(process.env.PORT || 8080);
