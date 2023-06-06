import React from 'react'
import { Table } from 'antd'
import { keys_translaltion_dictionary } from '../../global_vars'
function TableComponent(props) {
	const { tableData, columnsKeys } = props
	const columns = columnsKeys.map((item) => {
		return {
			title: keys_translaltion_dictionary[item] || item,
			dataIndex: item,
			key: item,
		}
	})
	return <Table dataSource={tableData} columns={columns} />
}

export default TableComponent
