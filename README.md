# Admitkard OTP Verification App

This project is a mobile number verification application designed to verify user-provided mobile numbers via OTP (One-Time Password). It consists of two screens: the Mobile Number Screen (Screen 1) and the OTP Verification Screen (Screen 2). Success Screen (Screen 3) upon successful verification.

## Table of Contents

- [Description](#description)
- [Screenshots](#screenshots)
- [Workflow](#workflow)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

The mobile number verification app helps users enter their mobile numbers and receive OTPs for verification. It follows a simple two-screen flow to ensure secure and easy mobile number verification.

## Screenshots

![Screen 1: Mobile Number Screen](https://res.cloudinary.com/da7ik4khq/image/upload/v1695733498/Screenshot_1473_gab2b9.png)
![Screen 2: OTP Verification Screen](https://res.cloudinary.com/da7ik4khq/image/upload/v1695733553/Screenshot_1475_awc41g.png)
![Screen 3: Success Screen (Optional)](https://res.cloudinary.com/da7ik4khq/image/upload/v1695733554/Screenshot_1476_hquusd.png)

## Workflow

1. **Screen 1: Mobile Number Screen**

   - Users enter their mobile numbers and can change the country code if needed.
   - Clicking on "Send OTP" generates a random OTP via a REST API.
   -  If the mobile number is invalid, a proper error message is displayed in the paragraph element.
   
2. **Screen 2: OTP Verification Screen**

   - Users enter the OTP number by number. The OTP generated via the REST API is sent to the user's mobile number.
   - Clicking on "Verify OTP" sends the OTP and user's mobile number to a REST API for verification.
   
3. **Screen 3:Success Screen**

   - If the OTP is matched, a success screen is displayed.
   
   OR
   
   - If the OTP is not matched, a proper error message is displayed in the paragraph element.
   
### Basic Validations

- Mobile number should be 10 digits and consist only of numbers.
- All kinds of validations are implemented to prevent users from entering incorrect values in the fields.

## Features

- Two-screen mobile number verification flow.
- Secure OTP generation and verification via REST API.
- User-friendly error messages and notifications.
- Responsive design for various devices (e.g., laptop, mobile, tablet).
- Ability to change the country code from a dropdown.
- Basic input validations and error handling for wrong numbers and OTP not received.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed.
- A code editor (e.g., [Visual Studio Code](https://code.visualstudio.com/)).

## Installation

To install this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Vigneshkumar-D/admitkard-otp-verification.git
   ```

2. Navigate to the project folder:

   ```bash
   cd admitkard-otp-verification
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

## Usage

To run the mobile number verification app locally, use the following command:

```bash
npm start
```

Visit `http://localhost:3000` in your web browser to access the application.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Create a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy using the Mobile Number Verification App! If you have any questions or suggestions, feel free to [contact us](mailto:your-email@example.com).
