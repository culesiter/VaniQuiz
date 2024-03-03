const sql = require("./db.js");

// constructor
const Quiz = function(quiz) {
  this.title = quiz.title;
  this.question = quiz.question;
  this.hint = quiz.hint;
};


Quiz.getAll = result => {
  sql.query("SELECT q.*, CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'id', a.id, 'text', a.text, 'is_correct', a.is_correct ) ), ']' ) AS answers, SUM( CASE WHEN a.is_correct = 1 THEN 1 ELSE 0 END ) as total_correct FROM `questions` q join answers a on q.id = a.question_id GROUP BY q.id;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Quiz;
