# Haiku CLI

## Features

- **Weather**: Fetch current weather information.

- **Monitor System**: Track system metrics.

- **Generate Password**: Create secure passwords.

- **Count Files and Folders**: Count files and folders in a directory.

- **v.v.**

## Installation

Clone the repository
```bash
git clone https://github.com/Koteru-Haiku/cli.git
```
Install dependencies:
```bash
cd cli
npm install
```
## Usage
Run the CLI using:
```bash
npm run build
node dist/src/index.js <command> [options]
```
Or config in `package.json`
```json
"bin": {
    "your_cli_name": "./dist/src/index.js"
}
```
then
```bash
npm run build
node your_cli_name <command> [options]
```
- [Features](#features)

- [Installation](#installation)

- [Usage](#usage)

- [License](#license)
