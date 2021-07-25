import {Component} from "react";
import axios from "axios";
import styled from "styled-components";

export default class Seminar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seminars: [],
            user_seminars: [],
        }
    }

    async componentDidMount() {
        try {
            const exist_seminar = await axios.get(`${process.env.REACT_APP_API_URL}/seminar`, {withCredentials: true})
            const user_info = await axios.get(`${process.env.REACT_APP_API_URL}/auth/information`, {withCredentials: true})
            const user_seminar = await axios.get(`${process.env.REACT_APP_API_URL}/seminar-registration?user_uuid=${user_info.data.uuid}`, {withCredentials: true})
            this.setState({
                seminars: exist_seminar.data,
                user: user_info.data,
                user_seminars: user_seminar.data,
            })
        } catch (err) {
            console.log(err);
        }
    }

    RegistrationHandler = async (seminar) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/seminar-registration`, {
                user_uuid: this.state.user.uuid,
                seminar_uuid: seminar.uuid
            }, {withCredentials: true})
            this.props.history.push('/seminar');
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return(
            <div>
                <h1>세미나 신청</h1>
                <h2>세미나 신청 현황</h2>
                    <SeminarTable>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Semester</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.user_seminars.map(seminar => (
                                <tr>
                                    <th>{seminar.seminar_uuid.title}</th>
                                    <th>{seminar.seminar_uuid.year_code}</th>
                                    <th>{seminar.status}</th>
                                </tr>
                            ))
                        }
                        </tbody>
                    </SeminarTable>
                <br />
                <h2>세미나 목록</h2>
                    <SeminarTable>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Semester</th>
                                <th>Description</th>
                                <th>Register Start</th>
                                <th>Register End</th>
                                <th>Registration</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.seminars.map(seminar => (
                                <tr>
                                    <th>{seminar.title}</th>
                                    <th>{seminar.year_code}</th>
                                    <th>{seminar.description}</th>
                                    <th>{seminar.register_start_date.split('T')[0]}</th>
                                    <th>{seminar.register_end_date.split('T')[0]}</th>
                                    <th>
                                        <input type="button" value="신청하기" onClick={() => this.RegistrationHandler(seminar)} />
                                    </th>
                                </tr>
                            ))
                        }
                        </tbody>
                    </SeminarTable>
            </div>
        )
    }
}

const SeminarTable = styled.table`
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
`