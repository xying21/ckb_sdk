---
id: quickstart
title: ckb-sdk-go
---
This guide will walk you through setting up a Go project to develop DApps with ckb-sdk-go. You can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. 

## System Requirements

- Operating System:  All major platforms including Linux, Windows, and macOS.
- CKB node
- Go ( version 1.11.5 or higher)

## Install and Run a CKB Node on DEV Chain

For more information, see  [Install a CKB Node on DEV Chain by Using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy).

## Get CKB Capacity for Test Accounts

There are several test accounts that can be used for testing purpose in this tutorial.

:::note

Do **not** use these private keys, addresses and args elsewhere.

:::

```
Alice {
PrivateKey: "0x08730a367dfabcadb805d69e0e613558d5160eb8bab9d6e326980c2c46a05db2",
Lock args: "0x6407c2ef9bd96e8e14ac4cd15d860e9331802172",
Address: "ckt1qyqxgp7za7dajm5wzjkye52asc8fxvvqy9eqlhp82g",
}
Bob {
Private Key: "0x670ac6ac1ce8004b4220f0fb024179461f11989ff4d446816f78813b80b9c696",
Lock Args: "0xecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99",
Address: "ckt1qyqwe03shn6udvhjmrkzm53f53sr5l3qdwvsytj4hs"
}
Charlie {
Private Key: "0xe79f3207ea4980b7fed79956d5934249ceac4751a4fae01a0f7c4a96884bc4e3",
Lock Args: "0x36c329ed630d6ce750712a477543672adab57f4c",
Address: "ckt1qyqrdsefa43s6m882pcj53m4gdnj4k440axqswmu83"
}
```

To get CKB capacity for Alice on DEV chain:

1. Assign the lock args of Alice to **Block Assembler Lock Arg** in the Edit Chain form on Tippy explorer and save the changes.
2. Restart the CKB node and start the CKB miner on the Tippy dashboard.

## Install Go

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
<TabItem value="ubuntu"><ol><li><p>Execute the following command to install Go language executables:</p>

```shell
$ sudo apt install golang
```

</li><li><p>Verify that you've installed Go by opening a command prompt and typing the following command:</p>

```shell
$ go version
go version go1.13.8 linux/amd64
```

</li></ol></TabItem>

<TabItem value="macos"><ol><li><p>Install the Xcode command line tool.</p>

<p>Skip this step if Xcode has been installed.</p>

<p>Execute the following command to install Xcode:</p>

```shell
$ xcode-select --install
```

<p>Verify the installation of Xcode:</p>

```shell
$ xcode-select -p
```

</li><li><p>Install Homebrew.</p>

<p>Skip this step if Homebrew has been installed.</p>

You will be required to enter your password that is the one that you use to unlock your Mac when you start it up. After you enter your password, the installation will start.

```shell
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

</li><li><p>Update and install Go.</p>

```shell
$ brew update&& brew install golang
```

</li><li><p>Verify that you have installed Go by opening a command prompt and typing the following command:</p>

```shell
$ go version
go version go1.13.8 linux/amd64
```

</li></ol></TabItem>

<TabItem value="windows"><ol><li><p>Download the installer file from the <a href="https://golang.org/dl/">Downloads</a> page for your system.</p></li><li><p>Open the MSI file you downloaded and follow the prompts to install Go.</p>

By default, the installer will install Go to `Program Files` or `Program Files (x86)`. You can change the location as needed. After installing, you will need to close and reopen any open command prompts so that changes to the environment made by the installer are reflected at the command prompt.

</li><li><p>Verify that you've installed Go in a command prompt window with the following command:</p>

```shell
$ go version
go version go1.16.4 windows/amd64
```

</li></ol></TabItem>
</Tabs>

## Create a Go Project

<Tabs
  defaultValue="ubuntu"
  values={[
    {label: 'Ubuntu 20.04', value: 'ubuntu'},
    {label: 'macOS', value: 'macos'},
    {label: 'Windows', value: 'windows'},
  ]}>
<TabItem value="ubuntu"><ol><li><p>Open a command prompt and cd to your home directory.</p>

```shell
$ cd
```

</li><li><p>Create a directory for the Go source code.</p>

```shell
$ mkdir mydapp
$ cd mydapp
```

</li></ol></TabItem>

<TabItem value="macos"><ol><li><p>Open a command prompt and cd to your home directory.</p>

```shell
$ cd
```

</li><li><p>Create a directory for the Go source code.</p>

```shell
$ mkdir mydapp
$ cd mydapp
```

</li></ol></TabItem>

<TabItem value="windows"><ol><li><p>Open a command prompt and cd to a directory where to create the project.</p>

```shell
> cd D:/projects
```

</li><li><p>Create a directory for the Go source code.</p>

```shell
> mkdir mydapp
> cd mydapp
```

</li></ol></TabItem>
</Tabs>

## Enable Dependency Tracking for the Code

When your code imports packages contained in other modules, you manage those dependencies through your code's own module. That module is defined by a go.mod file that tracks the modules that provide those packages. That go.mod file stays with your code, including in your source code repository.

To enable dependency tracking for your code by creating a go.mod file, run the [`go mod init` command](https://golang.org/ref/mod#go-mod-init), giving it the name of the module your code will be in. The name is the module's module path. In most cases, this will be the repository location where your source code will be kept, such as `github.com/mymodule`. If you plan to publish your module for others to use, the module path *must* be a location from which Go tools can download your module.

For the purposes of this tutorial, just use `github.com/mydapp`.

```shell
$ go mod init github.com/mydapp
go: creating new go.mod: module github.com/mydapp
```

## Create a <code>hello.go</code> File

Paste the following code into the file and save the file.

```go title="mydapp/hello.go"
package main

import (
	"context"
	"encoding/hex"
	"fmt"
	"log"

	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
	"github.com/nervosnetwork/ckb-sdk-go/transaction"
	"github.com/nervosnetwork/ckb-sdk-go/types"
	"github.com/nervosnetwork/ckb-sdk-go/utils"
)

func main() {
	client, err := rpc.Dial("http://127.0.0.1:8114")
	if err != nil {
		log.Fatalf("create rpc client error: %v", err)
	}
	// Convert the private key of Alice to an ecdsa private key.
	key, err := secp256k1.HexToKey("08730a367dfabcadb805d69e0e613558d5160eb8bab9d6e326980c2c46a05db2")
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}
    
	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}
	//Decode the lock args of Bob to bytes. Bob is the receiver.
	toAddress, _ := hex.DecodeString("ecbe30bcf5c6b2f2d8ec2dd229a4603a7e206b99")
	//Initialize the version, HeaderDeps, CellDeps of the transaction.
	tx := &types.Transaction{
		Version:    0,
		HeaderDeps: []types.Hash{},
		CellDeps: []*types.CellDep{
				{
					OutPoint: &types.OutPoint{
						//The dependent transaction Hash is from the SECP256K1_BLAKE160 script of the DEV chain.
                        TxHash: types.HexToHash("0x6ddc6718014b7ad50121b95bb25ff61b4445b6c57ade514e7d08447e025f9f30"),
						Index:  0,
					},
				DepType:  "dep_group",
				},
		},
	}
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 20000000000,
        //The lock script of Bob. 
		Lock: &types.Script{
			CodeHash: types.HexToHash("0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"),
			HashType: types.HashTypeType,
            Args: toAddress,
		},
	})
    //Set the address of Alice as the change address.
	changeAddress, _ := hex.DecodeString("6407c2ef9bd96e8e14ac4cd15d860e9331802172")
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 2007786346416,
        //The lock script of Alice.
		Lock: &types.Script{
			CodeHash: types.HexToHash("0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"),
			HashType: types.HashTypeType,
			Args:     changeAddress, 
		},
	})
	tx.OutputsData = [][]byte{{}, {}}

	group, witnessArgs, err := transaction.AddInputsForTransaction(tx, []*types.CellInput{
		{
            Since: 0,
            //Convert the previous transaction hash to bytes.
            //The previous transaction provides the input cell.
            PreviousOutput: &types.OutPoint{
                TxHash: types.HexToHash("0xace92ad1595ab435a13c095160b23ad8ea0dbb7cf7b8f7b7ef3540ec34372f94"),
                Index: 0,
            },
        },
	})

	if err != nil {
		log.Fatalf("add inputs to transaction error: %v", err)
	}

	err = transaction.SingleSignTransaction(tx, group, witnessArgs, key)
	if err != nil {
		log.Fatalf("sign transaction error: %v", err)
	}

	hash, err := client.SendTransaction(context.Background(), tx)
	if err != nil {
		log.Fatalf("send transaction error: %v", err)
	}

	fmt.Println(hash.String())
}
```

## Add New Modules for ckb-sdk-go.

```shell
$ go mod tidy
```

<details><summary>OUTPUT</summary>
<p>



```shell
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/utils
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/transaction
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/types
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/rpc
go: downloading github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1 in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/rpc in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/transaction in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/types in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/utils in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: downloading github.com/ethereum/go-ethereum v1.9.14
go: downloading github.com/golang/mock v1.3.1
go: downloading github.com/stretchr/testify v1.4.0
go: downloading github.com/pkg/errors v0.8.1
go: downloading github.com/minio/blake2b-simd v0.0.0-20160723061019-3f5f724cb5b1
go: downloading github.com/davecgh/go-spew v1.1.1
go: downloading github.com/pmezard/go-difflib v1.0.0
go: downloading gopkg.in/yaml.v2 v2.2.2
go: downloading github.com/stretchr/objx v0.1.0
go: downloading golang.org/x/crypto v0.0.0-20200311171314-f7b00557c8c4
go: downloading github.com/deckarep/golang-set v0.0.0-20180603214616-504e848d77ea
go: downloading github.com/gorilla/websocket v1.4.1-0.20190629185528-ae1634f6a989
go: downloading gopkg.in/natefinch/npipe.v2 v2.0.0-20160621034901-c1b8fa8bdcce
go: downloading github.com/go-stack/stack v1.8.0
go: downloading github.com/elastic/gosigar v0.8.1-0.20180330100440-37f05ff46ffa
go: downloading github.com/aristanetworks/goarista v0.0.0-20170210015632-ea17b1a17847
go: downloading github.com/StackExchange/wmi v0.0.0-20180116203802-5d049714c4a6
go: downloading golang.org/x/sys v0.0.0-20200323222414-85ca7c5b95cd
go: downloading github.com/go-ole/go-ole v1.2.1
```

</p>
</details>

If you encounter connection issues when adding the modules, try to resolve the issue by setting a global proxy for Go modules.

```shell
# Set the GOPROXY environment variable
$ export GOPROXY=https://goproxy.io,direct
```



<details><summary>OUTPUT</summary>
<p>


```shell
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/utils
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/transaction
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/types
go: finding module for package github.com/nervosnetwork/ckb-sdk-go/rpc
go: downloading github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1 in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/rpc in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/transaction in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/types in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: found github.com/nervosnetwork/ckb-sdk-go/utils in github.com/nervosnetwork/ckb-sdk-go v0.3.0
go: downloading github.com/ethereum/go-ethereum v1.9.14
go: downloading github.com/golang/mock v1.3.1
go: downloading github.com/stretchr/testify v1.4.0
go: downloading github.com/pkg/errors v0.8.1
go: downloading github.com/minio/blake2b-simd v0.0.0-20160723061019-3f5f724cb5b1
go: downloading github.com/davecgh/go-spew v1.1.1
go: downloading github.com/pmezard/go-difflib v1.0.0
go: downloading gopkg.in/yaml.v2 v2.2.2
go: downloading github.com/stretchr/objx v0.1.0
go: downloading golang.org/x/crypto v0.0.0-20200311171314-f7b00557c8c4
go: downloading github.com/deckarep/golang-set v0.0.0-20180603214616-504e848d77ea
go: downloading github.com/gorilla/websocket v1.4.1-0.20190629185528-ae1634f6a989
go: downloading gopkg.in/natefinch/npipe.v2 v2.0.0-20160621034901-c1b8fa8bdcce
go: downloading github.com/go-stack/stack v1.8.0
go: downloading github.com/elastic/gosigar v0.8.1-0.20180330100440-37f05ff46ffa
go: downloading github.com/aristanetworks/goarista v0.0.0-20170210015632-ea17b1a17847
go: downloading github.com/StackExchange/wmi v0.0.0-20180116203802-5d049714c4a6
go: downloading golang.org/x/sys v0.0.0-20200323222414-85ca7c5b95cd
go: downloading github.com/go-ole/go-ole v1.2.1
```

</p>
</details>

## Run the Code

Run the code to send the transaction with one single input.

```shell
$ go run .
```



<details><summary>OUTPUT</summary>
<p>


```shell
0x2b46a855fafe5e3023a05eef9a81beb8fcefd145dc9e65f696d253257cf9b6e4
```

</p>
</details>

The 200 CKB will be transferred from Alice to Bob when the transaction is committed.

:::note

The CKB miner must be running to commit the transaction.

:::

## Write More Code

With this quick introduction, you got a Go project created and performed a transaction with a single input. To write some more code, take a look at the .



