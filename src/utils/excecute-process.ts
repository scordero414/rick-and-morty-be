import { exec } from 'child_process';

export const executeProcess = async (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution failed with error: ${error}`);
        reject(error);
      } else if (stderr) {
        console.warn(`Command outputted stderr: ${stderr}`);
      }
      resolve(stdout || null);
    });
  });
};
