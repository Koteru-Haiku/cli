#!/usr/bin/env node

import { Command } from 'commander';
import { qrCommand } from './commands/qr.js'; 
import { showVersion } from './commands/version.js';
import { welcome } from './commands/info.js';

const program = new Command();

program
  .name('chx-cli')
  .description('A custom CLI tool for special tasks')
  .version('1.0.4', '-v, --version', 'Show current version of chx-cli');

program
  .command('qr')
  .description('Tạo mã QR từ văn bản hoặc URL')
  .action(() => {
    qrCommand();
  });  

program
  .command('version')
  .description('Hiển thị phiên bản của CLI')
  .action(() => {
    showVersion();
  });

program
  .command('info')
  .description('')
  .action(() => {
    welcome();
  })

program.parse(process.argv);