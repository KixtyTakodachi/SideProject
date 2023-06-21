import React from 'react'
import { Table } from 'antd'
import { keys_translaltion_dictionary } from '../../global_vars'
function TableComponent(props) {
	const { tableData, columnsKeys } = props
	const columns = columnsKeys.map((item, index) => {
		if (item === '#') {
			return {
				title: '#',
				render: (text, record, index) => {
					return <div>{index + 1}</div>
				},
				key: 'indexation',
			}
		} else {
			return {
				title: keys_translaltion_dictionary[item] || item,
				dataIndex: item,
				key: item + index,
			}
		}
	})
	return (
		<Table
			rowKey={(record) => record[columnsKeys[0]] + record[columnsKeys[1]]}
			dataSource={tableData}
			columns={columns}
			scroll={{ x: 'max-content' }}
		/>
	)
}

export default TableComponent
