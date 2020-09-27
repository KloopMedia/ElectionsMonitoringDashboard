import React, { useEffect, useState } from 'react'
import MaterialTable from "material-table";
import firebase from "../../utils/firebase";
import { withRouter, useParams, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress'

const queryString = require('query-string');

const AnswersTable = () => {
	// state = {
	// 	main_title: '',
	// 	questions: [],
	// 	columns: [],
	// 	users: [],
	// 	users_data: [],
	// 	users_row: [],
	// 	ready: false
	// }

	const [answersData, setAnswersData] = useState(null)
	const [columns, setColumns] = useState(null)
	const [formData, setFormData] = useState(null)
	const [ready, setReady] = useState(false)
	const [rows, setRows] = useState(null)

	let { table } = useParams();

	useEffect(() => {
		console.log(table)
		// Get columns data
		let urlString = queryString.parse(window.location.search, { decode: false })
		if (urlString.url) {
			fetch(urlString.url)
				.then(response => response.json())
				.then(data => {
					data.forms.forEach(d => {
						if (d.path === '/' + table) {
							fetch(d.url).then(r => r.json()).then(f => {
								setFormData(f)
								console.log(f)
								createColumns(f.questions)
							})
						}
					})
				});
		} else {
			console.log("ERROR: no url detected")
		}
	}, [])

	useEffect(() => {
		// Get users data
		const getData = async () => {
			let users = []
			let data = []
			let usersRef = firebase.firestore().collection('users')
			await usersRef.get().then(docs => {
				docs.forEach(doc => users.push({id: doc.id, data: doc.data()}))
			}).then(async () => {
				let rootRef = firebase.firestore().collection('responses')
				let us = await users.map(async user => {
					let userRef = rootRef.doc(user.id)
					let answersRef = userRef.collection("answers")
					await answersRef.where("form_name", "==", formData.main_title).get().then(querySnapshot => {
						querySnapshot.forEach(async snap => {
							// console.log(snap.data())
							let d = await snap.data()
							data.push({ ...d.answers, name:user.data.name, date: d.date })
						})
					})
				})
				Promise.all(us).then(() => {
					setAnswersData(data)
					createRows(data)
				})
			})
		}


		if (formData && columns) {
			getData()
		}
	}, [formData, columns])


	const createColumns = (questions) => {
		let cols = []
		questions.forEach((question, i) => {
			if (question.type === 'multiradio') {
				question.subquestion.forEach(subquestion => cols.push({ title: subquestion.q }))
			}
			else {
				cols.push({ title: question.title })
			}
		})

		cols.forEach((col, i) => col['field'] = i.toString())
		cols.unshift({title: 'Username', field: 'name'})
		cols.push({title: 'Date', field: 'date'})
		console.log(cols)
		setColumns(cols)
	}

	const createRows = (data) => {
		console.log(data)
		let rows = []
		data.forEach(d => {
			let row = []
			formData.questions.forEach((question, ind) => {
				if (question.type === 'multiradio') {
					let len = question.subquestion.length
					for (let i = 0; i < len; i++) {
						if (d[ind] && d[ind][i]) {
							row.push(d[ind][i])
						}
						else {
							row.push('-')
						}
					}
				}
				else {
					if (d[ind]) {
						row.push(d[ind])
					}
					else {
						row.push('-')
					}
				}
			})
			// console.log(row)
			let tmp = {}
			Object.values(columns).forEach(column => {
				tmp[column.field] = row[column.field]
			})
			tmp['name'] = d.name
			let date = new Date({...d.date}.seconds * 1000)
			let formatedDate = [
						date.getDate().toString().length < 2 ? '0' + date.getDate() : date.getDate(),
						(date.getMonth()+1).toString().length < 2 ? '0' + (date.getMonth()+1) : (date.getMonth()+1),
						date.getFullYear()].join('/')+' '+
						[date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours(),
							date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes(),
							date.getSeconds().toString().length < 2 ? '0' + date.getSeconds() : date.getSeconds()].join(':').toString();

			tmp['date'] = formatedDate
			rows.push(tmp)
		})
		setRows(rows)
		setReady(true)
	}


	return (
		ready ? <div>
		    <MaterialTable
				title={formData.main_title + " (Записей: " + rows.length + ")"}
		    columns={columns}
		    data={rows}
		    options={{paging: false}}
		    />
		</div> : <div style = {{
      position: 'absolute',
      height: '100px',
      width: '100px',
      top: '50%',
      left: '50%',
      marginLeft: '-50px',
      marginTop: '-50px',
      }}>
      <CircularProgress size={100} style={{color: 'grey'}}/>
    </div>
	);
}

export default AnswersTable;