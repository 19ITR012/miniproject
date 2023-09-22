// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json()); 

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Admin@123",
//     database: "skill"
// });

// app.get('/', (req, res) => {
//     return res.json("from backend");
// });

// /* DB connection for Registration*/
// app.post('/Register', (req, res) => {
//     const userdetails = req.body;
//     console.log(userdetails);

//     db.query(
//         'INSERT INTO user_details (UserName, Password,  EmailId) VALUES (?, ?, ?)',
//         [userdetails.username, userdetails.password, userdetails.email],
//         (error, result) => {
//             if (error) {
//                 console.error(error);
//                 res.status(400).send({ message: 'Error adding' });
//             } else {
//                 res.status(200).send({ message: 'Added' });
//             }
//         }
//     );
// });

// /* DB connection for Login*/
// app.post('/login', (req, res) => {
//     const { username, password } = req.body.userdetails;

//     db.query(
//         'SELECT UserId, UserName,IsAdmin FROM user_details WHERE UserName = ? AND Password = ?',
//         [username, password],
//         (error, result) => {
//             if (error) {
//                 console.error(error);
//                 res.status(500).send({ message: 'Error fetching user' });
//             } else {
//                 if (result.length === 1) {
//                     const userData = result[0]; 
//                     res.status(200).send({ message: 'Login successful', userData });
//                 } else {
//                     res.status(401).send({ message: 'Invalid credentials' });
//                 }
//             }
//         }
//     );
// });

// /* DB connection for Skill*/

// app.post('/Skill', (req, res) => {
//     const { skillName, skillCategory, certified, userId } = req.body;
  
//     if (!skillName || !skillCategory || !userId) {
//       return res.status(400).json({ message: 'Skill Name, Skill Category, and UserID are required fields.' });
//     }

//     db.query(
//         'INSERT INTO skill_details (Skill_Name, Skill_Category, Iscertified, UserId) VALUES (?, ?, ?, ?)',
//         [skillName, skillCategory, certified, userId],
//         (error, result) => {
//           if (error) {
//             console.error(error);
//             return res.status(500).json({ message: 'Internal server error' });
//           } else {
//             console.log('Skill added successfully');
//             return res.status(200).json({ message: 'Skill added successfully' });
//           }
//         }
//       );
//     });

// /* DB connection for Admin*/

// app.get('/admin/data', (req, res) => {
//     const sql = `
//          SELECT
//     ud.UserId,
//     ud.UserName,
//     GROUP_CONCAT(sd.Skill_Name) AS Skill_Names,
//     GROUP_CONCAT(sd.Skill_Category) AS Skill_Categories,
//     GROUP_CONCAT(sd.Iscertified) AS Iscertified
// FROM
//     user_details ud
// JOIN
//     skill_details sd ON ud.UserId = sd.UserId
// WHERE
//     ud.IsAdmin = false
// GROUP BY
//     ud.UserId,ud.UserName`;

//     db.query(sql, (error, results) => {
//         if (error) {
//             console.error(error);
//             return res.status(500).json({ message: 'Internal server error' });
//         }
//         console.log(results)
//         return res.status(200).json(results);
//     });
// });

// app.get('/Skill/:userid', (req, res) => {
//     const userID = req.params.userid;
//     const query = 'SELECT Skill_Name, Skill_Category, Iscertified FROM skill_details WHERE UserId = ?';
  
//     db.query(query, [userID], (err, results) => {
//       if (err) {
//         console.error('Error querying MySQL:', err);
//         res.status(500).json({ error: 'An error occurred while fetching skill details' });
//         return;
//       }
      
//     //   console.log(results);
//       res.json(results);
//     });
//   });
  
  
// app.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });
