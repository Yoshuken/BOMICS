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
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'yoshuken',
          name: 'bomics'
        },
        prerelease: true
      }
    }
  ]
};
