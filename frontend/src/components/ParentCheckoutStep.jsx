import React from 'react'
import CheckoutStep from './CheckoutStep'

const ParentCheckoutStep = () => {
	const stepOne = true
	const stepTwo = true
	const stepThree = false
	const stepFour = false

	return (
		<div>
			<CheckoutStep
				stepOne={stepOne}
				stepTwo={stepTwo}
				stepThree={stepThree}
				stepFour={stepFour}
			/>
		</div>
	)
}

export default ParentCheckoutStep
