(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{123:function(e,t){},132:function(e,t,n){},137:function(e,t,n){},138:function(e,t,n){},142:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),s=n(11),o=n.n(s),i=(n(86),n(87),n(29)),l=n(13),c=n(14),u=n(16),m=n(15),g=n(9),d=n(17),h=n(7),f=(n(95),n(96),function(e){var t=e.allinfo,n="0"===t.color?"warning":"success";return r.a.createElement("div",null,t.show?r.a.createElement("div",{className:n+" banner"},r.a.createElement("h4",null,t.msgToUser)):null)}),p=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).serverUrl=window.location.origin,n.loginUser=function(e){if(""!==e.name&&""!==e.password){var t=n.serverUrl+"/users/login",a="Basic ".concat(btoa("".concat(e.name,":").concat(e.password)));fetch(t,{method:"POST",headers:new Headers({Authorization:a})}).then(function(e){return e.json()}).then(function(t){t.autorized&&n.props.userLoggedIn(e.name)}).catch(function(e){n.displayLightBox("failed to login","0")})}else n.displayLightBox("please fill in all fields","0")},n.getPass=function(e){n.setState({password:e.target.value})},n.getName=function(e){n.setState({name:e.target.value})},n.displayLightBox=function(e,t){var a={show:!0,msgToUser:e,color:t};n.setState({banner:a}),n.bannerTimeOut=setTimeout(function(){n.setState({banner:{show:!1,msgToUser:"",color:null}})},3e3)},n.state={password:"",name:"",ifUserLoggedIn:!1,banner:{show:!1,msgToUser:"",color:""}},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentWillUnmount",value:function(){clearTimeout(this.bannerTimeOut)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(h.f,null,r.a.createElement(h.i,{className:"divLogin"},r.a.createElement(h.e,{md:"6"},r.a.createElement(h.b,null,r.a.createElement(h.c,null,r.a.createElement(h.d,{className:"form-header deep-blue-gradient rounded"},r.a.createElement("h3",{className:"my-3"},r.a.createElement(h.g,{icon:"lock"})," Login:")),r.a.createElement("form",null,r.a.createElement("div",{className:"grey-text"},r.a.createElement(h.h,{onChange:this.getName,label:"Type your name",icon:"envelope",group:!0,type:"text",validate:!0,error:"wrong",success:"right"}),r.a.createElement(h.h,{onChange:this.getPass,label:"Type your password",icon:"lock",group:!0,type:"password",validate:!0})),r.a.createElement("div",{className:"text-center mt-4"},r.a.createElement(h.a,{outline:!0,color:"info",onClick:function(){var t=e.state.name,n={password:e.state.password,name:t};e.loginUser(n)}},"Send")))))))),r.a.createElement(f,{allinfo:this.state.banner}))}}]),t}(a.Component),v=n(80),E=n(36),b=n.n(E),O=n(19),w=n(79),y=(n(132),n(156)),S=n(147),j=n(148),U=n(149),k=n(145);var N=function(e){var t=e.userName;return r.a.createElement("div",null,r.a.createElement(k.a,{className:"justify-content-between"},t,"  "))},L=n(146);var I=function(e){var t=e.onlineUsers;return console.log(t),r.a.createElement("div",null,r.a.createElement(L.a,null,t?t.map(function(e,t){return r.a.createElement(N,{userName:e,key:t})}):""))},x=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={modal:!1},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props,t=e.openModal,n=e.onlineUsers,a=e.toggle;return r.a.createElement("div",null,r.a.createElement(y.a,{isOpen:t,toggle:a},r.a.createElement(S.a,{toggle:a},"Online Users"),r.a.createElement(j.a,null,r.a.createElement(I,{onlineUsers:n})),r.a.createElement(U.a,null,r.a.createElement(h.a,{outline:!0,color:"info",onClick:a},"close"))))}}]),t}(a.Component),T=function(e){function t(e){var n;Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).endpoint=window.location.origin,n.componentDidMount=function(){n.socket=b()(n.endpoint),n.joinChat(),n.socket.on("new message",function(e){var t=Object(v.a)(n.state.messages),a={author:e.author,timestamp:new Date,text:e.text};t.push(a),n.setState({messages:t})})},n.addNewMessage=function(e){var t=Object.assign({},e.message);t.author=n.user,n.socket.emit("send message",t)},n.state={text:"",messages:[],userName:localStorage.getItem("userdetails"),onlineUsers:[]};var a=Math.random().toString().split(".")[1];return n.user={id:a,name:n.state.userName},n.addNewMessage=n.addNewMessage.bind(Object(g.a)(n)),n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"joinChat",value:function(){var e=this;this.socket.emit("new user",this.state.userName),this.socket.on("get users",function(t){e.setState({onlineUsers:t})})}},{key:"componentWillUnmount",value:function(){this.socket.close()}},{key:"render",value:function(){var e=this.props,t=e.openModal,n=e.toggle;return r.a.createElement("div",null,r.a.createElement(x,{openModal:t,onlineUsers:this.state.onlineUsers,toggle:n}),r.a.createElement("div",{className:"a"},r.a.createElement("div",{className:"h4"},r.a.createElement("h4",null,"Hello "+this.state.userName)),r.a.createElement("div",{className:"chat"},r.a.createElement(w.a,{messages:this.state.messages,onMessageSend:this.addNewMessage,placeholder:"Type a message..."}))))}}]),t}(a.Component),C=n(23),M=n(24),R=n(26),B=n.n(R),P=n(30);function A(e,t){return _.apply(this,arguments)}function _(){return(_=Object(P.a)(B.a.mark(function e(t,n){return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(n,{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){return e}));case 1:case"end":return e.stop()}},e)}))).apply(this,arguments)}n(137);var W=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).serverUrl=window.location.origin,n.name=r.a.createRef(),n.pass=r.a.createRef(),n.rePass=r.a.createRef(),n.displayLightBox=function(e,t){var a={show:!0,msgToUser:e,color:t};n.setState({banner:a}),n.bannerTimeOut=setTimeout(function(){n.setState({banner:{show:!1,msgToUser:"",color:null}})},3e3)},n.clickedRegister=function(){var e=Object(P.a)(B.a.mark(function e(t){var a,r;return B.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.serverUrl+"/users/register",e.next=3,A(t,a);case 3:(r=e.sent).info===O.MISSING_INPUT&&n.displayLightBox(r.info,O.FALSE),r.info===O.PASSWORD_LENGTH&&n.displayLightBox(r.info,O.FALSE),r.info===O.PASSWORD_MATCH&&n.displayLightBox(r.info,O.FALSE),r.info===O.USER_EXITS&&n.displayLightBox(r.info,O.FALSE),r.info===O.YOURE_IN&&n.displayLightBox(r.info,"1");case 9:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.state={banner:{show:!1,msgToUser:"",color:""}},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentWillUnmount",value:function(){clearTimeout(this.bannerTimeOut)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"divRegister"},r.a.createElement(h.b,{className:"cardRegsiter"},r.a.createElement(h.c,null,r.a.createElement("form",null,r.a.createElement("p",{className:"h4 text-center py-4"},"Sign up"),r.a.createElement("div",{className:"grey-text"},r.a.createElement(h.h,{label:"Your name",icon:"user",group:!0,type:"text",validate:!0,error:"wrong",success:"right"}),r.a.createElement(h.h,{ref:this.pass,label:"Your password",icon:"envelope",group:!0,type:"email",validate:!0,error:"wrong",success:"right"}),r.a.createElement(h.h,{ref:this.rePass,label:"Confirm Your password",icon:"lock",group:!0,type:"password",validate:!0})),r.a.createElement("div",{className:"text-center py-4 mt-3"},r.a.createElement(h.a,{onClick:function(){var t={name:e.name.current.state.innerValue,pass:e.pass.current.state.innerValue,rePass:e.rePass.current.state.innerValue};e.clickedRegister(t)},type:"button",gradient:"blue",rounded:!0,className:"btn-block z-depth-1a"},"Sign in"))))),r.a.createElement(f,{allinfo:this.state.banner}))}}]),t}(a.Component),G=(n(138),n(150)),D=n(151),H=n(152),Y=n(153),F=n(154),z=n(155),J=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).toggle=n.toggle.bind(Object(g.a)(n)),n.state={isOpen:!1},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=this.props,t=e.ifUserLoggedIn,n=e.userLoggedOut,a=e.openModalBtn,s=e.usersLength,o=t?"Logout":"Login";return r.a.createElement("div",null,r.a.createElement(G.a,{color:"light",light:!0,expand:"md"},r.a.createElement(D.a,{href:"/"},"Chat App"),t?r.a.createElement("div",{className:"container2"},r.a.createElement("div",{onClick:a,className:"btn btn-two"},r.a.createElement("span",null,s," Onlinsse Users"))):[],r.a.createElement(H.a,{onClick:this.toggle}),r.a.createElement(Y.a,{isOpen:this.state.isOpen,navbar:!0},r.a.createElement(F.a,{className:"ml-auto",navbar:!0},r.a.createElement("div",{className:"allItems"},r.a.createElement(z.a,null,r.a.createElement(C.b,{to:"/",onClick:n},r.a.createElement(h.g,{icon:"arrow-circle-right mdb-gallery-view-icon"}),o)),r.a.createElement(z.a,null,r.a.createElement(C.b,{to:"/Register/"},r.a.createElement(h.g,{icon:"child mdb-gallery-view-icon"}),"Register")))))))}}]),t}(a.Component),V=function(e){function t(e){var n,a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).endpoint=window.location.origin,a.openModalBtn=function(){a.setState({modal:!0})},a.userLoggedIn=function(e){localStorage.setItem("userdetails",e),localStorage.setItem("ifOnline",!0),a.setState({ifUserLoggedIn:!0,name:e,numOfUers:a.state.numOfUers++})},a.userLoggedOut=function(){a.state.socket.emit("log out",{user:a.state.name}),localStorage.removeItem("userdetails"),localStorage.removeItem("ifOnline"),a.setState({ifUserLoggedIn:!1,name:""})},a.state=(n={name:"",socket:"",modal:!1,ifUserLoggedIn:localStorage.getItem("ifOnline")||!1,box:{show:!1,msgToUser:""}},Object(i.a)(n,"socket",""),Object(i.a)(n,"numOfUers",0),n),a.toggle=a.toggle.bind(Object(g.a)(a)),a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=b()(this.endpoint);t.on("get users",function(t){e.setState({numOfUers:t.length})}),this.setState({socket:t})}},{key:"toggle",value:function(){this.setState({modal:!1})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(C.a,null,r.a.createElement(J,{ifUserLoggedIn:this.state.ifUserLoggedIn,userLoggedOut:this.userLoggedOut,openModalBtn:this.openModalBtn,usersLength:this.state.numOfUers}),r.a.createElement(M.b,{path:"/Register/",exact:!0,render:function(){return r.a.createElement(W,{clickedRegister:e.clickedRegister,allinfo:e.state.box})}}),r.a.createElement(M.b,{path:"/Chat/",exact:!0,render:function(){return r.a.createElement(T,{displayLength:e.displayLength,openModal:e.state.modal,toggle:function(){return e.toggle()}})}}),r.a.createElement(M.b,{path:"/",exact:!0,render:function(){return e.state.ifUserLoggedIn?r.a.createElement(M.a,{to:"/Chat/"}):r.a.createElement(p,{userLoggedIn:e.userLoggedIn})}})))}}]),t}(a.Component);var X=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(V,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(139),n(140),n(141);o.a.render(r.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},19:function(e,t){e.exports={MSG:"MSG",LOGIN:"LOGIN",MISSING_INPUT:"misssing inputs",PASSWORD_LENGTH:"Password must be 8 digits",PASSWORD_MATCH:"Password doesnt match",USER_EXITS:"user exits",YOURE_IN:"Youre In",FALSE:"0"}},81:function(e,t,n){e.exports=n(142)},86:function(e,t,n){},87:function(e,t,n){},95:function(e,t,n){},96:function(e,t,n){}},[[81,1,2]]]);
//# sourceMappingURL=main.9d7933aa.chunk.js.map