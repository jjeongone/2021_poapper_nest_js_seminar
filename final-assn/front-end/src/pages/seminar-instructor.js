import {Component} from "react";
import axios from "axios";
import styled from "styled-components";

export default class SeminarInstructor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seminar_request: [],
            seminar_participants: [],
            seminar_progress: [],
        }
    }

    isParticipant = (seminars) => {
        const seminar_participant = [];
        seminars.map(seminar => {
            if (seminar.status == "ACCEPT") {
                seminar_participant.push(seminar.user_uuid);
            }
        })
        return seminar_participant;
    }

    isTrue = (value) => {
        if (value == 'true') {
            return true;
        } else if (value == 'false') {
            return false;
        }
    }

    async componentDidMount() {
        try {
            const user_info = await axios.get(`${process.env.REACT_APP_API_URL}/auth/information`, {withCredentials: true})
            const user_seminar = await axios.get(`${process.env.REACT_APP_API_URL}/seminar?instructor_uuid=${user_info.data.uuid}`, {withCredentials: true})
            const seminar_request = await axios.get(`${process.env.REACT_APP_API_URL}/seminar-registration?seminar_uuid=${user_seminar.data[0].uuid}`, {withCredentials: true})
            const seminar_progress = await axios.get(`${process.env.REACT_APP_API_URL}/seminar-progress?seminar_uuid=${user_seminar.data[0].uuid}`, {withCredentials: true})
            this.setState({
                user_seminar: user_seminar.data[0],
                seminar_request: seminar_request.data,
                seminar_participants: this.isParticipant(seminar_request.data),
                seminar_progress: seminar_progress.data,
            })
        } catch (err) {
            console.log(err);
        }
    }

    StatusHandler = async (seminar, status) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/seminar-registration/${seminar.uuid}`, {
                status: status
            }, {withCredentials: true})
            this.props.history.push('/seminar-instructor');
        } catch (err) {
            console.log(err);
        }
    }

    SubmitHandler = async (seminar) => {
        try {
            const id = document.getElementById('student_id').value;
            const seminar_date = document.getElementById('seminar_date').value;
            const seminar_num = document.getElementById('seminar_num').value;
            const attendance = document.getElementById('attendance').value;
            const assignment = document.getElementById('assignment').value;
            await axios.post(`${process.env.REACT_APP_API_URL}/seminar-progress`, {
                seminar_date: seminar_date,
                seminar_number_of_time: seminar_num,
                attendance: this.isTrue(attendance),
                assignment: this.isTrue(assignment),
                user_id: id,
                seminar_uuid: this.state.user_seminar.uuid
            }, {withCredentials: true})
            this.props.history.push('/seminar-instructor');
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return(
            <div>
                <h1>세미나 관리</h1>
                <h2>세미나 신청 관리</h2>
                    <SeminarTable>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Semester</th>
                                <th>User Name</th>
                                <th>Status</th>
                                <th>Management</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.seminar_request.map(seminar => (
                                <tr>
                                    <th>{seminar.seminar_uuid.title}</th>
                                    <th>{seminar.seminar_uuid.year_code}</th>
                                    <th>{seminar.user_uuid.name}</th>
                                    <th>{seminar.status}</th>
                                    <th>
                                        <input type="button" value="ACCEPT" onClick={() => this.StatusHandler(seminar, "ACCEPT")} />
                                        <input type="button" value="REJECT" onClick={() => this.StatusHandler(seminar, "REJECT")} />
                                        <input type="button" value="PASS" onClick={() => this.StatusHandler(seminar, "PASS")} />
                                        <input type="button" value="WITHDRAW" onClick={() => this.StatusHandler(seminar, "WITHDRAW")} />
                                    </th>
                                </tr>
                            ))
                        }
                        </tbody>
                    </SeminarTable>
                <br />
                <h2>출결 및 과제 관리</h2>
                    <form>
                        <div>
                            수강생 id: <input id="student_id" type="text" name="id" placeholder="student_id" />
                        </div>
                        <div>
                            세미나 일시: <input id="seminar_date" type="text" name="seminar_date" placeholder="2021-01-01" />
                        </div>
                        <div>
                            세미나 회차: <input id="seminar_num" type="text" name="seminar_num" placeholder="day1" />
                        </div>
                        <div>
                            출석: <input id="attendance" type="text" name="attendance" placeholder="true/false"/>
                        </div>
                        <div>
                            과제: <input id="assignment" type="text" name="assignment" placeholder="true/false" />
                        </div>
                        <div>
                            <input type="button" value="제출하기" onClick={this.SubmitHandler}/>
                        </div>
                    </form>
                <h3>수강생 목록</h3>
                    <SeminarTable>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>User Email</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.seminar_participants.map(participant => (
                                <tr>
                                    <th>{participant.id}</th>
                                    <th>{participant.name}</th>
                                    <th>{participant.email}</th>
                                </tr>
                            ))
                        }
                        </tbody>
                    </SeminarTable>
                <h3>수강생 현황</h3>
                    <SeminarTable>
                        <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Seminar Date</th>
                            <th>Seminar Number</th>
                            <th>Attendance</th>
                            <th>Assignment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.seminar_progress.map(participant => (
                                <tr>
                                    <th>{participant.user_uuid.id}</th>
                                    <th>{participant.user_uuid.name}</th>
                                    <th>{participant.seminar_date.split('T')[0]}</th>
                                    <th>{participant.seminar_number_of_time}</th>
                                    <th>{String(participant.attendance)}</th>
                                    <th>{String(participant.assignment)}</th>
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
