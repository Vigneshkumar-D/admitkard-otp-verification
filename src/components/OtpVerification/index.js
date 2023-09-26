import React, { Component, createRef } from 'react';
import { v4 as uuidv4 } from "uuid";
import './index.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'

class OtpVerification extends Component {
  state = {
    otp: ['', '', '', '', '', ''],
    isOtpSent: false,
    isOtpArrived: false,
    isResendDisabled: false,
    timer: 0,
    showSubmitError: false,
    resendTimer: 30,
  };

  // constructor(props) {
  //   super(props);
  //   this.inputRefs = Array.from({ length: 6 }, () => createRef());
  // }

//   componentDidMount() {
//     // Simulate OTP delivery after 3 seconds
//     setTimeout(() => {
//       this.setState({ isOtpArrived: true });
//     }, 3000);

//     this.inputRefs[0].current.focus();
//     // Start a timer and resend timer to count down from 30 seconds
//     this.startTimer(3);
//   }

//   componentWillUnmount() {
//     // Clearing the timer when the component is unmounted
   
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
    this.setState({ isOtpArrived: false, isResendDisabled: true });

    // Simulate OTP resend after 5 seconds
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
      console.log(updatedOtp)

      // // Automatically move to the next input field if available
      // if (index < updatedOtp.length - 1) {
      //   this.inputRefs[index + 1].current.focus();
      // }
  };

  handleBackspace = (event, index) => {
    if (event.key === 'Backspace' && index > 0) {
      const updatedOtp = [...this.state.otp];
      updatedOtp[index] = ''; // Clear the current input
      this.setState({ otp: updatedOtp });
      this[`inputRef${index - 1}`].current.focus();
      // this.inputRefs[index - 1].current.focus(); // Move focus to the previous input
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
                  key={uuidv4()}
                  type="text"
                  maxLength="1"
                  value={digit}
                  className='otp-input'
                  autoFocus={index === 0}
                  onChange={(event) => this.handleInputChange(event, index)}
                  // onKeyDown={(event) => this.handleBackspace(event, index)}
                  // ref={this.inputRefs[index]} // Use the ref created with createRef
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