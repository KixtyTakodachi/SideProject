import { key, url } from '../global_vars'
import axios from 'axios'
import { logDOM } from '@testing-library/react'

export const callThemes = async () => {
	const form = new FormData()
	form.append('key', key)

	const call_url = url + 'get-themes-list/'

	let data = []

	await axios({
		method: 'POST',
		url: call_url,
		data: form,
	})
		// .then((response) => response.join())
		.then((response) => (data = response.data))
		.catch((err) => console.log(err))

	return data
}

export const callThemeData = async (alias, date = undefined) => {
	const form = new FormData()
	form.append('key', key)
	form.append('theme', alias)
	if (date) {
		form.append('date', date)
	}

	const call_url = url + 'get-theme-data/'

	let data = []

	await axios({
		method: 'POST',
		url: call_url,
		data: form,
	})
		.then((response) => (data = response.data))
		.catch((err) => console.log(err))

	return data
}

export const callCreateTheme = async (title, alias) => {
	const form = new FormData()
	form.append('key', key)
	form.append('title', title)
	form.append('alias', alias)

	const call_url = url + 'create-new-theme/'

	let data = []

	await axios({
		method: 'POST',
		url: call_url,
		data: form,
	})
		.then((response) => (data = response.data))
		.catch((err) => console.log(err))

	return data
}

export const callUpdateTheme = async (theme, from_date, to_date, file) => {
	const form = new FormData()
	form.append('key', key)
	form.append('theme', theme)
	form.append('from_date', from_date)
	form.append('to_date', to_date || '')
	form.append('file', file)

	const call_url = url + 'upload-api/'

	let data = undefined

	await axios({
		method: 'POST',
		url: call_url,
		data: form,
		headers: { 'Content-Type': 'multipart/form-data' },
	})
		.then((response) => (data = response.data))
		.catch((err) => console.log(err))

	return data
}

export const callDeleteTheme = async (alias) => {
	const form = new FormData()
	form.append('key', key)
	form.append('alias', alias)

	const call_url = url + 'delete-theme/'

	let data = []

	await axios({
		method: 'POST',
		url: call_url,
		data: form,
	})
		.then((response) => (data = response.data))
		.catch((err) => console.log(err))

	return data
}
