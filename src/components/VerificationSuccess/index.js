import './index.css'

const VerificationSuccess = () => {

    return(
        <div className='verification-success-container'>
            <img src='https://res.cloudinary.com/da7ik4khq/image/upload/v1695666018/Artboard_1_f9fo6n.png' className='otp-verification-success-pic' alt='Otp Verification Success pic' />
            <h1 className='success-welcome-title'>Welcome to AdmitKard</h1>
            <p className='custom-experience-description'>In order to provide you with 
            a custom experience,
            </p>
            <p className='few-question-description'>we need to ask you a few questions.</p>
            <div className='sub-container'>
                <button type='button' className='get-started-button'>Get Started</button>
                <p className='time-taken-description'>*This will only take 5 min.</p>
            </div>
        </div>
    )
}
export default VerificationSuccess