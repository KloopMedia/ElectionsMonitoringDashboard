import React, {Component, useState} from 'react'
import MaterialTable from "./Component/MaterialTable";
import firebase from "../utils/firebase";

const queryString = require('query-string');

class App extends Component {
	state = {
		main_title: '',
		questions: [],
		columns: [],

	}

	downloadData = (url) => {
		let urlString = queryString.parse(window.location.search, {decode: false})
		console.log(urlString)
		if (true) {
			fetch(url)
				.then((response) => {
					console.log("RESPONSE", response)
					return response.json();
				})
				.then((data) => {
					console.log("DATA", data);
					this.setState({
						questions: data.questions,
						main_title: data.main_title
					})
				});
		} else {
			console.log("ERROR: no url detected")
		}
	}

	columns = () => {

		let cols = this.state.questions.map((el, i) => {
			return {title: el.title, field: i, editable: "never"}
		})
		cols.push({title: 'Date', field: 'date', editable: "never"})
		cols.push({title: 'Timestamp', field: 'timestamp', editable: "never"})
		this.setState({columns: cols})
	}

	componentDidMount() {
		this.downloadData(this.props.url)

		let rootRef = firebase.firestore().collection('responses')
		rootRef.get().then(doc => {
			doc.forEach(d=>{
				console.log(d.id)
			})
		})

	}


	render() {
		return (
			<div className="App">
				<button onClick={() => console.log(this.state)}>show state</button>
				<button onClick={() => this.columns()}>show sdsaftate</button>
				<MaterialTable columns={this.state.columns} title={this.state.main_title} data={this.state.data}/>
			</div>
		);
	};
}

export default App;
