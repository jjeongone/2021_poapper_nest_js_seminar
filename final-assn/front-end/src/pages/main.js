import styled from "styled-components";
import axios from "axios";
import {Component} from "react";


export default class Main extends Component{
    LoginHandler = async (e) => {
        const id = document.getElementById('login_id').value;
        const password = document.getElementById('login_password').value;
        try {
            const login_user = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                id: id,
                password: password
            }, {withCredentials: true})
            const user_account_type = login_user.data.account_type;
            if (user_account_type == 'STUDENT') {
                this.props.history.push('/home');
            } else if (user_account_type == 'INSTRUCTOR') {
                this.props.history.push('/seminar-instructor');
            } else if (user_account_type == 'ADMIN') {
                this.props.history.push('/account-admin');
            }
        } catch(err) {

        }
    }

    RegisterHandler = async (e) => {
        try {
            const id = document.getElementById('register_id').value;
            const password = document.getElementById('register_password').value;
            const name = document.getElementById('register_name').value;
            const account_type = document.getElementById('register_type').value;
            const email = document.getElementById('register_email').value;
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                id: id,
                password: password,
                name: name,
                account_type: account_type,
                email: email
            }, {withCredentials: true})
            this.props.history.push('/');
        } catch(err) {
            console.log(err);
        }
    }

    LogoutHandler = async (e) => {
        try {
            await axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, {withCredentials: true})
            this.props.history.push('/');
        } catch (err) {

        }
    }

    render() {
        return (
            <div>
                <Title>PoApper Seminar Manager</Title>
                <Login>
                    <LoginTitle>?????????</LoginTitle>
                    <LoginBody>
                        <form>
                            <div>
                                ?????????: <input id="login_id" type="text" name="id" />
                            </div>
                            <div>
                                ????????????: <input id="login_password" type="password" name="password" />
                            </div>
                            <div>
                                <input type="button" value="?????????" onClick={this.LoginHandler}/>
                            </div>
                        </form>
                    </LoginBody>
                </Login>
                <Logout>
                    <h3>????????????</h3>
                    <div>
                        <input type="button" value="????????????" onClick={this.LogoutHandler}/>
                    </div>
                </Logout>
                <Register>
                    <RegisterTitle>????????????</RegisterTitle>
                    <RegisterBody>
                        <form>
                            <div>
                                ??????: <input id="register_name" type="text" name="name" />
                            </div>
                            <div>
                                ????????????(STUDENT/INSTRUCTOR/ADMIN): <input id="register_type" type="text" name="account_type" />
                            </div>
                            <div>
                                ?????????: <input id="register_id" type="text" name="id" />
                            </div>
                            <div>
                                ????????????: <input id="register_password" type="text" name="password" />
                            </div>
                            <div>
                                ?????????: <input id="register_email" type="text" name="email" />
                            </div>
                            <div>
                                <input type="button" value="????????????" onClick={this.RegisterHandler}/>
                            </div>
                        </form>
                    </RegisterBody>
                </Register>
            </div>
        )
    }
}

const Title = styled.h1`
  text-align: center;
  padding: 10px;
`

const Login = styled.div`
  text-align: center;
  padding: 5px;
`

const LoginTitle = styled.h3`
  text-align: center;
`

const LoginBody = styled.div`
  text-align: center;
`

const Logout = styled.div`
  text-align: center;
  padding: 5px;
`

const Register = styled.div`
  text-align: center;
  padding: 5px;
`

const RegisterTitle = styled.h3`
  text-align: center;
`

const RegisterBody = styled.div`
  text-align: center;
`
