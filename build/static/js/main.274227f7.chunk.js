(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{167:function(e,t,a){e.exports=a(368)},172:function(e,t,a){},173:function(e,t,a){},366:function(e,t,a){},367:function(e,t,a){},368:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),c=a(47),i=a.n(c),o=(a(172),a(173),a(48)),s=a(49),u=a(54),l=a(50),f=a(55),h=a(34),p=a(18),d=a(83),m=a.n(d),y=(a(366),function(e){function t(){return Object(o.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return n.a.createElement("header",{className:"header"},n.a.createElement("h1",{className:"header__title"},"\u90fd\u9053\u5e9c\u770c\u5225\u306e\u7dcf\u4eba\u53e3\u63a8\u79fb\u30b0\u30e9\u30d5"))}}]),t}(r.Component)),E=(a(367),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).defultChartData=[{year:1960},{year:1965},{year:1970},{year:1975},{year:1980},{year:1985},{year:1990},{year:1995},{year:2e3},{year:2005},{year:2010},{year:2015},{year:2020},{year:2025},{year:2030},{year:2035},{year:2040},{year:2045}],a.clickHandler=a.clickHandler.bind(Object(h.a)(Object(h.a)(a))),a.state={prefectures:null,chartData:a.defultChartData},a}return Object(f.a)(t,e),Object(s.a)(t,[{key:"getPrefectures",value:function(){var e=this;m.a.get("https://opendata.resas-portal.go.jp/api/v1/prefectures").set("X-API-KEY","MCOgUhZu1Cc7EZsoRYBmpfTRlSmUieEp66tI3xnx").set("Accept","application/json").then(function(t){var a=t.body.result.map(function(e){return e.isChecked=!1,e});e.setState({prefectures:a})},function(e){console.error(e)})}},{key:"getChartData",value:function(e){var t=this;return new Promise(function(a,r){m.a.get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear").query({prefCode:e,cityCode:"-"}).set("X-API-KEY","MCOgUhZu1Cc7EZsoRYBmpfTRlSmUieEp66tI3xnx").set("Accept","application/json").then(function(r){r.body.result.data[0].id=e,r.body.result.data[0].idName=t.state.prefectures[e-1].prefName,a(r.body.result.data[0])},function(e){r(e)})})}},{key:"checkedData",value:function(){var e=[],t=[],a=this,r=0;return a.state.prefectures.forEach(function(t){t.isChecked&&e.push(t)}),new Promise(function(n,c){0===e.length?n(t):e.forEach(function(c,i){a.getChartData(c.prefCode).then(function(a){t.push(a),++r===e.length&&n(t)})})})}},{key:"formatData",value:function(e){var t=[];return 0===e.length?this.defultChartData:(e[0].data.forEach(function(e){var a={};a.year=e.year,t.push(a)}),e.forEach(function(e){var a=e.idName;e.data.forEach(function(e){t.forEach(function(t){t.year===e.year&&(t[a]=e.value)})})}),t)}},{key:"componentWillMount",value:function(){this.getPrefectures()}},{key:"clickHandler",value:function(e){var t=this,a=e.currentTarget.getAttribute("id"),r=this.state.prefectures.slice();r.forEach(function(e){String(e.prefCode)===a&&(e.isChecked=!e.isChecked)}),this.checkedData().then(function(e){var a=t.formatData(e);t.setState({prefectures:r,chartData:a})})}},{key:"render",value:function(){var e=this;if(!this.state.prefectures)return n.a.createElement("div",{style:{textAlign:"center",fontSize:"4rem",marginTop:"40vh"}},"\u8aad\u307f\u8fbc\u307f\u4e2d\u30fb\u30fb\u30fb");var t=this.state.prefectures.map(function(t){return n.a.createElement("li",{key:t.prefCode},n.a.createElement("label",{htmlFor:t.prefCode},n.a.createElement("input",{type:"checkbox",id:t.prefCode,checked:t.isChecked,onChange:e.clickHandler}),t.prefName))}),a=this.state.prefectures.map(function(e){return n.a.createElement(p.b,{key:e.prefName,dataKey:e.prefName,stroke:"#2cc2e4"})}),r=n.a.createElement("div",{style:{width:"100%",height:"30vw",paddingLeft:100}},n.a.createElement(p.d,null,n.a.createElement(p.c,{data:this.state.chartData,margin:{top:5,right:20,bottom:5,left:0}},n.a.createElement(p.a,{strokeDasharray:"3 3"}),n.a.createElement(p.f,{dataKey:"year",ticks:[1965,1975,1985,1995,2005,2015,2025,2035,2045],unit:"\u5e74"}),n.a.createElement(p.g,{ticks:[1e6,2e6,3e6,4e6,5e6,6e6,7e6,8e6,9e6,1e7,11e6,12e6,13e6,14e6,15e6],unit:"\u4eba"}),n.a.createElement(p.e,null),a)));return n.a.createElement("div",{className:"App"},n.a.createElement(y,null),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col"},n.a.createElement("ul",{className:"prefectures"},t)),n.a.createElement("div",{className:"col"},r)))}}]),t}(r.Component));i.a.render(n.a.createElement(E,null),document.getElementById("root"))}},[[167,1,2]]]);
//# sourceMappingURL=main.274227f7.chunk.js.map