const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3030;

// 미들웨어 설정: URL로 전달된 데이터를 해석하여 req.body 객체에 추가
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 서비스를 위한 미들웨어 설정: public 폴더 내의 파일들을 정적으로 제공
app.use(express.static('public'));

// 루트 경로에 대한 GET 요청 처리
app.get('/', (req, res) => {
  // index.html 파일을 응답으로 전송
  res.sendFile(__dirname + '/index.html');
});

// /admin 경로에 대한 GET 요청 처리
app.get('/admin', (req, res) => {
  // a.json 파일을 읽어와 응답으로 전송
  fs.readFile('a.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send(data);
  });
});

// 루트 경로에 대한 POST 요청 처리
app.post('/', (req, res) => {
  // POST 요청으로 전달된 데이터 중 inputData 값을 추출
  const inputData = req.body.inputData;

  // a.json 파일에 JSON 형식으로 데이터 추가 또는 생성
  fs.writeFile('a.json', JSON.stringify({ data: inputData }), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send('Data saved successfully');
  });
});

// 서버를 지정된 포트로 실행
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
