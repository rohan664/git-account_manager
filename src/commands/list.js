import chalk from "chalk";
import { getAccounts } from "../utils/configManger.js";
import inquirer from "inquirer";
import { addAccount } from "./add.js";


function listAccounts(show_detail = false) {
    const accounts = getAccounts();
    if(!show_detail){
        console.log(chalk.blue.bold('\nAvailable accounts:'));
        console.log(Object.keys(accounts).join(', '));
        return;
    }

    // Detailed view
    const table = Object.entries(accounts).map(([name,data])=> ({
        Account: name,
        Username: data.username,
        Email: data.email,
    }))

    console.log(chalk.blue.bold('\Detail Information of accounts:'));
    console.table(table)
    console.log(chalk.yellow('To see the access token use') + " " + chalk.cyan('gam show <account_name>'))

}

async function showAccessToken(account_name){
    const accounts = getAccounts();
    if(!accounts[account_name]){
        console.log(chalk.redBright(`oops! ${account_name} is not present`))
        let wanted_to_add = await inquirer.prompt({
            type:"input",
            name:'wanted_to_add',
            message : "You wanted to add new account? (yes/no)"
        })
        
        if(wanted_to_add['wanted_to_add'].toLowerCase().trim() == 'yes'){
            addAccount()
        }
    }

    console.log(chalk.greenBright("Access Token :" + " " + chalk.white(`${accounts[account_name]["token"]}`)))

}

export {listAccounts,showAccessToken}