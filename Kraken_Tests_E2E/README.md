# How to run Kraken tests

## On Mac OS

### Prerequisites
* Node v16.20.2
* npm v8.19.4
* Android Studio: On the properties of android studio you must have installed:
  - Android SDK Platform-Tools
  - Android SDK Build-Tools
  - Android SDK Tools (Obsolete) (If you're using a Giraffe version or superior)
* Java 21

### Steps

1. Go to the root of the Kraken project

```
cd Kraken_Tests_E2E
```

2. Install dependencies

- Install kraken-node globally

```
npm install kraken-node -g
```
- Install kraken-node locally

```
npm install kraken-node
```
- Install appium locally
```
npm install appium
```

- Set up the environment variables

```
export ANDROID_HOME="${HOME}/Library/Android/sdk"
export PATH="${HOME}/Library/Android/sdk/tools:${HOME}/Library/Android/sdk/platform-tools:${HOME}/Library/Android/sdk/build-tools/34.0.0/aapt:$PATH"
export PATH="$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/34.0.0"
export JAVA_HOME="/Library/Java/JavaVirtualMachines/jdk-21.jdk/Contents/Home"
export NVM_DIR="$HOME/.nvm"
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"
```

- Set in the `properties.json` file in the root of the Kraken_Tests_E2E folder the url of the ghost site, the email and the password of the admin user that will be used to run the tests

- Run kraken tests
```
npx kraken-node run
```
