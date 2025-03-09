import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get --env argument
const args = process.argv.slice(2);
const envArgIndex = args.indexOf('--env');
const envPath =
  envArgIndex !== -1 && args[envArgIndex + 1]
    ? path.resolve(args[envArgIndex + 1])
    : null;

// Function to manually load the .env file
function loadEnvFile(envFilePath: string) {
  if (!fs.existsSync(envFilePath)) {
    console.error(`⚠️  Env file not found: ${envFilePath}`);
    process.exit(1);
  }

  console.log(`🌱 Loading env file: ${envFilePath}`);
  const envFileContent = fs.readFileSync(envFilePath, 'utf-8');

  envFileContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return; // Ignore empty lines & comments

    const [key, value] = trimmed.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim(); // Set env var
    }
  });
}

// If an env file was provided, load it
if (envPath) {
  loadEnvFile(envPath);
}

// Now we can access env vars normally!
const containerName = process.env.CONTAINER_NAME || 'taikofrsnipe-postgres-1';
const dumpFilePath = 'latest.dump';
const postgresUser = process.env.POSTGRES_USER;
const postgresDb = process.env.POSTGRES_DB;

exec(`docker ps -q -f name=${containerName}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error checking container status: ${err}`);
    console.error(stderr);
    process.exit(1);
  }

  if (!stdout.trim()) {
    console.log('Container is not running');
    process.exit(1);
  }

  console.log(`Container ${containerName} is running`);

  exec(
    `docker cp ${dumpFilePath} ${containerName}:/dumpfile.sql`,
    (err, stdout, stderr) => {
      if (err) {
        console.error(`Error copying dump file: ${err}`);
        console.error(stderr);
        process.exit(1);
      }

      console.log(
        `Dump file ${dumpFilePath} copied to container ${containerName}`,
      );

      exec(
        `docker exec -i ${containerName} pg_restore --verbose --clean --no-acl --no-owner -h localhost -U ${postgresUser} -d ${postgresDb} /dumpfile.sql`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(`Error loading dump file: ${err}`);
            console.error(stderr);
            process.exit(1);
          }

          console.log('SQL dump loaded successfully');
          console.log(stdout);
        },
      );
    },
  );
});
