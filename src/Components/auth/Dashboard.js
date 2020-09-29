import React, {Component, useEffect, useState} from 'react'
import firebase from "../../utils/firebase";

import MaterialTable from "material-table";

const queryString = require('query-string');

const Dashboard = () => {    
    const [userData, setUserData] = useState(null)
    const [columns, setColumns] = useState(null)
    const [districtLookup, setDisLookup] = useState(null)
    const [ready, setReady] = useState(false)

	useEffect(() => {
        setReady(false)

        // Get columns data
        let urlString = queryString.parse(window.location.search, {decode: false})
		if (urlString.url) {
				fetch(urlString.url)
				.then(response => response.json())
				.then(data => {
					console.log("DATA", data);
                    setColumns(data.mainAdminTable)
				});
		} else {
			console.log("ERROR: no url detected")
        }

        // Get users data
        let users = []
        let disLookup = {}
        let usersRef = firebase.firestore().collection('users')
        usersRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(doc => {
                let data = {id: doc.id, ...doc.data()}
                if (!data.district) {
                    data['district'] = 'none'
                }
                else {
                    disLookup[doc.data().district] = doc.data().district
                }
                if (!data.polling_station) {
                    data['polling_station'] = 'none'
                }
                users.push(data)
            });
            console.log(users)
            setUserData(users)
            setDisLookup(disLookup)
            setReady(true)
        });

    }, [])

    useEffect(() => {
        console.log(columns)
        if (columns && districtLookup) {
            let col = columns.map(c => {
                if (c.field === 'district') {
                    c.lookup = {...c.lookup, ...districtLookup}
                    return c
                }
                else {
                    return c
                }
            })
            console.log("DIS", districtLookup)
            console.log("COL", col)
        }
        // setColumns(col)
        // setReady(true)
    }, [columns, districtLookup])


	
    const updateUserData = (id, field, value) => {
        let data = [...userData]
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i][field] = value
                setUserData(data)
                break;
            }
        }
    }


    return (
        ready ? <div>
            <MaterialTable
            columns={columns}
            data={userData}
            options={{
                paging: false, 
                exportButton: true
                }}
            cellEditable={{
                onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                    return firebase.firestore().collection('users').doc(rowData.id).update({[columnDef.field]: newValue})
                    .then(() => updateUserData(rowData.id, columnDef.field, newValue))
                }
            }}
            />
        </div> : null
    )

}

export default Dashboard;
