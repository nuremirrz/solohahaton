import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { clientContext } from '../contexts/ClientContext';
import Loader from './Loader';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function FavoriteTable() {
  const classes = useStyles();
  const {favorite, getFavorite, changeCountProducts } = useContext(clientContext)
  useEffect(() => {
    getFavorite()
  }, [])
  console.log(favorite)

  
  return (
    <>
        {
            favorite ? (
        
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">                    
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell align="left">Фото</TableCell>
                        <TableCell align="left">Описание</TableCell>                        
                        <TableCell align="left">Месторасположение</TableCell>                                              
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {favorite.products.map((row, index) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {index + 1 }
                        </TableCell>                        
                        <TableCell align="left">
                          <img width="400" src={row.product.photo} alt="" />
                        </TableCell>
                        <TableCell align="left">{row.product.description}</TableCell>                                                                         
                        <TableCell align="left">{row.product.region}</TableCell>
                        </TableRow>                    
                    ))}
                    </TableBody>                    
                    </Table>                    
                    </TableContainer>
            ) : (
                <Loader/>
            )
        }
    </>    
  );
}
