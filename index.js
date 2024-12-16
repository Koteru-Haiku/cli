#!/usr/bin/env node

import { Command } from 'commander';
import { qrCommand } from './commands/qr.js'; 
import { showVersion } from './commands/version.js';
import { welcome } from './commands/info.js';

const program = new Command();

program
  .name('chx-cli')
  .description('Một công cụ CLI tùy chỉnh cho các tác vụ đặc biệt.')
  .version('1.0.4', '-v, --version', 'Hiển thị phiên bản hiện tại của chx-cli');

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