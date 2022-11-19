import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core';

PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default)
export const localDBSchedules = new PouchDB('Schedules', {adapter: 'asyncstorage'})
export const remoteDBUser = new PouchDB('http://admin:1234@192.168.1.236:5984/roracausers')

 export const SyncUser = () => {
  localDBWOWDBUser.sync(remoteDBUser, {
    live: true, 
    retry: true
  }).on('change', function () {
   
    localDBWOWDBUser.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const localDBWOWDBItem = new PouchDB('RoracaItem', {adapter: 'asyncstorage'})
export const remoteDBItem = new PouchDB('http://admin:1234@192.168.1.236:5984/roracaitem')

 export const SyncItems = () => {  
  localDBWOWDBItem.sync(remoteDBItem, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBWOWDBItem.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const localDBWOWDBOrder = new PouchDB('RoracaItem', {adapter: 'asyncstorage'})
export const remoteDBOrder = new PouchDB('http://admin:1234@192.168.1.236:5984/roracaorders')

 export const SyncOrders = () => {  
  localDBWOWDBItem.sync(remoteDBItem, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBWOWDBItem.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}