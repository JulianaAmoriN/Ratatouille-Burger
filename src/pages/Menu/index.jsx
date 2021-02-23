import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'; 
import {Copyright, Logo, useStyles, NavBar} from '../../components.js';
import { IconButton } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const Menu = () => {
  const classes = useStyles();
  const tokenLocal = localStorage.getItem('token');


  const [breakefast, setBreakfast] = useState([]);
  const [hamburguers, setHamburguers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${tokenLocal}`
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setList(data) 
      })
  }, [])

  const listBreakFast = () => {
    console.log(list)
    const productsBreakfast = list.filter(itens => itens.type===('breakfast'));
      setBreakfast(productsBreakfast); 
  }

  const listHamburguer = () => {
    console.log(list)
    const productsHamburguers = list.filter(itens => itens.sub_type===('hamburguer'));
      setHamburguers(productsHamburguers);
  }

  const listDrinks = () => {
    console.log(list)
    const productsDrinks = list.filter(itens => itens.sub_type===('drinks'));
      setDrinks(productsDrinks);
    
  }

  return (
    <div>
      <Grid
       className='container'>
        <NavBar />
        <div className={classes.paper} >
        <form className={classes.paperTable}  noValidate autoComplete="off" >
              <Input placeholder="Nome"fullWidth inputProps={{ 'aria-label': 'description' }} />
              <Input placeholder="Mesa" inputProps={{ 'aria-label': 'description' }} />
            </form>
        </div>

        <div>
          <div>
            <button onClick={listBreakFast}>Café da manhã</button>
            {breakefast.map((produto) => (
              <div key={produto.id}>
                <p>{produto.name} R$ {produto.price},00 {produto.complement} <IconButton color="primary" aria-label="add to shopping cart"><AddShoppingCartIcon/></IconButton></p>
              </div>
            ))}
          </div>
          <div>
            <button onClick={listHamburguer}>Hamburguers</button>
            {hamburguers.map((produto) => (
              <p key={produto.id}>
                <p>{produto.name} {produto.flavor} {produto.complement} R$ {produto.price},00<IconButton color="primary" aria-label="add to shopping cart"><AddShoppingCartIcon/></IconButton></p>
              </p>
            ))}
          </div>
          <div>
            <button onClick={listDrinks}>Bebidas</button>
            {drinks.map((produto) => (
              <p key={produto.id}>
                <p>{produto.name} R$ {produto.price},00<IconButton color="primary" aria-label="add to shopping cart"><AddShoppingCartIcon/></IconButton></p>
              <p>
                </p>
              </p>
            ))}
          </div>
        </div>
      </Grid>
      <Link to="/Hall"><ArrowBackIosIcon color="disabled" fontSize="large"/> </Link>
      <Copyright />
    </div>
  )
};

export default Menu;