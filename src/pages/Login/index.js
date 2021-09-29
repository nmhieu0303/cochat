import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Typography } from 'antd';
import firebase, { auth, db } from '../../firebase/config';
import { firebaseServices, generateKeywords } from '../../firebase/services';
const { Title } = Typography;


const Login = () => {
    const handleLogin = async (provider) => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(provider)
        if (additionalUserInfo.isNewUser) {
            const userNew = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: additionalUserInfo.providerId,
                keywords:generateKeywords(user.displayName)
            }
            firebaseServices.addDocument('users',userNew)
        }
    }

    return (
        <div className="login-page">
            <Row justify='center' style={{ height: '100vh',alignItems: 'center' }}>
                <Col xs={{ span: 24 }} lg={{ span: 6 }} style={{ textAlign: 'center' }}>
                    <Title level={1} style={{ textAlign: 'center' }}>
                        Welcome to CoChat
                    </Title>
                    <Button type="danger" style={{ marginBottom: 10 }} block size="large"
                        onClick={() => handleLogin(new firebase.auth.GoogleAuthProvider())}
                    >
                        Login with Google
                    </Button>
                    <Button type="primary" block size="large"
                        onClick={() => handleLogin(new firebase.auth.FacebookAuthProvider())}
                    >
                        Login with Facebook
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
