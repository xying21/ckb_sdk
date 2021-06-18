---
id: quickstart
title: ckb-sdk-java
---
This guide walk you through setting up a **Gradle** project to develop DApps with ckb-sdk-java. You can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. 

## System Requirements

- Operating System:  All major platforms including Linux, Windows, and macOS.
- CKB node
- JDK (version 8 or higher)
- Gradle ( version 5.0 or higher)

## Steps

### Step 1. Install and Run a CKB Node on DEV Chain

For more information, see [Install a CKB Node on DEV Chain by Using Tippy](https://xying21.github.io/lumos_doc/docs/preparation/setupsystem#install-a-ckb-node-on-dev-chain-by-using-tippy).

### Step 2. Get CKB Capacity for Test Accounts

There are several test accounts that can be used for testing purpose in this tutorial.

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

To get CKB capacity for an account on DEV chain:

1. Assign the lock args of the account to **Block Assembler Lock Arg** in the Edit Chain form on Tippy explorer and save the changes.
2. Restart the CKB node and start the CKB miner on the Tippy dashboard.

### Step 3. Install JDK

Before developing CKB DApps by using ckb-sdk-java, you must have JDK installed. You can download the latest Java SE Development Kit software from http://www.oracle.com/technetwork/java/javase/downloads/. If you have JDK installed, proceed to the next step directly.

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

### Step 4. Install Gradle

Gradle is an open-source build automation tool that can be used for building Java projects. Gradle runs on all major operating systems and requires only a JDK version 8 or higher to run.

1. Install Gradle

   Follow the instructions on https://docs.gradle.org/current/userguide/installation.html to install Gradle for your system.

2. Check the installation

   ```shell
   > gradle -v
   
   Welcome to Gradle 7.0.2!
   ...
   ```

### Step 5. Create a Gradle Project

1. Download the code examples.

   ```shell
   > git clone https://github.com/nervosnetwork/ckb-sdk-java.git
   ```

   The examples are located in the `ckb-sdk-java/example` folder. 

2. Create a new folder for the Gradle project.

   ```shell
   > mkdir myDapp
   ```

3. Copy the `src` folder together with all sub folders and files into the `myDapp` folder. 

### Step 6. Set Dependencies for CKB SDK

Specify the SDK modules to use in the `dependencies` section of the **build.gradle** file in the project root directory. For example, the following includes a dependency for CKB SDK.

```groovy title="myDapp/build.gradle"
dependencies {
	implementation 'org.nervos.ckb:ckb:0.40.0'
}
```

The following is an example of a complete `build.gradle` file that includes a dependency for CKB SDK.

```groovy title="myDapp/build.gradle"
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

### Step 7. Build the Application

To build the application by using Gradle:

1. Open a terminal or command prompt window and navigate to the project directory `myDapp`.

2. Use the following command to build the project:

   ```shell
   > gradle build
   ```

### Step 8. Run a Main Method

To run a main method:

2. Update the `build.gradle` file.

   The following example inserts the tasks in the `build.gradle` file to run the main method of the `RpcExample` class with the application plugin.
   
   ```groovy title="myDapp/build.gradle" {7-15}
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
   
2. Open a terminal or command prompt window and navigate to the project directory `myDapp`.

3. Use the following command to run the application.

   ```shell
   > gradle run
   ```

## Examples

[RPC Examples](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/RpcExample.java):

- Get the Block Chain Information
- Get the Current Block Number
- Get the Current Block Information

[DAO Examples](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/NervosDaoExample.java)

[Transfer CKB to a Multisig Address](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/SendToMultiSigAddressTxExample.java)

[Transfer CKB to Multiple Receivers](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/SingleSigWithCkbIndexerTxExample.java)

[Transfer all Balance](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/TransferAllBalanceWithCkbIndexerExample.java)