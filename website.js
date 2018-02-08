const express = require('express');
const app = express();

app.use(express.static('website'));

app.listen(80, () => console.log('Website running'));
