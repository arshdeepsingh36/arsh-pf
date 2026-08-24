import { spawn } from 'node:child_process';

console.log('🚀 Starting Portfolio Backend Server & Vite Client...');

const server = spawn('node', ['server/index.js'], { stdio: 'inherit', shell: true });
const client = spawn('npx', ['vite'], { stdio: 'inherit', shell: true });

const cleanup = () => {
  server.kill();
  client.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
