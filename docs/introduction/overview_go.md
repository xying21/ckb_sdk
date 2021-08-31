---
id: overview_go
title: ckb-sdk-go
sidebar_label: ckb-sdk-go
---
- [Overview](#overview)
- [Features](#features)
- [Contact & Support](#contact---support)
- [Quick Start](#quick-start)
  * [System Requirements](#system-requirements)
  * [Install and Run a CKB Node on DEV Chain](#install-and-run-a-ckb-node-on-dev-chain)
  * [Get CKB Capacity for Test Accounts](#get-ckb-capacity-for-test-accounts)
  * [Install Go](#install-go)
  * [Create a Go Project](#create-a-go-project)
  * [Enable Dependency Tracking for the Code](#enable-dependency-tracking-for-the-code)
  * [Create a <code>hello.go</code> File](#create-a--code-hellogo--code--file)
  * [Add New Modules for ckb-sdk-go.](#add-new-modules-for-ckb-sdk-go)
  * [Run the Code](#run-the-code)
- [Examples](#examples)
  * [RPC Examples](#rpc-examples)
  * [Send CKB with One Single Input](#send-ckb-with-one-single-input)
  * [Send CKB with Multiple Inputs](#send-ckb-with-multiple-inputs)
  * [Send CKB with Multiple Inputs and Multisig](#send-ckb-with-multiple-inputs-and-multisig)
  * [Send CKB with Multiple Inputs and Hybirdsig](#send-ckb-with-multiple-inputs-and-hybirdsig)
  * [Collect Cells](#collect-cells)
  * [Collect Cells with Filter](#collect-cells-with-filter)
  * [Collect Cells and Filter Out Immature Cells](#collect-cells-and-filter-out-immature-cells)
  * [Create a Payment](#create-a-payment)
  * [Deposit CKB to DAO](#deposit-ckb-to-dao)
  * [Withdraw CKB from DAO (Phase 1)](#withdraw-ckb-from-dao--phase-1-)
  * [Withdraw CKB from DAO (Phase 2)](#withdraw-ckb-from-dao--phase-2-)
  * [Issue cheque Cells](#issue-cheque-cells)
  * [Claim cheque Cells](#claim-cheque-cells)
  * [Withdraw cheque Cells](#withdraw-cheque-cells)
  * [Transfer SUDT](#transfer-sudt)

## Overview

CKB Go SDK (ckb-sdk-go) encapsulates cryptographic algorithms and RPC services to support the development of applications on CKB. The knowledge of CKB Data Model (see [Nervos CKB Reference](https://docs.nervos.org/docs/reference/introduction) and [CKB RFC: CKB Data Structures](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md)) and [JSON-RPC](https://github.com/nervosnetwork/ckb/tree/develop/rpc) are crucial in developing applications by using this SDK.

The SDK uses the [NewCkbApi](https://github.com/nervosnetwork/ckb-sdk-go/blob/b7b9eff4f48fb2f3020cb31c630eea17cbc77e81/api/api.go#L231) API to support the **CKB**, **CKB indexer** and **Mercury** module starting from 0.43.1 version. For more information, see the [use_of_mercury_and_ckb_and_indexer_example.go](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/use_of_mercury_and_ckb_and_indexer_example.go) example.<!--The SDK has started supporting the CKB indexer module since the indexer module was deprecated in [ckb_v0.36.0](https://github.com/nervosnetwork/ckb/releases/tag/v0.36.0). For more information about the CKB indexer, see the [Collect Cells](https://github.com/nervosnetwork/ckb-sdk-go#5-collect-cells) example.-->

<!--For more information about the Mercury module, see the [Mercury](https://github.com/nervosnetwork/ckb-sdk-go/tree/develop/mercury/example) examples.-->

## Features

- Wallet management
- Account management
- Cryptocurrency management
- Communication with CKB networks
- Token management. For more information, see [Mercury](https://github.com/nervosnetwork/ckb-sdk-go/tree/develop/mercury).

## Contact & Support

CKB Go SDK is under continuous development. Comments on the functionality of the SDK can be posted [here](https://github.com/nervosnetwork/ckb-sdk-go/issues). Any comments and suggestions are welcome and appreciated.

## Quick Start

A project is being setup in the following steps by using ckb-sdk-go to develop an application. With this quick introduction, you will be able to create a Go project and perform a transaction with a single input. 

You can either start from scratch and work through each step, or you can bypass the basic setup process that you are already familiar with. 

### System Requirements

- Operating System:  All major platforms including Linux, Windows, and macOS.
- CKB node
- Go ( version 1.11.5 or higher)

### Install and Run a CKB Node on DEV Chain

For more information, see  [Install a CKB Node on DEV Chain by Using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy).

### Get CKB Capacity for Test Accounts

To get CKB capacity for an account on DEV chain:

1. Assign the lock args of the account to **Block Assembler Lock Arg** in the Edit Chain form on Tippy explorer and save the changes.
2. Restart the CKB node and start the CKB miner on the Tippy dashboard.

For more information about CKB accounts and capacity, see [CKB Accounts and Capacity](https://cryptape.github.io/lumos-doc/docs/reference/ckbaccount).

### Install Go

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

### Create a Go Project

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
$ mkdir myApp
$ cd myApp
```

</li></ol></TabItem>

<TabItem value="macos"><ol><li><p>Open a command prompt and cd to your home directory.</p>

```shell
$ cd
```

</li><li><p>Create a directory for the Go source code.</p>

```shell
$ mkdir myApp
$ cd myApp
```

</li></ol></TabItem>

<TabItem value="windows"><ol><li><p>Open a command prompt and cd to a directory where to create the project.</p>

```shell
> cd D:/projects
```

</li><li><p>Create a directory for the Go source code.</p>

```shell
> mkdir myApp
> cd myApp
```

</li></ol></TabItem>
</Tabs>

### Enable Dependency Tracking for the Code

When importing packages from other modules into your code, the dependencies are being managed through your code's own module.  That module is defined by a go.mod file that tracks the modules providing those packages. The go.mod file remains with your code and is included in your source code repository.

To enable dependency tracking for your code, the go.mod file would be created, run the [`go mod init`](https://golang.org/ref/mod#go-mod-init) command, and give it the name of the module your code will be in. This name is the module's module path. In most cases, this will be the repository location where your source code will be kept, such as `github.com/mymodule`. If you intend to publish your module for usage by others, the module path *must* be the location where Go tools can download your module.

For the purposes of this tutorial, just use `github.com/myApp`.

```shell
$ go mod init github.com/myApp
go: creating new go.mod: module github.com/myApp
```

### Create a <code>hello.go</code> File

Create a hello.go file, paste the following code into the file and replace the keys, lock args, transaction hash with the ones that you have.

```go title="myApp/hello.go"
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
	// Convert the private key of Alice to an ecdsa private key. Alice is the sender.
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

### Add New Modules for ckb-sdk-go.

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

### Run the Code

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

## Examples

### RPC Examples

#### CKB RPC



For more information, see [CKB RPC documentation](https://github.com/nervosnetwork/ckb/blob/develop/rpc/README.md).

#### Mercury RPC

- [Get balance](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/balance_example.go)
- [Get generic blocks](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/generic_block_example.go)
- [Get generic transactions](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/generic_transaction_example.go)
- [Query generic transactions](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/query_generic_transactions_pages_example.go)
- [Register addresses](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/register_addresses_example.go)
- [Build_a transfer_transaction](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/transfer_completion_example.go)
- [Build a transfer transaction by action](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/action_example.go)
- [Build a transfer transaction by source](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/source_example.go)
- [Build a transfer transaction by a normal address (Example 1)](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/normal/acp_example.go)
- [Build a transfer transaction by a normal address (Example 2)](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/normal/cheque_example.go)
- [Build a transfer transaction by a normal address (Example 3)](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/normal/secp256k1_example.go)
- [Build an asset account creation transaction](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/build_asset_account_creation_transaction_example.go)
- [Build an asset collection transaction](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/build_asset_collection_transaction_example.go)

For more information, see [Mercury RPC documentation](https://github.com/nervosnetwork/mercury/blob/main/core/rpc/README.md).

#### CKB Indexer RPC

- [Get tip](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/indexer/tip_example.go)
- [Get cells](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/indexer/cells_example.go)
- [Get capacity of cells](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/indexer/capacity_example.go)
- [Get transactions](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/indexer/transanction_example.go)
- [Filter](https://github.com/nervosnetwork/ckb-sdk-go/blob/develop/mercury/example/indexer/filter_example.go)

For more information, see [CKB indexer RPC documentation](https://github.com/nervosnetwork/ckb-indexer/blob/master/README.md).

### Send CKB with One Single Input

```go
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

	key, err := secp256k1.HexToKey(PRIVATE_KEY)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}

	systemScripts, err := utils.NewSystemScripts(client)
	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	toAddress, _ := hex.DecodeString("bf3e92da4911fa5f620e7b1fd27c2d0ddd0de744")
	changeScript, _ := key.Script(systemScripts)

	tx := transaction.NewSecp256k1SingleSigTx(systemScripts)
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 200000000000,
		Lock: &types.Script{
			CodeHash: types.HexToHash("0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"),
			HashType: types.HashTypeType,
			Args:     toAddress,
		},
	})
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 199999998000,
		Lock: &types.Script{
			CodeHash: types.HexToHash("0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"),
			HashType: types.HashTypeType,
			Args:     changeScript.Args,
		},
	})
	tx.OutputsData = [][]byte{{}, {}}

	group, witnessArgs, err := transaction.AddInputsForTransaction(tx, []*types.CellInput{
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0x8e6d818c6e07e6cbd9fca51294030494ee23dc388d7f5276ba50b938d02cc015"),
				Index:  1,
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

### Send CKB with Multiple Inputs

```go
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

	keyA, err := secp256k1.HexToKey(PRIVATE_KEY_A)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}

	keyB, err := secp256k1.HexToKey(PRIVATE_KEY_B)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}

	systemScripts, err := utils.NewSystemScripts(client)
	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	toAddress, _ := hex.DecodeString("f96b6700df60fd6d84a2e17a5c5e4f603a5eec5d")

	tx := transaction.NewSecp256k1SingleSigTx(systemScripts)
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 499999996000,
		Lock: &types.Script{
			CodeHash: types.HexToHash("0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"),
			HashType: types.HashTypeType,
			Args:     toAddress,
		},
	})
	tx.OutputsData = [][]byte{{}}

	groupB, witnessArgsB, err := transaction.AddInputsForTransaction(tx, []*types.CellInput{
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0xf56d73acbe235889e726366aa4fa09b3f0b51138c294645bb30912fb872837a5"),
				Index:  0,
			},
		},
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0x8e6d818c6e07e6cbd9fca51294030494ee23dc388d7f5276ba50b938d02cc015"),
				Index:  0,
			},
		},
	})
	if err != nil {
		log.Fatalf("add inputs to transaction error: %v", err)
	}

	groupA, witnessArgsA, err := transaction.AddInputsForTransaction(tx, []*types.CellInput{
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0xf56d73acbe235889e726366aa4fa09b3f0b51138c294645bb30912fb872837a5"),
				Index:  1,
			},
		},
	})
	if err != nil {
		log.Fatalf("add inputs to transaction error: %v", err)
	}

	err = transaction.SingleSignTransaction(tx, groupB, witnessArgsB, keyB)
	if err != nil {
		log.Fatalf("sign transaction error: %v", err)
	}

	err = transaction.SingleSignTransaction(tx, groupA, witnessArgsA, keyA)
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

### Send CKB with Multiple Inputs and Multisig

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/nervosnetwork/ckb-sdk-go/address"
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

	keyA, _ := secp256k1.HexToKey(PRIVATE_KEY_A)
	keyB, _ := secp256k1.HexToKey(PRIVATE_KEY_B)
	keyC, _ := secp256k1.HexToKey(PRIVATE_KEY_C)

	systemScripts, err := utils.NewSystemScripts(client)
	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	to, _ := address.Parse("ckt1qyqwmndf2yl6qvxwgvyw9yj95gkqytgygwasdjf6hm")
	changeScript, changeSerialize, err := address.GenerateSecp256k1MultisigScript(0, 2, [][]byte{
		keyA.PubKey(),
		keyB.PubKey(),
		keyC.PubKey(),
	})

	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	tx := transaction.NewSecp256k1MultiSigTx(systemScripts)
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 300000000000,
		Lock:     to.Script,
	})
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 399999994000,
		Lock:     changeScript,
	})
	tx.OutputsData = [][]byte{{}, {}}

	group, witnessArgs, err := transaction.AddInputsForTransaction(tx, []*types.CellInput{
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0xccb33a76b5322ff2841511ef10606b6bb207f6eef5a687f14f8c7fa5da8a7cb2"),
				Index:  0,
			},
		},
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0x06a49393423c1be0a48d422fa60951bdb847d56753915f321c26906a6ba1dd8a"),
				Index:  0,
			},
		},
	})
	if err != nil {
		log.Fatalf("add inputs to transaction error: %v", err)
	}

	err = transaction.MultiSignTransaction(tx, group, witnessArgs, changeSerialize, keyA, keyB)
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

### Send CKB with Multiple Inputs and Hybirdsig

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/nervosnetwork/ckb-sdk-go/address"
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

	key, _ := secp256k1.HexToKey(PRIVATE_KEY)

	keyA, _ := secp256k1.HexToKey(PRIVATE_KEY_A)
	keyB, _ := secp256k1.HexToKey(PRIVATE_KEY_B)
	keyC, _ := secp256k1.HexToKey(PRIVATE_KEY_C)

	systemScripts, err := utils.NewSystemScripts(client)
	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	to, _ := address.Parse("ckt1qyqt705jmfy3r7jlvg88k87j0sksmhgduazq7x5l8k")
	changeScript, changeSerialize, err := address.GenerateSecp256k1MultisigScript(0, 2, [][]byte{
		keyA.PubKey(),
		keyB.PubKey(),
		keyC.PubKey(),
	})

	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	tx := transaction.NewSecp256k1HybirdSigTx(systemScripts)
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 500000000000,
		Lock:     to.Script,
	})
	tx.Outputs = append(tx.Outputs, &types.CellOutput{
		Capacity: 199999992000,
		Lock:     changeScript,
	})
	tx.OutputsData = [][]byte{{}, {}}

	group, witnessArgs, err := transaction.AddInputsForTransaction(tx, []*types.CellInput{
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0xcb905a3b304b23200225def794c4ce165d93eead77197724680b4ec067b43803"),
				Index:  0,
			},
		},
	})
	if err != nil {
		log.Fatalf("add inputs to transaction error: %v", err)
	}

	group1, witnessArgs1, err := transaction.AddInputsForTransaction(tx, []*types.Cell{
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0xcb905a3b304b23200225def794c4ce165d93eead77197724680b4ec067b43803"),
				Index:  1,
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

	err = transaction.MultiSignTransaction(tx, group1, witnessArgs1, changeSerialize, keyA, keyB)
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

### Collect Cells

```go
package main

import (
	"encoding/hex"
	"fmt"
	"log"

	"github.com/nervosnetwork/ckb-sdk-go/collector"
	"github.com/nervosnetwork/ckb-sdk-go/indexer"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
	"github.com/nervosnetwork/ckb-sdk-go/types"
	"github.com/nervosnetwork/ckb-sdk-go/utils"
)

func main() {
	client, err := rpc.DialWithIndexer("http://localhost:8114", "http://localhost:8116")
	if err != nil {
		log.Fatalf("create rpc client error: %v", err)
	}
	args, _ := hex.DecodeString("edcda9513fa030ce4308e29245a22c022d0443bb")
	searchKey := &indexer.SearchKey{
		Script: &types.Script{
			CodeHash: types.HexToHash("0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"),
			HashType: types.HashTypeType,
			Args:     args,
		},
		ScriptType: indexer.ScriptTypeLock,
	}
	c := collector.NewLiveCellCollector(client, searchKey, indexer.SearchOrderAsc, indexer.SearchLimit, "")
	iterator, err := c.Iterator()
	if err != nil {
		log.Fatalf("collect cell error: %v", err)
	}
	var cells []*indexer.LiveCell
	for iterator.HasNext() {
		liveCell, err := iterator.CurrentItem()
		if err != nil {
			log.Fatalf("get cell error: %v", err)
		}
		cells = append(cells, liveCell)
		err = iterator.Next()
		if err != nil {
			log.Fatalf("iterat error: %v", err)
		}
	}
	fmt.Println(cells)
}
```

### Collect Cells with Filter

```go
package main

import (
	"encoding/hex"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
	"github.com/nervosnetwork/ckb-sdk-go/collector"
	"github.com/nervosnetwork/ckb-sdk-go/indexer"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
	"github.com/nervosnetwork/ckb-sdk-go/types"
	"github.com/nervosnetwork/ckb-sdk-go/utils"
	"log"
)

func main() {
	client, err := rpc.DialWithIndexer("http://localhost:8114", "http://localhost:8116")
	if err != nil {
		log.Fatalf("create rpc client error: %v", err)
	}
	args, _ := hex.DecodeString("edcda9513fa030ce4308e29245a22c022d0443bb")
	systemScripts, _ := utils.NewSystemScripts(client)
	searchKey := &indexer.SearchKey{
		Script: &types.Script{
			CodeHash: types.HexToHash("0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"),
			HashType: types.HashTypeType,
			Args:     args,
		},
		ScriptType: indexer.ScriptTypeLock,
		Filter: &indexer.CellsFilter{
			Script: &types.Script{
				CodeHash: systemScripts.SUDTCell.CellHash,
				HashType: systemScripts.SUDTCell.HashType,
				Args:     common.FromHex("0x683574c1275eb5cfe6f8745faa375b08bf773223fd8d2b4db28dbd90a27f1586"),
			},
			OutputDataLenRange:  &[2]uint64{0, 14200000001},
			OutputCapacityRange: &[2]uint64{0, 14200000001},
			BlockRange:          &[2]uint64{46843, 46844},
		},
	}
	c := collector.NewLiveCellCollector(client, searchKey, indexer.SearchOrderAsc, indexer.SearchLimit, "")
	iterator, err := c.Iterator()
	if err != nil {
		log.Fatalf("collect cell error: %v", err)
	}
	var cells []*indexer.LiveCell
	for iterator.HasNext() {
		liveCell, err := iterator.CurrentItem()
		if err != nil {
			log.Fatalf("get cell error: %v", err)
		}
		cells = append(cells, liveCell)
		err = iterator.Next()
		if err != nil {
			log.Fatalf("iterat error: %v", err)
		}
	}
	fmt.Println(cells)
}
```

### Collect Cells and Filter Out Immature Cells

```go
package main

import (
	"context"
	"encoding/hex"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
	"github.com/nervosnetwork/ckb-sdk-go/collector"
	"github.com/nervosnetwork/ckb-sdk-go/indexer"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
	"github.com/nervosnetwork/ckb-sdk-go/types"
	"github.com/nervosnetwork/ckb-sdk-go/utils"
	"log"
)

func main() {
	client, err := rpc.DialWithIndexer("http://localhost:8114", "http://localhost:8116")
	if err != nil {
		log.Fatalf("create rpc client error: %v", err)
	}
	args, _ := hex.DecodeString("edcda9513fa030ce4308e29245a22c022d0443bb")
	maxMatureBlockNumber, err := utils.GetMaxMatureBlockNumber(client, context.Background())
	searchKey := &indexer.SearchKey{
		Script: &types.Script{
			CodeHash: types.HexToHash("0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8"),
			HashType: types.HashTypeType,
			Args:     args,
		},
		ScriptType: indexer.ScriptTypeLock,
	}
	c := collector.NewLiveCellCollector(client, searchKey, indexer.SearchOrderAsc, indexer.SearchLimit, "")
	iterator, err := c.Iterator()
	if err != nil {
		log.Fatalf("collect cell error: %v", err)
	}
	var cells []*indexer.LiveCell
	for iterator.HasNext() {
		liveCell, err := iterator.CurrentItem()
		if err != nil {
			log.Fatalf("get cell error: %v", err)
		}
		if utils.IsMature(liveCell, maxMatureBlockNumber) {
			cells = append(cells, liveCell)
		}

		err = iterator.Next()
		if err != nil {
			log.Fatalf("iterat error: %v", err)
		}
	}
	fmt.Println(len(cells))
}
```

### Create a Payment

```go
package main

import (
	"fmt"
	"github.com/nervosnetwork/ckb-sdk-go/utils"
	"log"

	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/payment"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
)

func main() {
	client, err := rpc.DialWithIndexer("http://localhost:8114", "http://localhost:8116")
	if err != nil {
		log.Fatalf("create rpc client error: %v", err)
	}

	key, err := secp256k1.HexToKey(PRIVATE_KEY)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}

	pay, err := payment.NewPayment("ckt1qyqwmndf2yl6qvxwgvyw9yj95gkqytgygwasdjf6hm",
		"ckt1qyqt705jmfy3r7jlvg88k87j0sksmhgduazq7x5l8k", 100000000000, 1000)
	if err != nil {
		log.Fatalf("create payment error: %v", err)
	}
	systemScripts, _ := utils.NewSystemScripts(client)
	_, err = pay.GenerateTx(client, systemScripts)
	if err != nil {
		log.Fatalf("create transaction error: %v", err)
	}

	_, err = pay.Sign(key)
	if err != nil {
		log.Fatalf("sign transaction error: %v", err)
	}

	hash, err := pay.Send(client)

	fmt.Println(hash)
}
```

### Deposit CKB to DAO

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/nervosnetwork/ckb-sdk-go/address"
	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/dao"
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

	key, err := secp256k1.HexToKey(PRIVATE_KEY)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}

	systemScripts, err := utils.NewSystemScripts(client)
	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	deposit := dao.NewDeposit(systemScripts, false)

	to, _ := address.Parse("ckt1qyqwmndf2yl6qvxwgvyw9yj95gkqytgygwasdjf6hm")
	change, _ := key.Script(systemScripts)

	err = deposit.AddDaoOutput(systemScripts, to.Script, 400000000000)
	if err != nil {
		log.Fatalf("add dao output error: %v", err)
	}
	err = deposit.AddOutput(change, 99999997000)
	if err != nil {
		log.Fatalf("add output error: %v", err)
	}

	group, witnessArgs, err := transaction.AddInputsForTransaction(deposit.Transaction, []*types.CellInput{
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0xaa10f51bc6ee60e851d17e3fffefc950d6dc1d2cd77e15699c3da5e837219764"),
				Index:  1,
			},
		},
	})
	if err != nil {
		log.Fatalf("add inputs to transaction error: %v", err)
	}

	err = transaction.SingleSignTransaction(deposit.Transaction, group, witnessArgs, key)
	if err != nil {
		log.Fatalf("sign transaction error: %v", err)
	}

	hash, err := client.SendTransaction(context.Background(), deposit.Transaction)
	if err != nil {
		log.Fatalf("send transaction error: %v", err)
	}
	fmt.Println(hash.String())
}
```

### Withdraw CKB from DAO (Phase 1)

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/nervosnetwork/ckb-sdk-go/address"
	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/dao"
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

	key, err := secp256k1.HexToKey(PRIVATE_KEY)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}

	systemScripts, err := utils.NewSystemScripts(client)
	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	withdraw := dao.NewWithdrawPhase1(systemScripts, false)

	ownder, _ := address.Parse("ckt1qyqwmndf2yl6qvxwgvyw9yj95gkqytgygwasdjf6hm")
	change, _ := key.Script(systemScripts)

	index, err := withdraw.AddDaoDepositTick(client, &types.Cell{
		BlockHash: types.HexToHash("0x386bafd53bade6bf769c9b10f545e31ea744cb6ebc5f1c8178f307e8dce157a6"),
		Capacity:  400000000000,
		Lock:      ownder.Script,
		Type: &types.Script{
			CodeHash: types.HexToHash("0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e"),
			HashType: types.HashTypeType,
			Args:     []byte{},
		},
		OutPoint: &types.OutPoint{
			TxHash: types.HexToHash("0xc8cfe3d09b0a50fd2df3bd79dbadca23b7eb1f58087942d7266abea93459fce1"),
			Index:  0,
		},
	})
	if err != nil {
		log.Fatalf("add dao deposit tick error: %v", err)
	}

	err = withdraw.AddOutput(change, 99999995000)
	if err != nil {
		log.Fatalf("add output error: %v", err)
	}

	group, witnessArgs, err := transaction.AddInputsForTransaction(withdraw.Transaction, []*types.CellInput{
		{
			Since: 0,
			PreviousOutput: &types.OutPoint{
				TxHash: types.HexToHash("0xc8cfe3d09b0a50fd2df3bd79dbadca23b7eb1f58087942d7266abea93459fce1"),
				Index:  1,
			},
		},
	})
	if err != nil {
		log.Fatalf("add inputs to transaction error: %v", err)
	}

	var groups []int
	groups = append(groups, index)
	groups = append(groups, group...)

	// sign dao input
	err = transaction.SingleSignTransaction(withdraw.Transaction, groups, witnessArgs, key)
	if err != nil {
		log.Fatalf("sign dao transaction error: %v", err)
	}

	hash, err := client.SendTransaction(context.Background(), withdraw.Transaction)
	if err != nil {
		log.Fatalf("send transaction error: %v", err)
	}
	fmt.Println(hash.String())
}
```

### Withdraw CKB from DAO (Phase 2)

```go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/nervosnetwork/ckb-sdk-go/address"
	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/dao"
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

	key, err := secp256k1.HexToKey(PRIVATE_KEY)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}

	systemScripts, err := utils.NewSystemScripts(client)
	if err != nil {
		log.Fatalf("load system script error: %v", err)
	}

	withdraw := dao.NewWithdrawPhase2(systemScripts, false)

	ownder, _ := address.Parse("ckt1qyqwmndf2yl6qvxwgvyw9yj95gkqytgygwasdjf6hm")

	index, witnessArgs, err := withdraw.AddDaoWithdrawTick(client, &types.Cell{
		BlockHash: types.HexToHash("0x386bafd53bade6bf769c9b10f545e31ea744cb6ebc5f1c8178f307e8dce157a6"),
		Capacity:  400000000000,
		Lock:      ownder.Script,
		Type: &types.Script{
			CodeHash: types.HexToHash("0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e"),
			HashType: types.HashTypeType,
			Args:     []byte{},
		},
		OutPoint: &types.OutPoint{
			TxHash: types.HexToHash("0xc8cfe3d09b0a50fd2df3bd79dbadca23b7eb1f58087942d7266abea93459fce1"),
			Index:  0,
		},
	}, &types.Cell{
		BlockHash: types.HexToHash("0xf0b88e5ca0397c761dc76fa2dd953f203b90c47a7c8199b45ac0d90efb044233"),
		Capacity:  400000000000,
		Lock:      ownder.Script,
		Type: &types.Script{
			CodeHash: types.HexToHash("0x82d76d1b75fe2fd9a27dfbaa65a039221a380d76c926f378d3f81cf3e7e13f2e"),
			HashType: types.HashTypeType,
			Args:     []byte{},
		},
		OutPoint: &types.OutPoint{
			TxHash: types.HexToHash("0xc72d7bffcc3302f8267fecb103f655e63e7b94b6f6e863cd6a0130ffec296684"),
			Index:  0,
		},
	}, 2000)
	if err != nil {
		log.Fatalf("add dao deposit tick error: %v", err)
	}

	// sign dao input
	err = transaction.SingleSignTransaction(withdraw.Transaction, []int{index}, witnessArgs, key)
	if err != nil {
		log.Fatalf("sign dao transaction error: %v", err)
	}

	hash, err := client.SendTransaction(context.Background(), withdraw.Transaction)
	if err != nil {
		log.Fatalf("send transaction error: %v", err)
	}
	fmt.Println(hash.String())
}
```

### Issue cheque Cells

```go
package main

import (
	"fmt"
	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/payment"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
	"github.com/nervosnetwork/ckb-sdk-go/types"
	"github.com/nervosnetwork/ckb-sdk-go/utils"
	"log"
)

func main() {
	client, err := rpc.DialWithIndexer("http://localhost:8114", "http://localhost:8116")
	if err != nil {
		log.Fatal(err)
	}
	systemScripts, _ := utils.NewSystemScripts(client)
	c, err := payment.NewCheque("ckt1qyqrhmy67jcn7rvft3d2em3sc78pzn02ha4s728fvg", "ckt1qyqrd7cglncpwfzn73qwhed5mvjnrl8v6nvq2cpmd8", "TOKEN_ID", "10000000000000", 1000, systemScripts)
	if err != nil {
		fmt.Println(err)
	}
	_, err = c.GenerateIssuingChequeUnsignedTx(client)
	if err != nil {
		log.Fatal(err)
	}
	key, err := secp256k1.HexToKey(PRIVATE_KEY)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}
	_, err = c.SignTx(key)
	if err != nil {
		log.Fatal(err)
	}
	hash, err := c.Send(client)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(hash)
}
```

### Claim cheque Cells

```go
package main

import (
	"fmt"
	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/payment"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
	"github.com/nervosnetwork/ckb-sdk-go/types"
	"github.com/nervosnetwork/ckb-sdk-go/utils"
	"log"
)

func main() {
	client, err := rpc.DialWithIndexer("http://localhost:8114", "http://localhost:8116")
	if err != nil {
		log.Fatal(err)
	}
	systemScripts, _ := utils.NewSystemScripts(client)
	c, err := payment.NewClaimCheque("ckt1qyqrd7cglncpwfzn73qwhed5mvjnrl8v6nvq2cpmd8", "TOKEN_ID", 1000, systemScripts)
	if err != nil {
		fmt.Println(err)
	}
	_, err = c.GenerateClaimChequeUnsignedTx(client)
	if err != nil {
		log.Fatal(err)
	}
	key, err := secp256k1.HexToKey(PRIVATE_KEY)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}
	_, err = c.SignTx(key)
	if err != nil {
		log.Fatal(err)
	}
	hash, err := c.Send(client)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(hash)
}
```

### Withdraw cheque Cells

```go
package main

import (
	"fmt"
	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/payment"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
	"github.com/nervosnetwork/ckb-sdk-go/types"
	"github.com/nervosnetwork/ckb-sdk-go/utils"
	"log"
)

func main() {
	client, err := rpc.DialWithIndexer("http://localhost:8114", "http://localhost:8116")
	if err != nil {
		log.Fatal(err)
	}
	systemScripts, _ := utils.NewSystemScripts(client)
	c, err := payment.NewWithdrawCheque("ckt1qyqrhmy67jcn7rvft3d2em3sc78pzn02ha4s728fvg", "ckt1qyqrd7cglncpwfzn73qwhed5mvjnrl8v6nvq2cpmd8", "TOKEN_ID", "10000000000000", 1000, systemScripts)
	if err != nil {
		fmt.Println(err)
	}
	_, err = c.GenerateWithdrawChequeUnsignedTx(client)
	if err != nil {
		log.Fatal(err)
	}
	key, err := secp256k1.HexToKey(PRIVATE_KEY)
	if err != nil {
		log.Fatalf("import private key error: %v", err)
	}
	_, err = c.SignTx(key)
	if err != nil {
		log.Fatal(err)
	}
	hash, err := c.Send(client)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(hash)
}
```

### Transfer SUDT

```go
package main

import (
	"github.com/nervosnetwork/ckb-sdk-go/address"
	"github.com/nervosnetwork/ckb-sdk-go/crypto"
	"github.com/nervosnetwork/ckb-sdk-go/crypto/secp256k1"
	"github.com/nervosnetwork/ckb-sdk-go/payment"
	"github.com/nervosnetwork/ckb-sdk-go/rpc"
	"log"
)

func main() {
	uuid := "0x683574c1275eb5cfe6f8745faa375b08bf773223fd8d2b4db28dbd90a27f1586"
	receiverInfo := make(map[string]string)
	receiverInfo["ckt1qyqrhmy67jcn7rvft3d2em3sc78pzn02ha4s728fvg"] = "10000000000000"
	receiverInfo["ckt1qyqr4s293mq0f0rhtejta5drx66a95c5wc6sl2dsmk"] = "10000000000000"
	receiverInfo["ckt1qyqxpe0qj6qxk95zla6v06adej9enmnzqvaqvc07gr"] = "10000000000000"
	senderAddresses := []string{"ckt1qyqvgpevpyh45a7a4t0l5n7apqduw7y9y99qpyrsd5", "ckt1qyqrd7cglncpwfzn73qwhed5mvjnrl8v6nvq2cpmd8"}
	ckbPayerAddress := "ckt1qyqrhmy67jcn7rvft3d2em3sc78pzn02ha4s728fvg"
	ckbChangeAddress := "ckt1qyqrhmy67jcn7rvft3d2em3sc78pzn02ha4s728fvg"
	sudtChangeAddress := "ckt1qyqrhmy67jcn7rvft3d2em3sc78pzn02ha4s728fvg"
	keyInfo := map[string]string{
		"ckt1qyqvgpevpyh45a7a4t0l5n7apqduw7y9y99qpyrsd5": "PRIVATE KEY",
		"ckt1qyqrd7cglncpwfzn73qwhed5mvjnrl8v6nvq2cpmd8": "PRIVATE KEY",
		"ckt1qyqrhmy67jcn7rvft3d2em3sc78pzn02ha4s728fvg": "PRIVATE KEY",
	}
	client, err := rpc.DialWithIndexer("http://localhost:8114", "http://localhost:8116")
	if err != nil {
		log.Fatal(err)
	}
	systemScripts, _ := utils.NewSystemScripts(client)
	sudt, err := payment.NewSudt(senderAddresses, receiverInfo, ckbPayerAddress, ckbChangeAddress, sudtChangeAddress, uuid, 1000, systemScripts)
	if err != nil {
		log.Println(err)
	}
	_, err = sudt.GenerateTransferSudtUnsignedTx(client)
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Println(rpc.TransactionString(tx))
	keys := make(map[string]crypto.Key)
	for addr, sk := range keyInfo {
		parsedAddr, err := address.Parse(addr)
		if err != nil {
			log.Fatal(err)
		}
		lockHash, err := parsedAddr.Script.Hash()
		if err != nil {
			log.Fatal(err)
		}
		key, err := secp256k1.HexToKey(sk)
		if err != nil {
			log.Fatal(err)
		}
		keys[lockHash.String()] = key
	}
	tx, err := sudt.SignTx(keys)
	log.Println(rpc.TransactionString(tx))
	if err != nil {
		log.Fatal(err)
	}
	hash, err := sudt.Send(client)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(hash)
}
```

