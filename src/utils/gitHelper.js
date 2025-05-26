import shell from 'shelljs';
import path from 'path';
import fs from 'fs'
import os from 'os'

function configureGit(account){

    // delete existing credentials
     shell.exec('cmdkey /delete:git:https://github.com');

    // 2. Set new credentials in Windows Credential Manager
    const cmd = `cmdkey /generic:git:https://github.com /user:${account.username} /pass:${account.token}`;
    const result = shell.exec(cmd, { silent: true });

    if (result.code !== 0){
        throw new Error('Failed to update Windows Credential Manager');
    }

    shell.exec('git config --global credential.helper wincred');

    shell.exec(`git config --global user.name ${account.username}`)
    shell.exec(`git config --global user.email ${account.email}`)

    // const credentialsPath = path.join(os.homedir(), '.git-credentials');
    // const credentialUrl = `https://${account.username}:${account.token}@github.com`;

    // let credentials = ''
    // if (fs.existsSync(credentialsPath)){
    //     credentials = fs.readFileSync(credentialsPath, 'utf8');
    // }

    // if (!credentials.includes(credentialUrl)) {
    //     fs.appendFileSync(credentialsPath, `${credentialUrl}\n`);
    // }

    // shell.exec('git config --global credential.helper store');

}

function switchAccount(account) {
    configureGit(account);
    console.log(`Switched to account: ${account.name}`);
}

export {configureGit,switchAccount}