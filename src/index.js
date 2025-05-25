import { program } from 'commander';
import { getAccounts,removeAccount,saveAccount } from '../src/utils/configManger.js';
import { addAccount } from './commands/add.js';
import { useAccount } from './commands/use.js';

program
  .name('github_account_manager')
  .version('1.0.0')
  .description('Git Account Manager - Manage multiple Git accounts without SSH');

program
  .command('add')
  .description('Add a new Git account')
  .action(addAccount);

// program
//   .command('list')
//   .description('List all configured accounts')
//   .action(listAccounts);

program
  .command('use <accountName>')
  .description('Set active Git account')
  .action(useAccount);

program
  .command('remove <accountName>')
  .description('Remove a Git account')
  .action(removeAccount);

program.parse(process.argv);