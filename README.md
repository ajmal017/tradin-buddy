# Tradin' Buddy

## Description

Tradin' Buddy is on open source, web-based trading systems. It runs on your localhost and easily connects your brokerage account's api key. The goal of Tradin' Buddy is to easily allow you to modify your algorithmic trading tactic by providing you with a set of known trading tactics that can be turned on and off rapidly. The automation of trades 

## Prerequisites
To easily mount Tradin' Buddy onto your localhost, you'll need to download an npm package. Simply run the following command.
```
npm install --global http-server
```

Make sure you have Node.js and NPM installed on your machine, or this command will not work.

Get API keys from the following sources
[1. Alpha Vantage](https://www.alphavantage.co)
[2. Interactive Brokers](https://interactivebrokers.github.io/cpwebapi/)
[3. News Api](https://newsapi.org)

## Running Tradin' Buddy

This is a step-by-step tutorial demonstrating how to run Tradin'Buddy on your PC.

#### Step 1
Copy the gitHub directory over to your local machine using the command
```
git clone https://github.com/bigbernnn/tradin-buddy.git
```

#### Step 2
In the directory run the following command to mount Tradin' Buddy onto your localhost:8080
```
npx http-server -c-1
```

#### Step 3
In your browser, type localhost:8080.
Now you are ready to configure your Tradn' Buddy!

## Configuration
In the root directory create a file named *creadentials.txt*. In this file you will store your api keys. The content of the file should be as follows.

```
ALPHA_VANTAGE_KEY=API_KEY
INTERACTIVE_BROKERS_KEY=API_KEY
GOOGLE_NEWS_API=API_KEY
```
*API_KEY* should be replaced with the corresponding keys you've obtained by creating your personnal accounts.

#### Configuring the IBKR Web API [https://interactivebrokers.github.io/cpwebapi/]
Follow the instructions at the top of the "Getting Started" tab, copy the downoaded "clientportal" folder to the root directory of your projecs and follow the next steps.

## Features

Tradin' Buddy is currently under contruction and we will continue to add new features steadily once it is done. 
