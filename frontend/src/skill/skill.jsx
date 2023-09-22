import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
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
import AddIcon from '@mui/icons-material/Add';

import Cookies from 'js-cookie';
import axios from 'axios';
import './skill.css';
import { createTheme, ThemeProvider, styled} from '@mui/material/styles';

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

function createData(name, project, status, startDate, endDate) {
  return {
    name,
    project,
    status,
    startDate,
    endDate,
    history: [],
  };
}

function SkillRow(props) {
  const { newSkill, setNewSkill, handleAddSkill } = props;

  return (
    <TableRow>
      <TableCell>
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkill.skillName}
          onChange={(e) => setNewSkill({ ...newSkill, skillName: e.target.value })}
        />
      </TableCell>
      <TableCell>
        <input
          type="text"
          placeholder="Skill Category"
          value={newSkill.skillCategory}
          onChange={(e) => setNewSkill({ ...newSkill, skillCategory: e.target.value })}
        />
      </TableCell>
      <TableCell align="right">
        <input
          type="checkbox"
          checked={newSkill.certified}
          onChange={(e) => setNewSkill({ ...newSkill, certified: e.target.checked })}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton variant="outlined" onClick={handleAddSkill}>
          <AddIcon /> {/* Add the "+" icon */}
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function Row(props) {
  const { row, updateRow } = props;
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState({ skillName: '', skillCategory: '', certified: false });
  const userid = Cookies.get('userID');
  const [skillDetails, setSkillDetails] = useState([]);

  useEffect(() => {
    // Fetch existing skills for the current user
    axios
      .get(`http://localhost:4000/skill/Skill/${userid}`)
      .then((response) => {
        setSkillDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const updateSkills = (updatedSkills) => {
    setSkillDetails(updatedSkills);
  };

  const handleAddSkill = () => {
    if (!newSkill.skillName || !newSkill.skillCategory) {
      alert('Please enter Skill Name and Skill Category.');
    } else {
      const skillData = {
        skillName: newSkill.skillName,
        skillCategory: newSkill.skillCategory,
        certified: newSkill.certified,
        userId: userid,
      };

      axios
        .post('http://localhost:4000/skill/Skill', skillData)
        .then((response) => {
          console.log(response.data);

          // Refresh the skills list for the current user
          axios
            .get(`http://localhost:4000/skill/Skill/${userid}`)
            .then((refreshResponse) => {
              console.log(refreshResponse);
              updateSkills(refreshResponse.data);

              setNewSkill({ skillName: '', skillCategory: '', certified: false });
            })
            .catch((refreshError) => {
              console.error(refreshError);
              alert('Error refreshing skill details.');
            });
        })
        .catch((error) => {
          console.error(error);
          alert('Error adding skill. Please try again.');
        });
    }
  };

  return (
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
          {row.name}
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
                  <ThemeProvider theme={theme}>
                    <CustomCheckbox>Skill Name</CustomCheckbox>
                    <CustomCheckbox>Skill Category</CustomCheckbox>
                    <CustomCheckbox align="right">Certified</CustomCheckbox>
                    <CustomCheckbox align="right">Actions</CustomCheckbox>
                    </ThemeProvider>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log(skillDetails)}
                  {skillDetails.map((skill, index) => (
                    <TableRow key={index}>
                      
                      <TableCell>{skill.Skill_Name}</TableCell>
                      <TableCell>{skill.Skill_Category}</TableCell>
                      <TableCell align="right">
                        {skill.Iscertified === '1' ? 'Yes' : 'No'}
                      </TableCell>
                    </TableRow>
                  ))}
                  <SkillRow
                    newSkill={newSkill}
                    setNewSkill={setNewSkill}
                    handleAddSkill={handleAddSkill}
                  />
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleTable = () => {
  const username = Cookies.get('username');

  const [rows, setRows] = useState([
    createData(username, 'Project A', 'Billable', '21.09.2023', '15.10.2023'),
  ]);
  const [loading, setLoading] = useState(true);

  const updateRow = (updatedRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.name === updatedRow.name ? updatedRow : row))
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          <ThemeProvider theme={theme}>
            <CustomCheckbox />
            <CustomCheckbox>Resource Name</CustomCheckbox>
            <CustomCheckbox align="right">Current project</CustomCheckbox>
            <CustomCheckbox align="right">Status</CustomCheckbox>
            <CustomCheckbox align="right">Start Date</CustomCheckbox>
            <CustomCheckbox align="right">End Date</CustomCheckbox>
            </ThemeProvider>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} updateRow={updateRow} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
