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
	return <Table dataSource={tableData} columns={columns} />
}

export default TableComponent
