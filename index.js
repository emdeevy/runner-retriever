'use strict';

const path = require('path');
const fs = require('fs');

class RunnerRetriever {

    constructor(_config) {

        if(!_config || !this.isObject(_config) || _config.directories === undefined || _config.directories.input === undefined || _config.directories.output === undefined || _config.directories.scripts === undefined) {
            throw new Error("Configuration file is invalid.");
        }

        this.Directories = {};

        this.Directories.output = _config.directories.output;
        this.Directories.input = _config.directories.input;
        this.Directories.scripts = _config.directories.scripts;

    }

    getScriptList = () => {

        let scriptsPath = path.join(__dirname, '../../../', this.Directories.scripts);

        let output = [];

        fs.readdir(scriptsPath, (_error, _files) => {
            if(_error) {
                throw new Error("Unable to scan scripts directory: " + _error);
            }

            _files.forEach((_file) => {
                output.push(_file);
            });
        });

        return output;

    }

    isObject(_variable) {
        return (!!_variable) && (_variable.constructor === Object);
    }

}

module.exports = RunnerRetriever;