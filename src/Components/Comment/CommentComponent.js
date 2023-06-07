import React from 'react'
import './Comment.scss'
import comment_avatar from '../../img/comment_avatar.svg'

function CommentComponent(props) {
	const { name, text } = props
	return (
		<div className="comment_wrapper">
			<div className="comment_header">
				<img
					src={comment_avatar}
					alt={'avatar'}
					style={{ borderRadius: '100%', marginRight: '10px', height: '35px' }}
				/>
				<div className="comment_name">{name ? name : ''}</div>
			</div>
			<div className="comment_content">{text}</div>
		</div>
	)
}

export default CommentComponent
