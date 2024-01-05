/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  TextField,
  Typography,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import styles from '@/styles/login.module.css';
import {
  SubmitEmailRequest,
  validateUserLogin,
} from '@/services/api-requests/api-request';
import axios from 'axios';
import { useRouter } from 'next/router';
import { StoreUserAuthToken, StoreUserDetails } from '@/services/config';

const login = () => {
  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [submitEmailLoading, setSubmitEmailLoading] = useState<boolean>(false);
  const [showPin, setShowPin] = useState<boolean>(false);
  const [pin, setPin] = useState<any>(undefined);
  const [userId, setUserId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCodeMessage, setShowCodeMessage] = useState(false);
  const [pinIsValid, setPinIsValid] = useState<boolean>(true);
  const [pinIsComplete, setPinIsComplete] = useState<boolean>(false);
  const [resendPin, setResendPin] = useState<boolean>(false);
  const [submitUserDetailsLoading, setSubmitUserDetailsLoading] =
    useState<boolean>(false);

  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const validatePin = (pin: any) => {
    const pinPattern = /^\d{5}$/;
    return pinPattern.test(pin);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValid(validateEmail(newEmail));
  };

  const submitEmailandSendPin = async () => {
    setSubmitEmailLoading(true);
    try {
      const emailRes = await SubmitEmailRequest({ email });
      const user = emailRes?.data.data;
      console.log('user: ', user);
      StoreUserDetails(user);
      const validUserId = user?.userId;
      setUserId(validUserId);
      setSubmitEmailLoading(false);
      setShowPin(true);
      setShowCodeMessage(true);
    } catch (error) {
      console.error(error);
      setSubmitEmailLoading(false);
    }
  };

  const handleEnterEmailKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitEmailandSendPin();
    }
  };

  const handleSubmitPin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPin = e.target.value;
    if (inputPin === '' || isNaN(parseInt(inputPin))) {
      setPin(null);
    } else {
      const newPin = parseInt(inputPin);
      setPin(newPin);
    }
    setPinIsComplete(validatePin(inputPin));
  };

  const handleEnterPinKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      checkPinAndLoginUser();
    }
  };

  const resetFields = () => {
    setEmail('');
    setIsValid(true);
    setSubmitEmailLoading(false);
    setShowPin(false);
    setPinIsComplete(false);
    setPin(undefined);
    setUserId('');
    setErrorMessage('');
    setPinIsValid(true);
    setResendPin(false);
  };

  const checkPinAndLoginUser = async () => {
    if (!userId) return;
    setSubmitEmailLoading(true);
    try {
      const emailRes = await validateUserLogin({ userId, otp: pin });
      const data = emailRes?.data;
      if (data?.error) {
        if (
          data?.message ===
            'Verification pin has expired. Click on Resend pin to generate another pin.' ||
          data?.message ===
            'This pin has already been used. Click on Resend pin to generate another pin'
        ) {
          const errMessage = data?.message;
          setPinIsValid(false);
          setResendPin(true);
          setErrorMessage(errMessage);
          setSubmitEmailLoading(false);
        } else {
          const errMessage = data?.message;
          setResendPin(false);
          setPinIsValid(false);
          setErrorMessage(errMessage);
          setSubmitEmailLoading(false);
          setTimeout(() => {
            setPinIsValid(true);
          }, 5000);
        }
      } else {
        setSubmitUserDetailsLoading(true);
        const token = data?.token;
        StoreUserAuthToken(token);
        router.push('/dashboard');
        resetFields();
      }
    } catch (error) {
      console.error(error);
      setSubmitEmailLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#101010',
          height: '100vh',
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        <div className={styles.nitoonsLeft}>
          {submitUserDetailsLoading ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
              }}
            >
              <CircularProgress size={30} style={{ color: '#D90368' }} />
            </div>
          ) : (
            <>
              <div className={styles.nitoonsTop}>
                <Image
                  src="/static/images/nitoons-logo.svg"
                  alt="nitoons-logo"
                  width="80"
                  height="20"
                  style={{ cursor: 'pointer' }}
                />
                <Typography className={styles.home}>Home</Typography>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  height: '80vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FormControl fullWidth={true} style={{ width: '300px' }}>
                  <div>
                    <Typography
                      style={{
                        color: '#FFFFFF',
                        fontSize: '24px',
                        fontWeight: '500',
                        marginBottom: '10px',
                      }}
                    >
                      Get Started
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: '#D4D5D7',
                        fontSize: '13px',
                        fontWeight: '500',
                      }}
                    >
                      Enter your email address to Log in/Sign up
                    </Typography>
                  </div>

                  {/* notify the user that pin has been sent */}
                  {showCodeMessage && (
                    <Typography
                      style={{
                        color: '#FFFFFF',
                        fontSize: '15px',
                        paddingTop: '10px',
                        fontWeight: 500
                      }}
                    >
                      We’ve sent a 5-digit pin to your email. The code expires
                      in five minutes, please enter it soon.
                    </Typography>
                  )}

                  {/* Email Input */}
                  <div style={{ margin: '30px 0 10px' }}>
                    <TextField
                      id="filled-helperText"
                      style={{
                        backgroundColor: '#F2F2F2',
                        borderRadius: '8px',
                        width: '300px',
                      }}
                      value={email}
                      onChange={handleEmail}
                      onKeyDown={handleEnterEmailKeyPress}
                      placeholder="Email Address"
                    />
                    {!isValid && (
                      <FormHelperText
                        style={{
                          color: '#EB5757',
                          marginTop: '10px',
                          fontSize: '13px',
                        }}
                      >
                        Please enter a valid email address
                      </FormHelperText>
                    )}
                  </div>

                  {/* Pin Input */}
                  {showPin && (
                    <div style={{ margin: '10px 0 20px' }}>
                      <TextField
                        id="filled-helperText"
                        style={{
                          backgroundColor: '#F2F2F2',
                          borderRadius: '8px',
                          width: '300px',
                        }}
                        inputProps={{ maxLength: 5 }}
                        type="text"
                        value={pin}
                        onChange={handleSubmitPin}
                        onKeyDown={handleEnterPinKeyPress}
                        placeholder="Enter the code sent to your email"
                      />

                      {!pinIsComplete && (
                        <FormHelperText
                          style={{
                            color: '#EB5757',
                            margin: '10px',
                            fontSize: '13px',
                          }}
                        >
                          Please enter a valid pin
                        </FormHelperText>
                      )}

                      {pinIsComplete && !pinIsValid && (
                        <FormHelperText
                          style={{
                            color: '#EB5757',
                            margin: '10px',
                            fontSize: '13px',
                          }}
                        >
                          {errorMessage}
                        </FormHelperText>
                      )}
                      <Typography
                        variant="body2"
                        style={{
                          color: '#D4D5D7',
                          fontSize: '13px',
                          fontWeight: '500',
                          textDecoration: 'underline',
                          marginTop: '10px',
                          marginBottom: '-5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          resetFields();
                          setEmail(email);
                          setShowCodeMessage(false);
                        }}
                      >
                        Resend pin
                      </Typography>
                    </div>
                  )}

                  {/* If email has not been filled */}
                  {!email && (
                    <Button
                      disabled={true}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.26)',
                        textTransform: 'capitalize',
                        padding: '15px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        marginTop: '20px',
                      }}
                      size="large"
                    >
                      Proceed
                    </Button>
                  )}

                  {/* If email has been filled but invalid */}
                  {email && !isValid && (
                    <Button
                      disabled={true}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.26)',
                        textTransform: 'capitalize',
                        padding: '15px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        marginTop: '20px',
                      }}
                      size="large"
                    >
                      Proceed
                    </Button>
                  )}

                  {/* If email is valid and the user requests for pin */}
                  {email && isValid && !showPin && (
                    <Button
                      style={{
                        background:
                          'linear-gradient(90deg, #820263 0%, #D90368 38.02%, #FFD400 75.83%, #D90368 100%)',
                        color: '#FFFFFF',
                        textTransform: 'capitalize',
                        padding: '15px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        marginTop: '20px',
                      }}
                      size="large"
                      onClick={() => submitEmailandSendPin()}
                    >
                      Proceed{' '}
                      {submitEmailLoading && (
                        <CircularProgress
                          size={20}
                          style={{ color: '#FFFFFF' }}
                        />
                      )}
                    </Button>
                  )}

                  {/* If email is valid and the pin is not complete */}
                  {email && isValid && showPin && !pinIsComplete && (
                    <Button
                      disabled={true}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.26)',
                        color: '#FFFFFF',
                        textTransform: 'capitalize',
                        padding: '15px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        marginTop: '10px',
                      }}
                      size="large"
                    >
                      Proceed
                    </Button>
                  )}

                  {/* If the email is valid and the pin is complete and user requests for a new pin */}
                  {email &&
                    isValid &&
                    showPin &&
                    pinIsComplete &&
                    resendPin && (
                      <Button
                        style={{
                          background:
                            'linear-gradient(90deg, #820263 0%, #D90368 38.02%, #FFD400 75.83%, #D90368 100%)',
                          color: '#FFFFFF',
                          textTransform: 'capitalize',
                          padding: '15px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                        size="large"
                        onClick={() => {
                          resetFields();
                          setEmail(email);
                        }}
                      >
                        Resend pin{' '}
                        {submitEmailLoading && (
                          <CircularProgress
                            size={20}
                            style={{ color: '#FFFFFF' }}
                          />
                        )}
                      </Button>
                    )}

                  {/* If the email is valid and the pin is complete */}
                  {email &&
                    isValid &&
                    showPin &&
                    pinIsComplete &&
                    !resendPin && (
                      <Button
                        style={{
                          background:
                            'linear-gradient(90deg, #820263 0%, #D90368 38.02%, #FFD400 75.83%, #D90368 100%)',
                          color: '#FFFFFF',
                          textTransform: 'capitalize',
                          padding: '15px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          cursor: 'pointer',
                          marginTop: '10px',
                        }}
                        size="large"
                        onClick={checkPinAndLoginUser}
                      >
                        Proceed{' '}
                        {submitEmailLoading && (
                          <CircularProgress
                            size={20}
                            style={{ color: '#FFFFFF' }}
                          />
                        )}
                      </Button>
                    )}
                </FormControl>
              </div>
            </>
          )}
        </div>
        <div className={styles.nitoonsRight}>
          <img
            src="/static/images/login-img.svg"
            alt="nitoons-login-logo"
            className={styles.nitoonsRight}
          />
        </div>
      </div>
    </div>
  );
};

export default login;
