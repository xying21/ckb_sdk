---
id: overview_java
title: ckb-sdk-java
sidebar_label: ckb-sdk-java
---
- [Overview](#overview)
- [Features](#features)
- [License](#license)
- [Changelog](#changelog)
- [Contact & Support](#contact---support)
- [Contribution](#contribution)
- [Quick Start](#quick-start)
  * [System Requirements](#system-requirements)
  * [Install and Run a CKB Node on DEV Chain](#install-and-run-a-ckb-node-on-dev-chain)
  * [Get CKB Capacity for Test Accounts](#get-ckb-capacity-for-test-accounts)
  * [Install JDK](#install-jdk)
  * [Set Up the Project by Using Gradle](#set-up-the-project-by-using-gradle)
  * [Set Up the Project by Using Maven](#set-up-the-project-by-using-maven)
- [Examples](#examples)
  * [RPC Examples](#rpc-examples)
  * [Single-sig Transfer](#single-sig-transfer)
  * [Multi-sig Transfer](#multi-sig-transfer)
  * [Issue and Transfer SUDT](#issue-and-transfer-sudt)
  * [ACP Transaction](#acp-transaction)
  * [Generate Addresses](#generate-addresses)

## Overview

CKB Java SDK (ckb-sdk-java) encapsulates cryptographic algorithms and RPC services to support the development of applications on [CKB](https://github.com/nervosnetwork/ckb). The knowledge of CKB Data Model (see [Nervos CKB Reference](https://docs.nervos.org/docs/reference/introduction) and [CKB RFC: CKB Data Structures](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0019-data-structures/0019-data-structures.md)) and [JSON-RPC](https://github.com/nervosnetwork/ckb/tree/develop/rpc) are crucial in developing applications by using this SDK.

The SDK uses the [DefaultCkbApi](https://github.com/nervosnetwork/ckb-sdk-java/blob/455f866c6faf5f63c781e74edefac5f7426a4019/ckb-api/src/main/java/org/nervos/api/DefaultCkbApi.java#L54) API to support the **CKB**, **CKB indexer** and **Mercury** module starting from 0.43.1 version. For more information, see [CkbApiTest.java](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-api/src/test/java/org/nervos/api/CkbApiTest.java).<!--The SDK has started supporting the CKB indexer module since the indexer module was deprecated in [ckb_v0.36.0](https://github.com/nervosnetwork/ckb/releases/tag/v0.36.0). For more information about the CKB indexer module, see the [examples](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example/src/main/java/org/nervos/ckb) of CKB indexer.-->

<!--For more information about the CKB indexer module, see the [examples](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example/src/main/java/org/nervos/ckb) of CKB indexer.-->

<!--For more information about the Mercury module, see the Mercury examples.-->

## Features

- Wallet management
- Account management
- Cryptocurrency management
- Communication with CKB networks
- Token management. For more information, see [Mercury](https://github.com/nervosnetwork/mercury).

## License

CKB Java SDK is available as an open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Changelog

For more information, see [CHANGELOG](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/CHANGELOG.md).

## Contact & Support

CKB Java SDK is under continuous development. Comments on the functionality of the SDK can be posted [here](https://github.com/nervosnetwork/ckb-sdk-java/issues). Any comments and suggestions are welcome and appreciated.

## Contribution

:::note

CKB Java SDK uses [Google Java Code Format](https://google.github.io/styleguide/javaguide.html#s4.5-line-wrapping) and follows [Google Check Style](https://github.com/checkstyle/checkstyle/blob/master/src/main/resources/google_checks.xml) for the development.

If you encounter the `verifyGoogleJavaFormat FAILED` error when building your code for contributing to the SDK, format the code following [Google Java Code Format](https://google.github.io/styleguide/javaguide.html#s4.5-line-wrapping), or execute `./gradlew goJF` on macOS and Linux or execute `gradlew goJF` on Windows.

For the development by using IntelliJ IDEA, you can install the `google-java-format` plugin to format the code automatically.

:::

## Quick Start

The following steps lay out a project to develop applications with CKB Java SDK. With this quick introduction, you can create a Java project and perform a RPC query method.

The project can be set up and built by using [Gradle](https://docs.gradle.org/current/userguide/what_is_gradle.html) or [Maven](https://maven.apache.org/what-is-maven.html). You can either start from scratch and work through each step, or you can bypass the basic setup steps that you are already familiar with. To write more code, take a look at the Java [examples](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example).

### System Requirements

- Operating System:  All major platforms including Linux, Windows, and macOS.
- CKB node
- JDK (version 8 or higher)
- Gradle (version 5.0 or higher) or Maven

### Install and Run a CKB Node on DEV Chain

For more information, see [Install a CKB Node on DEV Chain by Using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy).

### Get CKB Capacity for Test Accounts

Here are several test accounts that can be used for testing purpose in this tutorial.

:::note

Do **not** use these private keys, addresses and args elsewhere.

:::

```
Account 1 {
PrivateKey: "0x08730a367dfabcadb805d69e0e613558d5160eb8bab9d6e326980c2c46a05db2"
Public Key: "0x032edb83018b57ddeb9bcc7287c5cc5da57e6e0289d31c9e98cb361e88678d6288"
Lock args: 0x6407c2ef9bd96e8e14ac4cd15d860e9331802172
Address: 'ckt1qyqxgp7za7dajm5wzjkye52asc8fxvvqy9eqlhp82g',
}
Account 2 {
Private Key: "0xd00c06bfd800d27397002dca6fb0993d5ba6399b4238b2f29ee9deb97593d2bc"
Public Key: "0x03fe6c6d09d1a0f70255cddf25c5ed57d41b5c08822ae710dc10f8c88290e0acdf"
Lock Args: 0xc8328aabcd9b9e8e64fbc566c4385c3bdeb219d7
Address: ckt1qyqvsv5240xeh85wvnau2eky8pwrhh4jr8ts8vyj37
}
Account 3 {
Private Key: "0xe79f3207ea4980b7fed79956d5934249ceac4751a4fae01a0f7c4a96884bc4e3"
Public Key: "0x024a501efd328e062c8675f2365970728c859c592beeefd6be8ead3d901330bc01"
Lock Args: 0x36c329ed630d6ce750712a477543672adab57f4c
Address: ckt1qyqrdsefa43s6m882pcj53m4gdnj4k440axqswmu83
}
```

To obtain CKB capacity for an account on a DEV chain:

1. Assign the lock args of the account to **Block Assembler Lock Arg** in the Edit Chain form on Tippy explorer and save the changes.
2. Restart the CKB node and start the CKB miner on the Tippy dashboard.

For more information about CKB accounts and capacity, see [CKB Accounts and Capacity](https://cryptape.github.io/lumos-doc/docs/reference/ckbaccount).

### Install JDK

Before developing CKB applications by using ckb-sdk-java, JDK must be installed. The latest Java SE Development Kit software can be downloaded from http://www.oracle.com/technetwork/java/javase/downloads/. If JDK is already installed, proceed to the next step directly.

1. Download the JDK installer file on the download page, for example, [JDK 8 downloads](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html).

   :::note

   You will be required to log in as an Oracle account in order to download the file.

   :::

2. Run the installer and check the installation.

   ```shell
   > java -version
   java version "1.8.0_291"
   Java(TM) SE Runtime Environment (build 1.8.0_291-b10)
   Java HotSpot(TM) 64-Bit Server VM (build 25.291-b10, mixed mode)
   ```

### Set Up the Project by Using Gradle

Gradle is an open-source build automation tool for building Java projects. Gradle runs on all major operating systems and requires only JDK 8 or higher to run.

#### Step 1. Install Gradle.

Follow the instructions on https://docs.gradle.org/current/userguide/installation.html to install Gradle for your system.

To check the Gradle installation:

```shell
> gradle -v

Welcome to Gradle 7.0.2!
...
```

#### Step 2. Create a Gradle project.

Create a project folder, for example, `myApp`, and copy the src folder of the code [examples](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example) with all subfolders and files into the `myApp` folder.

#### Step 3. Install CKB Java SDK.

Two methods are available to install CKB Java SDK:

- Install CKB Java SDK from repositories.
- Install CKB Java SDK manually.

**Install CKB Java SDK from Repositories**

To install the SDK from repositories, specify the SDK modules to use in the `dependencies` section of the **build.gradle** file in the project root directory. For more information about ckb-sdk-java versions, see [releases](https://github.com/nervosnetwork/ckb-sdk-java/releases).

- CKB Java SDK version <= 0.24.0 can be installed by using the following code snippet in the build.gradle file.

  ```groovy title="myApp/build.gradle" {2}
  dependencies {
  	implementation 'org.nervos.ckb:core:{version}'
  }
  ```

- CKB Java SDK version >= 0.24.1 and < 0.43.0 can be installed by using the following code snippet in the build.gradle file.

  ```groovy title="myApp/build.gradle" {2}
  dependencies {
  	implementation 'org.nervos.ckb:ckb:{version}'
  }
  ```

- CKB Java SDK version >= 0.43.0 can be installed by using the following code snippet in the build.gradle file.

  ```groovy title="myApp/build.gradle" {2}
  dependencies {
  	implementation 'org.nervos.ckb:ckb-api:{version}'
  }
  ```

The following is an example of a complete `build.gradle` file that includes a dependency for CKB SDK 0.40.0 version.

```groovy title="myApp/build.gradle"
apply plugin: 'java'
repositories { 
    mavenCentral() 
}
dependencies {
	implementation 'org.nervos.ckb:ckb:0.40.0'
}
jar {
    archiveBaseName = 'java-examples'
    archiveVersion =  '0.1.0'
}
```

**Install CKB Java SDK Manually**

1. Build a JAR package

   To build a JAR package (`console-{version}-all.jar` for version <= 0.24.0; `ckb-sdk-{version}-all.jar` for version >= 0.24.1):

   ```
   git clone https://github.com/nervosnetwork/ckb-sdk-java.git
   
   cd ckb-sdk-java
   
   gradle shadowJar  // ./gradlew shadowJar 
   ```

   The package will be generated in `console/build/libs`, that can be put into your project to develop with it. If you don't want to build the JAR package, you can download a build from [releases](https://github.com/nervosnetwork/ckb-sdk-java/releases).

2. Import the JAR package

   When you need to import `ckb-java-sdk` dependency to your project, you can add the `console-{version}-all.jar` or `ckb-sdk-{version}-all.jar` to the  `libs`  package of your project. 

   If you use Java IDE (eg. IntelliJ IDEA or Eclipse or other Editors), you can import the JAR package according to IDE documents.

#### Step 4. Build the application.

To build the application by using Gradle:

1. Open a terminal or command prompt window and navigate to the project directory `myApp`.

2. Use the following command to build the project:

   ```shell
   > gradle build
   ```

#### Step 5. Run a main method.

To run a main method of a Java class, for example, [RpcExample](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/RpcExample.java), by using Gradle:

1. Update the `build.gradle` file.

   The following example inserts the tasks in the `build.gradle` file to run the main method of the [RpcExample](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/RpcExample.java) class with the application plugin.

   ```groovy title="myApp/build.gradle" {7-15}
   apply plugin: 'java'
   repositories { 
       mavenCentral()
   }
   sourceCompatibility = 1.8
   targetCompatibility = 1.8
   plugins {
       id "application"
   }
   ext {
      javaMainClass = "org.nervos.ckb.RpcExample"
   }
   application {
       mainClassName = javaMainClass
   }
   dependencies {
       implementation "org.nervos.ckb:ckb:0.40.0"
       testImplementation "junit:junit:4.12"
   }
   jar {
       archiveBaseName = 'java-examples'
       archiveVersion =  '0.1.0'
   }
   ```

2. Open a terminal or command prompt window and navigate to the project directory `myApp`.

3. Use the following command to run the application.

   ```shell
   > gradle run
   ```

   The execution of the main method of `RpcExample.class` returns the blockchain information like the tip block number and the tip block information.

   

   <details><summary>OUTPUT</summary>
   <p>


   ```shell
   > Task :run
   Welcome to use SDK to visit CKB Blockchain
   CKB Blockchain information: {"is_initial_block_download":false,"epoch":"0xa0004000012","difficulty":"0x100","median_time":"0x17a5b10a290","chain":"ckb_dev","alerts":[]}
   
   Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0.
   Use '--warning-mode all' to show the individual deprecation warnings.
   See https://docs.gradle.org/7.0.2/userguide/command_line_interface.html#sec:command_line_warnings
   ```

   </p>
   </details>

### Set Up the Project by Using Maven

#### Step 1. Install Maven.

Maven is downloadable as a zip file at <a>https://maven.apache.org/download.cgi</a>. Only the binaries are required, so look for the link to apache-maven-version-bin.zip or apache-maven-version-bin.tar.gz.

Once you have downloaded the zip file, unzip it to your computer. Then add the **bin** folder to your path.

To check the Maven installation:

```shell
mvn -v
```

For more information about the Maven installation, see [Installing Apache Maven](https://maven.apache.org/install.html).

#### Step 2. Create a Maven project.

Create a project folder, for example, `myApp`, and copy the src folder of the code [examples](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example) with all subfolders and files into the `myApp` folder.

#### Step 3. Install CKB Java SDK.

Specify the SDK modules to use in the `dependencies` section of the **pom.xml** file in the project root directory.

- CKB Java SDK version <= 0.24.0 can be installed by using the following code snippet in the build.gradle file.

  ```groovy title="myApp/pom.xml" {3}
  <dependency>
    <groupId>org.nervos.ckb</groupId>
    <artifactId>core</artifactId>
    <version>{version}</version>
  </dependency>
  ```

- CKB Java SDK version >= 0.24.1 and < 0.43.0 can be installed by using the following code snippet in the build.gradle file.

  ```groovy title="myApp/pom.xml" {3}
  <dependency>
    <groupId>org.nervos.ckb</groupId>
    <artifactId>ckb</artifactId>
    <version>{version}</version>
  </dependency>
  ```

- CKB Java SDK version >= 0.43.0 can be installed by using the following code snippet in the build.gradle file.

  ```groovy title="myApp/pom.xml" {3}
  <dependency>
    <groupId>org.nervos.ckb</groupId>
    <artifactId>ckb-api</artifactId>
    <version>{version}</version>
  </dependency>
  ```

The following is an example of a complete `pom.xml` file that includes a dependency for CKB SDK.

```xml title="myApp/pom.xml"
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>org.nervos.ckb</groupId>
    <artifactId>examples</artifactId>
    <packaging>jar</packaging>
    <version>0.1.0</version>

    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
	<dependencies>
		<dependency>
		  <groupId>org.nervos.ckb</groupId>
		  <artifactId>ckb</artifactId>
		  <version>0.42.0</version>
		</dependency>
	</dependencies>
</project>
```

#### Step 4. Run a Main Method

To run a main method of a class, for example, [RpcExample](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/RpcExample.java) by using Maven:

```shell
$ mvn compile exec:java -Dexec.mainClass="org.nervos.ckb.RpcExample" -Dexec.cleanupDaemonThreads=false
```

The execution of the main method of `RpcExample.class` returns the blockchain information like the tip block number and the tip block information.

<details><summary>OUTPUT</summary>
<p>




```shell
...
[INFO] --- exec-maven-plugin:3.0.0:java (default-cli) @ gs-maven ---
Welcome to use SDK to visit CKB Blockchain
CKB Blockchain information: {"is_initial_block_download":false,"epoch":"0xa0004000012","difficulty":"0x100","median_time":"0x17a5b10a290","chain":"ckb_dev","alerts":[]}
...
```

</p>
</details>

## Examples

### RPC Examples

**CKB RPC**

For more information about CKB RPC, see [CKB RPC documentation](https://github.com/nervosnetwork/ckb/blob/develop/rpc/README.md).

**Mercury RPC**

- [Get balance](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/BalanceTest.java)
- [Get a generic block](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/GenericBlockTest.java)
- [Get a generic transaction](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/GenericTransactionTest.java)
- [Query generic transactions](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/QueryGenericTransactionsPagesTest.java)
- [Register addresses](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/RegisterAddressesTest.java)
- [Build a transfer transaction](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/TransferCompletionTest.java)
- [Build a transfer transaction by action](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/ActionTest.java)
- [Build a transfer transaction by source](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/SourceTest.java)
- [Build a transfer transaction by a normal address (Example 1)](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/normal/AcpTest.java)
- [Build a transfer transaction by a normal address (Example 2)](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/normal/ChequeTest.java)
- [Build a transfer transaction by a normal address (Example 3)](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/normal/Secp256k1Test.java)
- [Build an asset account creation transaction](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/BuildAssetCollectionTransactionTest.java)
- [Build an asset collection transaction](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/CreateAssetAccountTest.java)
- [Fee rate](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-mercury-sdk/src/test/java/mercury/FeeRateTest.java)

For more information about Mercury RPC, see [Mercury RPC documentation](https://github.com/nervosnetwork/mercury/blob/main/core/rpc/README.md).

**CKB Indexer RPC**

- [Get tip](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-indexer/src/test/java/indexer/TipTest.java)
- [Get cells](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-indexer/src/test/java/indexer/CellsTest.java)
- [Get the capacity of cells](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-indexer/src/test/java/indexer/CapacityTest.java)
- [Get transactions](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-indexer/src/test/java/indexer/TransactionTest.java)
- [Filter](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/ckb-indexer/src/test/java/indexer/FilterTest.java)

For more information about CKB indexer RPC, see [CKB indexer RPC documentation](https://github.com/nervosnetwork/ckb-indexer/blob/master/README.md).

### Single-sig Transfer

:::note

To run a transfer example, the sender must have enough CKB capacity. For more information about getting CKB capacity, see Get CKB Capacity for Test Accounts.

:::

The [SingleSigWithCkbIndexerTxExample](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example/src/main/java/org/nervos/ckb/SingleSigWithCkbIndexerTxExample.java) example provides the `sendCapacity` method with inputs that belong to one single private key.

The [MultiKeySingleSigTxExample](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example/src/main/java/org/nervos/ckb/MultiKeySingleSigTxExample.java) example provides the `sendCapacity` method with inputs that belong to one or multiple private keys.

For more information, see [example/MultiKeySingleSigTxExample.java](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/MultiKeySingleSigTxExample.java).

### Multi-sig Transfer

:::note

To run a transfer example, the sender must have enough CKB capacity. For more information about getting CKB capacity, see Get CKB Capacity for Test Accounts.

:::

The [SendToMultiSigAddressTxExample](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example/src/main/java/org/nervos/ckb/SendToMultiSigAddressTxExample.java) example provides the `sendCapacity` method that a single-sig address sends capacity to a 2/3 format multi-sig address.

The [MultiSignTransactionExample](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example/src/main/java/org/nervos/ckb/MultiSignTransactionExample.java) example provides the `sendCapacity` method that a 2/3 format multi-sig address sends capacity to a single-sig address.

### Issue and Transfer SUDT

:::note

To run a transfer example, the sender must have enough CKB capacity. For more information about getting CKB capacity, see Get CKB Capacity for Test Accounts.

:::

The [SUDTExample](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example/src/main/java/org/nervos/ckb/SUDTExample.java) example provides the `issue` method to issue SUDT, and the `transfer` method to transfer SUDT.

### ACP Transaction

:::note

To run a transfer example, the sender must have enough CKB capacity. For more information about getting CKB capacity, see Get CKB Capacity for Test Accounts.

:::

The [ACPTransactionExample](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example/src/main/java/org/nervos/ckb/ACPTransactionExample.java) example provides the `createACPCell` method  to create an ACP cell with SUDT, and a `transfer` method to transfer CKB and SUDT to an ACP address.

### Generate Addresses

You can generate a CKB address by using CKB Java SDK as follows:

```
// Generate a mainnet address with SECP256K1 and public blake160 hash
String publicKey=
        Sign.publicKeyFromPrivate(
        Numeric.toBigInt(
        "e79f3207ea4980b7fed79956d5934249ceac4751a4fae01a0f7c4a96884bc4e3"),
        true)
        .toString(16);
        Script script=
        new Script(
        "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
        Hash.blake160(publicKey),
        Script.TYPE);
        String address=AddressGenerator.generate(Network.MAINNET,script);
```

