const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');

router.post('/Skill', skillController.addSkill);
router.get('/Skill/:userid', skillController.getSkillsByUserId);
router.get('/admin/data', skillController.getSkillAdmin);


module.exports = router;