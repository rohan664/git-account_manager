import inquirer from 'inquirer'
import chalk from 'chalk';
import { saveAccount } from '../utils/configManger.js';
import { configureGit } from '../utils/gitHelper.js';


async function addAccount(){
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Account name:',
            validate: input => input.trim() !== '' || 'Name is required'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Git email:',
            validate: input => input.includes('@') || 'Valid email required'
        },
        {
            type: 'input',
            name: 'username',
            message: 'Git username:',
            validate: input => input.trim() !== '' || 'Username is required'
        },
        {
            type: 'password',
            name: 'token',
            message: 'Git personal access token (classic):',
            mask: '*',
            validate: input => input.length >= 20 || 'Token must be at least 20 characters'
        }
    ]);

    await saveAccount(answers);
    await configureGit(answers);
    console.log(chalk.green(`\nAccount "${answers.name}" added successfully!`));
    console.log(chalk.blue('You can now switch between accounts using: gam use <accountName>'));
}


export {addAccount}