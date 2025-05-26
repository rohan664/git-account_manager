import path from 'path';
import fs from 'fs'
import os from 'os'

const CONFIG_PATH = path.join(os.homedir(),".git-accounts.json")

function getAccounts(){
    if(!fs.existsSync(CONFIG_PATH)){
        fs.writeFileSync(CONFIG_PATH, JSON.stringify({}));
        return JSON.parse(fs.readFileSync(CONFIG_PATH,'utf8'))
    }
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
}

async function saveAccount(account) {
  const accounts = getAccounts();
  accounts[account.name] = {
    email: account.email,
    username: account.username,
    token: account.token
  };
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(accounts, null, 2));
}

export {
  getAccounts,
  saveAccount
};