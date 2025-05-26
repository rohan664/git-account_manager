import shell  from "shelljs"
import { getAccounts } from "../utils/configManger.js";
import chalk from "chalk";


function currentUser(){
    let current_user = shell.exec("git config --global user.name",{silent:true})
    if (current_user.code !== 0) {
        console.error('Error getting Git user:', result.stderr);
        return null;
    }

    let user = current_user.stdout.trim()

    let list_of_user = getAccounts()
    console.log(chalk.blue.bold('\nCurrent User Details'));
    console.log(chalk.gray("-".repeat(50)))

    const table = Object.entries(list_of_user).filter(([name,data]) => data.username === user).map(([name,data]) => ({
        Account: name,
        Username: data.username,
        Email: data.email,
    }))
    
    console.table(table)


}

export {currentUser}