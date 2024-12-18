#!/usr/bin/env node

import { Command } from 'commander';
import { showVersion } from '../commands/version';
import { qrCommand } from '../commands/qr'; 
import { welcome } from '../commands/info';
import { generatePassword, Option } from '../commands/password'
import { VERSION } from '../constants/version';

const program = new Command();

program
  .name('chx-cli')
  .description('A custom CLI tool for special tasks')
  .version(`${VERSION}`, '-v, --version', 'Show current version of chx-cli');

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

program
  .command('password')
  .description('Tạo mật khẩu ngẫu nhiên với các tùy chọn')
  .action(() => {
    Option();
  })

program.parse(process.argv);