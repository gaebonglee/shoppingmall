const express = require("express");
const mysql = require("./mysql");

const router = express.Router();

// 삭제 라우트
router.get("/:id", function (req, res) {
  mysql.query(
    "DELETE FROM enquiry WHERE id=?",
    [req.params.id],
    function (error, results) {
      if (!error) {
        console.log("삭제 완료");
        // 삭제 후 qna 페이지로 리다이렉트
        res.send(
          "<script> alert('삭제되었습니다.'); location.href='/qna';</script>"
        );
      } else {
        console.log("Error");
      }
    }
  );
});

module.exports = router;

-----------------------------------------------------------

  const express = require("express");
const mysql = require("./routes/mysql");
const ejs = require("ejs");
const bodyParser = require("body-parser");

// 서버 생성
const app = express();

// 데이터베이스 연결
mysql.connect();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

// 라우터 연결
const mainRouter = require("./routes/main");
const mypageRouter = require("./routes/mypage");
const loginRouter = require("./routes/login");
const joinusRouter = require("./routes/joinus");
const qnaRouter = require("./routes/qna");
const insertRouter = require("./routes/insert");
const deleteRouter = require("./routes/delete");

// 라우터 설정
app.use("/", mainRouter);
app.use("/mypage", mypageRouter);
app.use("/login", loginRouter);
app.use("/joinus", joinusRouter);
app.use("/qna", qnaRouter);
app.use("/insert", insertRouter);
app.use("/delete", deleteRouter);

// 서버 실행
app.listen(5000, function () {
  console.log("Server Running at http://127.0.0.1:5000");
});
