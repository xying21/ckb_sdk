---
id: godwoken
title: Godwoken
sidebar_label: Godwoken
---
import useBaseUrl from "@docusaurus/useBaseUrl";

**Godwoken** is a layer 2 rollup framework for Nervos CKB. It provides scaling capabilities with rollups that perform transaction execution outside CKB chain.

Godwoken supports optimistic rollups that can use the always success script or [Proof of Authority](https://github.com/nervosnetwork/clerkb) to issue layer 2 blocks. When POA is used, limited `block_producers` can issue layer 2 blocks. For more information, see [Life of a Godwoken transaction](https://github.com/nervosnetwork/godwoken/blob/master/docs/life_of_a_godwoken_transaction.md#life-of-a-godwoken-transaction).

Godwoken can support porting Ethereum DApps to CKB when it is integrated with Polyjuice. Polyjuice is an Ethereum compatible layer that allows Solidity based smart contracts to run on Nervos. Polyjuice uses [evmone](https://github.com/ethereum/evmone) as the EVM implementation in both `generator` and `validator`. It accepts Ethrereum transactions and execute the transactions in EVM. For more information, see [Polyjuice for Godwoken](https://github.com/nervosnetwork/godwoken-polyjuice) and [Life of a Polyjuice Transaction](https://github.com/nervosnetwork/godwoken/blob/master/docs/life_of_a_polyjuice_transaction.md).

## How Does It Work?

Godwoken works by using **aggregator** nodes. The aggregator nodes are used to:

1. Collect specially designed layer 2 transactions.
2. Pack the special transactions into CKB transactions that can also be considered as layer 2 blocks.
3. Submit the CKB transactions to layer 1 for acceptance. 

<img src={useBaseUrl("img/godwoken.png")}  width="70%"/>

## Quickstart

### Environment

- OS: Ubuntu 20.04

### Prerequisites

- [Capsule](https://github.com/nervosnetwork/capsule)
- [Moleculec](https://github.com/nervosnetwork/molecule)

- Rust nightly
- Docker
- A CKB node ( >= 0.40.0) is installed and running on DEV chain. For more information about installing a CKB node, see [Install a CKB Node by Using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy).

### Deploy Godwoken

#### Step 1. Build scripts

```
cd godwoken-scripts && cd c && make && cd - && capsule build --release --debug-output
```

#### Step 2. Build PoA scripts

```
git clone --recursive https://github.com/nervosnetwork/clerkb
cd clerkb
yarn
make all-via-docker
cp build/debug/poa godwoken-scripts/build/release/poa
cp build/debug/state godwoken-scripts/build/release/state
```

#### Step 3. Deploy scripts

Create scripts-deploy.json

```
mkdir deploy
touch deploy/scripts-deploy.json
{
  "programs": {
    "custodian_lock": "/scripts/release/always-success",
    "deposition_lock": "/scripts/release/always-success",
    "withdrawal_lock": "/scripts/release/always-success",
    "challenge_lock": "/scripts/release/always-success",
    "stake_lock": "/scripts/release/always-success",
    "state_validator": "/scripts/release/always-success",
    "l2_sudt_validator": "/scripts/release/always-success",
    "meta_contract_validator": "/scripts/release/always-success",
    "eth_account_lock": "/scripts/release/always-success",
    "tron_account_lock": "/scripts/release/always-success",
    "polyjuice_validator": "/scripts/release/always-success",
    "state_validator_lock": "/scripts/release/always-success",
    "poa_state": "/scripts/release/always-success"
  },
  "lock": {
    "code_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "hash_type": "data",
    "args": "0x"
  }
}
```

Replace the always-success with the real one in scripts-deploy.json above.

Command:

```
cd godwoken
cargo run --bin gw-tools -- deploy-scripts -i deploy/scripts-deploy.json -o deploy/scripts-deploy-result.json -k ../ckb_nodes/dev1/pk
```

#### Step 4. Deploy layer2 genesis

Create poa-config.json

```
touch deploy/poa-config.json
```

setup two godwoken nodes:

```
{
  "poa_setup": {
    "identity_size": 32,
    "round_interval_uses_seconds": true,
    "identities": [
      "<Godwoken wallet lock script hash 1>",
      "<Godwoken wallet lock script hash 2>"
    ],
    "aggregator_change_threshold": 2,
    "round_intervals": 24,
    "subblocks_per_round": 1
  }
}
```

Create rollup-config.json

```
touch deploy/rollup-config.json
{
  "l1_sudt_script_type_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "burn_lock_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "required_staking_capacity": 10000000000,
  "challenge_maturity_blocks": 5,
  "finality_blocks": 20,
  "reward_burn_rate": 50,
  "compatible_chain_id": 0,
  "allowed_eoa_type_hashes": []
}
```

Command:

```
cargo run --bin gw-tools -- deploy-genesis -k deploy/pk_gw1 -d deploy/scripts-deploy-result.json -p deploy/poa-config.json -u deploy/rollup-config.json -o deploy/genesis-deploy-result.json
```

#### Step 5. Build polyjuice

```
git clone --recursive https://github.com/nervosnetwork/godwoken-polyjuice.git
cd godwoken-polyjuice && make all-via-docker
cp build/generator /deploy/polyjuice-generator
# We should use real one in the later version
cp /godwoken-scripts/build/release/always-success /deploy/polyjuice-validator
```

#### Step 6. Generate godwoken config

```
cargo run --bin gw-tools -- generate-config -g deploy/genesis-deploy-result.json -s deploy/scripts-deploy-result.json -p deploy/ -o config.toml
```

Update config.toml for every godwoken node:

```
[rpc_server]
listen = 'localhost:8119'
[[backends]]
validator_path = 'deploy/polyjuice-validator' # update the path to your own
generator_path = 'deploy/polyjuice-generator' # update the path to your own
[block_producer.wallet_config]
privkey_path = './deploy/pk_gw1' # update godwoken node private key path

[block_producer.wallet_config.lock]
code_hash = '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8' # update to the block_assembler.code_hash
hash_type = 'type' # update to 'type'
args = '0x3d7037a69dbb4fa019ca1b11f86b70470d2ab1d0' # update to godwoken wallet lock_arg
```

Run:

```
RUST_LOG=info cargo run --bin godwoken
```

#### Step 7. Start Godwoken

```
docker run -vgodwoken-internal/deployment-notes/testnet/operator-config.toml:/deploy/config.toml -v/deploy/godwoken-testnet-v2/pk2:/deploy/pk -eRUST_BACKTRACE=1 nervos/godwoken-prebuilds:v0.5.0-rc1 godwoken run -c /deploy/config.toml
```

#### Step 8. Setup Polyjuice

First, clone & setup [godwoken-examples](https://github.com/nervosnetwork/godwoken-examples)

Then, deposit to create an account. (Need some time to build index in the first time running).

```
LUMOS_CONFIG_FILE=`pwd`/config.json node ./packages/tools/lib/account-cli.js deposit -c 40000000000 -p <privkey>
```

#### Step 9. Start Web3 Server

1. Clear the postgres DB.
2. Run migration sql files to recreate tables.
3. Run server

```
docker run -vweb3.env:/godwoken-web3/packages/api-server/.env -w/godwoken-web3 nervos/godwoken-js-prebuilds:v0.3.1-rc2 yarn workspace @godwoken-web3/api-server start
```

### Porting Ethereum Dapps to Polyjuice



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

