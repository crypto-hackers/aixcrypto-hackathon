const express = require('express');
const path = require('path');
const app = express();

// サイト1
app.use('/', express.static('./src'));

// // サイト2
// app.use('/candidates', express.static('./src/candidates'));
//
// // サイト3
// app.use('/idol', express.static(path.join(__dirname, 'src', 'idol')));
//
// app.get('/idol/mint', (req, res) => {
//   res.sendFile(path.join(__dirname, './src/idol/mint.html'));
// });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

