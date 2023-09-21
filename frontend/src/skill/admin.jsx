import React, { useEffect, useState} from 'react';
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
import axios from 'axios';
import Row from './Row';



// Row.propTypes = {
//   row: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     project: PropTypes.string.isRequired,
//     status: PropTypes.string.isRequired,
//     startDate: PropTypes.string.isRequired,
//     endDate: PropTypes.string.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         Skill_Name: PropTypes.string.isRequired,
//         Skill_Category: PropTypes.string.isRequired,
//         Iscertified: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async() => {
    console.log("fetch");
    let data=await axios.get('http://localhost:4000/admin/data')
    .then((res)=>{
      console.log(res);
      setRows(res.data)
      setLoading(false);
    })
      // .then((response) => response.json())
      // .then((data) => {
      //   const formattedRows = data.map((user) => {
      //     return createData(
      //       user.UserName,
      //       user.project,
      //       user.status,
      //       user.startDate,
      //       user.endDate,
      //       user.skills
      //     );
      //   });
      //   setRows(formattedRows);
      //   setLoading(false);
      // })
      // .catch((error) => {
      //   console.error('Error fetching user data:', error);
      //   setLoading(false);
      // });
  }, []);



  return (
    <TableContainer component={Paper}>
      {console.log(rows)}
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Resource Name</TableCell>
            <TableCell align="right">Current project</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>Loading...</TableCell>
            </TableRow>
          ) :
           (
            rows.map((row, index) => (
              <Row key={index} row={row} />
            ))
          )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}