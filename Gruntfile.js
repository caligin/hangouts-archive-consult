

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['target'],
    copy: {
      sources: {
          expand: true,
        cwd: 'src',
        src: '**',
        dest: 'target/site/'
      }
    },
    bower: {
      install: {
        options:{
          targetDir: 'target/site/lib/',
          layout: function(){
            return '.'; //all flattened in lib/
          }
        }
      }
    },
    compress: {
      release: {
        options: {
          mode: 'tgz',
          archive: 'target/hangouts-archive-consult.tar.gz'
        },
        files: [
          {expand: true, cwd: 'target/site/', src: ['**'], dest: 'site/'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 8888,
          keepalive: true,
          base:'target/site/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', [
    'clean',
    'copy:sources',
    'bower:install',
    'compress:release'
  ]);

  grunt.registerTask('run', [
    'default',
    'connect:server'
  ]);
};