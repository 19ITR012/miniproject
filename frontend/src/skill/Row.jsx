import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { createTheme, ThemeProvider, styled} from '@mui/material/styles';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  


  useEffect(() => {
    const skillNames = row.Skill_Names ? row.Skill_Names.split(',') : [];
    const skillCategories = row.Skill_Categories ? row.Skill_Categories.split(',') : [];
    const isCertified = row.Iscertified ? row.Iscertified.split(',') : [];
    const completeddate = row.CompletedDate ? row.CompletedDate.split(',') : [];

    const skillData = skillNames.map((name, index) => ({
        Skill_Name: name,
        Skill_Category: skillCategories[index],
        Iscertified: isCertified[index]=== '1' ? 'Yes' : 'No',
        CompletedDate: completeddate[index]
      }))   

    setSkills(skillData);
  }, [row]);
  const CustomCheckbox = styled(TableCell)(({ theme }) => ({
    color: "white",
    backgroundColor: "#19105B",
    fontSize: 14,
    fontFamily: "sans-serif"
  }));
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#19105B',
      },
    },
  });

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
          </TableCell >
          <TableCell align="right">Project A</TableCell>
          <TableCell align="right">Billable{row.status}</TableCell>
          <TableCell align="right">21/09/2023</TableCell>
          <TableCell align="right">15/10/2023</TableCell>
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
                    <ThemeProvider theme={theme}>
                      <CustomCheckbox>Skill Name</CustomCheckbox>
                      <CustomCheckbox>Skill Category</CustomCheckbox>
                      <CustomCheckbox align="right">Certified</CustomCheckbox>
                      <CustomCheckbox align="right">Completed Date</CustomCheckbox>
                      </ThemeProvider>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skills.map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell>{skill.Skill_Name}</TableCell>
                        <TableCell>{skill.Skill_Category}</TableCell>
                        <TableCell align="right">{skill.Iscertified}</TableCell>
                        <TableCell align="right">
                        {new Date(skill.CompletedDate).toLocaleDateString('en-GB')}
                        </TableCell>
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

export default Row;
