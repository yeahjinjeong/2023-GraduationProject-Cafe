// 카페 객체에 대한 생성자 정의, db연결을 사용해 CRUD 기능 작성
const sql = require("./db.js");

/*const User = function (user) {
    this.username = user.username;
    this.pw = user.pw;
    this.birth = user.birth;
    this.sex = user.sex;
    this.email = user.email;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO user_info SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created user: ", { username: res.in })
    })
}*/

// 카페 조회 - brunch인 카페들.
exports.getAll = (result) => {
  sql.query("SELECT * FROM cafe_info2", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log(res);
    result(null, res);
  });
};

///  -----
//비교할 두 테이블 가져오기
exports.getClass = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2);
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//데이터 배열 비교하기
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
  return comparedResults;
}

//비교할 두 테이블 가져오기
//Brunch
/*
exports.getBrunch = (result) => {
  const query1 =
    "SELECT datacid, category, score FROM CafeCategory WHERE (datacid, score) IN (SELECT datacid, MAX(score) FROM CafeCategory GROUP BY datacid)";
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
      const comparedResults = compareArrays(res1, res2, "brunch");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};
*/

//Max 3
exports.getBrunch = (result) => {
  const query1 =
    "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "brunch");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Coffee
exports.getCoffee = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "coffee");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Tea
exports.getTea = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "tea");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Dessert
exports.getDessert = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "dessert");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Dessert
exports.getVegan = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "vegan");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Study
exports.getStudy = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "study");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Team
exports.getTeam = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "team");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Large
exports.getLarge = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "large");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Chat
exports.getChat = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "chat");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Child
exports.getChild = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "child");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Senior
exports.getSenior = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "senior");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Party
exports.getParty = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "party");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Sns
exports.getSns = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "sns");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Rest
exports.getRest = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "rest");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Theme
exports.getTheme = (result) => {
  const query1 =
  "SELECT datacid, category, score FROM CafeDB.CafeCategory c1 WHERE (datacid, score) IN (SELECT datacid, score FROM (SELECT datacid, score FROM CafeDB.CafeCategory c2 WHERE c1.datacid = c2.datacid ORDER BY score DESC LIMIT 3) AS subquery) ORDER BY score DESC";
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
      const comparedResults = compareArrays(res1, res2, "theme");
      // console.log(comparedResults);
      result(null, comparedResults);
    });
  });
};

//Americano
exports.getAmericano = (result) => {
  sql.query("SELECT * FROM cafe_info2 WHERE americano != 0", (err, res) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return;
    }
    result(null, res);
  });
};

exports.getLatte = (result) => {
  sql.query("SELECT * FROM cafe_info2 WHERE latte != 0", (err, res) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return;
    }
    result(null, res);
  });
};

exports.getReview = (result) => {
  sql.query("SELECT * FROM review", (err, res) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      return;
    }
    result(null, res);
  });
};