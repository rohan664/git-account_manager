import { getAccounts } from '../utils/configManger.js';
import { switchAccount } from '../utils/gitHelper.js';
import chalk from 'chalk';

async function useAccount(accountName) {
  const accounts = getAccounts();
  
  if (!accounts[accountName]) {
    console.log(chalk.red(`Account "${accountName}" not found!`));
    console.log(chalk.blue('Available accounts:'), Object.keys(accounts).join(', '));
    return;
  }

  await switchAccount({
    name: accountName,
    ...accounts[accountName]
  });
}

export {useAccount}