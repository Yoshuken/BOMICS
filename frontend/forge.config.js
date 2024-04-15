const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        authors: 'Yoshuken',
        description: 'bomics. books and comics library for oneself'
      }
    }
  ],
  packagerConfig: {
    icon: './images/icon.jpg' 
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'yoshuken',
          name: 'BOMICS',
        },
        prerelease: true,
      }
    }
  ],
};
