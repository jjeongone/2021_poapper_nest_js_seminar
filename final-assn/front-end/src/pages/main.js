import styled from "styled-components";
import axios from "axios";
import {Component} from "react";


export default class Main extends Component{
    LoginHandler = async (e) => {
        const id = document.getElementById('login_id').value;
        const password = document.getElementById('login_password').value;
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                id: id,
                password: password
            }, {withCredentials: true})
            this.props.history.push('/home');
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

    render() {
        return (
            <div>
                <Title>PoApper Seminar Manager</Title>
                <Login>
                    <LoginTitle>로그인</LoginTitle>
                    <LoginBody>
                        <form>
                            <div>
                                아이디: <input id="login_id" type="text" name="id" />
                            </div>
                            <div>
                                비밀번호: <input id="login_password" type="password" name="password" />
                            </div>
                            <div>
                                <input type="button" value="로그인" onClick={this.LoginHandler}/>
                            </div>
                        </form>
                    </LoginBody>
                </Login>
                <Register>
                    <RegisterTitle>회원가입</RegisterTitle>
                    <RegisterBody>
                        <form>
                            <div>
                                이름: <input id="register_name" type="text" name="name" />
                            </div>
                            <div>
                                계정종류(Student/Instructor/Admin): <input id="register_type" type="text" name="account_type" />
                            </div>
                            <div>
                                아이디: <input id="register_id" type="text" name="id" />
                            </div>
                            <div>
                                비밀번호: <input id="register_password" type="text" name="password" />
                            </div>
                            <div>
                                이메일: <input id="register_email" type="text" name="email" />
                            </div>
                            <div>
                                <input type="button" value="회원가입" onClick={this.RegisterHandler}/>
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
