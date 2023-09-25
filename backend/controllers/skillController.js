const { log } = require('console');
const db = require('../config/dbConfig');

const addSkill = (req, res) => {
    const { skillName, skillCategory, certified, completeddate,userId } = req.body;
    console.log(req.body)
    // Check if required fields are provided
    if (!skillName || !skillCategory || !userId) {
        return res.status(400).json({ message: 'Skill Name, Skill Category, and UserID are required fields.' });
    }

    // Insert the skill into the database
    db.query(
        'INSERT INTO skill_details (Skill_Name, Skill_Category, Iscertified,CompletedDate, UserId) VALUES (?, ?, ?, ?,?)',
        [skillName, skillCategory, certified, completeddate, userId],
        (error, result) => {
            if (error) {
                console.log(result)
                console.log(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log(result)
            console.log('Skill added successfully');
            return res.status(200).json({ message: 'Skill added successfully' });
        }
    );
};

const getSkillsByUserId = (req, res) => {
    const userId = req.params.userid;

    // Retrieve skills for the specified user from the database
    db.query(
        'SELECT Skill_Name, Skill_Category, Iscertified, CompletedDate FROM skill_details WHERE UserId = ?',
        [userId],
        (error, results) => {
            if (error) {
                console.error('Error querying MySQL:', error);
                return res.status(500).json({ error: 'An error occurred while fetching skill details' });
            }
            console.log(results)
            res.json(results);
        }
    );
};

const getSkillAdmin = (req, res) => {
    const sql = `
         SELECT
    ud.UserId,
    ud.UserName,
    GROUP_CONCAT(sd.Skill_Name) AS Skill_Names,
    GROUP_CONCAT(sd.Skill_Category) AS Skill_Categories,
    GROUP_CONCAT(sd.Iscertified) AS Iscertified,
    GROUP_CONCAT(sd.CompletedDate) AS CompletedDate,
FROM
    user_details ud
JOIN
    skill_details sd ON ud.UserId = sd.UserId
WHERE
    ud.IsAdmin = false
GROUP BY
    ud.UserId,ud.UserName`;

    db.query(sql, (error, results) => {
       
        if (error) {
            console.log(error)
            res.send("error")
            // return handleDatabaseError(res, error);
        }
        else{
        console.log("holaaaaa,.,.,.,.,<><><><><><>",results);
        return res.status(200).json(results);}
    });
}

module.exports = {
    addSkill,
    getSkillsByUserId,
    getSkillAdmin
};