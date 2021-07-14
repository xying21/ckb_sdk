---
id: quickstart
title: ckb-sdk-java
---
This guide walks you through setting up a project to develop DApps with **ckb-sdk-java**. With this quick introduction, you can get a Java project created and perform a RPC query method.

The project can be set up and built by using [Gradle](https://docs.gradle.org/current/userguide/what_is_gradle.html) or [Maven](https://maven.apache.org/what-is-maven.html). You can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. To write some more code, take a look at the Java [examples](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example).

## System Requirements

- Operating System:  All major platforms including Linux, Windows, and macOS.
- CKB node
- JDK (version 8 or higher)
- Gradle (version 5.0 or higher) or Maven

## Install and Run a CKB Node on DEV Chain

For more information, see [Install a CKB Node on DEV Chain by Using Tippy](https://cryptape.github.io/lumos-doc/docs/reference/ckbnode#install-a-ckb-node-by-using-tippy).

## Get CKB Capacity for Test Accounts

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

For more information about CKB accounts and capacity, see [CKB Accounts and Capacity](https://cryptape.github.io/lumos-doc/docs/reference/ckbaccount).

## Install JDK

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

## Set Up the Project by Using Gradle

Gradle is an open-source build automation tool that can be used for building Java projects. Gradle runs on all major operating systems and requires only a JDK version 8 or higher to run.

### Step 1. Install Gradle.

Follow the instructions on https://docs.gradle.org/current/userguide/installation.html to install Gradle for your system.

To check the Gradle installation:

```shell
> gradle -v

Welcome to Gradle 7.0.2!
...
```

### Step 2. Create a Gradle project.

Create the project folder, for example, `myDapp`, and copy the src folder of the code [examples](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example) with all sub folders and files into the `myDapp` folder.

### Step 3. Set dependencies for CKB SDK.

Specify the SDK modules to use in the `dependencies` section of the **build.gradle** file in the project root directory. For example, the following includes a dependency for CKB SDK 0.40.0 version.

```groovy title="myDapp/build.gradle"
dependencies {
	implementation 'org.nervos.ckb:ckb:0.40.0'
}
```

The following is an example of a complete `build.gradle` file that includes a dependency for CKB SDK 0.40.0 version.

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

### Step 4. Build the application.

To build the application by using Gradle:

1. Open a terminal or command prompt window and navigate to the project directory `myDapp`.

2. Use the following command to build the project:

   ```shell
   > gradle build
   ```

### Step 5. Run a main method.

To run a main method of a Java class, for example, [RpcExample](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/RpcExample.java), by using Gradle:

1. Update the `build.gradle` file.

   The following example inserts the tasks in the `build.gradle` file to run the main method of the [RpcExample](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/RpcExample.java) class with the application plugin.

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

## Set Up the Project by Using Maven

### Step 1. Install Maven.

Maven is downloadable as a zip file at <a>https://maven.apache.org/download.cgi</a>. Only the binaries are required, so look for the link to apache-maven-version-bin.zip or apache-maven-version-bin.tar.gz.

Once you have downloaded the zip file, unzip it to your computer. Then add the **bin** folder to your path.

To check the Maven installation:

```shell
mvn -v
```

For more information about the Maven installation, see [Installing Apache Maven](https://maven.apache.org/install.html).

### Step 2. Create a Maven project.

Create the project folder, for example, `myDapp`, and copy the src folder of the code [examples](https://github.com/nervosnetwork/ckb-sdk-java/tree/develop/example) with all sub folders and files into the `myDapp` folder.

### Step 3. Set Dependencies for CKB SDK

Specify the SDK modules to use in the `dependencies` section of the **pom.xml** file in the project root directory. For example, the following includes a dependency for CKB SDK 0.42.0 version.

```groovy title="myDapp/pom.xml"
<dependency>
  <groupId>org.nervos.ckb</groupId>
  <artifactId>ckb</artifactId>
  <version>0.42.0</version>
</dependency>
```

The following is an example of a complete `pom.xml` file that includes a dependency for CKB SDK.

```xml title="myDapp/pom.xml"
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

### Step 4. Run a Main Method

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

[RPC Examples](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/RpcExample.java):

- Get the Block Chain Information
- Get the Current Block Number
- Get the Current Block Information

[DAO Examples](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/NervosDaoExample.java)

[Transfer CKB to a Multisig Address](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/SendToMultiSigAddressTxExample.java)

[Transfer CKB to Multiple Receivers](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/SingleSigWithCkbIndexerTxExample.java)

[Transfer all Balance](https://github.com/nervosnetwork/ckb-sdk-java/blob/develop/example/src/main/java/org/nervos/ckb/TransferAllBalanceWithCkbIndexerExample.java)