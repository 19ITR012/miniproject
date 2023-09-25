const db = require('../config/dbConfig');

const registerUser = (req, res) => {
    const { username, password, email, cdmid } = req.body;

    // Check if the username or email already exists in the database
    db.query(
        'SELECT * FROM user_details WHERE UserName = ? OR EmailId = ?',
        [username, email],
        (error, existingUsers) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (existingUsers.length > 0) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            // If the username and email are unique, insert the new user into the database
            db.query(
                'INSERT INTO user_details (UserName, Password, EmailId, CDMId) VALUES (?, ?, ?, ?)',
                [username, password, email, cdmid],
                (error, result) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).json({ message: 'Internal server error' });
                    }

                    return res.status(200).json({ message: 'Registration successful' });
                }
            );
        }
    );
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    // Check if the provided username and password match a user in the database
    db.query(
        'SELECT UserId, UserName, IsAdmin FROM user_details WHERE UserName = ? AND Password = ?',
        [username, password],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log(result[0])
            if (result.length === 1) {
                const userData = result[0];
                return res.status(200).json({ message: 'Login successful', userData });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        }
    );
};

module.exports = {
    registerUser,
    loginUser,
};