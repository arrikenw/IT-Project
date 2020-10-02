import React, { Component } from "react";
import RequiredSignupForm from "./RequiredSignupForm";
import BioInfoForm from "./BioInfoForm";

class Signup extends Component {
  state = {
      step: 1,
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      organisation: "",
      professionalField: "",
      phoneNumber: "",
      gender: "",
      dob: "",
      privacyLevel: "",
  }

  nextStep = () => {
      const { step } = this.state;
      this.setState({
          step: step + 1
      });
  };

  prevStep = () => {
      const { step } = this.state;
      this.setState({
          step: step - 1
      });
  };

  handleChange = input => e => {
      this.setState({ [input]: e.target.value });
  };

  render() {
      const { step } = this.state;
      const { firstName, lastName, email, occupation, city, bio } = this.state;
      const values = { firstName, lastName, email, occupation, city, bio };
      switch (step) {
          case 1:
              return(
                  <RequiredSignupForm
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                  />
              );
          case 2:
              return(
                  <BioInfoForm
                      nextStep={this.nextStep}
                      handleChange={this.handleChange}
                      values={values}
                  />
              );
          default:
              (console.log('This is a multi-step form built with React.'))
      }
  }
}
export default Signup;
