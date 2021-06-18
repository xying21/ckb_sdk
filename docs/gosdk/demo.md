---
id: demo
title: Demo
---
This guide will help you get your system set up for building DApps with Lumos. If you already have everything installed, read the other guides and walk through the examples to learn the usage of Lumos.

## System Requirements

- Operating System:  CKB DApps can be developed upon Lumos on all major platforms including Linux, Windows, and macOS.
- JavaScript runtime environment: [Node.js](https://nodejs.org/en/download/) LTS Version (>=12)
- Development tools to build native addons: GCC and make
- JavaScript package manager: Yarn or npm

## Install Node.js

Node.js is the runtime environment that must be installed on the system before using Lumos. The following sections explain the easiest way to install the Long Term Supported (LTS) version of Node.js on Ubuntu Linux 20.04, macOS, and Windows 10.

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS and Windows 10', value: 'macoswin'},
  ]}>
<TabItem value="ubuntu"><p>Install Node.js with Apt by Using a NodeSource PPA:</p><p>The following commands installs Node.js 14.x.</p>

```bash
$ curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
$ sudo apt install nodejs
```

</TabItem>
    <TabItem value="macoswin">Download and install <a href="https://nodejs.org/en/">the LTS version</a> that is Recommended For Most Users.
</TabItem>
</Tabs>

## Install Yarn

It is recommended to install Yarn through the NPM package manager, which comes bundled with [Node.js](https://nodejs.org/) when it is installed on the system.

To install Yarn through NPM:

```bash
npm install --global yarn
```

## Install Dependencies for node-gyp

Lumos depends on **node-gyp** that is a cross-platform command-line tool for compiling native addon modules for *Node*.js. 

node-gyp has a few additional system requirements and dependencies that have different installation steps on different operating systems.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows 10', value: 'windows'},
  ]}>
    <TabItem value="ubuntu">The development dependencies for Ubuntu 20.04 LTS are as follows:<ul><li>Python v3.6, v3.7, v3.8, or v3.9 (Ubuntu 20.04 and other versions of Debian Linux ship with Python 3 pre-installed)</li><li>make</li><li>A proper C/C++ compiler toolchain, like <a href="https://gcc.gnu.org/">GCC</a></li></ul><p>To install <code>GCC</code> and <code>make</code> on Ubuntu 20.04, run the following command as root or user with sudo privileges:</p>

```
$ sudo apt update
$ sudo apt install build-essential
```

</TabItem>

<TabItem value="macos">The development dependencies for macOS are as follows:<ul><li>Python v3.6, v3.7, v3.8, or v3.9</li><li><a href="https://developer.apple.com/xcode/download/">Xcode</a> and Xcode command line tools</li></ul>

</TabItem>

 <TabItem value="windows">The development dependencies for Windows are as follows:<ul><li>The current version of Python.</li><li>Visual C++ Build Environment</li></ul><b>Installation Options</b>

<ul><li>Option 1: Install all the required tools and configurations using Microsoft's windows-build-tools by running <code>npm install -g windows-build-tools -vs2019</code> from an elevated PowerShell (run as Administrator).<p><b>Note</b>: This command installs all the system dependencies without conflicting with any software already installed on the system. Depending on the build tools' version, the installation requires 3 to 8 gigabytes space to get all dependencies installed. It can take at least 30 minutes depending on the network connection.</p></li><li>Option 2: Install dependencies and configure the tools manually.<ul><li>Install Visual C++ Build Environment: Tools for Visual Studio 2019 -> <a href="https://visualstudio.microsoft.com/downloads/"><i class="feather icon-download"></i>Visual Studio 2019 Build Tools</a> (using "Visual C++ build tools" workload) and run <code>npm config set msvs_version 2019</code> in a cmd terminal.</li><li>Install the current version of Python from the <a href="https://docs.python.org/3/using/windows.html#the-microsoft-store-package">Microsoft Store package</a>, and run <code>npm config set python /path/to/python</code>.</li></ul></li></ul>

</TabItem>

</Tabs>
For more information, see the instructions of <a href="https://github.com/nodejs/node-gyp">node-gyp</a>.