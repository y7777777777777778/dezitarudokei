const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// SQLiteデータベース設定
const db = new sqlite3.Database(':memory:'); // メモリ内データベース
db.serialize(() => {
  db.run("CREATE TABLE history (id INTEGER PRIMARY KEY, content TEXT)");
});

// ミドルウェア
app.use(express.json());

// トップページルート
app.get('/', (req, res) => {
  res.send('Welcome to the History App!');
});

// 履歴を取得する
app.get('/history', (req, res) => {
  db.all("SELECT * FROM history", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// 履歴を追加する
app.post('/history', (req, res) => {
  const content = req.body.content;
  db.run("INSERT INTO history (content) VALUES (?)", [content], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ id: this.lastID, content });
    }
  });
});

// サーバーを起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
