---
id: polyjuice
title: Polyjuice
sidebar_label: Polyjuice
---
import useBaseUrl from "@docusaurus/useBaseUrl";

## Overview

Polyjuice is an EVM compatible layer that exposes an account model on top of the cell model of CKB. It supports Solidity based smart contracts to run on Nervos CKB. <!--Polyjuice uses [evmone](https://github.com/ethereum/evmone) as the EVM implementation in both generator and validator. It accepts Ethereum transactions and executes the transactions in EVM. For more information about Polyjuice transactions, see [Life of a Polyjuice Transaction](https://github.com/nervosnetwork/godwoken/blob/master/docs/life_of_a_polyjuice_transaction.md).-->

The active development repository of Polyjuice is [Polyjuice for Godwoken](https://github.com/nervosnetwork/godwoken-polyjuice) that is the Ethereum compatible backend for [Godwoken](https://github.com/nervosnetwork/godwoken). Polyjuice supports to deploy Ethereum DApps to CKB when it is deployed with Godwoken.

Godwoken is a layer 2 rollup framework for Nervos CKB. It provides scaling capabilities with rollups that perform transaction execution outside a CKB chain. Simply put, Polyjuice provides a way to inject custom logic into the rollup solution of Godwoken. Godwoken solves the shared state problem of Polyjuice.

Figure 1 shows the main relationship among CKB nodes, Godwoken nodes, Polyjuice and Ethereum DApps. 

<img src={useBaseUrl("img/arch.png")}  width="40%"/>

Figure 1. Architecture for Polyjuice Deployed with Godwoken

Polyjuice and Godwoken works as follows:

1. Polyjuice accepts Ethereum transactions and executes the transactions in EVM, then sends the transactions to Godwoken nodes.
2. Godwoken nodes collect specially designed layer 2 transactions and pack the special transactions into CKB transactions. Finally, submit the CKB transactions to layer 1 for acceptance.

## Decentralization Roadmap

- **Stage 1** (up to the mainnet release): The sequencer is the only validator. Godwoken supports to view rollups and find out whether there is any invalid commit in a rollup.

- **Stage 2** (after the mainnet release): Godwoken will introduce permission-less validators. Then, everyone can run a validator to view rollups. If the sequencer commits an invalid state, a challenge will be processed, and the sequencer will lose staked assets on layer1. If the sequencer stops working, everyone can run a block producer to process the withdrawal from the rollup.

  The target of stage 2 is to reach the same decentralization level as popular rollup projects such as Arbitrum.

- **Stage 3**: Multiple sequencers will be investigated and explored.

## How to Use Polyjuice

### Workflow

1. Choose or deploy a [Polyjuice network](../introduction/polyjuice#polyjuice-networks).
2. Deploy an Ethereum DApp to Polyjuice.

### Polyjuice Networks

The following Polyjuice networks can be used for deploying Ethereum DApps to Polyjuice:

| Network Name                             | Description                                                  |
| ---------------------------------------- | ------------------------------------------------------------ |
| <p>Polyjuice&nbsp;Testnet</p>            | RPC URL: https://godwoken-testnet-web3-rpc.ckbapp.dev/<br/>Chain ID: 71393<br/> |
| <p>Polyjuice&nbsp;Mainnet</p>            | Todo                                                         |
| <p>Local&nbsp;Polyjuice&nbsp;Network</p> | A local Polyjuice network can be deployed by one of the following deployment methods to fulfill different deployment requirements:<br/><ul><li><p>Deploy a Polyjuice network by using Godwoken-kicker.</p><p>Godwoken-kicker is a one line command to start a Godwoken chain with Polyjuice on **Devnet**. This deployment method helps developers deploy Ethereum contracts and migrate Ethereum DApps to CKB Devnet quickly in testing and development environments.</p><p>RPC URL: http://localhost:8024<br/>Chain ID: 1024777<br/></p></li><li><p>Deploy a Polyjuice network manually.</p><p>This deployment method is useful in situations such as deploying a Godwoken chain with Polyjuice on <b>Testnet</b> or <b>Mainnet</b>.</p></li></ul> |

## Deployment

### Deploy a Polyjuice Network by Using Godwoken-Kicker

Godwoken-kicker provides a quick mode and a custom mode for the deployment.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="quick"
  values={[
    {label: 'Quick Mode', value: 'quick'},
    {label: 'Custom Mode', value: 'custom'},
  ]}>
<TabItem value="quick"><p>The quick mode is fast and simple. It executes the builds of all components from prebuilt docker images.</p><b>Environment</b><p><ul><li>Ubuntu 20.04 LTS</li></ul></p><b>Prerequisites</b><p><ul><li><a href="https://docs.docker.com/engine/install/ubuntu/">Docker Engine</a></li><li><a href="https://docs.docker.com/compose/install/">Docker Compose</a></li></ul></p>

<p><b>Steps</b></p>

<ol> 
    <li><p>Clone the source of Godwoken-kicker.</p>
        <p>If the source is already cloned, skip this step and go to the next step directly.</p>

```bash
$ git clone https://github.com/RetricSu/godwoken-kicker.git
```

</li>

<li><p>Initialize Godwoken-kicker.</p>

:::note

Stop any running Godwoken chain by using the <code>make stop</code> command before initializing Godwoken-kicker. 

:::

```bash
$ cd godwoken-kicker
$ make init
```

<p>The <code>make init</code> command can be used in the following situations:</p>

<ul>
<li>It is the first time to start the chain.</li><li>The deployment mode is changed.</li><li>The CKB chain data and all layer 1 related cache data are deleted.</li></ul>

</li>

<li><p>Start the Godwoken chain.</p>

<p>The <code>make start</code> command can be used to start the deployed Godwoken chain. If there is no chain deployed, the <code>make start-f</code> command can be used for a force start that deploys and starts a new Godwoken chain.</p>

```bash
$ make start
```
:::note

  Do note that after running <code>make clean</code>, run <code>make init</code> again if a reboot is desired. 

:::
<details><summary>Output</summary>
<p>



```bash
Building ckb
Building polyjuice
Building call-polyman
Building godwoken
Building web3
Starting docker_postgres_1 ... done
Starting docker_ckb_1      ... done
Starting docker_polyjuice_1    ... done
Starting docker_call-polyman_1 ... done
Starting docker_indexer_1      ... done
Starting docker_godwoken_1     ... done
Starting docker_web3_1         ... done

Run commands to monitor background activities: 

    make sg (Godwoken)
    make sp (Polyjuice)
    make web3 (web3)
    make call-polyman (setup service)

All Jobs Done       : [########################################] 100%

Great! Checkout http://localhost:6100 to deploy contract!
```

</p>
</details>

</li>

<li><p>Set up an Ethereum wallet.</p><p>In this example, a MetaMask (an Ethereum Wallet) wallet is set up for the deployment. Add the MetaMask extension in the browser (Firefox, Google Chrome, Brave or Microsoft Edge.) and create an account for the wallet.</p><p>If there is a MetaMask wallet ready to be used, skip this step and go to the next step directly.</p></li>

<li><p>When the Godwoken chain is started successfully, open the website at <a>http://localhost:6100</a> and connect the MetaMask wallet by clicking the <b>Connect Wallet</b> button.</p>

      RPC URL=http://localhost:8024
      CHAIN ID=1024777

</li>

<li><p>Deploy an ETH contract to the Godwoken chain.</p><ol><li><p>Prepare and compile an ETH contract.</p></li>

<li>Deposit 400 CKB to the ETH wallet on the <b>ACCOUNTS</b> page of the Godwoken chain.</li>

<li>Deploy the ETH contract that you have compiled on the <b>CONTRACT</b> page of the Godwoken chain.</li></ol></li></ol>

</TabItem>
    <TabItem value="custom"><p>The custom mode is more flexible for custom requirements. It can build the components from local packages and executes the builds locally.</p><b>Environment</b><p><ul><li>Ubuntu 20.04 LTS</li></ul></p><b>Prerequisites</b><p><ul><li><a href="https://docs.docker.com/engine/install/ubuntu/">Docker Engine</a></li><li><a href="https://docs.docker.com/compose/install/">Docker Compose</a></li><li><a href="https://github.com/nervosnetwork/molecule">Moleculec</a></li><li>Rustup nightly</li></ul></p>

<p><b>Steps</b></p>

<ol>  
    <li><p>Clone the source of Godwoken-kicker.</p>
        <p>If the source is already cloned, skip this step and go to the next step directly.</p>

```bash
$ git clone https://github.com/RetricSu/godwoken-kicker.git
```

</li>

<li><p>Set the mode with <code>true</code> under the <code>[mode]</code> section in the <code>/docker/.build.mode.env</code> file for the components that you want to build from local packages.</p>

```title="/docker/.build.mode.env"
####[mode]
MANUAL_BUILD_GODWOKEN=false
MANUAL_BUILD_WEB3=false
MANUAL_BUILD_SCRIPTS=false
MANUAL_BUILD_POLYJUICE=false
...
```

<p>(Optional) Configure component version under the <code>[packages]</code> section in the <code>docker/.build.mode.env</code> file.</p>

```title="/docker/.build.mode.env"
####[packages]
GODWOKEN_GIT_URL=https://github.com/nervosnetwork/godwoken.git
GODWOKEN_GIT_CHECKOUT=master
POLYMAN_GIT_URL=https://github.com/RetricSu/godwoken-polyman.git
POLYMAN_GIT_CHECKOUT=master
WEB3_GIT_URL=https://github.com/nervosnetwork/godwoken-web3.git
WEB3_GIT_CHECKOUT=main
...
```

</li>

<li><p>Initialize Godwoken-kicker.</p>

:::note

Stop any running Godwoken chain by using the <code>make stop</code> command before initializing Godwoken-kicker.

:::

```bash
$ cd godwoken-kicker
$ make init
```

The <code>make init</code> command can be used in the following situations:

<ul><li>It is the first time to start the chain.</li><li>The deployment mode is changed.</li><li>The CKB chain data and all layer 1 related cache data are deleted.</li></ul>
</li>

<li><p>Start the Godwoken chain.</p>

<p>The <code>make start</code> command can be used to start the deployed Godwoken chain. If there is no chain deployed, the <code>make start -f</code> command can be used for a force start that deploys and starts a new Godwoken chain.</p>

```bash
$ make start
```

<details><summary>Output</summary>
<p>


```bash
Building ckb
Building polyjuice
Building call-polyman
Building godwoken
Building web3
Starting docker_postgres_1 ... done
Starting docker_ckb_1      ... done
Starting docker_polyjuice_1    ... done
Starting docker_call-polyman_1 ... done
Starting docker_indexer_1      ... done
Starting docker_godwoken_1     ... done
Starting docker_web3_1         ... done

Run commands to monitor background activities: 

    make sg (Godwoken)
    make sp (Polyjuice)
    make web3 (web3)
    make call-polyman (setup service)

All Jobs Done       : [########################################] 100%

Great! Checkout http://localhost:6100 to deploy contract!
```



</p>
</details>

</li>

<li><p>Set up an Ethereum wallet.</p><p>In this example, a MetaMask (an Ethereum Wallet) wallet is set up for the deployment. Add the MetaMask extension in the browser (Firefox, Google Chrome, Brave or Microsoft Edge.) and create an account for the wallet.</p><p>If there is a MetaMask wallet ready to be used, skip this step and go to the next step directly.</p></li>  

<li><p>When the Godwoken chain is started successfully, open the website at <a>http://localhost:6100</a> and connect the MetaMask wallet by clicking the <b>Connect Wallet</b> button.</p>

      RPC URL=http://localhost:8024
      CHAIN ID=1024777

</li>

<li><p>Deploy an ETH contract to the Godwoken chain.</p>

<ol><li><p>Prepare and compile an ETH contract.</p></li><li><p>Deposit 400 CKB to the ETH wallet on the <b>ACCOUNTS</b> page of the Godwoken chain.</p></li><li><p>Deploy the ETH contract that you have compiled on the <b>CONTRACT</b> page of the Godwoken chain.</p></li></ol>

</li></ol>

</TabItem>
</Tabs>

For more information about the Godwoken-kicker commands, see [godwoken-kicker](https://github.com/RetricSu/godwoken-kicker).

### Deploy a Polyjuice Network Manually

#### Environment

* OS: Ubuntu 20.04

#### Prerequisites

The following tools need to be installed before entering the deployment process:

* Yarn (version 1.22.5 or above)

* GCC and make

  To install `GCC` and `make` on Ubuntu 20.04, run the following command as root or user with sudo privileges:

  ```bash
  $ sudo apt update
  $ sudo apt install build-essential
  ```

* [Capsule v0.4.6](https://github.com/nervosnetwork/capsule/releases/tag/v0.4.6)

* Rustc nightly v1.54.0

* [Moleculec v0.6.1](https://github.com/nervosnetwork/molecule)

  To install Moleculec 0.6.1:

  ```bash
  $ cargo install moleculec --version 0.6.1
  ```

* Docker

  **Docker** must be installed for building and deploying Godwoken. For more information about Docker installation, see [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/).

  To manage Docker as a non-root user, see the Docker documentations of [Manage Docker as a non-root user](https://docs.docker.com/engine/install/linux-postinstall/).

* [Tippy](https://github.com/nervosnetwork/tippy/releases)

  Tippy is a tool to help set up and manage CKB nodes. For more information, see [Install a CKB Node by Using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy). The verified Tippy version in this documentation is [v0.3.2](https://github.com/nervosnetwork/tippy/releases/tag/v0.3.2).

* ckb-cli: The ckb-cli tool is used for deploying smart contracts. It can be installed from a [CKB prebuilt installer package](https://github.com/nervosnetwork/ckb/releases). The verified ckb-cli version in this documentation is [v0.42.0](https://github.com/nervosnetwork/ckb/releases/tag/v0.42.0).

:::note

The current user must have permissions to run ckb-cli, Capsule, Moleculec and docker. If the execution of these tools requires sudo commands, that may cause issues during the deployment process.

:::

#### Steps

1. Create a CKB account for the deployment.

   The account must have enough CKB capacity for the deployment.  For more information about CKB accounts and creating CKB accounts, see [CKB Accounts and Capacity](https://cryptape.github.io/lumos-doc/docs/reference/ckbaccount).

   Example:

   ```
   address:
     mainnet: ckb1qyqpadsep7yruydz5eaulty4xwc2sn6smhashalnjx
     testnet: ckt1qyqpadsep7yruydz5eaulty4xwc2sn6smhas2cpv76
   lock_arg: 0x1eb6190f883e11a2a67bcfac9533b0a84f50ddfb
   lock_hash: 0x499aa230ded32812a246778bc718f4d61a47497c1b7352211d241d2ad333ed75
   pk: 0xca02cc4b8e0e447e243204dd2e16a1692026bfdd4add502b203975999d3a6909
   ```

   :::note

   The account information in this documentation is only used for demonstration. Do **not** use these private keys, addresses and args elsewhere.

   :::

2. Start the CKB node and the CKB miner.

   1. Launch the Tippy dashboard.

      ```bash
      $ cd tippy-linux-x64
      $ ./Tippy
      ```

      <!--Tippy is a tool to help set up and manage CKB nodes. For more information, see the instruction of [Install a CKB Node by Using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy).-->

   2. Start the CKB node and the CKB miner on the Tippy dashboard.

3. Clone the Godwoken source.

   Open a new terminal window and run the following command to clone the Godwoken source:

   ```bash
   $ git clone --recursive https://github.com/nervosnetwork/godwoken
   ```

4. Prepare a `pk` file and a `scripts-build.json` file under the `/godwoken/deploy` folder.

   The `/godwoken/deploy/pk` file stores the private key that is used to deploy Godwoken.

   Example:

   ```title="/godwoken/deploy/pk"
   0xca02cc4b8e0e447e243204dd2e16a1692026bfdd4add502b203975999d3a6909
   ```

   The `/godwoken/deploy/scripts-build.json` file specifies the pre-built docker image of Godwoken and the repositories of the other components like godwoken_scripts, godwoken_polyjuice and clerkb.

   ```json title="/godwoken/deploy/scripts-build.json"
   {
       "prebuild_image": "nervos/godwoken-prebuilds:<tag>",
       "repos": {
           "godwoken_scripts": "https://github.com/nervosnetwork/godwoken-scripts#master",
           "godwoken_polyjuice": "https://github.com/nervosnetwork/godwoken-polyjuice#main",
           "clerkb": "https://github.com/nervosnetwork/clerkb#v0.4.0"
       }
   }
   ```
   
   For more information about the tags of the pre-buildt docker image, see https://hub.docker.com/r/nervos/godwoken-prebuilds/tags?page=1&ordering=last_updated.
   
   Example:
   
   ```json title="/godwoken/deploy/scripts-build.json"
   {
       "prebuild_image": "nervos/godwoken-prebuilds:v0.6.1",
       "repos": {
           "godwoken_scripts": "https://github.com/nervosnetwork/godwoken-scripts#master",
           "godwoken_polyjuice": "https://github.com/nervosnetwork/godwoken-polyjuice#main",
           "clerkb": "https://github.com/nervosnetwork/clerkb#v0.4.0"
       }
   } 
   ```
   
5. Set up Godwoken nodes.

   The setup command for setting up Godwoken nodes is as follows:

   ```bash
   $ RUST_LOG=info cargo +nightly run --bin gw-tools -- setup --cells-lock-address <CKB-address> -s deploy/scripts-build.json -k deploy/pk -o deploy/
   ```

   To set up Godwoken nodes with the CKB address of the deployment cells owner: 

   ```bash
   $ cd godwoken
   $ RUST_LOG=info cargo +nightly run --bin gw-tools -- setup --cells-lock-address ckt1qyqpadsep7yruydz5eaulty4xwc2sn6smhas2cpv76 -s deploy/scripts-build.json -k deploy/pk -o deploy/
   ```

   This setup command compiles Godwoken scripts, deploys the scripts and layer 2 genesis blocks, and generates configuration files. 

   After the setup command is completed, a `config.toml` file is generated under `/godwoken/deploy/node1` and `/godwoken/deploy/node2`, and a `scripts-deploy-result.json` file is generated under `/godwoken/deploy`.

   :::note

   If an error about failing to obtain the <a href="https://raw.githubusercontent.com/nervosnetwork/godwoken/2221efdfcf06351fa1884ea0f2df1604790c3378/crates/types/schemas/godwoken.mol"> godwoken.mol</a> and <a href="https://raw.githubusercontent.com/nervosnetwork/godwoken/2221efdfcf06351fa1884ea0f2df1604790c3378/crates/types/schemas/blockchain.mol">blockchain.mol</a> file is encountered during the setup process, try the following workaround to fix the error:

   <ul><li><p>Comment the lines for downloading <code>blockchain.mol</code> and <code>godwoken.mol</code> in the <code>/godwoken/tmp/scripts-build-dir/godwoken-polyjuice/Makefile</code> file.</p></li><li><p>Download the two files manually and copy the files into the <code>/godwoken/tmp/scripts-build-dir/godwoken-polyjuice/build</code> folder.</p></li><li><p>Execute the setup command again until it succeeds.</p></li></ul>

   :::

6. Configure the receiver lock.

   1. Generate the config.json file for the CKB chain.

      Download the config generator tool, [lumos-config-generator-linux-amd64](https://github.com/classicalliu/lumos-config-generator/releases/download/v0.1.1/lumos-config-generator-linux-amd64) for Linux platforms.

      Run the **lumos-config-generator-linux-amd64** file to generate the config.json file in the project root directory.

      :::note

      The CKB node must be running when executing the generator to generate the config file.

      :::

      ```bash
      $ ./lumos-config-generator-linux-amd64 config.json http://127.0.0.1:8114
      ```

   2. Assign a receiver lock in the node's `config.toml` file. 

      The code_hash of the receiver lock is the CODE_HASH of the SECP256K1_BLAKE160 script from the config.json file.

      The args is the lock args of the deployment cells owner.

      Example:

      ```toml title="config.toml"
      [block_producer.challenger_config.rewards_receiver_lock]
      code_hash = '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8'
      hash_type = 'type'
      args = '0x1eb6190f883e11a2a67bcfac9533b0a84f50ddfb'
      ```

7. Start the Godwoken nodes.

   :::note

   The default node mode is `readonly `. It can be modified in `config.toml` to either `fullnode` mode or `test` mode.

   If the two readonly nodes need to be started within the same environment, manually modify the listening port number in the `config.toml` file for each node.

   :::

   Run the following command to start node1:

   ```bash
   $ RUST_LOG=info cargo +nightly run --bin godwoken run -c deploy/node1/config.toml
   ```

   If an error about the use of unstable library feature is encountered during the process, try the following commands to fix the issue:

   ```bash
   $ cargo install cargo-edit
   $ cargo upgrade --workspace num-bigint
   ```

8. Set up Polyjuice.

   Clone the source of godwoken-examples. For more information, see [godwoken-examples](https://github.com/nervosnetwork/godwoken-examples).

   ```bash
   $ git clone --recursive https://github.com/nervosnetwork/godwoken-examples
   ```

   Then, create an account on Polyjuice. It will take some time to build index for the first time. 

   ```bash
   $ cd godwoken-examples
   $ yarn && yarn run build-all
   # export SCRIPT_DEPLOY_RESULT_PATH=<Path to scripts-deploy-result.json>
   $ export SCRIPT_DEPLOY_RESULT_PATH=~/godwoken/deploy/scripts-deploy-result.json
   # export GODWOKEN_CONFIG_PATH=<Path to godwoken config.toml>
   $ export GODWOKEN_CONFIG_PATH=~/godwoken/deploy/node1/config.toml
   $ yarn run copy-configs
   # LUMOS_CONFIG_FILE=<Path to config.json> node ./packages/tools/lib/account-cli.js deposit -c 40000000000 -p <privkey>
   $ LUMOS_CONFIG_FILE=~/config.json node ./packages/tools/lib/account-cli.js deposit -c 40000000000 -p 0xca02cc4b8e0e447e243204dd2e16a1692026bfdd4add502b203975999d3a6909
   ```

   For more information about generating the Lumos config file for DEV chain, see [Generate the config.json file for the DEV chain](https://cryptape.github.io/lumos-doc/docs/guides/config#step-1-generate-the-configjson-file-for-the-dev-chain).

9. Start the web3 server.

   1. Create a PostgreSQL instance.

      ```bash
      $ docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=godwoken -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
      ```

   2. Clone the source of [godwoken-web3](https://github.com/nervosnetwork/godwoken-web3) that is a Web3 RPC compatible layer build upon Godwoken and Polyjuice.

      ```bash
      $ git clone https://github.com/nervosnetwork/godwoken-web3
      ```

   3. Prepare the `.env` file under `/godwoken-web3/packages/api-server`.

      ```bash
      $ cd godwoken-web3
      $ cat > ./packages/api-server/.env <<EOF
      DATABASE_URL=postgres://user:password@postgres:5432/godwoken
      GODWOKEN_JSON_RPC=http://godwoken:8119
      ETH_ACCOUNT_LOCK_HASH=<Eth Account Lock Code Hash>
      ROLLUP_TYPE_HASH=<Rollup Type Hash>
      PORT=8024
      CHAIN_ID=1024777
      CREATOR_ACCOUNT_ID=3
      DEFAULT_FROM_ADDRESS=0x1eb6190f883e11a2a67bcfac9533b0a84f50ddfb
      POLYJUICE_VALIDATOR_TYPE_HASH=<Polyjuice Validator Code Hash>
      L2_SUDT_VALIDATOR_SCRIPT_TYPE_HASH=<L2 Sudt Validator Code Hash>
      TRON_ACCOUNT_LOCK_HASH=<Tron Account Lock Code Hash>
      EOF
      ```

   4. Start the Web3 server.

      To start the Web3 server properly, make sure to clear the postgres database, and then run the migration SQL file to recreate the tables before running the server:

      ```bash
      $ yarn
      $ yarn run migrate:latest
      $ yarn run build:godwoken
      $ yarn run start
      ```

## An Example of Deploying an Ethereum DApp to Polyjuice

Todo

复用 hackathon 的 tutorial, 1. 新建合约，2. 配置环境 3. 部署到 polyjuice 4. 调用， 可以咨询下 retricSu 有无适合的例子

## Project Examples

- [Porting an Existing Ethereum DApp to Polyjuice](https://github.com/TTNguyenDev/Hackathon-Nervos/tree/main/task_12#document-porting-an-existing-ethereum-dapp-to-polyjuice)

- [godwoken-simple](https://github.com/Kuzirashi/blockchain-workshop/tree/godwoken-simple)
- [godwoken-simple-js](https://github.com/Kuzirashi/blockchain-workshop/tree/godwoken-simple-js)
- [YokaiSwap](https://github.com/YokaiSwap)

## References

  ### Godwoken Nodes

Godwoken works by using **aggregator** nodes. 

The nodes are used to:

1. Collect specially designed layer 2 transactions.
2. Pack the special transactions into CKB transactions that can also be considered as layer 2 blocks.
3. Submit the CKB transactions to layer 1 for acceptance. **m** of **n** multisig keys are used to deploy on-chain cells to layer 1. Every update needs to be verified by the holders of the keys.

<!--<img src={useBaseUrl("img/godwoken.png")}  width="70%"/>-->

### Godwoken Node Modes

Godwoken nodes have three modes:

- **fullnode** mode: The Godwoken nodes in fullnode mode verify new blocks and transactions, relay blocks and transactions. The nodes are the verifiers of the network.

  :::note

  In the current stage, Godwoekn supports one single central node for producing blocks. To use fullnode mode Godwoken, a local DEV chain must be deployed for the development.

  :::

- **readonly** mode: By default, two readonly Godwoken nodes can be deployed in a deployment process. The two readonly nodes can synchronize the data of testnet or mainnet for queries.

- **test** mode: Test mode is used for Godwoken internal test purpose.

| Resource                          | Link                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| Nervos&nbsp;Document&nbsp;Website | https://docs.nervos.org/                                     |
| Godwoken Basics                   | <ul><li>[Introducing Godwoken - A missing piece of the cell model](https://talk.nervos.org/t/introducing-godwoken-a-missing-piece-of-the-cell-model/4464?_360safeparam=13594453)</li><li>[Towards CKB style Lego pieces: Polyjuice on Godwoken](https://medium.com/nervosnetwork/towards-ckb-style-lego-pieces-polyjuice-on-godwoken-cbc935d77abf)</li></ul> |
| Source&nbsp;Code                  | https://github.com/nervosnetwork/lumos                       |
| Godwoken-Kicker                   | [Godwoken-Kicker: one line command to start godwoken-polyjuice chain](https://github.com/RetricSu/godwoken-kicker) |
| Godwoken Testnet                  | [Godwoken Testnet](https://github.com/jjyr/godwoken-testnet) |
| Ethereum RPC (web3 RPC)           | [Ethereum RPC (web3 RPC)](https://geth.ethereum.org/docs/rpc/server) |
| Gitcoin Hackathon                 | <ul><li>[Godwoken Gitcoin Instruction](https://github.com/Kuzirashi/gw-gitcoin-instruction)</li><li>[NERVOS - BROADEN THE SPECTRUM](https://gitcoin.co/hackathon/nervos/onboard)</li></ul> |

## Glossary

Todo

sequencer

