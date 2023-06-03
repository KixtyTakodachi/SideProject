import React from 'react'
import { useStore } from '../../store/store'
import SyncOutlined from '@ant-design/icons/SyncOutlined'
import './Loader.scss'
function Loader(props) {
	const loader = useStore((state) => state.loader)

	return (
		<div className={['loader', loader ? 'active' : ''].join(' ')}>
			<SyncOutlined className="spinner" spin />
		</div>
	)
}

export default Loader
