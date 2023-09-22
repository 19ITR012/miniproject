import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'; // Import TextField from Material-UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Row from './Row';
import './admin.css';

import { createTheme, ThemeProvider, styled} from '@mui/material/styles';



export default function CollapsibleTable() {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(async () => {
    console.log("fetch");
    let data = await axios.get('http://localhost:4000/skill/admin/data')
      .then((res) => {
        console.log(res);
        setRows(res.data)
        setLoading(false);
      })
  }, []);

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h1>Skills</h1>
      <TextField
        className="search-input"
        label="Search"
        type="text"
        variant="outlined"
        fullWidth
        size="small"
        padding-bottom="5px"
        padding-right="5px"
        style={{ width: '200px' }} 
        value={searchQuery}
        onChange={handleSearch}
      />
      <TableContainer component={Paper}>
        {console.log(rows)}
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow className='Table_head'>
              <ThemeProvider theme={theme}>
              <CustomCheckbox></CustomCheckbox>
              <CustomCheckbox>Resource Name</CustomCheckbox>
              <CustomCheckbox align="right">Current project</CustomCheckbox>
              <CustomCheckbox align="right">Status</CustomCheckbox>
              <CustomCheckbox align="right">Start Date</CustomCheckbox>
              <CustomCheckbox align="right">End Date</CustomCheckbox>
              </ThemeProvider>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            ) : (
              rows
                .filter((row) =>
                  row.UserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (row.skills &&
                    row.skills.some((skill) =>
                      skill.Skill_Name.toLowerCase().includes(searchQuery.toLowerCase())
                    ))
                )
                .map((row, index) => (
                  <Row key={index} row={row} />
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
