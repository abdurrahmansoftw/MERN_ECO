import {
	Box,
	Button,
	Step,
	StepButton,
	StepLabel,
	Stepper,
} from '@mui/material'
import React from 'react'
import CustomLink from './CustomLink'

const CheckoutStep = ({ stepOne, stepTwo, stepThree, stepFour }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				my: 3,
				direction: 'row',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Stepper activeStep={stepOne ? 1 : -1}>
				{stepOne ? (
					<Step>
						<StepButton>
							<Button component={CustomLink} to='/login'>
								Sign In
							</Button>
						</StepButton>
					</Step>
				) : (
					<Step>
						<StepLabel>
							<Button disabled>Sign In</Button>
						</StepLabel>
					</Step>
				)}
			</Stepper>
			<Stepper activeStep={stepTwo ? 2 : -1}>
				{stepTwo ? (
					<Step>
						<StepLabel>
							<Button component={CustomLink} to='/shipping'>
								Shipping
							</Button>
						</StepLabel>
					</Step>
				) : (
					<Step>
						<StepLabel>
							<Button disabled>Shipping</Button>
						</StepLabel>
					</Step>
				)}
			</Stepper>
			<Stepper activeStep={stepThree ? 3 : -1}>
				{stepThree ? (
					<Step>
						<StepLabel>
							<Button component={CustomLink} to='/payment'>
								Payment
							</Button>
						</StepLabel>
					</Step>
				) : (
					<Step>
						<StepLabel>
							<Button disabled>Payment</Button>
						</StepLabel>
					</Step>
				)}
			</Stepper>
			<Stepper activeStep={stepFour ? 4 : -1}>
				{stepFour ? (
					<Step>
						<StepLabel>
							<Button component={CustomLink} to='/placeOrder'>
								Place Order
							</Button>
						</StepLabel>
					</Step>
				) : (
					<Step>
						<StepLabel>
							<Button disabled>Place Order</Button>
						</StepLabel>
					</Step>
				)}
			</Stepper>
		</Box>
	)
}

export default CheckoutStep
