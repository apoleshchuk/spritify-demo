module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		spritify: {
			path: function() {
				return grunt.task.current.args[0].replace(/\/$/, '');
			},
			name: function() {
				return grunt.task.current.args[0].replace(/\/$/, '').split('/').pop();
			}
		},
		imgo: {
			spritify: {
				src: ["<%= spritify.path() %>/**/*_7up.png"]
			}
		},
		retinafy: {
			options: {
				sizes: {
					'100%': {suffix: '@2x'},
					'50%': {suffix: ''}
				}
			},
			spritify: {
				files: [
					{
						expand: true,
						cwd: "<%= spritify.path() %>/origin",
						src: ["**/*.{jpg,png}"],
						dest: "<%= spritify.path() %>/src"
					}
				]
			}
		},
		sprite: {
			spritify: {
				algorithm: 'binary-tree',
				engine: 'phantomjs',
				src: "<%= spritify.path() %>/src/*.png",
				dest: "<%= spritify.path() %>/<%= spritify.name() %>__7up.png",
				destStyl: false
			}
		}
	});
	grunt.registerTask('spritify', 'Complex task for optimize, retinafy and spritify', function () {
		grunt.task.run(['retinafy', 'sprite', 'imgo'].map(function(sTask) {
			return sTask + ':spritify:' + grunt.task.current.args.join(':');
		}));
	});
	grunt.registerTask('default', ['spritify:demo/']);
}