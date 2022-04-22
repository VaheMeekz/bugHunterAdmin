import React from 'react';
import css from './home.module.css'
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {LOGIN_PAGE} from "../../utils/urls";
import {changeisAuthAC} from "../../redux/actions/authAction";
import logo from "../../assets/images/logo-logo.png"
const Home = () => {

    const isAuth = useSelector(state => state?.AuthReducer.isAuth)
    const router = useHistory()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(changeisAuthAC(false))
        router.push(LOGIN_PAGE)
    }

    return (
        <div className={css.homeBox}>
            <img src={logo} alt="logo"/>
            <h1>Welcome To BugHunter Admin Panel</h1>
            <h3>Go To Login Page</h3>
            {
                isAuth ?
                    <Button variant="dark" onClick={() => logout()}>Logout</Button>
                    :
                    <Button variant="dark" onClick={() => router.push(LOGIN_PAGE)}>Login</Button>
            }
        </div>
    );
};

export default Home;