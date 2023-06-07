const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const jsonFilePath = "./reviews.json"

// 모든 도메인에서 모든 HTTP 메소드를 허용하는 CORS 설정
app.use(cors());
const port = 3100;

// Enable preflight OPTIONS request for PUT method
app.options('*', cors());
// 데이터베이스 연결
const db = new sqlite3.Database('database.db');

app.use(express.static('public'));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// API: 리뷰 데이터 읽기
app.get('/reviews', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
      } else {
          const reviews = JSON.parse(data);
          res.json(reviews);
      }
  });
});
// API: 리뷰 데이터 추가
app.post('/reviews', (req, res) => {
  const newReview = req.body;
  
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.sendStatus(500);
      } else {
          const reviews = JSON.parse(data);
          const productId = newReview.productId;
          if (!reviews.productId) {
            reviews.productId = [];
          }
          reviews[productId].push({
            review_id: reviews.productId.length,
            review_text: newReview.text,
            review_rating: newReview.rating
          });

          fs.writeFile(jsonFilePath, JSON.stringify(reviews), 'utf8', (err) => {
              if (err) {
                  console.error(err);
                  res.sendStatus(500);
              } else {
                  res.sendStatus(200);
              }
          });
      }
  });
});




app.get('/products', (req, res) => {
  // 데이터베이스에서 상품 정보 가져오기
  db.all('SELECT * FROM stones', (err, rows) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(rows);
      console.log('success', rows);
    }
  });
});

app.get('/product/:productId', (req, res) => {
  const productId = req.params.productId;
  console.log(productId, "REQUESTED")

  // 데이터베이스에서 해당 상품 정보 가져오기
  db.get('SELECT * FROM stones WHERE product_id = ?', [productId], (err, row) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      if (row) {
        res.json(row);
        // 리뷰 정보를 가져와서 함께 응답으로 보내기
        // db.all('SELECT * FROM reviews WHERE product_id = ?', [productId], (err, reviews) => {
        //   if (err) {
        //     console.error(err);
        //     res.sendStatus(500);
        //   } else {
        //     row.reviews = reviews;
        //     res.json(row);
        //   }
        // }
        // );
      } else {
        res.sendStatus(404);
      }
    }
  });
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 실행되었습니다. 포트: ${port}`);
});
