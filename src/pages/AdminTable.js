import React, { Component } from 'react'
import MaterialTable from 'material-table'
import firebase from '../utils/firebase'

import DoneIcon from '@material-ui/icons/Done';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core';


let lookup = {
    ok: <DoneIcon style={{ color: '#4BB543' }} />,
    ok_no_data: <DoneIcon style={{ color: 'grey' }} />,
    notice: <DoneIcon style={{ color: '#fddb3a' }} />,
    warning: <DoneIcon style={{ color: 'red' }} />
  }

let lookupName = {}
let lookupEmail = {}

class App extends Component {
  state = {
    data: [],
    columns: [],
    ready: false
  }

  componentDidMount() {
    let rootRef = firebase.database().ref().child('users_tests').child('users')
    rootRef.on('value', snap => {
      let data = Object.values(snap.val())
      data.forEach(d => {
        lookupName[d.name] = d.name
        lookupEmail[d.email] = d.email
      })
      let flatData = data.map(row => {
        let testKeys = Object.keys(row.tests)
        testKeys.forEach((key, i) => {
          row[key] = row.tests[key]
        })
        let {tests, ...newData} = row
        console.log(newData)
        return newData
      })

      // Dynamically creating columns
      let keys = Object.keys(flatData[0])
      let columns = keys.map(key => {
        let lk = lookup
        if (key === 'name') {
          lk = lookupName
        }
        else if (key === 'email') {
          lk = lookupEmail
        }
        return {title: key, field: key, render: rowData => {
          if (rowData[key].status) {
            if (rowData[key].description) {
              return <Tooltip title={rowData[key].description} arrow>{lookup[rowData[key].status]}</Tooltip>
            }
            else {
              return lookup[rowData[key].status]
            }
          }
          else {
            return rowData[key]
          }
        },
        customFilterAndSearch: (term, rowData) => {
          if (rowData[key].status) {
            return (rowData[key].status).indexOf(term) !== -1
          }
          else {
            return (rowData[key]).indexOf(term) !== -1
          }
        },
        lookup: lk
      }
      })

      this.setState({data: flatData})
      this.setState({columns: columns})
      this.setState({ready: true})
      console.log(columns)
      console.log(this.state.data)
    });

  }

  render() {
    return (
      this.state.ready ? <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={this.state.columns}
          data={this.state.data}
          options={{
            filtering: true,
            padding: "dense"
          }}
          title="Kloop Table"
        />
      </div> : null
    )
  }
}

export default App;
