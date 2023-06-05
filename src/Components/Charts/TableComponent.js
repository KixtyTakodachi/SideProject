import React from 'react'
import { Table } from 'antd'
function TableComponent(props) {
	const { tableData, columnsKeys } = props
	const columns = columnsKeys.map((item) => {
		return {
			title: item,
			dataIndex: item,
			key: item,
		}
	})
	return <Table dataSource={tableData} columns={columns} />
}

export default TableComponent
