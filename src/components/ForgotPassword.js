import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const ForgotPassword = () => {
	const emailRef = useRef()
	const [error, setError] = useState(null)
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)
	const { resetPassword } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError(null);

		try {
			// Send a password reset email to the user
			setLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage("En återställningslänk har skickats till din mejladress.")
		} catch (e) {
			setError("Återställningslänk kunde ej skickas. Var god kontrollera din mejladress.")
			setLoading(false)
		}
	}

	return (
		<Row>
			<Col>
				<h2>Har du glömt ditt lösenord?</h2>

				{error && <Alert variant="danger">{error}</Alert>}
				{message && <Alert variant="success">{message}</Alert>}

				<Form onSubmit={handleSubmit}>
					<Form.Group id="email">
						<Form.Label>Din mejladress</Form.Label>
						<Form.Control type="email" ref={emailRef} required />
					</Form.Group>

					<Button disabled={loading} type="submit">Återställ lösenord</Button>
				</Form>

				<Link to="/admin">Tillbaka till inloggningssidan</Link>
			</Col>
		</Row>		
	)
}

export default ForgotPassword
