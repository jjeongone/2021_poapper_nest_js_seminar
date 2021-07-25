import './App.css';
import { Route } from 'react-router-dom';
import Main from "./pages/main";
import Seminar from "./pages/seminar";
import Home from "./pages/home";
import SeminarInstructor from "./pages/seminar-instructor";
import AccountAdmin from "./pages/account-admin";

function App() {
  return (
    <div>
        <Route path='/' component={Main} exact />
        <Route path='/home' component={Home} />
        <Route path='/seminar' component={Seminar} />
        <Route path='/seminar-instructor' component={SeminarInstructor} />
        <Route path='/account-admin' component={AccountAdmin} />
    </div>
  );
}

export default App;
