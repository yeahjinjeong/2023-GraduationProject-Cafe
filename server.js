const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");

const app = express();
const sql = require("./app/models/db.js");
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!!" });
});

const sessionOptions = {
  secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions))
app.use(express.json());

app.get("/authcheck", (req, res) => {
  const sendData = {isLogin: "", username: ""};
  if(req.session.is_logined){
    sendData.isLogin = "True"
    sendData.username = req.session.nickname;
  } else {
    sendData.isLogin = "False"
  }
  res.send(sendData)
})

app.post("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  })
})

function compareArrays(arr1, arr2, str) {
  const filteredResults = arr1.filter((row1) => {
    return row1.category == str;
  });
  console.log(filteredResults);
  const comparedResults = [];
  for (let i = 0; i < filteredResults.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (filteredResults[i].datacid == arr2[j].datacid) {
        comparedResults.push(arr2[j]);
      }
    }
  }
  // console.log(comparedResults);
  return comparedResults;
}

//let datacid_list = [];
app.post("/data", (req, res) => {
  let datacid_list = [];
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
  const category = req.query.name;

  const buttonStates = req.body;
  console.log(buttonStates);

  let button_k = Object.keys(buttonStates);
  let button_v = Object.values(buttonStates);
  console.log(button_k);
  console.log(button_v);

  var wheremoon = "WHERE ";
  for (let i = 0; i < button_v.length; i++) {
    if (button_v[i] == 1) {
      wheremoon += `${button_k[i]} = 1 AND `;
    }
  }
  wheremoon = wheremoon.slice(0, -5); //마지막 AND 제거해주기
  console.log(wheremoon.slice(0, -5));

  sql.query(query1, (err, res1) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return;
    }
    const query2 = "SELECT * FROM cafe_info2";
    sql.query(query2, (err, res2) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        return;
      }
      const comparedResults = compareArrays(res1, res2, category);
      console.log(category);
      // console.log(comparedResults);
      // result(null, comparedResults);
      // res.send(comparedResults);
      for (var c of comparedResults) {
        console.log(c.datacid);
        datacid_list.push(c.datacid);
      }

      const queryT = `SELECT * FROM cafe_info2 ${wheremoon}`;
      console.log(queryT);

      sql.query(queryT, (err, res3) => {
        if (err) {
          console.error("Error executing query: " + err.stack);
          return;
        }
        // console.log(res);
        // res.send(response);
        const secondfiltered = [];
        for (let i = 0; i < datacid_list.length; i++) {
          for (let j = 0; j < res3.length; j++) {
            if (datacid_list[i] == res3[j].datacid) {
              //console.log(res[j].datacid)
              secondfiltered.push(res3[j]);
            }
          }
        }
        for (var d of secondfiltered) {
          console.log(d.datacid);
        }
        //res.json({ finally: true });
        res.send(secondfiltered);
        // console.log(secondfiltered);
      });
    });
  });
  // res.json({ success: true });
  // res.json(res);
});
///

app.post("/signup", (req, res) => {
  const userData = req.body;
  const username = req.body.username;
  const id = req.body.id;
  const pw = req.body.pw;
  const birth = req.body.birth;
  const sex = req.body.sex;
  const email = req.body.email;

  const sendData = { isSuccess: "" };

  if (username && id) {
    sql.query('SELECT * FROM user_info WHERE username= ?', [username], function (error1, results1) {
      if (error1) throw error1;
      if (results1.length <= 0) {
        sql.query('SELECT * FROM user_info WHERE id = ?', [id], function (error2, results2) {
          if (error2) throw error2;
          if (results2.length <= 0) {
            sql.query('SELECT * FROM user_info WHERE email = ? ', [email], function (error3, results3) {
              if (error3) throw error3;
              if (results3.length <= 0) {
                // INSERT (아이디, 닉네임, 비번 모두 겹치지 않을떄)
                const hashedPassword = bcrypt.hashSync(pw, 10)
                sql.query('INSERT INTO user_info (username, id, pw, birth, sex, email) VALUES (?,?,?,?,?,?)', [username, id, hashedPassword, birth, sex, email], function (error4, data) {
                  if (error4) throw error4;
                  sendData.isSuccess = "저장완료";
                  res.send(sendData);
                })
              } else {
                sendData.isSuccess = "이미 존재하는 이메일입니다"
                res.send(sendData);
              }
            })
          } else {
            sendData.isSuccess = "이미 존재하는 아이디입니다"
            res.send(sendData);
          }
        })
      } else {
        sendData.isSuccess = "이미 존재하는 닉네임입니다"
        res.send(sendData);
      }
    })
  }

  console.log("userData : ", userData);
  // res.status(200).json({ message: "회원가입이 성공적으로 완료되었습니다." });
});

app.post('/login', (req, res) => {
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  const sendData = {isLogin : ""};
  console.log(userid);
  console.log(userpw);

  sql.query('SELECT * FROM user_info WHERE id= ?', [userid], function (error1, results1) {
      if (error1) throw error1;
      if (results1.length>0){
        console.log(results1[0])
        bcrypt.compare(userpw, results1[0].pw, (err, result) => {
          console.log(result);
          if (result === true){
            req.session.is_logined = true;
            req.session.nickname = results1[0].username;
            req.session.userid = results1[0].id;
            req.session.save(function(){
              sendData.isLogin = "True"
              res.send(sendData);
            })
          } else {
            sendData.isLogin = "로그인 정보가 일치하지 않습니다."
            res.send(sendData);
          }
        })
      } else {
        sendData.isLogin = "아이디 정보가 일치하지 않습니다."
        res.send(sendData);
      }
  })
})

// 프론트엔드에서 리뷰 받기
app.post("/review/save", (req, res) => {
  const username = req.session.nickname;
  const id = req.session.userid;
  const datacid = req.body.datacid;
  const cafeName = req.body.cafename;
  const service_score = req.body.service_score;
  const taste_score = req.body.taste_score;
  const price_score = req.body.price_score;
  const review_text = req.body.review_text;
  const purpose = req.body.purpose; // 리스트

  console.log(datacid);

  sql.query('INSERT INTO review (datacid, cafeName, username, id, service_score, taste_score, price_score, review_text, purpose1, purpose2, purpose3) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [datacid, cafeName, username, id, service_score, taste_score, price_score, review_text, purpose[0], purpose[1], purpose[2]], function (error, data) {
    if (error){
      res.status(406);
      throw error;
    }
  })
  // purpose 리스트 순회하며 반복문으로 저장하기
  for (let p of purpose) { // for in 또는 for of (데이터 형식으로 받기)
    sql.query('UPDATE CafeCategory SET score = score + 1 WHERE datacid=? AND category=?', [datacid, p], function (error, data) {
      if (error){ 
        res.status(406);
        throw error;
      }
    })
  }
  res.send('Review => Database');
})

// 프론트엔드에서 찜한 카페 저장
app.post("/like/save", (req, res) => {
  const id = req.session.userid;
  const datacid = req.body.datacid;

  sql.query('INSERT INTO user_like (datacid, id) VALUES (?,?)', [datacid, id], function (error, data) {
    if (error) {
      throw error;
    }
  })
  console.log("좋아요 성공")

  sql.query('UPDATE cafe_info2 SET like_score = like_score + 1 WHERE datacid=?', [datacid], function (error, data) {
    if (error){ 
      res.status(406);
      throw error;
    }
  })

  res.send('like => Database'); // 이거 안보내면 안됨.
})

// 프론트엔드에서 찜한 카페 삭제
app.post("/like/delete", (req, res) => {
  const id = req.session.userid;
  const datacid = req.body.datacid;

  sql.query('DELETE FROM user_like WHERE datacid=? AND id=?', [datacid, id], function (error, data) {
    if (error) {
      throw error;
    }
  })
  console.log("좋아요 삭제 성공")

  sql.query('UPDATE cafe_info2 SET like_score = like_score - 1 WHERE datacid=?', [datacid], function (error, data) {
    if (error){ 
      res.status(406);
      throw error;
    }
  })

  res.send('like delete => Database'); // 이거 안보내면 안됨. 
})

// 찜한 카페인지 체크
app.post("/like/check", (req, res) => {
  const sendData = { isLike: "" };
  const id = req.session.userid;
  const datacid = req.body.datacid;
  sql.query('SELECT * FROM user_like WHERE id=? AND datacid=?', [id, datacid], function (error, data) {
    if (error) {
      res.status(406);
      throw error;
    }
    if (data.length > 0) {
      sendData.isLike = "True";
      res.send(sendData);
    } else {
      sendData.isLike = "False";
      res.send(sendData);
    }
    // console.log(id);
    // console.log(datacid);
    console.log(data);
  })
})

//찜탭

app.post("/like/list", (req, res) => {
  const id = req.session.userid;

  sql.query(
    "SELECT * FROM user_like WHERE id= ?",
    [id],
    function (error, data) {
      if (error) {
        res.status(406);
        throw error;
      }

      res.send(data);
      console.log("data : ", data);
    }
  );
});

//마이페이지 리뷰 모아보기
app.post("/review/my", (req, res) => {
  const username = req.session.nickname;
  sql.query('SELECT * FROM review WHERE username= ?', [username], function (error, data) {
    if (error){
      res.status(406);
      throw error;
    }
    res.send(data);
  })
})

//마이페이지에서 리뷰 삭제하기
app.post("/review/delete", (req, res) => {
  const id = req.session.userid;
  const datacid = req.body.datacid;
  const review_text = req.body.review_text;
  const purpose = req.body.purpose;
  console.log(datacid);
  console.log(purpose);

  sql.query('DELETE FROM review WHERE datacid=? AND id=? AND review_text=?', [datacid, id, review_text], function (error, data) {
    if (error) {
      throw error;
    } else {
      console.log("리뷰 삭제 성공")
    }
  })

  for (let p of purpose) { // for in 또는 for of (데이터 형식으로 받기)
    sql.query('UPDATE CafeCategory SET score = score - 1 WHERE datacid=? AND category=?', [datacid, p], function (error, data) {
      if (error){ 
        res.status(406);
        throw error;
      } else {
        console.log("목적 - 카운트 성공");
      }
    })
  }
  res.send('review delete => Database'); // 이거 안보내면 안됨. 
})

require("./app/routes/cafe.routes.js")(app);

// 포트넘버 설정
app.listen(3000, () => {
  console.log("Connected Server, 3000 Port");
});