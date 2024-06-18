import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { logoutUserAsync, selectloggedInUser } from '../authSlice'

function Logout() {
    const dispatch = useDispatch()
    const user = useSelector(selectloggedInUser)


    useEffect(() => {
     dispatch(logoutUserAsync()) 
})
    
  return (
    <>
    {!user && <Navigate to='/login' replace={true}></Navigate>}
    </>
  )
}

export default Logout