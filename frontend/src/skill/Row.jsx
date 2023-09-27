import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const [editableSkills, setEditableSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [vari, setVari] = useState("");
  const [flag, setFlag] = useState(true);
  
  useEffect(() => {
    const skillNames = row.Skill_Names ? row.Skill_Names.split(',') : [];
    const skillCategories = row.Skill_Categories ? row.Skill_Categories.split(',') : [];
    const isCertified = row.Iscertified ? row.Iscertified.split(',') : [];
    const completedDate = row.CompletedDate ? row.CompletedDate.split(',') : [];

    const skillData = skillNames.map((name, index) => ({
      Skill_Name: name,
      Skill_Category: skillCategories[index],
      Iscertified: isCertified[index] === '1' ? 'Yes' : 'No',
      CompletedDate: completedDate[index],
    }));

    setSkills(skillData);
    setEditableSkills([...skillData]);
  }, [row]);

  const handleEditClick = (i) => {
    setFlag(true);
    console.log(i)
    setVari([...vari,i])
    // setIsEditing(true);
  };

  const handleSaveClick = async (i) => {
    try {
      const updatedSkill = editableSkills[i];
      await axios.put(`/api/updateSkill/${updatedSkill.skillId}`, updatedSkill);
      setVari("");
      setSkills([...editableSkills]);
      setFlag(false);
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const handleCancelClick = (i) => {
    setFlag(false)
    // setIsEditing(false);
    setVari("")
    setEditableSkills([...skills]);
    // setVari([...vari,i=1])
  };

  const handleInputChange = (e, index, key) => {
    const newEditableSkills = [...editableSkills];
    newEditableSkills[index][key] = e.target.value;
    setEditableSkills(newEditableSkills);
  };

  const CustomTableCell = styled(TableCell)(({ theme }) => ({
    color: "white",
    backgroundColor: "#19105B",
    fontSize: 14,
    fontFamily: "sans-serif",
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
          </TableCell>
          <TableCell align="right">Project A</TableCell>
          <TableCell align="right">Billable{row.status}</TableCell>
          <TableCell align="right">21.09.2023</TableCell>
          <TableCell align="right">15.10.2023</TableCell>
          <TableCell>
           
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/* <Typography variant="h6" gutterBottom component="div">
                  Skills
                </Typography> */}
                <Table size="small" aria-label="skills">
                  <TableHead>
                    <TableRow>
                      <ThemeProvider theme={theme}>
                        <CustomTableCell>Skill Name</CustomTableCell>
                        <CustomTableCell>Skill Category</CustomTableCell>
                        <CustomTableCell align="right">Certified</CustomTableCell>
                        <CustomTableCell align="right">Completed Date</CustomTableCell>
                        <CustomTableCell align="right"> </CustomTableCell>
                      </ThemeProvider>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {editableSkills.map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {vari[index] ? (
                            <input
                              type="text"
                              value={skill.Skill_Name}
                              onChange={(e) => handleInputChange(e, index, 'Skill_Name')}
                            />
                          ) : (
                            skill.Skill_Name
                          )}
                        </TableCell>
                        <TableCell>
                          {vari[index] ? (
                            <input
                              type="text"
                              value={skill.Skill_Category}
                              onChange={(e) => handleInputChange(e, index, 'Skill_Category')}
                            />
                          ) : (
                            skill.Skill_Category
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {vari[index] ? (
                            <select
                              value={skill.Iscertified}
                              onChange={(e) => handleInputChange(e, index, 'Iscertified')}
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          ) : (
                            skill.Iscertified
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {vari[index]  ? (
                            <input
                              type="text"
                              value={skill.CompletedDate}
                              onChange={(e) => handleInputChange(e, index, 'CompletedDate')}
                            />
                          ) : (
                            new Date(skill.CompletedDate).toLocaleDateString('en-GB')
                          )}
                        </TableCell>
                        <TableCell>
                        {vari[index] ? (
              <>
                <IconButton aria-label="save" size="small" onClick={handleSaveClick}>
                  <SaveIcon />
                </IconButton>
                <IconButton aria-label="cancel" size="small" onClick={handleCancelClick}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <IconButton aria-label="edit" size="small" onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            )}
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
