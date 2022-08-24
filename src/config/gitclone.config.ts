import { exec } from 'child_process';

(() => {
  const master = 'git clone https://github.com/MKAbuMattar/fluentui-emoji.git';

  exec(master, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.debug(`stderr: ${stderr}`);
      return;
    }
    console.debug(`stdout: ${stdout}`);
  });
})();
