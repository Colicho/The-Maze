(this["webpackJsonpthe-maze"]=this["webpackJsonpthe-maze"]||[]).push([[0],{13:function(t,e,i){},14:function(t,e,i){},15:function(t,e,i){"use strict";i.r(e);var s=i(0),n=i(1),h=i.n(n),r=i(5),a=i.n(r),d=(i(13),i(2)),u=i(3),c=i(7),o=i(6);i.p,i(14);var l=function(){return Object(s.jsx)("div",{className:"he",children:Object(s.jsx)("h2",{children:"Test"})})},v=function(){function t(e){Object(d.a)(this,t),this.node=e,this.connections=[],this.distance=9007199254740992,this.visited=!1,this.previousNode=null,this.weight=1}return Object(u.a)(t,[{key:"addConnection",value:function(t){this.connections.push(t)}},{key:"setDistance",value:function(t){this.distance=t}},{key:"setPreviousNode",value:function(t){this.previousNode=t}},{key:"setVisited",value:function(){this.visited=!0}}]),t}(),f=function(){function t(){Object(d.a)(this,t),this.vertexDict={},this.vertices=0}return Object(u.a)(t,[{key:"addVertex",value:function(t){this.vertices++;var e=new v(t);this.vertexDict[t]=e}},{key:"addEdge",value:function(t,e){t in this.vertexDict||this.addVertex(t),e in this.vertexDict||this.addVertex(e),this.vertexDict[t].addConnection(this.vertexDict[e]),this.vertexDict[e].addConnection(this.vertexDict[t])}}]),t}(),x=function(){function t(e,i){Object(d.a)(this,t),this.matrix=[],this.width=e+2,this.height=i+2,this.unvisitedNodes=[];for(var s=0;s<this.height;s++){this.matrix.push([]);for(var n=0;n<this.width;n++){var h=Math.random();0===s||s===this.height-1||0===n||n===this.width-1?this.matrix[s].push("1"):h>=.5?this.matrix[s].push("2"):(this.matrix[s].push("O"),0!==s&&s!==this.height-1&&0!==n&&n!==this.width-1&&this.unvisitedNodes.push(s*e-e+n))}}this.unvisitedNodes.includes(1)||this.unvisitedNodes.push(1),this.unvisitedNodes.includes(e*i)||this.unvisitedNodes.push(e*i),this.matrix[1][1]="#",this.matrix[this.height-2][this.width-2]="E"}return Object(u.a)(t,[{key:"getMaze",value:function(t){for(var e=0;e<t.length;e++)for(var i=0;i<t[e].length;i++){var s=document.createElement("div");switch(t[e][i]){case"1":s.className="squareB";break;case"2":s.className="squareW";break;case"O":s.className="squareG";break;case"#":s.className="squareP";break;case"E":s.className="squareE";break;case"@":s.className="squareO"}document.getElementById("board").appendChild(s)}}},{key:"getGame",value:function(){if(!1===this.bestRoute())return!1;this.getMaze(this.matrix)}},{key:"bestRoute",value:function(){for(var t=new f,e=0;e<this.unvisitedNodes.length;e++)t.addVertex(this.unvisitedNodes[e]);for(var i=[],s=0;s<this.unvisitedNodes.length;s++){this.index=-1;var n=Math.floor(this.unvisitedNodes[s]/(this.width-2));for(i=this.unvisitedNodes[s]%(this.width-2)===0?[n,this.unvisitedNodes[s]-(this.width-2)*(n-1)]:[n+1,this.unvisitedNodes[s]-n*(this.width-2)];;){var h=this.validInput(i,null,"bestRoute");if(!h)break;t.addEdge(this.width*(i[0]-1)+i[1]-2*i[0]+2,this.width*(h[0]-1)+h[1]-2*h[0]+2)}}return this.djikstra(t,t.vertexDict[1])}},{key:"djikstra",value:function(t,e){e.setDistance(0);var i=e;i.setPreviousNode(i);var s=[];for(s.push(i);9007199254740992===t.vertexDict[(this.width-2)*(this.height-2)].distance;){i=s[0];for(var n=0;n<i.connections.length;n++)(null==i.connections[n].previousNode||i.distance+i.connections[n].connections[i]<i.connections[n].distance)&&(s.push(i.connections[n]),i.connections[n].setPreviousNode(i),i.connections[n].setDistance(i.distance+i.connections[n].connections[i]));if(i.setVisited(),s.shift(),0===s.length)break}return 9007199254740992!==t.vertexDict[(this.width-2)*(this.height-2)].distance&&t.vertexDict[(this.width-2)*(this.height-2)].distanceboard}},{key:"getValidMoves",value:function(){var t=["w","a","s","d","wa","wd","as","sd"];return this.index++,this.index!==t.length&&t[this.index]}},{key:"validInput",value:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,n=["w","a","s","d","wa","aw","wd","dw","as","sa","sd","ds","b"];;){if(null!=i&&!1===(s=this.getValidMoves()))return!1;if(n.includes(s))if("w"===s){if(1!==t[0]&&"2"!==this.matrix[t[0]-1][t[1]])return null!=e&&e.push([t[0]-1,t[1]]),[t[0]-1,t[1]]}else if("a"===s){if(1!==t[1]&&"2"!==this.matrix[t[0]][t[1]-1])return null!=e&&e.push([t[0],t[1]-1]),[t[0],t[1]-1]}else if("s"===s){if(t[0]!==this.height-2&&"2"!==this.matrix[t[0]+1][t[1]])return null!=e&&e.push([t[0]+1,t[1]]),[t[0]+1,t[1]]}else if("d"===s){if(t[1]!==this.width-2&&"2"!==this.matrix[t[0]][t[1]+1])return null!=e&&e.push([t[0],t[1]+1]),[t[0],t[1]+1]}else if("wd"===s||"dw"===s){if(1!==t[0]&&t[1]!==this.width-2&&"2"!==this.matrix[t[0]-1][t[1]+1])return null!=e&&e.push([t[0]-1,t[1]+1]),[t[0]-1,t[1]+1]}else if("wa"===s||"aw"===s){if(1!==t[0]&&1!==t[1]&&"2"!==this.matrix[t[0]-1][t[1]-1])return null!=e&&e.push([t[0]-1,t[1]-1]),[t[0]-1,t[1]-1]}else if("as"===s||"sa"===s){if(1!==t[1]&&t[0]!==this.height-2&&"2"!==this.matrix[t[0]+1][t[1]-1])return null!=e&&e.push([t[0]+1,t[1]-1]),[t[0]+1,t[1]-1]}else if("sd"===s||"ds"===s){if(t[0]!==this.height-2&&t[1]!==this.width-2&&"2"!==this.matrix[t[0]+1][t[1]+1])return null!=e&&e.push([t[0]+1,t[1]+1]),[t[0]+1,t[1]+1]}else if("b"===s&&e)return this.matrix[t[0]][t[1]]=0,e.pop(),e?e[-1]:[1,1]}}}]),t}();var b=function t(){for(var e=document.getElementById("board");e.firstChild;)e.removeChild(e.firstChild);if(!1===new x(8,8).getGame())return t()};var m=function(){return Object(s.jsxs)("div",{className:"game",children:[Object(s.jsx)("div",{id:"board"}),Object(s.jsx)("button",{onClick:b,children:"Begin"})]})};var g=function(){return Object(s.jsx)("div",{children:"test"})},p=function(t){Object(c.a)(i,t);var e=Object(o.a)(i);function i(){return Object(d.a)(this,i),e.call(this)}return Object(u.a)(i,[{key:"render",value:function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)("noscript",{children:"Your browser doesn't support or has disabled javascripts"}),Object(s.jsx)(l,{}),Object(s.jsx)(m,{}),Object(s.jsx)(g,{})]})}}]),i}(h.a.Component),w=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,16)).then((function(e){var i=e.getCLS,s=e.getFID,n=e.getFCP,h=e.getLCP,r=e.getTTFB;i(t),s(t),n(t),h(t),r(t)}))};a.a.render(Object(s.jsx)(p,{}),document.getElementById("root")),w()}},[[15,1,2]]]);
//# sourceMappingURL=main.8f0b4afd.chunk.js.map