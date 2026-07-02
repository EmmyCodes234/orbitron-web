import FtpDeploy from 'ftp-deploy';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ftpDeploy = new FtpDeploy();

// Clean the hostname in case it has ftp:// or http://
let host = process.env.FTP_HOST || '';
host = host.replace(/^ftp:\/\//, '').replace(/^https?:\/\//, '').split('/')[0];

const config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    host: host,
    port: parseInt(process.env.FTP_PORT) || 21,
    localRoot: path.join(__dirname, '../dist'),
    // If using a virtual FTP account, it's often jailed to public_html already
    remoteRoot: process.env.FTP_REMOTE_ROOT || '/',
    include: ["*", "**/*"],
    exclude: [],
    deleteRemote: false,
    forcePasv: true,
    sftp: parseInt(process.env.FTP_PORT) === 22,
    timeout: 60000, // Increase timeout to 60 seconds
};

console.log(`🚀 Connecting to ${host} on port ${config.port}...`);

ftpDeploy
    .deploy(config)
    .then((res) => console.log('✅ Finished deployment! Sent files:', res))
    .catch((err) => console.error('❌ Deployment error:', err));
