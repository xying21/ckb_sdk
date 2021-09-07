---
id: godwoken
title: Godwoken
sidebar_label: Godwoken
---
import useBaseUrl from "@docusaurus/useBaseUrl";

## Overview

**Godwoken** is a layer 2 rollup framework for Nervos CKB. It provides scaling capabilities with rollups that perform transaction execution outside CKB chain.

Godwoken supports optimistic rollups that can use the always success script or [Proof of Authority](https://github.com/nervosnetwork/clerkb) to issue layer 2 blocks. When POA is used, limited `block_producers` can issue layer 2 blocks. For more information, see [Life of a Godwoken transaction](https://github.com/nervosnetwork/godwoken/blob/master/docs/life_of_a_godwoken_transaction.md#life-of-a-godwoken-transaction).

Godwoken can support porting Ethereum DApps to CKB when Godwoken is deployed with Polyjuice. For more information about the deployment of Godwoken, see the sections of [Deploy a Godwoken chain with Polyjuice by Using Godwoken-Kicker](godwoken#deploy-a-godwoken-chain-with-polyjuice-by-using-godwoken-kicker) and [Deploy Godwoken Manually](godwoken#deploy-godwoken-manually).

Polyjuice is an Ethereum compatible layer that allows Solidity based smart contracts to run on Nervos CKB. Polyjuice uses [evmone](https://github.com/ethereum/evmone) as the EVM implementation in both `generator` and `validator`. It accepts Ethereum transactions and execute the transactions in EVM. For more information, see [Polyjuice for Godwoken](https://github.com/nervosnetwork/godwoken-polyjuice) and [Life of a Polyjuice Transaction](https://github.com/nervosnetwork/godwoken/blob/master/docs/life_of_a_polyjuice_transaction.md).

### Godwoken Aggregator Nodes

Godwoken works by using **aggregator** nodes. The aggregator nodes are used to:

1. Collect specially designed layer 2 transactions.
2. Pack the special transactions into CKB transactions that can also be considered as layer 2 blocks.
3. Submit the CKB transactions to layer 1 for acceptance. 

<img src={useBaseUrl("img/godwoken.png")}  width="70%"/>

### Deployment

Two deployment methods are provided for deploying a Godwoken chain with Polyjuice to fulfill different deployment requirements:

- Deploy a Godwoken chain with Polyjuice by using Godwoken-kicker

  Godwoken-kicker is a one line command to start a Godwoken chain with Polyjuice on **Devnet**. This deployment method can help developers deploy Ethereum contracts and migrate Ethereum DApps to CKB Devnet quickly in testing and development environments.

- Deploy a Godwoken chain with Polyjuice manually

  This deployment method is useful in situations such as deploying a Godwoken chain with Polyjuice on **Testnet**.

## Deploy a Godwoken Chain with Polyjuice by Using Godwoken-Kicker

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
    <li><p>Set up an Ethereum wallet.</p><p>In this example, a MetaMask (an Ethereum Wallet) wallet is set up for the deployment. Add the MetaMask extension in the browser (Firefox, Google Chrome, Brave or Microsoft Edge.) and create an account for the wallet.</p><p>If there is a MetaMask wallet ready to be used, skip this step and go to the next step directly.</p></li>    
    <li><p>Clone the source of Godwoken-kicker.</p>
        <p>If the source is already cloned, skip this step and go to the next step directly.</p>


```bash
$ git clone https://github.com/RetricSu/godwoken-kicker.git
```

</li>

<li>Initialize Godwoken-kicker.

:::note

Stop any running Godwoken chain by using the <code>make stop</code> command before initializing Godwoken-kicker.

:::

```bash
$ cd godwoken-kicker
$ make init
```

The <code>make init</code> command can be used in the following situations:

<ul><li>It is the first time to start the chain.</li>

<li>The deployment mode is changed.</li>

<li>The CKB chain data and all layer 1 related cache data are deleted.</li>

</ul></li>

<li>Start the Godwoken chain.

The <code>make start</code> command can be used to start the deployed Godwoken chain. If there is no chain deployed, the <code>make start -f</code> command can be used for a force start that deploys and starts a new Godwoken chain. 

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

<li>When the Godwoken chain is started successfully, open the website at <a>http://localhost:6100</a> and connect the MetaMask wallet by clicking the <b>Connect Wallet</b> button.</li>

<!--<li><p>Connect the Godwoken chain in MetaMask.</p>

<p>The New RPC URL (the web3 API of the Godwoken chain) and the Chain ID information can be found on the CHAIN INFO page at http://localhost:6100.</p>
<p><ul><li>New RPC URL: http://localhost:8024</li><li>Chain ID: 1024777</li></ul></p></li>-->

<li><p>Deploy an ETH contract to the Godwoken chain.</p><ol><li><p>Prepare and compile an ETH contract.</p></li>

<li>Deposit 400 CKB to the ETH wallet on the <b>ACCOUNTS</b> page of the Godwoken chain.</li>

<li>Deploy the ETH contract that you have compiled on the <b>CONTRACT</b> page of the Godwoken chain.</li></ol></li></ol>

</TabItem>
    <TabItem value="custom"><p>The custom mode is more flexible for custom requirements. It can build the components from local packages and executes the builds locally.</p><b>Environment</b><p><ul><li>Ubuntu 20.04 LTS</li></ul></p><b>Prerequisites</b><p><ul><li><a href="https://docs.docker.com/engine/install/ubuntu/">Docker Engine</a></li><li><a href="https://docs.docker.com/compose/install/">Docker Compose</a></li><li><a href="https://github.com/nervosnetwork/molecule">Moleculec</a></li><li>Rustup nightly</li></ul></p>

<p><b>Steps</b></p>

<ol>
    <li><p>Set up an Ethereum wallet.</p><p>In this example, a MetaMask (an Ethereum Wallet) wallet is set up for the deployment. Add the MetaMask extension in the browser (Firefox, Google Chrome, Brave or Microsoft Edge.) and create an account for the wallet.</p><p>If there is a MetaMask wallet ready to be used, skip this step and go to the next step directly.</p></li>    
<li>Clone the source of Godwoken-kicker.


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

<p>Update component version under the <code>[packages]</code> section in the <code>docker/.build.mode.env</code> file.</p>

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

<li>Initialize Godwoken-kicker.

:::note

Stop any running Godwoken chain by using the <code>make stop</code> command before initializing Godwoken-kicker.

:::

```bash
$ cd godwoken-kicker
$ make init
```

The <code>make init</code> command can be used in the following situations:

<ul><li>It is the first time to start the chain.</li>

<li>The deployment mode is changed.</li>

<li>The CKB chain data and all layer 1 related cache data are deleted.</li>

</ul></li>

<li>Start the Godwoken chain.

The <code>make start</code> command can be used to start the deployed Godwoken chain. If there is no chain deployed, the <code>make start -f</code> command can be used for a force start that deploys and starts a new Godwoken chain. 

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

<li>When the Godwoken chain is started successfully, open the website at <a>http://localhost:6100</a> and connect the MetaMask wallet by clicking the <b>Connect Wallet</b> button.</li>

<li><p>Deploy an ETH contract to the Godwoken chain.</p><ol><li><p>Prepare and compile an ETH contract.</p></li>

<li>Deposit 400 CKB to the ETH wallet on the <b>ACCOUNTS</b> page of the Godwoken chain.</li>

<li>Deploy the ETH contract that you have compiled on the <b>CONTRACT</b> page of the Godwoken chain.</li></ol></li></ol></TabItem>
</Tabs>

For more information about the Godwoken-kicker commands, see [godwoken-kicker](https://github.com/RetricSu/godwoken-kicker).

## Deploy Godwoken Manually

### Environment

* OS: Ubuntu 20.04

### Prerequisites

* [Capsule](https://github.com/nervosnetwork/capsule)
* [Moleculec](https://github.com/nervosnetwork/molecule)
* Rustup nightly
* Docker
* A CKB node ( >= 0.40.0) is installed and running on devnet or testnet. 

Before entering the deployment process, make sure you have installed everything relevant as listed in the **Prerequisites** above.

### Steps

1. Launch the CKB node.

   In this example, the CKB node is installed by using Tippy. Tippy is a tool to help set up and manage CKB  nodes. For more information about installing a CKB node by using Tippy, see the instruction of [Install a CKB Node by Using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy).

2. Clone the Godwoken source.

   ```bash
   $ git clone --recursive https://github.com/nervosnetwork/godwoken
   $ cd godwoken
   ```

3. Prepare a `pk` file that stores the private key, and a `scripts-build.json` file. Then copy the two files to the `/godwoken/deploy` folder.

   ```json title="/godwoken/deploy/scripts-build.json"
   {
       "prebuild_image": "nervos/godwoken-prebuilds:<tags>",
       "repos": {
           "godwoken_scripts": "https://github.com/nervosnetwork/godwoken-scripts#master",
           "godwoken_polyjuice": "https://github.com/nervosnetwork/godwoken-polyjuice#main",
           "clerkb": "https://github.com/nervosnetwork/clerkb#v0.4.0"
       }
   }
   ```

4. Set up Godwoken nodes.

   Run the setup subcommand completes all setups prior to before the node starts. These setups include preparing scripts, deploying scripts, deploying layer 2 genesis blocks, and generating configuration files. 

   Set up Godwoken nodes by using the following command:

   ```bash
   $ RUST_LOG=info cargo +nightly run --bin gw-tools -- setup -s deploy/scripts-build.json -k deploy/pk -o deploy/
   ```

   :::note

   If any error is encountered during the setup process, analyze the error message to find the solution.

   If the error is about failing to obtain the `godwoken.mol` and `blockchain.mol` file, there is a workaround as follows:

   <ul><li>Comment the line 157 and line 161 in the <code>/godwoken/tmp/scripts-build-dir/godwoken-polyjuice/Makefile</code> file. </li>
   <li>Download the two files manually and copy the files into the <code>/godwoken/tmp/scripts-build-dir/godwoken-polyjuice/build</code> folder.</li>
   <li>Execute the setup command again.</li>

   </ul>

   :::

5. Configure the receiver lock.

   Once the setup command completed successfully, a receiver lock needs to be setup in the node's `config.toml` file, the default relative path is `deploy/node1/config.toml`:

   ```toml title="config.toml"
   [block_producer.challenger_config.rewards_receiver_lock]
   code_hash = '<code_hash>'
   hash_type = 'type'
   args = '0x'
   ```

6. Start the Godwoken node.

   ```bash
   $ RUST_LOG=info cargo +nightly run --bin godwoken run -c deploy/node1/config.toml
   ```

   :::note

   The default node mode is `readonly ` and can be modified in `deploy/node1/config.toml` to either `fullnode` mode or `test` mode.
   In case the nodes need to be started within the same environment, it is possible to manually modify the listening port number in the config.toml for each of the nodes.

   :::

7. Setup Polyjuice.

   Clone the source of godwoken-examples. For more information, see [godwoken-examples](https://github.com/nervosnetwork/godwoken-examples).

   ```bash
   $ git clone --recursive https://github.com/nervosnetwork/godwoken-examples
   ```

   Then , create an account on Polyjuice, which may spend some time to build index for the first time. 

   ```bash
   $ cd godwoken-examples
   $ yarn && yarn run build-all
   $ export SCRIPT_DEPLOY_RESULT_PATH=<your godwoken scripts-deploy-result.json>
   $ export GODWOKEN_CONFIG_PATH=<your godwoken config.toml>
   $ yarn run copy-configs
   $ LUMOS_CONFIG_FILE=pwd/config.json node ./packages/tools/lib/account-cli.js deposit -c 40000000000 -p <privkey>
   ```


8. Create a PostgreSQL instance.

   ```bash
   $ docker run --name postgres -e POSTGRES_USER=user -e POSTGRES_DB=godwoken -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres
   ```

9. Start the web3 server.

   1. Clone the source of [godwoken-web3](https://github.com/nervosnetwork/godwoken-web3) that is a Web3 RPC compatible layer build upon Godwoken and Polyjuice.

      ```bash
      $ git clone https://github.com/nervosnetwork/godwoken-web3
      ```

   2. Prepare the `.env` file under `/godwoken-web3/packages/api-server`.

      ```bash
      $ cd godwoken-web3
      $ cat > ./packages/api-server/.env <<EOF
      DATABASE_URL=postgres://user:password@postgres:5432/godwoken
      GODWOKEN_JSON_RPC=http://godwoken:8119
      ETH_ACCOUNT_LOCK_HASH=$EthAccountLockCodeHash
      ROLLUP_TYPE_HASH=$RollupTypeHash
      PORT=8024
      CHAIN_ID=1024777
      CREATOR_ACCOUNT_ID=3
      DEFAULT_FROM_ADDRESS=0x6daf63d8411d6e23552658e3cfb48416a6a2ca78
      POLYJUICE_VALIDATOR_TYPE_HASH=$PolyjuiceValidatorCodeHash
      L2_SUDT_VALIDATOR_SCRIPT_TYPE_HASH=$L2SudtValidatorCodeHash
      TRON_ACCOUNT_LOCK_HASH=$TronAccountLockCodeHash
      EOF
      ```

   3. Start the Web3 server.

      To start the Web3 server properly, make sure to clear the postgres database, and then run the migration SQL file to recreate the tables before running the server:

      ```bash
      $ yarn
      $ yarn run migrate:latest
      $ yarn run build:godwoken
      $ yarn run start
      ```


9. Migrate an existing Ethereum DApp to Polyjuice.

   For more information and steps to follow, see [Document Porting An Existing Ethereum DApp To Polyjuice](https://github.com/TTNguyenDev/Hackathon-Nervos/tree/main/task_12#document-porting-an-existing-ethereum-dapp-to-polyjuice).

## References

| Resource                          | Link                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| Nervos&nbsp;Document&nbsp;Website | https://docs.nervos.org/                                     |
| Godwoken Basics                   | <ul><li>[Introducing Godwoken - A missing piece of the cell model](https://talk.nervos.org/t/introducing-godwoken-a-missing-piece-of-the-cell-model/4464?_360safeparam=13594453)</li><li>[Towards CKB style Lego pieces: Polyjuice on Godwoken](https://medium.com/nervosnetwork/towards-ckb-style-lego-pieces-polyjuice-on-godwoken-cbc935d77abf)</li></ul> |
| Source&nbsp;Code                  | https://github.com/nervosnetwork/lumos                       |
| Godwoken-Kicker                   | [Godwoken-Kicker: one line command to start godwoken-polyjuice chain](https://github.com/RetricSu/godwoken-kicker) |
| Godwoken Testnet                  | [Godwoken Testnet](https://github.com/jjyr/godwoken-testnet) |
| Ethereum RPC (web3 RPC)           | [Ethereum RPC (web3 RPC)](https://geth.ethereum.org/docs/rpc/server) |
| Gitcoin Hackathon                 | <ul><li>[Godwoken Gitcoin Instruction](https://github.com/Kuzirashi/gw-gitcoin-instruction)</li><li>[NERVOS - BROADEN THE SPECTRUM](https://gitcoin.co/hackathon/nervos/onboard)</li></ul> |

