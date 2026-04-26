const { execSync } = require('child_process');

const gitPath = '"C:\\Program Files\\Git\\cmd\\git.exe"';

process.chdir('C:\\ton-casino');

console.log('Configuring git...');
execSync(gitPath + ' config --global user.email "user@example.com"', { stdio: 'inherit', shell: true });
execSync(gitPath + ' config --global user.name "TON Casino"', { stdio: 'inherit', shell: true });

console.log('Adding files...');
execSync(gitPath + ' add .', { stdio: 'inherit', shell: true });

console.log('Committing...');
execSync(gitPath + ' commit -m "fix manifest url"', { stdio: 'inherit', shell: true });

console.log('Pushing...');
execSync(gitPath + ' push -u origin main', { stdio: 'inherit', shell: true });

console.log('Done!');