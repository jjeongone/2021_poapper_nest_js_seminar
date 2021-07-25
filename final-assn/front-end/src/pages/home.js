import {Component} from "react";
import axios from "axios";
import styled from "styled-components";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_seminars: [],
            accepted_seminars: [],
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
            this.setState({
                user: user_info.data,
                user_seminars: user_seminar.data,
                accepted_seminars: this.isAccepted(user_seminar.data)
            })
            console.log(user_seminar.data);
            console.log(this.state.accepted_seminars);
        } catch (err) {
            console.log(err);
        }
    }


    render() {
        return (
            <div>
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