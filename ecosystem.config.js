module.exports = {
  apps: [{
    name: 'curtain-simulator',
    script: 'npm',
    args: 'run dev',
    cwd: '/volume1/web/curtain-simulator0703', // NAS 경로에 맞게 수정
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 4005
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
}; 