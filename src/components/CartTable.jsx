import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { clientContext } from '../contexts/ClientContext';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function CartTable() {
  const classes = useStyles();
  const {cart, getCart, changeCountProducts } = useContext(clientContext)
  useEffect(() => {
    getCart()
  }, [])
  console.log(cart)
  function handleChange(id, count) {
      if(count < 1){
        return
      }
    changeCountProducts(count, id)
  }
  return (
    <>
        {
            cart ? (
        
              <TableContainer component={Paper} className="cart-table">
                <Table className="cartunder-table" aria-label="caption table">                    
                    <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell align="left">Название</TableCell>                        
                        <TableCell align="left">Цена</TableCell>                        
                        <TableCell align="left">Фото</TableCell>                        
                        <TableCell align="left">Количество человек</TableCell>
                        <TableCell align="left">Общая Сумма</TableCell>                      
                                               
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {cart.products.map((row, index) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {index + 1 }
                        </TableCell>
                        <TableCell align="left">{row.product.title}</TableCell>                        
                        <TableCell align="left">{row.product.price}</TableCell>                        
                        <TableCell align="left">
                          <img width="100" src={row.product.photo} alt="" />
                        </TableCell>                        
                        <TableCell align="left">
                            <input type="number"
                                className="cart-input"
                                value={row.count}
                                onChange={(e) => handleChange(row.product.id, e.target.value)}
                            />    
                        </TableCell>   
                        <TableCell align="left">{row.subPrice}</TableCell>                                                                        
                        </TableRow>                    
                    ))}
                    </TableBody>                    
                    </Table>
                    <div className="carttable-down">
                      <h4 id="total-h">TOTAL:{cart.totalPrice}<MonetizationOnIcon/></h4>
                      <Link to="/pay">
                        <Button                        
                        variant="outlined"
                        color="default">BUY</Button>
                      </Link>
                    </div>
              </TableContainer>
            ) : (
                <Loader/>
            )
        }
    </>    
  );
}
