module.exports = {
  dependency: {
    platforms: {
      android: {
        sourceDir: './android',
        packageImportPath: 'import com.levelup.tracker.LevelUpTrackerPackage;',
        packageInstance: 'new LevelUpTrackerPackage()',
      },
      ios: {
        podspecPath: __dirname + '/levelup-tracker.podspec',
      },
    },
  },
};
