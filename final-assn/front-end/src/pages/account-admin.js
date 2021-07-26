import {Component} from "react";
import axios from "axios";
import styled from "styled-components";

export default class AccountAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
        }
    }

    isNull = (value) => {
        if (value == null) {
            return 'null';
        } else {
            return value.split('.')[0];
        }
    }

    async componentDidMount() {
        try {
            const account = await axios.get(`${process.env.REACT_APP_API_URL}/account`, {withCredentials: true})
            this.setState({
                accounts: account.data,
            })
            console.log(this.state.accounts);
        } catch(err) {
            console.log(err);
            alert("등록되지 않은 계정입니다");
            this.props.history.push('/');
        }
    }

    RemoveHandler = async (account) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/account/${account.uuid}`,{withCredentials: true})
            this.props.history.push('/account-admin');
        } catch (err) {
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
        return(
            <div>
                <h3>로그아웃</h3>
                <div>
                    <input type="button" value="로그아웃" onClick={this.LogoutHandler}/>
                </div>
                <h1>유저 관리</h1>
                <h2>유저 목록</h2>
                <UserTable>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Account Type</th>
                            <th>Register</th>
                            <th>Last Login</th>
                            <th>Management</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.accounts.map(account => (
                            <tr>
                                <th>{account.id}</th>
                                <th>{account.name}</th>
                                <th>{account.email}</th>
                                <th>{account.account_type}</th>
                                <th>{account.created_at.split('.')[0]}</th>
                                <th>{this.isNull(account.last_login_at)}</th>
                                <th>
                                    <input type="button" value="DELETE" onClick={() => this.RemoveHandler(account)} />
                                </th>
                            </tr>
                        ))
                    }
                    </tbody>
                </UserTable>
            </div>
        )
    }
}

const UserTable = styled.table`
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
`