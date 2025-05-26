import chalk from "chalk";
import { getAccounts } from "../utils/configManger.js";
import { useAccount } from "./use.js";
import { currentUser } from "./currentUser.js";
import inquirer from "inquirer";
import shell from "shelljs";
import path from 'path';
import fs from 'fs'
import os from 'os'

const CONFIG_PATH = path.join(os.homedir(),".git-accounts.json")

async function removeAccount(accountName) {
    const accounts = getAccounts();
    if(!accounts[accountName.trim()]){
        console.log(chalk.redBright("Account Not Found!!"))
        return null;
    }

    let current_user = shell.exec("git config --global user.name",{silent:true})
    if (current_user.code !== 0) {
        console.error('Error getting Git user:', result.stderr);
        return null;
    }

    let user = current_user.stdout.trim()
    if(user === accounts[accountName.trim()]["username"]){
        console.log(chalk.bgRed("Account is currently active !!!!!"))
        let is_delete = await inquirer.prompt({
            type:"input",
            name:'is_delete',
            message : "Remove the account? (yes/no)"
        })

        if(is_delete['is_delete'].trim().toLowerCase() === 'yes'){
            shell.exec('cmdkey /delete:git:https://github.com',{ silent: true });
            delete accounts[accountName];
            fs.writeFileSync(CONFIG_PATH, JSON.stringify(accounts, null, 2));

            // get accounts
            const updated_accounts = getAccounts();
            if(!updated_accounts){
                console.log(chalk.gray("No Users Found !!!"))
            }
            await useAccount(Object.keys(updated_accounts)[0])
            await currentUser()
            // console.log(Object.keys(updated_accounts)[0])            
        }
        return null;


    }
  
    delete accounts[accountName];
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(accounts, null, 2));
}

export {removeAccount}