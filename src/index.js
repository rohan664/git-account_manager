import { program } from 'commander';
import { getAccounts,saveAccount } from '../src/utils/configManger.js';
import { addAccount } from './commands/add.js';
import { useAccount } from './commands/use.js';
import { listAccounts,showAccessToken } from './commands/list.js';
import { currentUser } from './commands/currentUser.js';
import { removeAccount } from './commands/remove.js';

program
  .name('github_account_manager')
  .version('1.0.0')
  .description('Git Account Manager - Manage multiple Git accounts without SSH');

program
  .command('add')
  .description('Add a new Git account')
  .action(addAccount);

program
  .command('list')
  .description('List all configured accounts')
  .option('-d ,--detail','show detailed information')
  .action((option)=> listAccounts(option.detail));

program
  .command('use <accountName>')
  .description('Set active Git account')
  .action(useAccount);

program
  .command('remove <accountName>')
  .description('Remove a Git account')
  .action(removeAccount);

program
.command('show <account_name>')
.description("To see the access token")
.action(showAccessToken)

program
.command("current_user")
.description("Show current active user")
.action(currentUser)

program.parse(process.argv);