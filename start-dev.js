const { spawn } = require('child_process');
const path = require('path');

// Start Next.js development server
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start JSON Server
const jsonServerProcess = spawn('npm', ['run', 'server'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down development servers...');
  nextProcess.kill();
  jsonServerProcess.kill();
  process.exit();
});

console.log('Development servers started. Press Ctrl+C to stop.');

// Log any errors
nextProcess.on('error', (error) => {
  console.error('Next.js server error:', error);
});

jsonServerProcess.on('error', (error) => {
  console.error('JSON Server error:', error);
});

// Handle process exit
nextProcess.on('exit', (code) => {
  console.log(`Next.js server exited with code ${code}`);
  jsonServerProcess.kill();
  process.exit(code);
});

jsonServerProcess.on('exit', (code) => {
  console.log(`JSON Server exited with code ${code}`);
  nextProcess.kill();
  process.exit(code);
});
