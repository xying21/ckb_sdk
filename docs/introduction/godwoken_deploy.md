---
id: deploy
title: Deploy Godwoken
---

# Godwoken Deployment Process

Before entering the deployment process, make sure you have installed everything relevant as listed in the **Prerequisites** above.

### Step 1 Launch the CKB node with Tippy

```
`$ ``cd`` tippy``-``linux``-``x64``
$ ./Tippy
`
```


Tippy is a tool to help set up and manage CKB nodes. For more information, see the instruction of [Install a CKB node on DEV chain by using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy). 

Tippy is able to facilitate the modification of lock arg so as to acquire ckb. Furthermore, the miner configuration needs to be modified(using tippy). Once the parameters are modified, the existing data must be erased before enabling the ckb node and miner on the tippy dashboard. Refer to [CKB Nodes and Networks](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy) for more details.

### Step 2 Clone the Source with Git

```
git clone --recursive https://github.com/nervosnetwork/godwoken
cd godwoken
```

### Step 3 Duplicate a password file pk and a scripts-build.json file to the deploy folder（马克 要问）

### Step 4 Run the Setup Subcommand in GW-Tools Crate

The setup subcommand in gw-tools crate completes all setups prior to godwoken node starting as in preparing scripts, deploying scripts, deploying layer 2 genesis blocks, and generating configuration files. 
Run the following command:

```
RUST_LOG=info cargo +nightly run --bin gw-tools -- setup -s deploy/scripts-build.json -k deploy/pk -o deploy/
```

> **Note:** During this process, an error may be reported. Look carefully at the error message to find the source of the problem. If the connection error occurs, replace /tmp/scripts-build-dir/godwoken-polyjuice/Makefile line 157 and line 161 with #comment in the program after the error occurred.  (待定)

### Step 5 Modify the Reward Lock

Once the setup command completed successfully, a reward lock needs to be setup in the node's config.toml, the default relative path is deploy/node1/config.toml:

```
[block_producer.challenger_config.rewards_receiver_lock]code_hash = '<code_hash>'hash_type = 'type'args = '0x'
```

### Step 6 Start the Godwoken Node

Input the following command to start the godwoken node:

```
RUST_LOG=info cargo +nightly run --bin godwoken run -c deploy/node1/config.toml
```

