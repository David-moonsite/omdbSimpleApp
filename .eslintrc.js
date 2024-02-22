module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    'import/resolver': {
      'node': {
        extensions: ['.js', '.jsx', '.json', '.native.js']
      }
    },
  },
};
