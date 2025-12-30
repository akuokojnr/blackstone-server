module.exports = {
  apps : [{
    name: "blackstone-server",
    script: './dist/index.js',
    watch: './dist',
    node_args: '-r dotenv/config',
  }],
};
