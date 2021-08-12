(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{83:function(e,o,t){"use strict";t.r(o),t.d(o,"frontMatter",(function(){return c})),t.d(o,"metadata",(function(){return l})),t.d(o,"toc",(function(){return d})),t.d(o,"default",(function(){return u}));var n=t(3),i=t(7),r=(t(0),t(104)),a=t(105),s=["components"],c={id:"godwoken",title:"Godwoken",sidebar_label:"Godwoken"},l={unversionedId:"introduction/godwoken",id:"introduction/godwoken",isDocsHomePage:!1,title:"Godwoken",description:"Godwoken is a layer 2 rollup framework of Nervos CKB. It provides scaling capabilities for cross-chain communication, and an account based programming model for CKB.",source:"@site/docs\\introduction\\overview.md",slug:"/introduction/godwoken",permalink:"/ckb_sdk/docs/introduction/godwoken",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/introduction/overview.md",version:"current",sidebar_label:"Godwoken",sidebar:"sidebar2",previous:{title:"ckb-sdk-java",permalink:"/ckb_sdk/docs/introduction/overview_java"}},d=[{value:"How Does It Work?",id:"how-does-it-work",children:[]},{value:"Use Godwoken",id:"use-godwoken",children:[{value:"Prerequisites",id:"prerequisites",children:[]}]}],b={toc:d};function u(e){var o=e.components,t=Object(i.a)(e,s);return Object(r.b)("wrapper",Object(n.a)({},b,t,{components:o,mdxType:"MDXLayout"}),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Godwoken")," is a layer 2 rollup framework of Nervos CKB. It provides scaling capabilities for cross-chain communication, and an account based programming model for CKB."),Object(r.b)("p",null,"Now Godwoken supports optimistic rollups. The always success script can be used to issue new blocks. Limited ",Object(r.b)("inlineCode",{parentName:"p"},"block_producers")," can issue new layer 2 blocks by using ",Object(r.b)("a",{parentName:"p",href:"https://github.com/nervosnetwork/clerkb"},"Proof of Authority"),". "),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Optimistic rollup is leveraged today, however Godwoken could also be extended for zk rollup in the future."),Object(r.b)("li",{parentName:"ul"},"Depending on different scenarios, one can either use always success script so anyone shall be able to issue new blocks, or ",Object(r.b)("a",{parentName:"li",href:"https://github.com/nervosnetwork/clerkb"},"Proof of Authority")," solution so limited ",Object(r.b)("inlineCode",{parentName:"li"},"block_producers")," can issue new layer 2 blocks. In the future we also plan for a Proof of Stake solution, where we can relax the limitations of PoA."),Object(r.b)("li",{parentName:"ul"},"Right now ",Object(r.b)("a",{parentName:"li",href:"https://github.com/nervosnetwork/godwoken-polyjuice"},"polyjuice")," is integrated to godwoken for an Ethereum compatible solution. However, godwoken at its core only provides a flexible ",Object(r.b)("a",{parentName:"li",href:"https://github.com/nervosnetwork/godwoken-scripts/blob/master/c/gw_def.h"},"programming interface"),". A result of this, is that any account model based blockchain model can be integrated with godwoken this way. Similar to polyjuice on godwoken, we could also have EOS on godwoken, Libra on godwoken, etc.")),Object(r.b)("img",{src:Object(a.a)("img/godwoken.png"),width:"70%"}),Object(r.b)("h2",{id:"how-does-it-work"},"How Does It Work?"),Object(r.b)("p",null,"Godwoken works by using ",Object(r.b)("strong",{parentName:"p"},"aggregator")," nodes. The aggregator nodes are used to:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},"Collect specially designed layer 2 transactions."),Object(r.b)("li",{parentName:"ol"},"Pack the special transactions into CKB transactions that can also be considered as layer 2 blocks."),Object(r.b)("li",{parentName:"ol"},"Submit the CKB transactions to layer 1 for acceptance. ")),Object(r.b)("h2",{id:"use-godwoken"},"Use Godwoken"),Object(r.b)("h3",{id:"prerequisites"},"Prerequisites"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"A CKB node is installed and started running."),Object(r.b)("li",{parentName:"ul"},"A CKB miner is started."),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",{parentName:"li",href:"https://github.com/nervosnetwork/capsule"},"Capsule")," is installed.")))}u.isMDXComponent=!0}}]);