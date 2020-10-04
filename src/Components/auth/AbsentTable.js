import React, { useEffect, useState } from 'react'
import MaterialTable from "material-table";
import firebase from "../../utils/firebase";
import { withRouter, useParams, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress'
import {nest} from 'd3-collection'
import Grid from '@material-ui/core/Grid'

const queryString = require('query-string');

const AnswersTable = () => {
	const [answersData, setAnswersData] = useState(null)
	const [filesData, setFilesData] = useState(null)
	const [columns, setColumns] = useState(null)
	const [formData, setFormData] = useState(null)
	const [ready, setReady] = useState(false)
    const [rows, setRows] = useState(null)
    const [senders, setSenders] = useState(null)
    const [absentUsers, setAbsentUsers] = useState(null)
	const [userContactData, setUserContactData] = useState(null)
	const [role, setRole] = useState(null)
	const [usersData, setUsersData] = useState(null)

	let { table } = useParams();

	useEffect(() => {
		// console.log(table)
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
								setRole(d.role)
								// console.log(f)
							})
                        }
                        if (d.path === '/contacts') {
                            fetch(d.url).then(r => r.json()).then(f => {
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
			let usersObject = {}
            let usersId = []
            let sendersId = []
			let usersRef = firebase.firestore().collection('users')
			await usersRef.get().then(docs => {
                docs.forEach(doc => {
					// console.log(doc.data())
					// console.log(role)
					// if (doc.data().role === role || role === 'all') {
					// 	// usersId.push(doc.id)
					// 	// users.push({id: doc.id, ...doc.data()})
					// 	console.log("ROLE", doc.id, doc.data().role)
					// }
					usersId.push(doc.id)
					users.push({id: doc.id, ...doc.data()})
					usersObject[doc.id] = doc.data()
                })
			}).then(async () => {
				let rootRef = firebase.firestore().collection('responses')
				let us = await users.map(async user => {
					let userRef = rootRef.doc(user.id)
					let answersRef = userRef.collection("answers")
					await answersRef.where("identifier", "==", formData.identifier).get().then(querySnapshot => {
						querySnapshot.forEach(snap => {
							// console.log(snap.data())
                            sendersId.push(user.id)
						})
					})
				})
				Promise.all(us).then(() => {
                    let uniqueIds = [...new Set(sendersId)];
                    setSenders(uniqueIds)
                    let absents = usersId.filter( ( el ) => !uniqueIds.includes( el ) );
                    // console.log("UNIQUE", uniqueIds)
                    // console.log("ABSENTS", absents)
                    console.log("nonunique replies", sendersId.length)
                    console.log("unique replies: ", uniqueIds.length)
                    console.log("haven't replied: ", absents.length)
					setAbsentUsers(absents)
					console.log(usersObject)
					setUsersData(usersObject)
				})
			})
		}

        if (formData && role) {
            getData()
        }
        
    }, [formData, role])


    useEffect(() => {
        const makeRows = async () => {
            let rootRef = firebase.firestore().collection('responses')
            const contactData = []
            let rows = await absentUsers.map( async user => {
                // console.log(user)
                let userRef = rootRef.doc(user)
                let answersRef = userRef.collection("answers")
                await answersRef.where("form_name", "==", "Контактные данные").limit(1).get().then(async querySnapshot => {
                    await querySnapshot.forEach(async snap => {
                        // console.log(snap.data())
                        // contactData =  snap.data()
                        contactData.push({id: user, ...snap.data().answers})
                    })
                })
            })
            Promise.all(rows).then(() => {
                console.log(contactData)
                setUserContactData(contactData)
				// setReady(true)
				createRow(contactData)
            })
            
        }

        if (absentUsers && usersData && role) {
            makeRows()
        }
    }, [absentUsers, usersData, role])
    


	const createColumns = (questions) => {
		let cols = []
		questions.forEach((question, i) => {
			if (question.type === 'multiradio') {
				question.subquestion.forEach(subquestion => cols.push({ title: subquestion.q, width: 200}))
			}
			else {
				cols.push({ title: question.title, width: 200})
			}
		})
		console.log(cols)
		cols.forEach((col, i) => col['field'] = i.toString())
		
		// cols.unshift({title: 'Full_name', field: 'full_name', width: 200})
		cols.unshift({title: 'Role', field: 'role', width: 200})
        
		// cols.unshift({title: 'Full_name', field: 'full_name', width: 200})
		// cols.unshift({title: 'Username', field: 'name', width: 200})
		// cols.push({title: 'Date', field: 'date', width: 200})
		// cols.push({title: "Images", field: 'image', width: 200, render: rowData => {
		// 	if (rowData.image) {
		// 		return (
		// 		<Grid container display="flex" style={{flexWrap: 'inherit'}}>
		// 			{rowData.image.map((url, i) => {
		// 				let ext = url.match(/(\.\w+)+(?!.*(\w+)(\.\w+)+)/g)
		// 				if (ext && (ext[0] === '.jpg' || ext[0] === '.png' || ext[0] === '.svg')) {
		// 					return <img key={i} src={url} alt={"image" + i} style={{width: 100, cursor: "pointer", paddingRight: '5px'}} onClick={() => window.open(url)} />
		// 				}
		// 				else if (ext && ext[0] === '.mp4') {
		// 					return <button key={i} onClick={() => window.open(url)}>{"video" + i}</button>
		// 				}
		// 				else {
		// 					return <button key={i} onClick={() => window.open(url)}>{"neither image or video" + i}</button>
		// 				}
		// 			})}
		// 		</Grid>
		// 		)
		// 	}
		// 	else {
		// 		return '[null]'
		// 	}
		// }})
        setColumns(cols)
	}

	// const createRows = (data, files, userKeys) => {
	// 	// console.log(data)

	// 	let filesObject = {}
	// 	if (files.length > 0) {
	// 		let filesNested = nest()
	// 		.key(function(d) { return d.id; })
	// 		.rollup(function(v) { return v.map(f => f.photo_url)})
	// 		.entries(files);
	// 		// console.log("NESTED", filesNested)
	// 		filesNested.forEach(file => {
	// 			filesObject[file.key] = file.value
	// 		})
	// 	}
	// 	// console.log(filesObject)

	// 	let rows = []
	// 	data.forEach(d => {
	// 		let row = []
	// 		formData.questions.forEach((question, ind) => {
	// 			if (question.type === 'multiradio') {
	// 				let len = question.subquestion.length
	// 				for (let i = 0; i < len; i++) {
	// 					if (d[ind] && d[ind][i]) {
	// 						row.push(question.answer[d[ind][i]])
	// 					}
	// 					else {
	// 						row.push('-')
	// 					}
	// 				}
	// 			}
	// 			else {
	// 				if (d[ind]) {
	// 					row.push(d[ind])
	// 				}
	// 				else {
	// 					row.push('-')
	// 				}
	// 			}
	// 		})
	// 		// console.log(row)
	// 		let tmp = {}
	// 		Object.values(columns).forEach(column => {
	// 			tmp[column.field] = row[column.field]
	// 		})
	// 		// console.log(userKeys)
	// 		userKeys.forEach(key => {
	// 			tmp[key] = d[key]
	// 			if (key === 'date') {
	// 				tmp[key] = formatDate(d[key])
	// 			}
	// 		})
	// 		tmp['image'] = filesObject[d.id]
	// 		rows.push(tmp)
	// 	})
	// 	setRows(rows)
	// 	setReady(true)
	// }

	// const formatDate = (d) => {
	// 	let date = new Date({...d}.seconds * 1000)
	// 	let formatedDate = [
	// 				date.getDate().toString().length < 2 ? '0' + date.getDate() : date.getDate(),
	// 				(date.getMonth()+1).toString().length < 2 ? '0' + (date.getMonth()+1) : (date.getMonth()+1),
	// 				date.getFullYear()].join('/')+' '+
	// 				[date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours(),
	// 					date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes(),
	// 					date.getSeconds().toString().length < 2 ? '0' + date.getSeconds() : date.getSeconds()].join(':').toString();
	// 	return formatedDate
	// }

	const createRow = (data) => {
		let tmpRows = []
		data.forEach(d => {
			if (d.id && usersData[d.id]) {
				if (usersData[d.id].role === role || role === 'all') {
					console.log(usersData[d.id].role)
					console.log(role)
					tmpRows.push({...d, ...usersData[d.id]})
				}
			}
		})
		setRows(tmpRows)
		setReady(true)
	}


	return (
		ready ? <div>
			{/* <button onClick={createRow}>asd</button> */}
		    <MaterialTable
            title={"Всего не ответило (контактные данные): " + rows.length + " - " + formData.main_title}
		    columns={columns}
		    data={rows}
		    options={{
				filtering: true,
				pageSize: 20,
				emptyRowsWhenPaging: false,
				pageSizeOptions: [20, 50, 150], 
				exportButton: true,
					fixedColumns: {
						left: 1,
					}

			}}
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