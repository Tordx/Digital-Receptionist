import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core';

PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default)
export const localDBSchedules = new PouchDB('Schedules', {adapter: 'asyncstorage'})
export const remoteDBSchedules = new PouchDB('http://admin:1234@192.168.0.199:5984/schedule')

 export const SyncSchedules = () => {
  localDBSchedules.sync(remoteDBSchedules, {
    live: true, 
    retry: true
  }).on('change', function () {
   
    localDBSchedules.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const localDBFaculty = new PouchDB('Faculty', {adapter: 'asyncstorage'})
export const remoteDBFaculty = new PouchDB('http://admin:1234@192.168.0.199:5984/faculty')

 export const SyncFaculty = () => {  
  localDBFaculty.sync(remoteDBFaculty, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBFaculty.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const localDBAdmin = new PouchDB('Faculty', {adapter: 'asyncstorage'})
export const remoteDBAdmin = new PouchDB('http://admin:1234@192.168.0.199:5984/admin')

 export const SyncAdmin = () => {  
  localDBAdmin.sync(remoteDBAdmin, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBAdmin.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}