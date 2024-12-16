#!/usr/bin/env node

import { Command } from 'commander';
import { qrCommand } from './commands/qr.js'; 
import { showVersion } from './commands/version.js';

const program = new Command();

program
  .command('qr')
  .description('Tạo mã QR từ văn bản hoặc URL')
  .action(qrCommand);  
  
program
  .command('version')
  .description('version CLI')
  .action(showVersion);

program.parse(process.argv);
