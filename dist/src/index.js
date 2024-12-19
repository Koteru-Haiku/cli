#!/usr/bin/env node
import { Command } from 'commander';
import { showVersion } from '../commands/version.js';
import { qrCommand } from '../commands/qr.js';
import { welcome } from '../commands/info.js';
import { Option } from '../commands/password.js';
import { VERSION } from '../constants/version.js';
import { countFilesAndFolders } from '../commands/countfiles.js';
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
});
program
    .command('password')
    .description('Tạo mật khẩu ngẫu nhiên với các tùy chọn')
    .action(() => {
    Option();
});
program
    .command("count <path>")
    .description("Count files and folders in a directory")
    .action(async (folderPath) => {
    await countFilesAndFolders(folderPath);
});
program.parse(process.argv);
