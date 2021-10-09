import React, { useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { clientContext } from '../contexts/ClientContext';
import amber from '@material-ui/core/colors/amber';
import Loader from './Loader';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: amber[300],
    color: theme.palette.common.black,
    fontSize: 36,
    fontFamily:"Monospace",    
  },
  body: {
    fontSize: 16,
    fontFamily:"Monospace",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const color = amber[300];
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CommentTable() {
  const classes = useStyles();
  const {comments} = useContext(clientContext)
 

  return (
    <>
      {
        comments ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell  align="right">Comments:</StyledTableCell>                        
                </TableRow>
              </TableHead>
              <TableBody>
                {comments.map((row, index) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">{row.comment}</StyledTableCell>              
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (<Loader/>)

      }
    </>
  );
}
