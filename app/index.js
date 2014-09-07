'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var sys = require('sys')
var spawn = require('child_process').spawn;

var RubyHexeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        var bundle = spawn("bundle", ["install"]);

        bundle.stdout.on('data', function (data) {
          console.log(data.toString());
        });

        bundle.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });
      }
    });
  },

  askFor: function() {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    var prompts = [{
        name: 'serviceName',
        message: 'What is your service\'s name ?'
    }];

    this.prompt(prompts, function (props) {
        this.service = props.serviceName;
        this.Service = props.serviceName.charAt(0).toUpperCase() + props.serviceName.slice(1);

        done();
    }.bind(this));
  },

  structure: function () {
    this.mkdir('adapters/');
    this.mkdir('contracts/');
    this.mkdir('lib/');
    this.mkdir('tasks/');
    this.mkdir('tmp/');
    this.mkdir('spec/');
    this.mkdir('spec/adapters/');
    this.mkdir('spec/contracts/');
    this.mkdir('spec/tasks/');
    this.mkdir('spec/lib/');
  },

  createFiles: function () {
    //TODO ask for each module
    var context = {
      service: this.service,
      Service: this.Service
    }

    //contracts
    this.src.copy('_enviroment.rb', 'enviroment.rb');
    this.src.copy('_Gemfile', 'Gemfile');
    this.src.copy('_Guardfile', 'Guardfile');
    this.src.copy('_Rakefile', 'Rakefile');

  }


});

module.exports = RubyHexeGenerator;
