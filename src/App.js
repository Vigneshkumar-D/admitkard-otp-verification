import {Route, Switch, Redirect} from 'react-router-dom'
import SignIn from './components/SignIn'
import OtpVerification from './components/OtpVerification';
import VerificationSuccess from './components/VerificationSuccess'
import './App.css';

function App() {
  return (
    <Switch>
    <Route exact path="/sign-in" component={SignIn} />
    <Route path="/verification" component = {OtpVerification} />
  
  <Route exact path="/verification-success" component={VerificationSuccess} />
  <Redirect from="/" to="/sign-in" />
    </Switch>
  );
}

export default App;
