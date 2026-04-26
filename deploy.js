const { execSync } = require('child_process');

const gitPath = '"C:\\Program Files\\Git\\cmd\\git.exe"';

process.chdir('C:\\ton-casino');

console.log('Adding files...');
execSync(gitPath + ' add .', { stdio: 'inherit', shell: true });

console.log('Committing...');
execSync(gitPath + ' commit -m "fix tonconnect provider"', { stdio: 'inherit', shell: true });

console.log('Pushing...');
execSync(gitPath + ' push -u origin main', { stdio: 'inherit', shell: true });

console.log('Done!');