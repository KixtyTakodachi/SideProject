import { key, url } from '../global_vars'
import axios from 'axios'

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
