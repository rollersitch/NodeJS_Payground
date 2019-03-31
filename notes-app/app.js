const notes = require('./notes.js');
//const validator = require('validator');
//const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');

yargs.version('1.0.0');

yargs.command({
    command: 'add',
    desc: 'Add a new note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption: true,
            type:'string'
        }
    },
    handler: (argv) => {
        console.log(`adding note with title ${argv.title} and body ${argv.body}`);

        const inputs = {
            title: argv.title,
            body: argv.body
        };

        if(fs.existsSync(notes.notesFileName)) {
            const dataBuffer = fs.readFileSync(notes.notesFileName);

            if(dataBuffer && dataBuffer.length > 0){
                const data = JSON.parse(dataBuffer.toString());
                if(data.filter(it => it.title === argv.title).length === 0){
                    data.push(inputs);
                    fs.writeFileSync(notes.notesFileName,JSON.stringify(data));
                }
                else{
                    throw Error(`Existing note with title ${argv.title}.`);
                }                
            }
        }
        else {
            fs.writeFileSync(notes.notesFileName,JSON.stringify([inputs]));
        }        
    }        
  })
  .help();

  yargs.command({
    command: 'remove',
    desc: 'Remove a note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler: (argv) => {
        console.log(`removing note with title ${argv.title}`);
        if(fs.existsSync(notes.notesFileName)){
            const dataBuffer = fs.readFileSync(notes.notesFileName);

            if(dataBuffer && dataBuffer.length > 0){
                const data = JSON.parse(dataBuffer.toString());
                fs.writeFileSync(notes.notesFileName, JSON.stringify(data.filter(item => item.title !== argv.title)));
            }
        }
        else{
            throw Error('No notes file..');
        }        
    }
  })
  .help();


  yargs.command({
    command: 'read',
    desc: 'Read a note',
    builder: {
        title: {
            describe:'Note title',
            demandOption: true,
            type:'string'
        }
    },
    handler: (argv) => {
        console.log(`reading note with title ${argv.title}`);    
        if(fs.existsSync(notes.notesFileName)){
            const dataBuffer = fs.readFileSync(notes.notesFileName);
            if(dataBuffer && dataBuffer.length > 0){
                const data = JSON.parse(dataBuffer.toString());
                if(data.filter(it => it.title === argv.title).length > 0){
                    console.log(data.find(item => item.title === argv.title).body);
                }
                else{
                    console.log(`Note with title ${argv.title} not found`);
                }
            }
        }
        else{
            console.log(`No notes found`);
        }   
    }   
  })
  .help();

  yargs.command({
    command: 'list',
    desc: 'Lists all notes',
    // builder: {
    //     title: {
    //         describe:'Note title',
    //         demandOption: true,
    //         type:'string'
    //     }
    // },
    handler: (argv) => {
        console.log(`listing all notes`);    

        if(fs.existsSync(notes.notesFileName)){
            const dataBuffer = fs.readFileSync(notes.notesFileName);
            if(dataBuffer && dataBuffer.length > 0){
                const data = JSON.parse(dataBuffer.toString());
                console.log(data.map(it => it.title));
            }
        }
        else{
            console.log(`Found 0 notes`);
        }   
    }
  })
  .help();

  yargs.parse();

