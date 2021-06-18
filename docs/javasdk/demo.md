---
id: demo
title: Demo
---
## Get the Block Chain Information



## Get the Current Block Number



## Get the Current Block Information



## DAO Operations

```java title="ckb-sdk-java/example/src/main/java/org/nervos/ckb/NervosDaoExample.java"
package org.nervos.ckb;

import static org.nervos.ckb.utils.Const.*;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.nervos.ckb.crypto.secp256k1.Sign;
import org.nervos.ckb.indexer.*;
import org.nervos.ckb.service.Api;
import org.nervos.ckb.system.SystemContract;
import org.nervos.ckb.system.type.SystemScriptCell;
import org.nervos.ckb.transaction.*;
import org.nervos.ckb.type.Block;
import org.nervos.ckb.type.OutPoint;
import org.nervos.ckb.type.Script;
import org.nervos.ckb.type.Witness;
import org.nervos.ckb.type.cell.CellDep;
import org.nervos.ckb.type.cell.CellInput;
import org.nervos.ckb.type.cell.CellOutput;
import org.nervos.ckb.type.cell.CellWithStatus;
import org.nervos.ckb.type.fixed.UInt64;
import org.nervos.ckb.type.transaction.Transaction;
import org.nervos.ckb.type.transaction.TransactionWithStatus;
import org.nervos.ckb.utils.EpochUtils;
import org.nervos.ckb.utils.Numeric;
import org.nervos.ckb.utils.Utils;

/** Copyright © 2019 Nervos Foundation. All rights reserved. */
public class NervosDaoExample {
  private static final String NERVOS_DAO_DATA = "0x0000000000000000";
  private static final int DAO_LOCK_PERIOD_EPOCHS = 180;
  private static final int DAO_MATURITY_BLOCKS = 5;

  private static Api api;
  private static CkbIndexerApi ckbIndexerApi;
  private static String DaoTestPrivateKey =
      "08730a367dfabcadb805d69e0e613558d5160eb8bab9d6e326980c2c46a05db2";
  private static String DaoTestAddress = "ckt1qyqxgp7za7dajm5wzjkye52asc8fxvvqy9eqlhp82g";

  private static final String DEPOSIT = "deposit";
  private static final String WITHDRAW_PHASE1 = "withdraw";
  private static final String WITHDRAW_PHASE2 = "claim";

  static {
    api = new Api(NODE_URL, false);
    ckbIndexerApi = new CkbIndexerApi(CKB_INDEXER_URL, false);
  }

  public static void main(String[] args) throws Exception {
    if (args.length > 0) {
      if (DEPOSIT.equals(args[0])) {
        System.out.println("Before depositing, balance: " + getBalance(DaoTestAddress) + " CKB");
        Transaction transaction = generateDepositingToDaoTx(Utils.ckbToShannon(1000));
        String txHash = api.sendTransaction(transaction);
        System.out.println("Nervos DAO deposit tx hash: " + txHash);
        // Waiting some time to make tx into blockchain
        System.out.println("After depositing, balance: " + getBalance(DaoTestAddress) + " CKB");
      } else if (WITHDRAW_PHASE1.equals(args[0])) {
        // Nervos DAO withdraw phase1 must be after 4 epoch of depositing transaction
        String depositTxHash = args[1];
        OutPoint depositOutPoint = new OutPoint(depositTxHash, "0x0");
        Transaction transaction = generateWithdrawingFromDaoTx(depositOutPoint);
        String txHash = api.sendTransaction(transaction);
        System.out.println("Nervos DAO withdraw phase1 tx hash: " + txHash);
      } else if (WITHDRAW_PHASE2.equals(args[0])) {
        // Nervos DAO withdraw phase2 must be after 180 epoch of depositing transaction
        String withdrawTxHash = args[1];
        TransactionWithStatus withdrawTx = api.getTransaction(withdrawTxHash);
        OutPoint depositOutPoint = withdrawTx.transaction.inputs.get(0).previousOutput;
        OutPoint withdrawOutPoint = new OutPoint(withdrawTxHash, "0x0");
        Transaction transaction =
            generateClaimingFromDaoTx(depositOutPoint, withdrawOutPoint, Utils.ckbToShannon(0.01));
        String txHash = api.sendTransaction(transaction);
        System.out.println("Nervos DAO withdraw phase2 tx hash: " + txHash);
        // Waiting some time to make tx into blockchain
        System.out.println("After withdrawing, balance: " + getBalance(DaoTestAddress) + " CKB");
      }
    }
  }

  private static String getBalance(String address) throws IOException {
    return new IndexerCollector(api, ckbIndexerApi)
        .getCapacity(address)
        .divide(UnitCKB)
        .toString(10);
  }

  private static Transaction generateDepositingToDaoTx(BigInteger capacity) throws IOException {
    Script type =
        new Script(SystemContract.getSystemNervosDaoCell(api).cellHash, "0x", Script.TYPE);

    IndexerCollector txUtils = new IndexerCollector(api, ckbIndexerApi);

    List<CellOutput> cellOutputs =
        txUtils.generateOutputs(
            Collections.singletonList(new Receiver(DaoTestAddress, capacity)), DaoTestAddress);
    cellOutputs.get(0).type = type;

    List<String> cellOutputsData = Arrays.asList(NERVOS_DAO_DATA, "0x");

    List<ScriptGroupWithPrivateKeys> scriptGroupWithPrivateKeysList = new ArrayList<>();
    TransactionBuilder txBuilder = new TransactionBuilder(api);
    txBuilder.addOutputs(cellOutputs);
    txBuilder.setOutputsData(cellOutputsData);
    txBuilder.addCellDep(
        new CellDep(SystemContract.getSystemNervosDaoCell(api).outPoint, CellDep.CODE));

    // You can get fee rate by rpc or set a simple number
    BigInteger feeRate = BigInteger.valueOf(1024);
    IndexerCollector indexerCollector = new IndexerCollector(api, ckbIndexerApi);
    CollectResult collectResult =
        indexerCollector.collectInputs(
            Collections.singletonList(DaoTestAddress),
            txBuilder.buildTx(),
            feeRate,
            Sign.SIGN_LENGTH * 2);

    // update change output capacity after collecting cells
    cellOutputs.get(cellOutputs.size() - 1).capacity = collectResult.changeCapacity;
    txBuilder.setOutputs(cellOutputs);

    int startIndex = 0;
    for (CellsWithAddress cellsWithAddress : collectResult.cellsWithAddresses) {
      txBuilder.addInputs(cellsWithAddress.inputs);
      for (int i = 0; i < cellsWithAddress.inputs.size(); i++) {
        txBuilder.addWitness(i == 0 ? new Witness(Witness.SIGNATURE_PLACEHOLDER) : "0x");
      }
      scriptGroupWithPrivateKeysList.add(
          new ScriptGroupWithPrivateKeys(
              new ScriptGroup(NumberUtils.regionToList(startIndex, cellsWithAddress.inputs.size())),
              Collections.singletonList(DaoTestPrivateKey)));
      startIndex += cellsWithAddress.inputs.size();
    }

    Secp256k1SighashAllBuilder signBuilder = new Secp256k1SighashAllBuilder(txBuilder.buildTx());

    for (ScriptGroupWithPrivateKeys scriptGroupWithPrivateKeys : scriptGroupWithPrivateKeysList) {
      signBuilder.sign(
          scriptGroupWithPrivateKeys.scriptGroup, scriptGroupWithPrivateKeys.privateKeys.get(0));
    }
    return signBuilder.buildTx();
  }

  private static Transaction generateWithdrawingFromDaoTx(OutPoint depositOutPoint)
      throws IOException {
    CellWithStatus cellWithStatus = api.getLiveCell(depositOutPoint, true);
    if (!CellWithStatus.Status.LIVE.getValue().equals(cellWithStatus.status)) {
      throw new IOException("Cell is not yet live!");
    }
    TransactionWithStatus transactionWithStatus = api.getTransaction(depositOutPoint.txHash);
    if (!TransactionWithStatus.Status.COMMITTED
        .getValue()
        .equals(transactionWithStatus.txStatus.status)) {
      throw new IOException("Transaction is not committed yet!");
    }
    Block depositBlock = api.getBlock(transactionWithStatus.txStatus.blockHash);
    BigInteger depositBlockNumber = Numeric.toBigInt(depositBlock.header.number);
    CellOutput cellOutput = cellWithStatus.cell.output;

    String outputData = Numeric.toHexString(new UInt64(depositBlockNumber).toBytes());

    Script lock = LockUtils.generateLockScriptWithAddress(DaoTestAddress);
    CellOutput changeOutput = new CellOutput("0x0", lock);

    List<CellOutput> cellOutputs = Arrays.asList(cellOutput, changeOutput);
    List<String> cellOutputsData = Arrays.asList(outputData, "0x");
    List<String> headerDeps = Collections.singletonList(depositBlock.header.hash);

    List<ScriptGroupWithPrivateKeys> scriptGroupWithPrivateKeysList = new ArrayList<>();
    TransactionBuilder txBuilder = new TransactionBuilder(api);
    txBuilder.addCellDep(
        new CellDep(SystemContract.getSystemNervosDaoCell(api).outPoint, CellDep.CODE));
    txBuilder.setOutputsData(cellOutputsData);
    txBuilder.setHeaderDeps(headerDeps);
    txBuilder.addOutputs(cellOutputs);
    txBuilder.addInput(new CellInput(depositOutPoint, "0x0"));

    // You can get fee rate by rpc or set a simple number
    BigInteger feeRate = BigInteger.valueOf(1024);
    IndexerCollector indexerCollector = new IndexerCollector(api, ckbIndexerApi);
    CollectResult collectResult =
        indexerCollector.collectInputs(
            Collections.singletonList(DaoTestAddress),
            txBuilder.buildTx(),
            feeRate,
            Sign.SIGN_LENGTH * 2);

    // update change output capacity after collecting cells
    cellOutputs.get(cellOutputs.size() - 1).capacity = collectResult.changeCapacity;
    txBuilder.setOutputs(cellOutputs);

    CellsWithAddress cellsWithAddress = collectResult.cellsWithAddresses.get(0);
    txBuilder.setInputs(cellsWithAddress.inputs);
    for (int i = 0; i < cellsWithAddress.inputs.size(); i++) {
      if (i == 0) {
        txBuilder.addWitness(new Witness(Witness.SIGNATURE_PLACEHOLDER));
      } else {
        txBuilder.addWitness("0x");
      }
    }
    ScriptGroup scriptGroup =
        new ScriptGroup(NumberUtils.regionToList(0, cellsWithAddress.inputs.size()));
    scriptGroupWithPrivateKeysList.add(
        new ScriptGroupWithPrivateKeys(scriptGroup, Collections.singletonList(DaoTestPrivateKey)));

    Secp256k1SighashAllBuilder signBuilder = new Secp256k1SighashAllBuilder(txBuilder.buildTx());

    for (ScriptGroupWithPrivateKeys scriptGroupWithPrivateKeys : scriptGroupWithPrivateKeysList) {
      signBuilder.sign(
          scriptGroupWithPrivateKeys.scriptGroup, scriptGroupWithPrivateKeys.privateKeys.get(0));
    }
    return signBuilder.buildTx();
  }

  private static Transaction generateClaimingFromDaoTx(
      OutPoint depositOutPoint, OutPoint withdrawingOutPoint, BigInteger fee) throws IOException {
    Script lock = LockUtils.generateLockScriptWithAddress(DaoTestAddress);
    CellWithStatus cellWithStatus = api.getLiveCell(withdrawingOutPoint, true);
    if (!CellWithStatus.Status.LIVE.getValue().equals(cellWithStatus.status)) {
      throw new IOException("Cell is not yet live!");
    }
    TransactionWithStatus transactionWithStatus = api.getTransaction(withdrawingOutPoint.txHash);
    if (!TransactionWithStatus.Status.COMMITTED
        .getValue()
        .equals(transactionWithStatus.txStatus.status)) {
      throw new IOException("Transaction is not committed yet!");
    }

    BigInteger depositBlockNumber =
        new UInt64(Numeric.hexStringToByteArray(cellWithStatus.cell.data.content)).getValue();
    Block depositBlock = api.getBlockByNumber(Numeric.toHexStringWithPrefix(depositBlockNumber));
    EpochUtils.EpochInfo depositEpoch = EpochUtils.parse(depositBlock.header.epoch);

    Block withdrawBlock = api.getBlock(transactionWithStatus.txStatus.blockHash);
    EpochUtils.EpochInfo withdrawEpoch = EpochUtils.parse(withdrawBlock.header.epoch);

    long withdrawFraction = withdrawEpoch.index * depositEpoch.length;
    long depositFraction = depositEpoch.index * withdrawEpoch.length;
    long depositedEpochs = withdrawEpoch.number - depositEpoch.number;
    if (withdrawFraction > depositFraction) {
      depositedEpochs += 1;
    }
    long lockEpochs =
        (depositedEpochs + (DAO_LOCK_PERIOD_EPOCHS - 1))
            / DAO_LOCK_PERIOD_EPOCHS
            * DAO_LOCK_PERIOD_EPOCHS;
    long minimalSinceEpochNumber = depositEpoch.number + lockEpochs;
    long minimalSinceEpochIndex = depositEpoch.index;
    long minimalSinceEpochLength = depositEpoch.length;

    String minimalSince =
        EpochUtils.generateSince(
            minimalSinceEpochLength, minimalSinceEpochIndex, minimalSinceEpochNumber);
    String outputCapacity =
        api.calculateDaoMaximumWithdraw(depositOutPoint, withdrawBlock.header.hash);

    CellOutput cellOutput =
        new CellOutput(
            Numeric.toHexStringWithPrefix(Numeric.toBigInt(outputCapacity).subtract(fee)), lock);

    SystemScriptCell secpCell = SystemContract.getSystemSecpCell(api);
    SystemScriptCell nervosDaoCell = SystemContract.getSystemNervosDaoCell(api);

    Transaction tx =
        new Transaction(
            "0x0",
            Arrays.asList(
                new CellDep(secpCell.outPoint, CellDep.DEP_GROUP),
                new CellDep(nervosDaoCell.outPoint)),
            Arrays.asList(depositBlock.header.hash, withdrawBlock.header.hash),
            Collections.singletonList(new CellInput(withdrawingOutPoint, minimalSince)),
            Collections.singletonList(cellOutput),
            Collections.singletonList("0x"),
            Collections.singletonList(new Witness("", NERVOS_DAO_DATA, "")));

    return tx.sign(Numeric.toBigInt(DaoTestPrivateKey));
  }
}
```

Run the main method of the `NervosDaoExample` class by using gradle wrapper:

<details><summary>CLICK ME</summary>
<p>


```shell
$ cd myDapp
$ ./gradlew run --args="deposit"
> Task :run
Before depositing, balance: 602964 CKB
Nervos DAO deposit tx hash: 0xbc6acfb5f83620841157c25713afd2bccdd1451de0a3ab688b5010b4c30a1695
After depositing, balance: 602964 CKB

Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0.
Use '--warning-mode all' to show the individual deprecation warnings.
See https://docs.gradle.org/7.0.2/userguide/command_line_interface.html#sec:command_line_warnings

BUILD SUCCESSFUL in 1s
2 actionable tasks: 1 executed, 1 up-to-date
```

</p>
</details>

## Transfer CKB to a Multisig Address

```java title="ckb-sdk-java/example/src/main/java/org/nervos/ckb/SendToMultiSigAddressTxExample.java"
package org.nervos.ckb;

import static org.nervos.ckb.utils.Const.*;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.nervos.ckb.crypto.secp256k1.Sign;
import org.nervos.ckb.indexer.*;
import org.nervos.ckb.service.Api;
import org.nervos.ckb.transaction.*;
import org.nervos.ckb.type.Witness;
import org.nervos.ckb.type.cell.CellOutput;
import org.nervos.ckb.utils.Utils;

/** Copyright © 2019 Nervos Foundation. All rights reserved. */
public class SendToMultiSigAddressTxExample {

  private static Api api;
  private static CkbIndexerApi ckbIndexerApi;
  private static String MultiSigAddress = "ckt1qyqlqn8vsj7r0a5rvya76tey9jd2rdnca8lqh4kcuq";
  private static String TestPrivateKey =
      "d00c06bfd800d27397002dca6fb0993d5ba6399b4238b2f29ee9deb97593d2bc";
  private static String TestAddress = "ckt1qyqvsv5240xeh85wvnau2eky8pwrhh4jr8ts8vyj37";

  static {
    api = new Api(NODE_URL, false);
    ckbIndexerApi = new CkbIndexerApi(CKB_INDEXER_URL, false);
  }

  public static void main(String[] args) throws Exception {
    List<Receiver> receivers =
        Collections.singletonList(new Receiver(MultiSigAddress, Utils.ckbToShannon(20000)));
    String changeAddress = "ckt1qyqvsv5240xeh85wvnau2eky8pwrhh4jr8ts8vyj37";

    System.out.println("Before transferring, sender's balance: " + getBalance() + " CKB");

    System.out.println(
        "Before transferring, multi-sig address balance: " + getMultiSigBalance() + " CKB");

    System.out.println("Before transferring, change address balance: " + getBalance() + " CKB");

    String hash = sendCapacity(receivers, changeAddress);
    System.out.println("Transaction hash: " + hash);

    // waiting transaction into block, sometimes you should wait more seconds
    Thread.sleep(30000);

    System.out.println("After transferring, sender's address balance: " + getBalance() + " CKB");

    System.out.println(
        "After transferring, multi-sig address balance: " + getMultiSigBalance() + " CKB");

    System.out.println("After transferring, change address balance: " + getBalance() + " CKB");
  }

  private static String getBalance() throws IOException {
    return new IndexerCollector(api, ckbIndexerApi)
        .getCapacity(TestAddress)
        .divide(UnitCKB)
        .toString(10);
  }

  private static String getMultiSigBalance() throws IOException {
    return new IndexerCollector(api, ckbIndexerApi)
        .getCapacity(MultiSigAddress)
        .divide(UnitCKB)
        .toString(10);
  }

  private static String sendCapacity(List<Receiver> receivers, String changeAddress)
      throws IOException {
    TransactionBuilder txBuilder = new TransactionBuilder(api);
    IndexerCollector txUtils = new IndexerCollector(api, ckbIndexerApi);

    List<CellOutput> cellOutputs = txUtils.generateOutputs(receivers, changeAddress);
    txBuilder.addOutputs(cellOutputs);

    List<ScriptGroupWithPrivateKeys> scriptGroupWithPrivateKeysList = new ArrayList<>();

    // You can get fee rate by rpc or set a simple number
    BigInteger feeRate = BigInteger.valueOf(1024);

    // initial_length = 2 * secp256k1_signature_byte.length
    CollectResult collectResult =
        txUtils.collectInputs(
            Collections.singletonList(TestAddress),
            txBuilder.buildTx(),
            feeRate,
            Sign.SIGN_LENGTH * 2);

    // update change cell output capacity after collecting cells
    cellOutputs.get(cellOutputs.size() - 1).capacity = collectResult.changeCapacity;
    txBuilder.setOutputs(cellOutputs);

    int startIndex = 0;
    for (CellsWithAddress cellsWithAddress : collectResult.cellsWithAddresses) {
      txBuilder.addInputs(cellsWithAddress.inputs);
      for (int i = 0; i < cellsWithAddress.inputs.size(); i++) {
        txBuilder.addWitness(i == 0 ? new Witness(Witness.SIGNATURE_PLACEHOLDER) : "0x");
      }
      scriptGroupWithPrivateKeysList.add(
          new ScriptGroupWithPrivateKeys(
              new ScriptGroup(NumberUtils.regionToList(startIndex, cellsWithAddress.inputs.size())),
              Collections.singletonList(TestPrivateKey)));
    }

    Secp256k1SighashAllBuilder signBuilder = new Secp256k1SighashAllBuilder(txBuilder.buildTx());

    for (ScriptGroupWithPrivateKeys scriptGroupWithPrivateKeys : scriptGroupWithPrivateKeysList) {
      signBuilder.sign(
          scriptGroupWithPrivateKeys.scriptGroup, scriptGroupWithPrivateKeys.privateKeys.get(0));
    }

    return api.sendTransaction(signBuilder.buildTx());
  }
}
```

Run the main method of the `SendToMultiSigAddressTxExample` class by using gradle:

<details><summary>CLICK ME</summary>
<p>


```shell
$ cd myDapp
$ gradle run
> Task :run
Before transferring, sender's balance: 20001406910 CKB
Before transferring, multi-sig address balance: 0 CKB
Before transferring, change address balance: 20001406910 CKB
Transaction hash: 0x99340f20e59915c66dd802c7fe98c56e91728a1e1a9ba0b426c500472b7ba5d1
After transferring, sender's address balance: 20002391844 CKB
After transferring, multi-sig address balance: 20000 CKB
After transferring, change address balance: 20002391844 CKB
```

</p>
</details>

## Transfer CKB to Multiple Receivers

```java title="ckb-sdk-java/example/src/main/java/org/nervos/ckb/SingleSigWithCkbIndexerTxExample.java"
package org.nervos.ckb;

import static org.nervos.ckb.utils.Const.*;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.nervos.ckb.address.AddressUtils;
import org.nervos.ckb.address.Network;
import org.nervos.ckb.crypto.secp256k1.ECKeyPair;
import org.nervos.ckb.crypto.secp256k1.Sign;
import org.nervos.ckb.indexer.*;
import org.nervos.ckb.service.Api;
import org.nervos.ckb.transaction.*;
import org.nervos.ckb.type.Witness;
import org.nervos.ckb.type.cell.CellOutput;
import org.nervos.ckb.type.transaction.Transaction;
import org.nervos.ckb.utils.Numeric;
import org.nervos.ckb.utils.Utils;

/** Copyright © 2019 Nervos Foundation. All rights reserved. */
public class SingleSigWithCkbIndexerTxExample {

  private static Api api;
  private static CkbIndexerApi ckbIndexerApi;
  private static List<String> SendPrivateKeys;
  private static List<String> SendAddresses;
  private static List<String> ReceiveAddresses;

  static {
    api = new Api(NODE_URL, false);
    ckbIndexerApi = new CkbIndexerApi(CKB_INDEXER_URL, false);
    SendPrivateKeys =
        Arrays.asList("e79f3207ea4980b7fed79956d5934249ceac4751a4fae01a0f7c4a96884bc4e3");
    SendAddresses = Arrays.asList("ckt1qyqrdsefa43s6m882pcj53m4gdnj4k440axqswmu83");
    ReceiveAddresses =
        Arrays.asList(
            "ckt1qyqvsv5240xeh85wvnau2eky8pwrhh4jr8ts8vyj37",
            "ckt1qyqtnz38fht9nvmrfdeunrhdtp29n0gagkps4duhek",
            "ckt1qg8mxsu48mncexvxkzgaa7mz2g25uza4zpz062relhjmyuc52ps3zn47dugwyk5e6mgxvlf5ukx7k3uyq9wlkkmegke");
  }

  public static void main(String[] args) throws Exception {
    AddressUtils utils = new AddressUtils(Network.TESTNET);
    for (int i = 0; i < SendAddresses.size() - 1; i++) {
      String testPublicKey = ECKeyPair.publicKeyFromPrivate(SendPrivateKeys.get(i));
      String address = SendAddresses.get(i);
      if (!address.equals(utils.generateFromPublicKey(testPublicKey))) {
        System.out.println("Private key and address " + address + " are not matched");
        return;
      }
    }

    System.out.println("Wait some time for ckb-indexer running");

    List<Receiver> receivers =
        Arrays.asList(
            new Receiver(ReceiveAddresses.get(0), Utils.ckbToShannon(200)),
            new Receiver(ReceiveAddresses.get(1), Utils.ckbToShannon(200)),
            new Receiver(ReceiveAddresses.get(2), Utils.ckbToShannon(300)));

    System.out.println(
        "Before transferring, first sender's balance: "
            + getBalance(SendAddresses.get(0)).divide(UnitCKB).toString(10)
            + " CKB");

    String hash = sendCapacity(receivers, SendAddresses.get(0));
    System.out.println("Transaction hash: " + hash);

    // waiting transaction into block, sometimes you should wait more seconds
    Thread.sleep(30000);

    System.out.println(
        "After transferring, first sender's balance: "
            + getBalance(SendAddresses.get(0)).divide(UnitCKB).toString(10)
            + " CKB");
  }

  private static BigInteger getBalance(String address) throws IOException {
    return new IndexerCollector(api, ckbIndexerApi).getCapacity(address);
  }

  private static String sendCapacity(List<Receiver> receivers, String changeAddress)
      throws IOException {
    List<ScriptGroupWithPrivateKeys> scriptGroupWithPrivateKeysList = new ArrayList<>();

    TransactionBuilder txBuilder = new TransactionBuilder(api);
    IndexerCollector txUtils = new IndexerCollector(api, ckbIndexerApi);

    List<CellOutput> cellOutputs = txUtils.generateOutputs(receivers, changeAddress);
    txBuilder.addOutputs(cellOutputs);

    // You can get fee rate by rpc or set a simple number
    BigInteger feeRate = BigInteger.valueOf(1024);

    // initial_length = 2 * secp256k1_signature_byte.length
    // collectInputsWithIndexer method uses indexer rpc to collect cells quickly
    CollectResult collectResult =
        txUtils.collectInputs(SendAddresses, txBuilder.buildTx(), feeRate, Sign.SIGN_LENGTH * 2);

    // update change cell output capacity after collecting cells if there is changeOutput
    if (Numeric.toBigInt(collectResult.changeCapacity).compareTo(BigInteger.ZERO) > 0) {
      cellOutputs.get(cellOutputs.size() - 1).capacity = collectResult.changeCapacity;
      txBuilder.setOutputs(cellOutputs);
    }

    int startIndex = 0;
    for (CellsWithAddress cellsWithAddress : collectResult.cellsWithAddresses) {
      txBuilder.addInputs(cellsWithAddress.inputs);
      for (int i = 0; i < cellsWithAddress.inputs.size(); i++) {
        txBuilder.addWitness(i == 0 ? new Witness(Witness.SIGNATURE_PLACEHOLDER) : "0x");
      }
      if (cellsWithAddress.inputs.size() > 0) {
        scriptGroupWithPrivateKeysList.add(
            new ScriptGroupWithPrivateKeys(
                new ScriptGroup(
                    NumberUtils.regionToList(startIndex, cellsWithAddress.inputs.size())),
                Collections.singletonList(
                    SendPrivateKeys.get(SendAddresses.indexOf(cellsWithAddress.address)))));
        startIndex += cellsWithAddress.inputs.size();
      }
    }

    Secp256k1SighashAllBuilder signBuilder = new Secp256k1SighashAllBuilder(txBuilder.buildTx());

    for (ScriptGroupWithPrivateKeys scriptGroupWithPrivateKeys : scriptGroupWithPrivateKeysList) {
      signBuilder.sign(
          scriptGroupWithPrivateKeys.scriptGroup, scriptGroupWithPrivateKeys.privateKeys.get(0));
    }
    Transaction tx = signBuilder.buildTx();
    return api.sendTransaction(tx);
  }
}
```

Run the main method of the `SingleSigWithCkbIndexerTxExample` class by using gradle:

<details><summary>CLICK ME</summary>
<p>


```shell
$ cd myDapp
$ gradle run
> Task :run
Before transferring, sender's balance: 20001406910 CKB
Before transferring, multi-sig address balance: 0 CKB
Before transferring, change address balance: 20001406910 CKB
Transaction hash: 0x99340f20e59915c66dd802c7fe98c56e91728a1e1a9ba0b426c500472b7ba5d1
After transferring, sender's address balance: 20002391844 CKB
After transferring, multi-sig address balance: 20000 CKB
After transferring, change address balance: 20002391844 CKB
```

</p>
</details>

## Transfer all Balance

```java title="ckb-sdk-java/example/src/main/java/org/nervos/ckb/TransferAllBalanceWithCkbIndexerExample.java"
package org.nervos.ckb;

import static org.nervos.ckb.utils.Const.*;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.nervos.ckb.address.AddressUtils;
import org.nervos.ckb.address.Network;
import org.nervos.ckb.crypto.secp256k1.ECKeyPair;
import org.nervos.ckb.crypto.secp256k1.Sign;
import org.nervos.ckb.indexer.*;
import org.nervos.ckb.service.Api;
import org.nervos.ckb.transaction.*;
import org.nervos.ckb.type.Witness;
import org.nervos.ckb.type.cell.CellOutput;
import org.nervos.ckb.type.transaction.Transaction;
import org.nervos.ckb.utils.Numeric;
import org.nervos.ckb.utils.Utils;

/** Copyright © 2019 Nervos Foundation. All rights reserved. */
public class TransferAllBalanceWithCkbIndexerExample {

  private static Api api;
  private static CkbIndexerApi ckbIndexerApi;
  private static List<String> SendPrivateKeys;
  private static List<String> SendAddresses;
  private static List<String> ReceiveAddresses;

  static {
    api = new Api(NODE_URL, false);
    ckbIndexerApi = new CkbIndexerApi(CKB_INDEXER_URL, false);
    SendPrivateKeys =
        Collections.singletonList(
            "d00c06bfd800d27397002dca6fb0993d5ba6399b4238b2f29ee9deb97593d2bc");
    SendAddresses = Collections.singletonList("ckt1qyqvsv5240xeh85wvnau2eky8pwrhh4jr8ts8vyj37");
    ReceiveAddresses = Collections.singletonList("ckt1qyqxvnycu7tdtyuejn3mmcnl4y09muxz8c3s2ewjd4");
  }

  public static void main(String[] args) throws Exception {
    AddressUtils utils = new AddressUtils(Network.TESTNET);
    for (int i = 0; i < SendAddresses.size() - 1; i++) {
      String testPublicKey = ECKeyPair.publicKeyFromPrivate(SendPrivateKeys.get(i));
      String address = SendAddresses.get(i);
      if (!address.equals(utils.generateFromPublicKey(testPublicKey))) {
        System.out.println("Private key and address " + address + " are not matched");
        return;
      }
    }

    System.out.println("Wait some time for ckb-indexer running");

    List<Receiver> receivers =
        Collections.singletonList(new Receiver(ReceiveAddresses.get(0), Utils.ckbToShannon(100)));

    System.out.println(
        "Before transferring, first sender's balance: "
            + getBalance(SendAddresses.get(0)).divide(UnitCKB).toString(10)
            + " CKB");

    // For transferring all balance, change address is set to be null
    // Because the transfer of the entire balance will not set the change cell, you need to
    // carefully calculate the transfer amount
    String hash = sendCapacity(receivers, null);
    System.out.println("Transaction hash: " + hash);

    // waiting transaction into block, sometimes you should wait more seconds
    Thread.sleep(30000);

    System.out.println(
        "After transferring, first sender's balance: "
            + getBalance(SendAddresses.get(0)).divide(UnitCKB).toString(10)
            + " CKB");
  }

  private static BigInteger getBalance(String address) throws IOException {
    return new IndexerCollector(api, ckbIndexerApi).getCapacity(address);
  }

  private static String sendCapacity(List<Receiver> receivers, String changeAddress)
      throws IOException {
    List<ScriptGroupWithPrivateKeys> scriptGroupWithPrivateKeysList = new ArrayList<>();

    TransactionBuilder txBuilder = new TransactionBuilder(api);
    IndexerCollector txUtils = new IndexerCollector(api, ckbIndexerApi);

    List<CellOutput> cellOutputs = txUtils.generateOutputs(receivers, changeAddress);
    txBuilder.addOutputs(cellOutputs);

    // You can get fee rate by rpc or set a simple number
    BigInteger feeRate = BigInteger.valueOf(1024);

    // initial_length = 2 * secp256k1_signature_byte.length
    // collectInputsWithIndexer method uses indexer rpc to collect cells quickly
    CollectResult collectResult =
        txUtils.collectInputs(SendAddresses, txBuilder.buildTx(), feeRate, Sign.SIGN_LENGTH * 2);

    // update change cell output capacity after collecting cells if there is changeOutput
    if (Numeric.toBigInt(collectResult.changeCapacity).compareTo(BigInteger.ZERO) > 0) {
      cellOutputs.get(cellOutputs.size() - 1).capacity = collectResult.changeCapacity;
      txBuilder.setOutputs(cellOutputs);
    }

    int startIndex = 0;
    for (CellsWithAddress cellsWithAddress : collectResult.cellsWithAddresses) {
      txBuilder.addInputs(cellsWithAddress.inputs);
      for (int i = 0; i < cellsWithAddress.inputs.size(); i++) {
        txBuilder.addWitness(i == 0 ? new Witness(Witness.SIGNATURE_PLACEHOLDER) : "0x");
      }
      if (cellsWithAddress.inputs.size() > 0) {
        scriptGroupWithPrivateKeysList.add(
            new ScriptGroupWithPrivateKeys(
                new ScriptGroup(
                    NumberUtils.regionToList(startIndex, cellsWithAddress.inputs.size())),
                Collections.singletonList(
                    SendPrivateKeys.get(SendAddresses.indexOf(cellsWithAddress.address)))));
        startIndex += cellsWithAddress.inputs.size();
      }
    }

    Secp256k1SighashAllBuilder signBuilder = new Secp256k1SighashAllBuilder(txBuilder.buildTx());

    for (ScriptGroupWithPrivateKeys scriptGroupWithPrivateKeys : scriptGroupWithPrivateKeysList) {
      signBuilder.sign(
          scriptGroupWithPrivateKeys.scriptGroup, scriptGroupWithPrivateKeys.privateKeys.get(0));
    }
    Transaction tx = signBuilder.buildTx();
    return api.sendTransaction(tx);
  }
}
```

Run the main method of the `TransferAllBalanceWithCkbIndexerExample` class by using gradle:

<details><summary>CLICK ME</summary>
<p>


```shell
$ cd myDapp
$ gradle run
> Task :run
Wait some time for ckb-indexer running
Before transferring, first sender's balance: 20005808806 CKB
Transaction hash: 0x7fd0a39a559c4d3c7043849365e58b82ed3d4bdf8b3344fa2fdf3ea18c7fd098
After transferring, first sender's balance: 20005607818 CKB
```

</p>
</details>