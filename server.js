const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', (req, res) => {
  // 읽어온 JSON 파일을 응답으로 전송
  fs.readFile('a.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send(data);
  });
});

app.post('/', (req, res) => {
  const inputData = req.body.inputData;

  // JSON 파일에 데이터 추가 또는 생성
  fs.writeFile('a.json', JSON.stringify({ data: inputData }), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send('Data saved successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});