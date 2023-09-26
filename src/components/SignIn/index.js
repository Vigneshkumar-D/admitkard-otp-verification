import { Component } from 'react'; 
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const countries = [
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    { name: 'Canada', code: '+1', flag: '🇨🇦' },
    { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
    { name: 'Australia', code: '+61', flag: '🇦🇺' },
    { name: 'Germany', code: '+49', flag: '🇩🇪' },
    { name: 'France', code: '+33', flag: '🇫🇷' },
    { name: 'Spain', code: '+34', flag: '🇪🇸' },
    { name: 'Italy', code: '+39', flag: '🇮🇹' },
    { name: 'Netherlands', code: '+31', flag: '🇳🇱' },
    { name: 'Sweden', code: '+46', flag: '🇸🇪' },
    { name: 'Norway', code: '+47', flag: '🇳🇴' },
    { name: 'Denmark', code: '+45', flag: '🇩🇰' },
    { name: 'Finland', code: '+358', flag: '🇫🇮' },
    { name: 'Switzerland', code: '+41', flag: '🇨🇭' },
    { name: 'Japan', code: '+81', flag: '🇯🇵' },
    { name: 'South Korea', code: '+82', flag: '🇰🇷' },
    { name: 'China', code: '+86', flag: '🇨🇳' },
    { name: 'India', code: '+91', flag: '🇮🇳' },
    { name: 'Brazil', code: '+55', flag: '🇧🇷' },
    { name: 'Argentina', code: '+54', flag: '🇦🇷' },
    { name: 'Mexico', code: '+52', flag: '🇲🇽' },
    { name: 'South Africa', code: '+27', flag: '🇿🇦' },
    { name: 'Egypt', code: '+20', flag: '🇪🇬' },
    { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦' },
    { name: 'Russia', code: '+7', flag: '🇷🇺' },
    { name: 'Turkey', code: '+90', flag: '🇹🇷' },
    { name: 'Greece', code: '+30', flag: '🇬🇷' },
    { name: 'Poland', code: '+48', flag: '🇵🇱' },
    { name: 'Austria', code: '+43', flag: '🇦🇹' },
    { name: 'Belgium', code: '+32', flag: '🇧🇪' },
    { name: 'Portugal', code: '+351', flag: '🇵🇹' },
    { name: 'Ireland', code: '+353', flag: '🇮🇪' },
    { name: 'New Zealand', code: '+64', flag: '🇳🇿' },
    { name: 'Singapore', code: '+65', flag: '🇸🇬' },
    { name: 'Malaysia', code: '+60', flag: '🇲🇾' },
    { name: 'Thailand', code: '+66', flag: '🇹🇭' },
    { name: 'Vietnam', code: '+84', flag: '🇻🇳' },
    { name: 'Indonesia', code: '+62', flag: '🇮🇩' },
    { name: 'Philippines', code: '+63', flag: '🇵🇭' },
    { name: 'Chile', code: '+56', flag: '🇨🇱' },
    { name: 'Colombia', code: '+57', flag: '🇨🇴' },
    { name: 'Peru', code: '+51', flag: '🇵🇪' },
    { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  ];
  

class SignIn extends Component{
    state = {
        phoneNumberWithoutCode: '', 
        showSubmitError: false,
        selectedCountry: 'US',
        buttonDisabled: true
    }

    setPhoneNumber = event => {
        const inputPhoneNumber = event.target.value
        const numericPhoneNumber = inputPhoneNumber.replace(/\D/g, '');
        this.setState({phoneNumberWithoutCode: numericPhoneNumber});
        if(numericPhoneNumber.length <= 10){
            this.setState(prevState => ({ buttonDisabled: !prevState.buttonDisabled }));
        }
    }

    onSubmitFailure = () => {
        this.setState({showSubmitError: true});
      }

    onSubmitSuccess = (phoneNumber) => {
        const {history} = this.props
        Cookies.set('phone_number', phoneNumber, {
            expires: 30,
          })
        history.replace('/verification')
        
    }
    

    validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\+\d{1,3}\d{5,14}$/;
        return phoneRegex.test(phoneNumber);
    };
    
    handleSelect = event => {
        const selectedValue = event.target.value;
        this.setState({selectedCountry: selectedValue})
    }
    

    submitForm = async event => {
        event.preventDefault()
        const {phoneNumberWithoutCode, selectedCountry} = this.state
        const phoneNumber = selectedCountry + phoneNumberWithoutCode
        const isValid = this.validatePhoneNumber(phoneNumber)
       if(isValid){
            const url = 'http://localhost:3030/send-otp'
            const options = {
                method: 'POST',
                body: JSON.stringify({phoneNumber}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(response)
            if (response.ok) {
                this.onSubmitSuccess(phoneNumber)
            } else {
                this.onSubmitFailure(data.message)
            }
       }else{
            this.setState({showSubmitError: true})
       }
        
    }

    render() {
        const {showSubmitError, buttonDisabled} = this.state
        const disable = buttonDisabled ? 'disable-button': ''
        return(
            <div className='signin-container'>
                <div className='signin-sub-container'>
                    <img src="https://res.cloudinary.com/da7ik4khq/image/upload/v1695661968/AK_logo_umdkp4.png" className='app-logo' alt="admitkart-logo" />
                <form className='form' onSubmit={this.submitForm} >
                    <h1 className='welcome-title'>Welcome Back</h1>
                    <p className='signin-message'>Please Sign in to your account</p>
                    <div className='contact-number-container'>
                            <label className='custom-label'>Enter Contact Number</label>
                        <div className='contact-number-sub-container'>
                            <select onChange={this.handleSelect} className='country-dropdown'>
                                {countries.map((eachCountry) => (
                                    <option className='country-code' key={eachCountry.flag} value={eachCountry.code}>
                                        {eachCountry.flag} {eachCountry.code}
                                    </option>
                                    
                                ))}
                            </select>
                            <input onChange={this.setPhoneNumber} className='custom-input' type='tel' maxLength={10} pattern="[0-9]*" />
                        </div>
                    </div>
                    <p className='message'>
                        We will send you a one time SMS message.
                        Charges may apply.
                    </p>
                    <button type='submit' className={`sign-in-button ${disable}`} >Sign in with OTP</button>
                    </form>
                    {showSubmitError && <p className='error-message'>*Invalid Mobile Number</p>}
                </div>
            </div>
        )
    };

}
export default withRouter(SignIn)