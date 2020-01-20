module.exports = {
  name: 'util',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/util',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
