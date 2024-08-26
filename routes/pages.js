const express = require('express');
const mysql = require("mysql");
const dotenv = require('dotenv');
const router = express.Router();
const multer = require('multer');
const session = require('express-session');

router.use(express.urlencoded({extended: true})); // giving access to get the data
router.use(express.json());
const database = mysql.createConnection({

  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

//connect to the database
database.connect( (error) => {

  if(error){
    console.log(error)
  }
  else{
    console.log("MYSQL Connected Successfully")
  }
});
router.get("/" , (req , res) => {

    res.render("index");
});


router.get("/signInUp", (req , res) => {

    res.render("signInUp");
});


  router.get("/homePage", (req , res) => {
    
    const sName = req.session.name;
    const sSurname = req.session.surname;

    res.render("homePage" , { sName , sSurname});
  });

  router.get("/profile", (req, res) => {

          const email = req.session.email;
          const name = req.session.name;
          const surname = req.session.surname;
          
          res.render("profile" , {email , name , surname});

    });
 
  router.get("/createAccount", (req , res) => {

    res.render("createAccount");
   
});

router.get("/learningOfferedEng", (req , res) => {

  res.render("learningOfferedEng");
 
});

router.get("/learningOfferedZulu", (req , res) => {

  res.render("learningOfferedZulu");
 
});

router.get("/learningOfferedSepedi", (req , res) => {

  res.render("learningOfferedSepedi");
 
});

router.get("/deleteAccount" , (req , res ) => {

  const email = req.session.email;
  const name = req.session.name;
  const surname = req.session.surname;

   res.render("deleteAccount" , {email , name , surname});

});

router.get("/updateAccount", (req , res) => {

  const email = req.session.email;
  const name = req.session.name;
  const surname = req.session.surname;

  res.render("updateAccount" , {email , name , surname});
 
});



router.get("/loginAdmin", (req , res) => {

  res.render("loginAdmin");
 
});

router.get("/adminCategories", (req , res) => {

  res.render("adminCategories");
 
});

function renderViewUsersPage(req, res) {
  // Query users from the database
  database.query('SELECT * FROM users order by name', (error, results) => {
   
    
   
    res.render('viewUsers', { users: results });
  });
}

router.get('viewUsers', renderViewUsersPage);

router.get("/addEntry", (req , res) => {

  res.render("addEntry");
 
});

router.get('/viewEntries', (req, res) => {
  // Query entries from the database
  const sql = 'SELECT * FROM entry';
  database.query(sql, (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          
        res.render('viewEntries', { entries: results });
      }
  });
});

//Sepedi
router.get('/sepediAnimals', (req, res) => {
  const categoryId = 1;
  const languageId = 2;

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('sepediAnimals', { entries: results });
      }
  });
});

router.get('/sepediCareers', (req, res) => {
  const categoryId = 3;
  const languageId = 2;

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('sepediCareers', { entries: results });
      }
  });
});

router.get('/sepediInfrastructure', (req, res) => {
  const categoryId = 5;
  const languageId = 2;

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('sepediInfrastructure', { entries: results });
      }
  });
});

router.get('/sepediTransport', (req, res) => {
  const categoryId = 2;
  const languageId = 2;

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('sepediTransport', { entries: results });
      }
  });
});

router.get('/sepediNaturalThings', (req, res) => {
  const categoryId = 6;
  const languageId = 2;
  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('sepediNaturalThings', { entries: results });
      }
  });
});

router.get('/sepediGeneralThings', (req, res) => {
  const categoryId = 4;
  const languageId = 2;

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('sepediGeneralThings', { entries: results });
      }
  });
});




// Zulu

router.get('/zuluAnimals', (req, res) => {
  const categoryId = 1;
  const languageId = 1;
  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('zuluAnimals', { entries: results });
      }
  });
});

router.get('/zuluCareers', (req, res) => {
  const categoryId = 3;
  const languageId = 1;

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('zuluCareers', { entries: results });
      }
  });
});

router.get('/zuluInfrastructure', (req, res) => {
  const categoryId = 5; 
   const languageId = 1; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('zuluInfrastructure', { entries: results });
      }
  });
});

router.get('/zuluTransport', (req, res) => {
  const categoryId = 2; 
  const languageId = 1; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('zuluTransport', { entries: results });
      }
  });
});


router.get('/zuluNaturalThings', (req, res) => {
  const categoryId = 6; 
  const languageId = 1; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('zuluNaturalThings', { entries: results });
      }
  });
});

//English

router.get('/engAnimals', (req, res) => {
  const categoryId = 1; 
  const languageId = 3; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('engAnimals', { entries: results });
      }
  });
});

router.get('/engCareers', (req, res) => {
  const categoryId = 3; 
  const languageId = 3; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('engCareers', { entries: results });
      }
  });
});

router.get('/engInfrastructure', (req, res) => {
  const categoryId = 5; 
  const languageId = 3; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('engInfrastructure', { entries: results });
      }
  });
});


router.get('/engTransport', (req, res) => {
  const categoryId = 2; 
  const languageId = 3; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('engTransport', { entries: results });
      }
  });
});


router.get('/engNaturalThings', (req, res) => {
  const categoryId = 6; 
  const languageId = 3; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('engNaturalThings', { entries: results });
      }
  });
});


router.get('/zuluGeneralThings', (req, res) => {
  const categoryId = 4; 
  const languageId = 1; 

  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('zuluGeneralThings', { entries: results });
      }
  });
});


router.get('/engGeneralThings', (req, res) => {
  const categoryId = 4; 
  const languageId = 3; 
  const sql = 'SELECT * FROM Entry WHERE category_id = ? AND language_id = ?';
  database.query(sql, [categoryId, languageId], (error, results) => {
      if (error) {
          console.error('Error fetching entries:', error);
          res.status(500).send('Error fetching entries');
      } else {
          res.render('engGeneralThings', { entries: results });
      }
  });
});

router.get("/quizesZulu", (req , res) => {

  res.render("quizesZulu");
 
});

router.get("/quiz_results", (req , res) => {

  res.render("quiz_results");
 
});

router.get('/zuluImagesAndNames', (req, res) => {
    const languageId = 1; // isiZulu language_id

    // Fetch entries from the database
    const query = 'SELECT * FROM entry WHERE language_id = ?';
    database.query(query, [languageId], (err, results) => {
        if (err) {
            console.error('Error fetching entries:', err);
            return res.status(500).send('Server Error');
        }
        
        const totalQuestions = results.length;
        res.render('zuluImagesAndNames', {
            entries: results,
            totalQuestions
        });
    });
});

router.post('/zuluImagesAndNames', (req, res) => {
  const userAnswers = req.body.answers;
  const languageId = 1; // isiZulu language_id

  // Fetch correct answers from the database
  const query = 'SELECT name FROM entry WHERE language_id = ?';
  database.query(query, [languageId], (err, results) => {
      if (err) {
          console.error('Error fetching correct answers:', err);
          return res.status(500).send('Server Error');
      }

      // Compare user answers with correct answers
      const correctAnswers = results.map(entry => entry.name);
      let score = 0;

      userAnswers.forEach((answer, index) => {
          if (answer.trim().toLowerCase() === correctAnswers[index].trim().toLowerCase()) {
              score++;
          }
      });

      // Get the user's email from the session
      const email=req.session.email; 

      const quizId = 1;

      // Insert the score into the scores table
      const insertScoreQuery = 'INSERT INTO scores (user_email, language_id, quiz_id, score) VALUES (?, ?, ?, ?)';
      database.query(insertScoreQuery, [email, languageId, quizId, score], (insertErr) => {
          if (insertErr) {
              console.error('Error inserting score:', insertErr);
              return res.status(500).send('Server Error');
          }

      // Render results
      res.render('quiz_results', {
          score,
          totalQuestions: correctAnswers.length
      });
  });
});
});

  module.exports = router;


const upload = multer();

router.get('/checkYourselfEng', (req, res) => {
  const query = 'SELECT id, name, audio FROM entry WHERE language_id = 3';

  database.query(query, (err, results) => {
      if (err) {
          return res.status(500).send('Database query failed');
      }
      res.render('checkYourselfEng', { entries: results });
  });
});


router.post('/checkYourselfEng', upload.single('audio'), (req, res) => {
  const entryId = req.body.entryId;
  const userAudio = req.file;

  
  console.log('Entry ID:', entryId);
  console.log('User Audio:', userAudio);

  
  const query = 'INSERT INTO user_audios (entry_id, audio) VALUES (?, ?)';
  database.query(query, [entryId, userAudio.buffer], (err, results) => {
      if (err) {
          return res.status(500).send('Database query failed');
      }
      res.send('Audio uploaded successfully!');
  });
});

//Sepedi
router.get('/checkYourselfSepedi', (req, res) => {
  const query = 'SELECT id, name, audio FROM entry WHERE language_id = 2';

  database.query(query, (err, results) => {
      if (err) {
          return res.status(500).send('Database query failed');
      }
      res.render('checkYourselfSepedi', { entries: results });
  });
});


router.post('/checkYourselfSepedi', upload.single('audio'), (req, res) => {
  const entryId = req.body.entryId;
  const userAudio = req.file;

  
  console.log('Entry ID:', entryId);
  console.log('User Audio:', userAudio);

  
  const query = 'INSERT INTO user_audios (entry_id, audio) VALUES (?, ?)';
  database.query(query, [entryId, userAudio.buffer], (err, results) => {
      if (err) {
          return res.status(500).send('Database query failed');
      }
      res.send('Audio uploaded successfully!');
  });
});


router.get('/zuluDescriptionsAndNames', async (req, res) => {
  const languageId = 1; // isiZulu language_id

  // Fetch entries from the database
  const query = 'SELECT * FROM entry WHERE language_id = ?';
  database.query(query, [languageId], (err, results) => {
      if (err) {
          console.error('Error fetching entries:', err);
          return res.status(500).send('Server Error');
      }
      
      const totalQuestions = results.length;
      res.render('zuluDescriptionsAndNames', {
          entries: results,
          totalQuestions
      });
  });
});

router.post('/zuluDescriptionsAndNames', async (req, res) => {
  const userAnswers = req.body.answers;
  const languageId = 1; // isiZulu language_id

  // Fetch correct answers from the database
  const query = 'SELECT id, name FROM entry WHERE language_id = ?';
  database.query(query, [languageId], (err, results) => {
      if (err) {
          console.error('Error fetching correct answers:', err);
          return res.status(500).send('Server Error');
      }

      // Compare user answers with correct answers
      const correctAnswers = results.map(entry => entry.name);
      let score = 0;

      userAnswers.forEach((answer, index) => {
          if (answer.trim().toLowerCase() === correctAnswers[index].trim().toLowerCase()) {
              score++;
          }
      });

      // Get the user's email from the session
      const email=req.session.email; 

      
      const quizId = 2;

      // Insert the score into the scores table
      const insertScoreQuery = 'INSERT INTO scores (user_email, language_id, quiz_id, score) VALUES (?, ?, ?, ?)';
      database.query(insertScoreQuery, [email, languageId, quizId, score], (insertErr) => {
          if (insertErr) {
              console.error('Error inserting score:', insertErr);
              return res.status(500).send('Server Error');
          }

          // Render results
          res.render('quizResults', {
              score,
              totalQuestions: correctAnswers.length
          });
      });
  });
});
router.get("/quizResults", (req , res) => {

  res.render("quizResults");
 
});


router.get('/checkYourselfZulu', (req, res) => {
  const query = 'SELECT id, name, audio FROM entry WHERE language_id = 1';

  database.query(query, (err, results) => {
      if (err) {
          return res.status(500).send('Database query failed');
      }
      res.render('checkYourselfZulu', { entries: results });
  });
});


router.post('/checkYourselfZulu', upload.single('audio'), (req, res) => {
  const entryId = req.body.entryId;
  const userAudio = req.file;

 
  console.log('Entry ID:', entryId);
  console.log('User Audio:', userAudio);

  
  const query = 'INSERT INTO user_audios (entry_id, audio) VALUES (?, ?)';
  database.query(query, [entryId, userAudio.buffer], (err, results) => {
      if (err) {
          return res.status(500).send('Database query failed');
      }
      res.send('Audio uploaded successfully!');
  });
});

//map Sepedi quizzes
router.get("/quizzesSepedi", (req , res) => {

  res.render("quizzesSepedi");
 
});

router.get('/sepediImagesAndNames', async (req, res) => {
  const languageId = 2; // Sepedi language_id

  // Fetch entries from the database
  const query = 'SELECT * FROM entry WHERE language_id = ?';
  database.query(query, [languageId], (err, results) => {
      if (err) {
          console.error('Error fetching entries:', err);
          return res.status(500).send('Server Error');
      }
      
      const totalQuestions = results.length;
      res.render('sepediImagesAndNames', {
          entries: results,
          totalQuestions
      });
  });
});

router.post('/sepediImagesAndNames', async (req, res) => {
  const userAnswers = req.body.answers;
  const languageId = 2; // Sepedi language_id

  // Fetch correct answers from the database
  const query = 'SELECT id, name FROM entry WHERE language_id = ?';
  database.query(query, [languageId], (err, results) => {
      if (err) {
          console.error('Error fetching correct answers:', err);
          return res.status(500).send('Server Error');
      }

      // Compare user answers with correct answers
      const correctAnswers = results.map(entry => entry.name);
      let score = 0;

      userAnswers.forEach((answer, index) => {
          if (answer.trim().toLowerCase() === correctAnswers[index].trim().toLowerCase()) {
              score++;
          }
      });

      // Get the user's email from the session
      const email=req.session.email; 
      
      const quizId = 3;

      // Insert the score into the scores table
      const insertScoreQuery = 'INSERT INTO scores (user_email, language_id, quiz_id, score) VALUES (?, ?, ?, ?)';
      database.query(insertScoreQuery, [email, languageId, quizId, score], (insertErr) => {
          if (insertErr) {
              console.error('Error inserting score:', insertErr);
              return res.status(500).send('Server Error');
          }

          // Render results
          res.render('sepediResults1', {
              score,
              totalQuestions: correctAnswers.length
          });
      });
  });
});

router.get('/sepediDescriptionsAndNames', async (req, res) => {
  const languageId = 2; //Sepedi language Id

  // Fetch entries from the database
  const query = 'SELECT * FROM entry WHERE language_id = ?';
  database.query(query, [languageId], (err, results) => {
      if (err) {
          console.error('Error fetching entries:', err);
          return res.status(500).send('Server Error');
      }
      
      const totalQuestions = results.length;
      res.render('sepediDescriptionsAndNames', {
          entries: results,
          totalQuestions
      });
  });
});

router.post('/sepediDescriptionsAndNames', async (req, res) => {
  const userAnswers = req.body.answers;
  const languageId = 2; 

  // Fetch correct answers from the database
  const query = 'SELECT id, name FROM entry WHERE language_id = ?';
  database.query(query, [languageId], (err, results) => {
      if (err) {
          console.error('Error fetching correct answers:', err);
          return res.status(500).send('Server Error');
      }

      // Compare user answers with correct answers
      const correctAnswers = results.map(entry => entry.name);
      let score = 0;

      userAnswers.forEach((answer, index) => {
          if (answer.trim().toLowerCase() === correctAnswers[index].trim().toLowerCase()) {
              score++;
          }
      });

      // Get the user's email from the session
      const email=req.session.email; 

      
      const quizId = 4;

      // Insert the score into the scores table
      const insertScoreQuery = 'INSERT INTO scores (user_email, language_id, quiz_id, score) VALUES (?, ?, ?, ?)';
      database.query(insertScoreQuery, [email, languageId, quizId, score], (insertErr) => {
          if (insertErr) {
              console.error('Error inserting score:', insertErr);
              return res.status(500).send('Server Error');
          }

          // Render results
          res.render('sepediResults2', {
              score,
              totalQuestions: correctAnswers.length
          });
      });
  });
});


//English Quizzes
