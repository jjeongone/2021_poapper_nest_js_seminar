import {Component} from "react";
import axios from "axios";
import styled from "styled-components";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_seminars: [],
            accepted_seminars: [],
            seminar_progress: [],
        }
    }

    isAccepted = (seminars) => {
        const accepted_seminar = [];
        seminars.map(seminar => {
            if(seminar.status == "ACCEPT") {
                accepted_seminar.push(seminar);
            }
        })
        return accepted_seminar;
    }

    async componentDidMount() {
        try {
            const user_info = await axios.get(`${process.env.REACT_APP_API_URL}/auth/information`, {withCredentials: true})
            const user_seminar = await axios.get(`${process.env.REACT_APP_API_URL}/seminar-registration?user_uuid=${user_info.data.uuid}`, {withCredentials: true})
            const seminar_progress = await axios.get(`${process.env.REACT_APP_API_URL}/seminar-progress?user_uuid=${user_info.data.uuid}`, {withCredentials: true})
            this.setState({
                user: user_info.data,
                user_seminars: user_seminar.data,
                accepted_seminars: this.isAccepted(user_seminar.data),
                seminar_progress: seminar_progress.data,
            })
            console.log(user_info.data.uuid);
            console.log(this.state.seminar_progress);
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
        return (
            <div>
                <h3>로그아웃</h3>
                <div>
                    <input type="button" value="로그아웃" onClick={this.LogoutHandler}/>
                </div>
                <h1>세미나</h1>
                <h2>내 세미나</h2>
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
                        this.state.accepted_seminars.map(seminar => (
                            <tr>
                                <th>{seminar.seminar_uuid.title}</th>
                                <th>{seminar.seminar_uuid.year_code}</th>
                                <th>{seminar.status}</th>
                            </tr>
                        ))
                    }
                    </tbody>
                </SeminarTable>
                <h3>세미나 현황</h3>
                <SeminarTable>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Semester</th>
                            <th>Seminar Date</th>
                            <th>Seminar Number</th>
                            <th>Attendance</th>
                            <th>Assignment</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.seminar_progress.map(progress => (
                            <tr>
                                <th>{progress.seminar_uuid.title}</th>
                                <th>{progress.seminar_uuid.year_code}</th>
                                <th>{progress.seminar_date.split('T')[0]}</th>
                                <th>{progress.seminar_number_of_time}</th>
                                <th>{String(progress.attendance)}</th>
                                <th>{String(progress.assignment)}</th>
                            </tr>
                        ))
                    }
                    </tbody>
                </SeminarTable>
                <h2>세미나 신청하기</h2>
                <form>
                    <div>
                        <input type="button" value="세미나 신청하기" onClick={() => {this.props.history.push('/seminar')}} />
                    </div>

                </form>
            </div>
        )
    }
}

const SeminarTable = styled.table`
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
`