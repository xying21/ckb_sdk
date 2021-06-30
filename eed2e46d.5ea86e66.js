(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{125:function(e,t,n){"use strict";var l=n(0),o=n.n(l),a=n(122),s=n(106),i=n(63),u=n.n(i),r=37,d=39;t.a=function(e){var t=e.lazy,n=e.block,i=e.defaultValue,c=e.values,b=e.groupId,m=e.className,p=Object(a.a)(),h=p.tabGroupChoices,f=p.setTabGroupChoices,j=Object(l.useState)(i),O=j[0],g=j[1],v=l.Children.toArray(e.children);if(null!=b){var y=h[b];null!=y&&y!==O&&c.some((function(e){return e.value===y}))&&g(y)}var w=function(e){g(e),null!=b&&f(b,e)},T=[];return o.a.createElement("div",null,o.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(s.a)("tabs",{"tabs--block":n},m)},c.map((function(e){var t=e.value,n=e.label;return o.a.createElement("li",{role:"tab",tabIndex:0,"aria-selected":O===t,className:Object(s.a)("tabs__item",u.a.tabItem,{"tabs__item--active":O===t}),key:t,ref:function(e){return T.push(e)},onKeyDown:function(e){!function(e,t,n){switch(n.keyCode){case d:!function(e,t){var n=e.indexOf(t)+1;e[n]?e[n].focus():e[0].focus()}(e,t);break;case r:!function(e,t){var n=e.indexOf(t)-1;e[n]?e[n].focus():e[e.length-1].focus()}(e,t)}}(T,e.target,e)},onFocus:function(){return w(t)},onClick:function(){w(t)}},n)}))),t?Object(l.cloneElement)(v.filter((function(e){return e.props.value===O}))[0],{className:"margin-vert--md"}):o.a.createElement("div",{className:"margin-vert--md"},v.map((function(e,t){return Object(l.cloneElement)(e,{key:t,hidden:e.props.value!==O})}))))}},126:function(e,t,n){"use strict";var l=n(0),o=n.n(l);t.a=function(e){var t=e.children,n=e.hidden,l=e.className;return o.a.createElement("div",{role:"tabpanel",hidden:n,className:l},t)}},99:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return d})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return m}));var l=n(3),o=n(7),a=(n(0),n(109)),s=n(125),i=n(126),u=["components"],r={id:"demo",title:"Demo"},d={unversionedId:"gosdk/demo",id:"gosdk/demo",isDocsHomePage:!1,title:"Demo",description:"This guide will help you get your system set up for building DApps with Lumos. If you already have everything installed, read the other guides and walk through the examples to learn the usage of Lumos.",source:"@site/docs\\gosdk\\demo.md",slug:"/gosdk/demo",permalink:"/ckb_sdk/docs/gosdk/demo",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/gosdk/demo.md",version:"current"},c=[{value:"System Requirements",id:"system-requirements",children:[]},{value:"Install Node.js",id:"install-nodejs",children:[]},{value:"Install Yarn",id:"install-yarn",children:[]},{value:"Install Dependencies for node-gyp",id:"install-dependencies-for-node-gyp",children:[]}],b={toc:c};function m(e){var t=e.components,n=Object(o.a)(e,u);return Object(a.b)("wrapper",Object(l.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"This guide will help you get your system set up for building DApps with Lumos. If you already have everything installed, read the other guides and walk through the examples to learn the usage of Lumos."),Object(a.b)("h2",{id:"system-requirements"},"System Requirements"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"Operating System:  CKB DApps can be developed upon Lumos on all major platforms including Linux, Windows, and macOS."),Object(a.b)("li",{parentName:"ul"},"JavaScript runtime environment: ",Object(a.b)("a",{parentName:"li",href:"https://nodejs.org/en/download/"},"Node.js")," LTS Version (>=12)"),Object(a.b)("li",{parentName:"ul"},"Development tools to build native addons: GCC and make"),Object(a.b)("li",{parentName:"ul"},"JavaScript package manager: Yarn or npm")),Object(a.b)("h2",{id:"install-nodejs"},"Install Node.js"),Object(a.b)("p",null,"Node.js is the runtime environment that must be installed on the system before using Lumos. The following sections explain the easiest way to install the Long Term Supported (LTS) version of Node.js on Ubuntu Linux 20.04, macOS, and Windows 10."),Object(a.b)(s.a,{defaultValue:"ubuntu",values:[{label:"Ubuntu 20.04",value:"ubuntu"},{label:"macOS and Windows 10",value:"macoswin"}],mdxType:"Tabs"},Object(a.b)(i.a,{value:"ubuntu",mdxType:"TabItem"},Object(a.b)("p",null,"Install Node.js with Apt by Using a NodeSource PPA:"),Object(a.b)("p",null,"The following commands installs Node.js 14.x."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-bash"},"$ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh\n$ sudo apt install nodejs\n"))),Object(a.b)(i.a,{value:"macoswin",mdxType:"TabItem"},"Download and install ",Object(a.b)("a",{href:"https://nodejs.org/en/"},"the LTS version")," that is Recommended For Most Users.")),Object(a.b)("h2",{id:"install-yarn"},"Install Yarn"),Object(a.b)("p",null,"It is recommended to install Yarn through the NPM package manager, which comes bundled with ",Object(a.b)("a",{parentName:"p",href:"https://nodejs.org/"},"Node.js")," when it is installed on the system."),Object(a.b)("p",null,"To install Yarn through NPM:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-bash"},"npm install --global yarn\n")),Object(a.b)("h2",{id:"install-dependencies-for-node-gyp"},"Install Dependencies for node-gyp"),Object(a.b)("p",null,"Lumos depends on ",Object(a.b)("strong",{parentName:"p"},"node-gyp")," that is a cross-platform command-line tool for compiling native addon modules for ",Object(a.b)("em",{parentName:"p"},"Node"),".js. "),Object(a.b)("p",null,"node-gyp has a few additional system requirements and dependencies that have different installation steps on different operating systems."),Object(a.b)(s.a,{defaultValue:"ubuntu",values:[{label:"Ubuntu 20.04",value:"ubuntu"},{label:"macOS",value:"macos"},{label:"Windows 10",value:"windows"}],mdxType:"Tabs"},Object(a.b)(i.a,{value:"ubuntu",mdxType:"TabItem"},"The development dependencies for Ubuntu 20.04 LTS are as follows:",Object(a.b)("ul",null,Object(a.b)("li",null,"Python v3.6, v3.7, v3.8, or v3.9 (Ubuntu 20.04 and other versions of Debian Linux ship with Python 3 pre-installed)"),Object(a.b)("li",null,"make"),Object(a.b)("li",null,"A proper C/C++ compiler toolchain, like ",Object(a.b)("a",{href:"https://gcc.gnu.org/"},"GCC"))),Object(a.b)("p",null,"To install ",Object(a.b)("code",null,"GCC")," and ",Object(a.b)("code",null,"make")," on Ubuntu 20.04, run the following command as root or user with sudo privileges:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre"},"$ sudo apt update\n$ sudo apt install build-essential\n"))),Object(a.b)(i.a,{value:"macos",mdxType:"TabItem"},"The development dependencies for macOS are as follows:",Object(a.b)("ul",null,Object(a.b)("li",null,"Python v3.6, v3.7, v3.8, or v3.9"),Object(a.b)("li",null,Object(a.b)("a",{href:"https://developer.apple.com/xcode/download/"},"Xcode")," and Xcode command line tools"))),Object(a.b)(i.a,{value:"windows",mdxType:"TabItem"},"The development dependencies for Windows are as follows:",Object(a.b)("ul",null,Object(a.b)("li",null,"The current version of Python."),Object(a.b)("li",null,"Visual C++ Build Environment")),Object(a.b)("b",null,"Installation Options"),Object(a.b)("ul",null,Object(a.b)("li",null,"Option 1: Install all the required tools and configurations using Microsoft's windows-build-tools by running ",Object(a.b)("code",null,"npm install -g windows-build-tools -vs2019")," from an elevated PowerShell (run as Administrator).",Object(a.b)("p",null,Object(a.b)("b",null,"Note"),": This command installs all the system dependencies without conflicting with any software already installed on the system. Depending on the build tools' version, the installation requires 3 to 8 gigabytes space to get all dependencies installed. It can take at least 30 minutes depending on the network connection.")),Object(a.b)("li",null,"Option 2: Install dependencies and configure the tools manually.",Object(a.b)("ul",null,Object(a.b)("li",null,"Install Visual C++ Build Environment: Tools for Visual Studio 2019 -> ",Object(a.b)("a",{href:"https://visualstudio.microsoft.com/downloads/"},Object(a.b)("i",{class:"feather icon-download"}),"Visual Studio 2019 Build Tools"),' (using "Visual C++ build tools" workload) and run ',Object(a.b)("code",null,"npm config set msvs_version 2019")," in a cmd terminal."),Object(a.b)("li",null,"Install the current version of Python from the ",Object(a.b)("a",{href:"https://docs.python.org/3/using/windows.html#the-microsoft-store-package"},"Microsoft Store package"),", and run ",Object(a.b)("code",null,"npm config set python /path/to/python"),".")))))),"For more information, see the instructions of ",Object(a.b)("a",{href:"https://github.com/nodejs/node-gyp"},"node-gyp"),".")}m.isMDXComponent=!0}}]);