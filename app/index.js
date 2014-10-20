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
    this.service = this.args[0];
    this.Service = this.service.charAt(0).toUpperCase() + this.service.slice(1);
    //TODO bundle install
/*
    this.on('end', function () {
      var bundle = spawn("bundle", ["install"]);

      bundle.stdout.on('data', function (data) {
        console.log(data.toString());
      });

      bundle.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });
    });
*/
  },

  structure: function () {
    this.mkdir(this.service + '/adapters/');
    this.mkdir(this.service + '/contracts/');
    this.mkdir(this.service + '/lib/');
    this.mkdir(this.service + '/tasks/');
    this.mkdir(this.service + '/tmp/');
    this.mkdir(this.service + '/spec/adapters/');
    this.mkdir(this.service + '/spec/contracts/');
    this.mkdir(this.service + '/spec/tasks/');
    this.mkdir(this.service + '/spec/lib/');
  },

  createFiles: function () {
    this.copy('_enviroment.rb', this.service +  '/environment.rb');
    this.copy('_Gemfile', this.service +  '/Gemfile');
    this.copy('_Guardfile', this.service +  '/Guardfile');
    this.copy('_Rakefile', this.service +  '/Rakefile');
  },

});

module.exports = RubyHexeGenerator;
