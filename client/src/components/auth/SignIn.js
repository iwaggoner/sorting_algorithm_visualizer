import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = (props) => {
    
    const container = {
        marginTop: '100px'
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
			})
	}

    return (
        <div style={container} className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Sign In</h3>
                <Form onSubmit={onSignIn}>
                    <Form.Group controlId='email'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
