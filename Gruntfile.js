module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      plugin: ['css/**/*']
    },
    less: {
      styles: {
        src: 'less/style.less',
        dest: 'css/style.css'
      }
    },
    watch: {
      plugin: {
        files: ['less/**/*'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'less']);

};
