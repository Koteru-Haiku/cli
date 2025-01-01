#!/usr/bin/env node

import fs, { promises as profs } from 'fs'
import path from 'path';
import chalk from 'chalk';
import { Command } from 'commander';
import { showVersion } from '../commands/version.js';
import { qrCommand } from '../commands/qr.js'; 
import { welcome } from '../commands/info.js';
import { OptionPassword } from '../commands/password.js'
import { VERSION } from '../constants/version.js';
import { countFilesAndFoldersShallow } from '../commands/countfiles/countfiles.js'
import { countFilesAndFoldersDeep } from '../commands/countfiles/countfilesdeep.js'
import { getWeatherCommand } from '../commands/getweather.js'
import { monitorSystemCommand } from '../commands/monitorSystem.js';
import { convertImageCommand } from '../commands/convertImage.js'
import { resizeImagesCommand } from '../commands/image/imageresize.js'
import { readFile, saveFile } from "../utils/fileprocess.js";
import { editFile } from "../commands/editFile.js";
import readlineSync from "readline-sync";
import simpleGit from 'simple-git';
import packageJson from 'package-json';
import { execSync } from 'child_process';
import { listProcesses } from '../commands/system/listProccesses.js';
import { killProcess } from '../commands/system/killProcess.js';
import { monitorProcess } from '../utils/processUtils.js';
import { handleFindProcess } from '../commands/system/findProcess.js'
import { getNetworkInfo } from '../commands/networkInfo.js'
import { encryptFile } from '../commands/code/encrypt.js';
import { decryptFile } from '../commands/code/decrypt.js';
import { ListBookMarks } from '../commands/bookmarks/listBookmarks.js'
import { AddBookMarks } from '../commands/bookmarks/addBookmarks.js'
import { searchCharacter } from '../commands/anime/searchCharacter.js'
import { searchAnime } from '../commands/anime/searchAnime.js'
import * as git from '../commands/git/git.js'

const program = new Command();

program
  .name('haiku')
  .description('A custom CLI tool for special tasks')
  .version(`${VERSION}`, '-v, --version', 'Show current version of Haiku CLI');

program
  .command('anime')
  .option('-c, --character <name>', 'Search for an anime character')
  .option('-a, --anime <title>', 'Search for an anime by title')
  .description('Search for anime characters or shows')
  .action((options) => {
    try {
      if (options.character) {
        searchCharacter(options.character);
      } else if (options.anime) {
        searchAnime(options.anime);
      } else {
        console.log(chalk.yellow('Please provide a character name using --character or an anime title using --anime.'));
      }
    } catch (error) {
      console.error('Error searching:', (error as Error).message);
    }
  });

program
  .command('add <name> <url>')
  .description('Add a new bookmark')
  .option('-t, --tags <tags>', 'Add tags to the bookmark (comma-separated)')
  .action(async (name, url, options) => {
    try {
      await AddBookMarks(name, url);
    } catch (error) {
      console.error('Error adding bookmark:', (error as Error).message);
    }
  });

program
  .command('encrypt <inputFile> <outputFile>')
  .description('Encrypt a file')
  .action((inputFile: string, outputFile: string) => {
    encryptFile(inputFile, outputFile);
  });

program
  .command('decrypt <inputFile> <outputFile>')
  .description('Decrypt a file')
  .action((inputFile: string, outputFile: string) => {
    decryptFile(inputFile, outputFile);
  });

program
  .command('myip')
  .description('Show your IP')
  .action(() => {
    const info = getNetworkInfo();
    info.forEach((iface) => {
      console.log(`Interface: ${iface.interface}`);
      console.log(`IP Address: ${iface.ip}`);
      console.log('-------------------------');
    });
  });

program
  .command('list')
  .option('-p, --processes', 'List all running processes')
  .option('-b, --bookmarks', 'List all bookmarks')
  .description('List all running processes')
  .action(async (options) => {
    try {
      if(options.processes) {
        await listProcesses();
      }
      if(options.bookmarks) {
        await ListBookMarks();
      }
      if (!options.processes && !options.bookmarks) {
        program.help();
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  });

program
  .command('kill <pid>')
  .description('Kill a process by PID')
  .action((pid: string) => {
      killProcess(parseInt(pid));
  });

program
  .command('monitor <pid>')
  .description('Monitor a process by PID')
  .action((pid: string) => {
      monitorProcess(parseInt(pid));
  });

  program
  .command('find <name>')
  .description('Find processes by name')
  .option('-e, --exact', 'Exact match')
  .option('-l, --limit <number>', 'Limit the number of results', parseInt)
  .action((name: string, options: { exact?: boolean; limit?: number }) => {
      handleFindProcess(name, options.exact, options.limit);
  });

program
  .command('resize <input> <output>')
  .description('Resize an image and adjust its quality.')
  .option('-w, --width <number>', 'Target width in pixels')
  .option('-h, --height <number>', 'Target height in pixels')
  .option('-q, --quality <number>', 'Output quality (0-100)', '75')
  .action(async (input: string, output: string, options: { width?: string; height?: string; quality?: string }) => {
    try {
      await resizeImagesCommand(input, output, options);
    } catch (error) {
      console.log((error as Error).message)
    }
  });

program.addCommand(convertImageCommand);

program
  .command(getWeatherCommand.command) // thu cach viet moi :3
  .description(getWeatherCommand.description)
  .option(getWeatherCommand.options[0].flag, getWeatherCommand.options[0].description)
  .action(getWeatherCommand.action);

program
  .command(monitorSystemCommand.command)
  .description(monitorSystemCommand.description)
  .action(monitorSystemCommand.action);

program
  .command('qr')
  .description('Generate QR code from text or URL')
  .action(() => {
    qrCommand();
  });  

program
  .command('version')
  .description('Show version of CLI')
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
  .description('Generate random password with options')
  .action(async () => {
    try {
      await OptionPassword();
    } catch (error) {
      console.log((error as Error).message)
    }
  })

program
  .command("count <path>")
  .option("--d", "Recursively count files and folders in subdirectories")
  .description("Count files and folders in a directory")
  .action(async (path, options) => {
    try {
      if (options.d) {
        await countFilesAndFoldersDeep(path);
      } else {
        await countFilesAndFoldersShallow(path);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });

program
  .command("edit")
  .description("edit file")
  .action(async () => {
    try {
      const filePath = readlineSync.question("Enter file path: ");
      const content = await readFile(filePath);
      
      console.log("=== File content ===");
      content.forEach((line, index) => {
        console.log(`${index + 1}: ${line}`);
      });
  
      const updatedContent = await editFile(content);
      await saveFile(filePath, updatedContent);  
    } catch (error) {
      console.log((error as Error).message)
    }
  });

program
  .command('clone <repoUrl>')
  .description('Clone a GitHub repository into the current directory')
  .option('-g --git', 'use git')
  .action(async (repoUrl, options) => {
    if(!options.git) {
      console.error('Please provide a git flag with -g or --git');
      return;
    }
    await git.Clone(repoUrl);
  });

const branch = git.Branch;

program
  .command(branch.command)
  .description(branch.description)
  .option(branch.options[0].flag, branch.options[0].description)
  .option(branch.options[1].flag, branch.options[1].description)
  .option(branch.options[2].flag, branch.options[2].description) // flag git :v
  .action(branch.action);

program
  .command('push')
  .description('Push changes to the remote Git repository')
  .option('-g --git', 'use git')
  .action(async (options) => {
    if(!options.git) {
      console.error('Please provide a git flag with -g or --git');
      return;
    }
    await git.Push();
});

program
  .command('pull')
  .description('Pull changes from the remote Git repository')
  .option('-g --git', 'use git')
  .action(async (options) => {
    if(!options.git) {
      console.error('Please provide a git flag with -g or --git');
      return;
    }
    await git.Pull();
});

program
  .command('log')
  .description('Show the commit history of the Git repository')
  .option('-g --git', 'use git')
  .action(async (options) => {
    if(!options.git) {
      console.error('Please provide a git flag with -g or --git');
      return;
    }
    await git.Log();
  });

program
  .command('status')
  .description('Show the working tree status')
  .option('-g --git', 'use git')
  .action(async (options) => {
    if(!options.git) {
      console.error('Please provide a git flag with -g or --git');
      return;
    }
    await git.Status();
  });

  program
  .command('search')
  .description('Search for files or directories matching the query or extension')
  .option('-d, --dir <directory>', 'Specify the directory to search in', '.')
  .option('-e, --extension <ext>', 'Search for files with a specific extension')
  .option('-q, --query <query>', 'Search for files or directories matching the query')
  .action(async (options) => {
    try {
      const searchDir = options.dir;
      const extension = options.extension;
      const query = options.query;

      console.log(`Searching in ${searchDir}...`);
      if (extension) console.log(`Filtering by extension .${extension}`);
      if (query) console.log(`Filtering by query "${query}"`);

      const files = await profs.readdir(searchDir, { withFileTypes: true });
      const results = files.filter(file => {
        const matchesQuery = query ? file.name.includes(query) : true;
        const matchesExtension = extension ? file.name.endsWith(`.${extension}`) : true;
        return matchesQuery && matchesExtension;
      });

      if (results.length > 0) {
        results.forEach(file => {
          console.log(`${file.isDirectory() ? '📁' : '📄'} ${path.join(searchDir, file.name)}`);
        });
      } else {
        console.log('No results found.');
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  });

program
  .command('update')
  .description('Update to the latest version of CLI')
  .action(async () => {
    try {
      const currentVersion = VERSION;
      const latestVersion = (await packageJson('@yukiookii/haiku')).version;

      console.log(`Current version: ${currentVersion}`);
      console.log(`Latest version available: ${latestVersion}`);

      if (currentVersion === latestVersion) {
        console.log('You are already using the latest version!');
        return;
      }

      console.log('Updating to latest version...');
      execSync('npm install -g @yukiookii/haiku@latest', { stdio: 'inherit' });

      console.log(`Successfully updated CLI from ${currentVersion} to ${latestVersion}`);
    } catch (error) {
      console.error('Error updating to the latest version:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);