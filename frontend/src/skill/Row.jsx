import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Parse the concatenated skill data into arrays
    const skillNames = row.Skill_Names ? row.Skill_Names.split(',') : [];
    const skillCategories = row.Skill_Categories ? row.Skill_Categories.split(',') : [];
    const isCertified = row.Iscertified ? row.Iscertified.split(',') : [];

    // Create an array of skill objects
    const skillData = skillNames.map((name, index) => ({
        Skill_Name: name,
        Skill_Category: skillCategories[index],
        Iscertified: isCertified[index]=== '1' ? 'Yes' : 'No',
      }))   

    setSkills(skillData);
  }, [row]);

  return (
    <>
      <React.Fragment>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.UserName}
          </TableCell>
          <TableCell align="right">{row.project}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.startDate}</TableCell>
          <TableCell align="right">{row.endDate}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Skills
                </Typography>
                <Table size="small" aria-label="skills">
                  <TableHead>
                    <TableRow>
                      <TableCell>Skill Name</TableCell>
                      <TableCell>Skill Category</TableCell>
                      <TableCell align="right">Certified</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skills.map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell>{skill.Skill_Name}</TableCell>
                        <TableCell>{skill.Skill_Category}</TableCell>
                        <TableCell align="right">{skill.Iscertified}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     UserName: PropTypes.string.isRequired,
//     project: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     startDate: PropTypes.string.isRequired,
//     endDate: PropTypes.string.isRequired,
//     Skill_Names: PropTypes.string,
//     Skill_Categories: PropTypes.string,
//     Iscertified: PropTypes.string,
//   }).isRequired,
// };

export default Row;
