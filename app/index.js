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
    this.mkdir(this.Service + '/adapters/');
    this.mkdir(this.Service + '/contracts/');
    this.mkdir(this.Service + '/lib/');
    this.mkdir(this.Service + '/tasks/');
    this.mkdir(this.Service + '/tmp/');
    this.mkdir(this.Service + '/spec/adapters/');
    this.mkdir(this.Service + '/spec/contracts/');
    this.mkdir(this.Service + '/spec/tasks/');
    this.mkdir(this.Service + '/spec/lib/');
  },

  createFiles: function () {
    this.copy('_enviroment.rb', this.Service +  '/enviroment.rb');
    this.copy('_Gemfile', this.Service +  '/Gemfile');
    this.copy('_Guardfile', this.Service +  '/Guardfile');
    this.copy('_Rakefile', this.Service +  '/Rakefile');
  },

});

module.exports = RubyHexeGenerator;
