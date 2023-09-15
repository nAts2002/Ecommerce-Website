import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
library.add(farStar, fasStar)

const Rating = ({ value, text, color }) => {
	return (
		<div className='rating'>
			<span>
				<FontAwesomeIcon
					style={{ color }}
					icon={
						value >= 1
							? 'fas fa-star'
							: value >= 0.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>

			<span>
				<FontAwesomeIcon
					style={{ color }}
					icon={
						value >= 2
							? 'fas fa-star'
							: value >= 1.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>

			<span>
				<FontAwesomeIcon
					style={{ color }}
					icon={
						value >= 3
							? 'fas fa-star'
							: value >= 2.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>

			<span>
				<FontAwesomeIcon
					style={{ color }}
					icon={
						value >= 4
							? 'fas fa-star'
							: value >= 3.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>

			<span>
				<FontAwesomeIcon
					style={{ color }}
					icon={
						value >= 5
							? 'fas fa-star'
							: value >= 4.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				/>
			</span>
			{/* if text show text*/}
			<span>{text && text}</span>
		</div>
	)
}

Rating.defaultProps = {
	color: '#f8e825',
}

export default Rating
