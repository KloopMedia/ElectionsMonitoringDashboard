(this["webpackJsonpkloop-table"]=this["webpackJsonpkloop-table"]||[]).push([[0],{343:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=343},362:function(e,t,n){e.exports=n(442)},367:function(e,t,n){},442:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(16),c=n.n(r),l=(n(367),n(82)),s=n(83),i=n(87),u=n(86),d=n(74),m=n(26),h=n(130),f=n(154),p=n.n(f);p.a.initializeApp({apiKey:"AIzaSyCCAhvWFvwuxDUXZ4aV-FhB_Dj-lp_frCw",authDomain:"electionsmonitor-5d008.firebaseapp.com",databaseURL:"https://electionsmonitor-5d008.firebaseio.com",projectId:"electionsmonitor-5d008",storageBucket:"electionsmonitor-5d008.appspot.com",messagingSenderId:"145410178875",appId:"1:145410178875:web:6cf434df68d3c65062811e",measurementId:"G-EXC8T9QXES"});var b=new p.a.auth.GoogleAuthProvider,E=function(){p.a.auth().signInWithPopup(b)},v=p.a,g=o.a.createContext(),w=function(e){var t=e.children,n=Object(a.useState)(null),r=Object(h.a)(n,2),c=r[0],l=r[1],s=Object(a.useState)(!0),i=Object(h.a)(s,2),u=i[0],d=i[1];return Object(a.useEffect)((function(){v.auth().onAuthStateChanged((function(e){l(e),d(!1)}))}),[]),u?o.a.createElement(o.a.Fragment,null,"Loading..."):o.a.createElement(g.Provider,{value:{currentUser:c}},t)},O=n(213),j=function(e){var t=e.component,n=Object(O.a)(e,["component"]),r=Object(a.useContext)(g).currentUser;return o.a.createElement(m.b,Object.assign({},n,{render:function(e){return r?o.a.createElement(t,e):o.a.createElement(m.a,{to:"/ElectionsMonitoringDashboard/login"+window.location.search})}}))},y=n(252),k=n(354),S=n(147),D=n.n(S);function _(e){return o.a.createElement(D.a,{title:e.title,columns:e.columns,data:e.data,cellEditable:{onCellEditApproved:function(t,n,a,o){return new Promise((function(o,r){var c=Object.keys(a)[Object.values(a).indexOf(n)];e.save_role(a.id,c,t),setTimeout(o,1)}))}}})}var A=n(188),M=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={main_title:"",questions:[],columns:[],users:[],users_data:[],users_row:[],ready:!1},e.downloadData=function(t){var n=A.parse(window.location.search,{decode:!1});console.log(n),fetch(t).then((function(e){return console.log("RESPONSE",e),e.json()})).then((function(t){console.log("DATA",t),e.setState({questions:t.questions,main_title:t.main_title}),e.columns(),v.firestore().collection("users").get().then((function(t){t.forEach((function(t){return e.state.users.push(t.id)}))})).then((function(){var t=v.firestore().collection("responses");e.state.users.forEach((function(n){t.doc(n).collection("answers").where("form_name","==",e.state.main_title).get().then((function(t){t.forEach((function(t,n){var a={},o=t.data();if(o){var r=Object.keys(e.state.columns),c=[];e.state.questions.forEach((function(e,t){if(o.answers[t]&&(console.log(e),console.log(o.answers[t])),"multiradio"===e.type)for(var n=e.subquestion.length,a=0;a<n;a++)o.answers[t]&&o.answers[t][a]?c.push(o.answers[t][a]):c.push("-");else o.answers[t]?c.push(o.answers[t]):c.push("-")})),console.log(c),r.forEach((function(e){c[e]?a[e]=c[e]:a[e]="-"}));var l=Object(k.a)(e.state.users_row);l.push(a),e.setState({users_row:l}),console.log(l)}}))}))}))}))}))},e}return Object(s.a)(n,[{key:"columns",value:function(){var e=[];this.state.questions.forEach((function(t,n){"multiradio"===t.type?t.subquestion.forEach((function(t){return e.push({title:t.q,editable:"never"})})):e.push({title:t.title,editable:"never"})}));var t=e.map((function(e,t){return Object(y.a)(Object(y.a)({},e),{},{field:t})}));console.log(t),this.setState({columns:t})}},{key:"componentDidMount",value:function(){this.downloadData(this.props.url)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"App"},o.a.createElement("button",{onClick:function(){return e.setState({ready:!0})}},"Set ready"),this.state.ready?o.a.createElement(_,{columns:this.state.columns,title:this.state.main_title,data:this.state.users_row}):null)}}]),n}(a.Component),C=n(188),x=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={tablets:[],data:[],columns:[],users:[],users_by_column:{}},e.downloadData=function(){var t=C.parse(window.location.search,{decode:!1});console.log(t),fetch("https://raw.githubusercontent.com/KloopMedia/ElectionsMonitoringFormsConfig/master/config_v2.json").then((function(e){return console.log("RESPONSE",e),e.json()})).then((function(t){console.log("DATA",t),e.setState({tablets:t})}))},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){this.downloadData()}},{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement(d.a,null,this.state.tablets.map((function(e,t){return o.a.createElement("li",{key:t},o.a.createElement(d.b,{to:"/ElectionsMonitoringDashboard/tablets"+e.path+window.location.search},e.label))})),o.a.createElement(m.d,null,this.state.tablets.map((function(e,t){return o.a.createElement(m.b,{key:t,path:"/ElectionsMonitoringDashboard/tablets"+e.path},(function(){return o.a.createElement(M,{url:e.url,label:e.label})}))})))))}}]),n}(a.Component),R=n(155),N=n.n(R),T=n(319),q={ok:o.a.createElement(N.a,{style:{color:"#4BB543"}}),ok_no_data:o.a.createElement(N.a,{style:{color:"grey"}}),notice:o.a.createElement(N.a,{style:{color:"#fddb3a"}}),warning:o.a.createElement(N.a,{style:{color:"red"}})},P={},F={},I=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={data:[],columns:[],ready:!1},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this;v.database().ref().child("users_tests").child("users").on("value",(function(t){var n=Object.values(t.val());n.forEach((function(e){P[e.name]=e.name,F[e.email]=e.email}));var a=n.map((function(e){Object.keys(e.tests).forEach((function(t,n){e[t]=e.tests[t]}));e.tests;var t=Object(O.a)(e,["tests"]);return console.log(t),t})),r=Object.keys(a[0]).map((function(e){var t=q;return"name"===e?t=P:"email"===e&&(t=F),{title:e,field:e,render:function(t){return t[e].status?t[e].description?o.a.createElement(T.a,{title:t[e].description,arrow:!0},q[t[e].status]):q[t[e].status]:t[e]},customFilterAndSearch:function(t,n){return n[e].status?-1!==n[e].status.indexOf(t):-1!==n[e].indexOf(t)},lookup:t}}));e.setState({data:a}),e.setState({columns:r}),e.setState({ready:!0}),console.log(r),console.log(e.state.data)}))}},{key:"render",value:function(){return this.state.ready?o.a.createElement("div",{style:{maxWidth:"100%"}},o.a.createElement(D.a,{columns:this.state.columns,data:this.state.data,options:{filtering:!0,padding:"dense"},title:"Kloop Table"})):null}}]),n}(a.Component),U=n(193),B=n(188),W=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).state={data:[],columns:[]},e.downloadData=function(){var t=B.parse(window.location.search,{decode:!1});console.log(t),t.url?fetch(t.url).then((function(e){return console.log("RESPONSE",e),e.json()})).then((function(t){console.log("DATA",t),e.setState({columns:t.fields.mainAdminTable})})):console.log("ERROR: no url detected")},e}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.downloadData(),v.firestore().collection("users").onSnapshot((function(t){var n=[],a=[];t.docs.map((function(e,t){n.push(e.data()),a.push(e.id)}));var o=[];n.forEach((function(e,t){var n={};Object.keys(e).forEach((function(t){n[t]=e[t]})),n.id=a[t],n.district||(n.district="none"),n.polling_station||(n.polling_station="none"),o[t]=n})),e.setState({data:o})}))}},{key:"save_role",value:function(e,t,n){v.firestore().collection("users").doc("".concat(e)).update(Object(U.a)({},t,n))}},{key:"render",value:function(){return console.log(this.state.data),o.a.createElement("div",{className:"App"},o.a.createElement(_,{columns:this.state.columns,data:this.state.data,save_role:this.save_role}))}}]),n}(a.Component),L=n(188),G=function(){var e=Object(a.useState)([]),t=Object(h.a)(e,2),n=(t[0],t[1]),r=Object(a.useState)(""),c=Object(h.a)(r,2),l=(c[0],c[1]);return Object(a.useEffect)((function(){var e=L.parse(window.location.search);console.log(e),l(e.url),e.url?fetch(e.url).then((function(e){return console.log("RESPONSE",e),e.json()})).then((function(e){console.log("DATA",e),n(e)})):console.log("ERROR: no url detected")}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Home"),o.a.createElement("button",{onClick:function(){return v.auth().signOut()}},"Sign out"),o.a.createElement(d.a,null,o.a.createElement("div",null,o.a.createElement("nav",null,o.a.createElement("ul",null,o.a.createElement("li",null,o.a.createElement(d.b,{to:"/ElectionsMonitoringDashboard/tablets"+window.location.search},"\u0424\u043e\u0440\u043c\u044b")),o.a.createElement("li",null,o.a.createElement(d.b,{to:"/ElectionsMonitoringDashboard/admin"+window.location.search},"\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0410\u0442\u0430\u044f")),o.a.createElement("li",null,o.a.createElement(d.b,{to:"/ElectionsMonitoringDashboard/admin-role"+window.location.search},"\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u044e\u0437\u0435\u0440\u043e\u0432 \u0441 \u0440\u043e\u043b\u044f\u043c\u0438")))),o.a.createElement(m.d,null,o.a.createElement(m.b,{exact:!0,path:"/ElectionsMonitoringDashboard/tablets",component:x}),o.a.createElement(m.b,{exact:!0,path:"/ElectionsMonitoringDashboard/admin",component:I}),o.a.createElement(m.b,{exact:!0,path:"/ElectionsMonitoringDashboard/admin-role",component:W})))))},K=Object(m.g)((function(e){e.history;return Object(a.useContext)(g).currentUser?o.a.createElement(m.a,{to:"/ElectionsMonitoringDashboard/"+window.location.search}):o.a.createElement("div",null,o.a.createElement("h1",null,"Log in"),o.a.createElement("button",{onClick:E},"Sign-in with Google"))})),X=function(e){Object(i.a)(n,e);var t=Object(u.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return o.a.createElement(w,null,o.a.createElement("div",{className:"App"},o.a.createElement(d.a,null,o.a.createElement(j,{exact:!0,path:"/ElectionsMonitoringDashboard/",component:G}),o.a.createElement(m.b,{exact:!0,path:"/ElectionsMonitoringDashboard/login",component:K}))))}}]),n}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[362,1,2]]]);
//# sourceMappingURL=main.43350202.chunk.js.map