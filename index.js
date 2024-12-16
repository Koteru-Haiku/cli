#!/usr/bin/env node

import { Command } from 'commander';
import { qrCommand } from './commands/qr.js'; 

const program = new Command();

program
  .command('qr')
  .description('Tạo mã QR từ văn bản hoặc URL')
  .action(qrCommand);  
  
program.parse(process.argv);
