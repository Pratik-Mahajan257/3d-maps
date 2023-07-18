const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'backend/public/uploads/' });

app.use(cors());
app.use(bodyParser.json());

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  const filename = `${uuidv4()}.png`;
  const filePath = path.join(__dirname, 'public', 'uploads', filename);

  // Save the image file to the specified path or use it as needed
  // (e.g., send the path to the frontend for rendering)

  return res.json({ filename, filePath });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
