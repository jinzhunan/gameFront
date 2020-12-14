import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { setUsers } from '../actions/users';
import './style.css'
import HeaderPage from '../components/header/HeaderPage'
import BodyPage from '../components/body/BodyPage'

const IndexHome = () => {

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch();


          return (
            <>
              <HeaderPage />
              <BodyPage />
            </>
    )
}

export default IndexHome
