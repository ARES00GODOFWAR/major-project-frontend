// server.js
const fs = require('fs');
const csv = require('csv-parser');

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

app.get('/read-csv', async (req, res) => {
  try {
    const filePath = './src/data/KDDTest+.csv'; // Replace with the actual file path
    const data = await readFile(filePath);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read CSV file' });
  }
});
