import React, { Component} from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

class OtpVerification extends Component {
  state = {
    otp: ['', '', '', '', '', ''],
    // isResendDisabled: false,
    // isOtpSent: false,
    // isOtpArrived: false,
    // timer: 0,
    // showSubmitError: false,
    // resendTimer: 30,
  };

//   componentDidMount() {
//     setTimeout(() => {
//       this.setState({ isOtpArrived: true });
//     }, 3000);

//     this.inputRefs[0].current.focus();
//     // Start a timer and resend timer to count down from 30 seconds
//     this.startTimer(3);
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerInterval);
//     clearInterval(this.resendInterval);
//   }

//   startTimer = (seconds) => {
//     this.setState({ timer: seconds });

//     // Update the timer every second
//     this.timerInterval = setInterval(() => {
//       this.setState((prevState) => ({
//         timer: prevState.timer - 1,
//       }));
//       if (this.state.timer === 1) {
//         clearInterval(this.timerInterval);
//       }
//     }, 1000);
//   }

// startResendTimer = () => {
//     this.setState({ resendTimer: 30 });

//     // Updating the timer every second
//     this.resendInterval = setInterval(() => {
//       this.setState((prevState) => ({
//         resendTimer: prevState.resendTimer - 1,
//       }));

//       if (this.state.resendTimer === 1) {
//         clearInterval(this.resendInterval);
//         this.setState({ isResendDisabled: false, resendTimer: 30 });
//       }
//     }, 1000);
// };

handleResendClick = async() => {
    const phoneNumber = Cookies.get('phone_number')
    const url = 'http://localhost:3030/send-otp'
    const options = {
          method: 'POST',
          body: JSON.stringify({phoneNumber}),
          headers: {
            'Content-Type': 'application/json',
          },
    }
    const response = await fetch(url, options)
    // this.setState({ isOtpArrived: false, isResendDisabled: true });
    // setTimeout(() => {
    //   this.setState({ isOtpArrived: true });
    //   this.startResendTimer(); // Start the resend timer
    // }, 1000);
};

  handleInputChange = (event, index) => {
    const { value } = event.target;
      const updatedOtp = [...this.state.otp];
      updatedOtp[index] = value;
      this.setState({ otp: updatedOtp });

      // Automatically moving to the next input field if available
      if (event.target.value.length === 1) {
        if (index < 5) {
          event.target.nextSibling.focus();
        }
      }
  };

  changePhoneNum = () => {
    Cookies.remove('phone_number')
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/verification-success')
  }

  onSubmitFailure = () => {
    this.setState({showSubmitError: true});
  }

  onSubmitForm = async event => {
    const phoneNumber = Cookies.get('phone_number')
    console.log(phoneNumber)
    event.preventDefault()
    const {otp} = this.state
    const otpCode = otp.join("");
    console.log(otpCode)
    const url = 'http://localhost:3030/verify-otp'
    const option = {
      method: 'POST',
      body: JSON.stringify({phoneNumber, otpCode}),
      headers: {
          'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, option);
    const data = await JSON.stringify(response);
    if(response.ok){
      this.onSubmitSuccess()
    }else{
      this.onSubmitFailure()
    }

  }

  render() {
    const {
      otp,
      showSubmitError,
      isResendDisabled,
    } = this.state;
    const phoneNumber = Cookies.get('phone_number')

    return (
      <div className='otp-verification-container'>
        <div className='otp-vefication-sub-container'>
          <img
            src="https://res.cloudinary.com/da7ik4khq/image/upload/v1695666018/undraw_confirmed_81ex_rdxfnk.png"
            className='otp-validation-pic'
            alt="Otp Validation pic"
          />
          <h1 className='verify-mobile-num-title'>Please verify Mobile number</h1>
          <p className='otp-sent-to'>
            An OTP is sent to <span className='mobile-number'>{phoneNumber}</span>
          </p>
          <Link className="link" to="/sign-in">
            <button className='change-mobile-number-button' onClick={this.changePhoneNum}>Change Phone Number</button>
          </Link>
          <form className='otp-form' onSubmit={this.onSubmitForm}>
            <div className='input-container'>
              {otp.map((digit, index) => (
                  <input
                    key={index}
                    className='otp-input'
                    type="tel"
                    maxLength="1"
                    value={digit}
                    autoFocus={index === 0}
                    onChange={(event) => this.handleInputChange(event, index)}
                  />
                ))}
            </div>
            <div className='sub-container-verification'>
            <div className='resend-code-container'>
              <p className='resend-code'>Didn’t receive the code?</p>
              <button className='resend' onClick={this.handleResendClick} disabled={isResendDisabled}>
                Resend OTP
              </button>
              {/* {isResendDisabled && (
                <p className='timer'>in {resendTimer} seconds</p>
              )} */}
            </div>
            
              <button type='submit' className='verify-button'>Verify</button>
              {showSubmitError && <p className='error-message'>*Incorrect OTP</p>}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default OtpVerification;
