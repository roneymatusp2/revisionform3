// This script ensures CI=false is set cross-platform
process.env.CI = 'false';
require('child_process').execSync('react-scripts build', { stdio: 'inherit' });
