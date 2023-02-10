import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core';

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//SCHEDULES
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
      console.log('done syc')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//FACULTY
export const localDBFaculty = new PouchDB('Faculty', {adapter: 'asyncstorage'})
export const remoteDBFaculty = new PouchDB('http://admin:admin@192.168.0.192:5984/dhd_colleges')

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
// ADMIN
export const localDBAdmin = new PouchDB('Admin', {adapter: 'asyncstorage'})
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
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// EVENT
export const localDBEvent = new PouchDB('Event', {adapter: 'asyncstorage'})
export const remoteDBEvent = new PouchDB('http://admin:1234@192.168.0.199:5984/event')

 export const SyncEvent = () => {  
  localDBEvent.sync(remoteDBEvent, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBEvent.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//SUGGESTION AND FEEDBACK
export const localDBSuggestionFeedback = new PouchDB('SuggestionFeedback', {adapter: 'asyncstorage'})
export const remoteDBSuggestionFeedback = new PouchDB('http://admin:1234@192.168.0.199:5984/suggestionfeedback')

 export const SyncSuggestionFeedback = () => {  
  localDBSuggestionFeedback.sync(remoteDBSuggestionFeedback, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBSuggestionFeedback.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//REPORT AND BUG REPORT
export const localDBReportBugReport = new PouchDB('ReportBugReport', {adapter: 'asyncstorage'})
export const remoteDBReportBugReport = new PouchDB('http://admin:1234@192.168.0.199:5984/reportbugreport')

 export const SyncReportBugReport = () => {  
  localDBReportBugReport.sync(remoteDBReportBugReport, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBReportBugReport.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//STUDENTLOGIN
export const localDBStudentLogin = new PouchDB('StudentLogin', {adapter: 'asyncstorage'})
export const remoteDBStudentLogin = new PouchDB('http://admin:1234@192.168.0.199:5984/studentlogin')

 export const SyncStudentLogin = () => {  
  localDBStudentLogin.sync(remoteDBStudentLogin, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBStudentLogin.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//SUPERADMIN
export const localDBSuperAdmin = new PouchDB('SuperAdmin', {adapter: 'asyncstorage'})
export const remoteDBSuperAdmin = new PouchDB('http://admin:1234@192.168.0.199:5984/superadmin')

 export const SyncSuperAdmin = () => {  
  localDBSuperAdmin.sync(remoteDBSuperAdmin, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBSuperAdmin.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//LOGBOOK
export const localDBLogBook = new PouchDB('Logbook', {adapter: 'asyncstorage'})
export const remoteDBLogBook = new PouchDB('http://admin:1234@192.168.0.199:5984/logbook')

 export const SyncLogBook = () => {  
  localDBLogBook.sync(remoteDBLogBook, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBLogBook.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//GUEST
export const localDBGuest = new PouchDB('Guest', {adapter: 'asyncstorage'})
export const remoteDBGuest = new PouchDB('http://admin:1234@192.168.0.199:5984/guest')

 export const SyncGuest = () => {  
  localDBGuest.sync(remoteDBGuest, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBGuest.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//BUILDING
export const localDBBuilding = new PouchDB('Building', {adapter: 'asyncstorage'})
export const remoteDBBuilding = new PouchDB('http://admin:admin@192.168.0.191:5984/building')

 export const SyncBuilding = () => {  
  localDBBuilding.sync(remoteDBBuilding, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBBuilding.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}

export const localDBCourse = new PouchDB('Building', {adapter: 'asyncstorage'})
export const remoteDBCourses = new PouchDB('http://admin:admin@192.168.0.192:5984/dhd_courses')

 export const SyncCourses = () => {  
  localDBCourse.sync(remoteDBCourses, {
    live: true, 
    retry: true
  }).on('change', function () {
   console.log('start sync')

   localDBCourse.allDocs({include_docs:true}).then(function(doc){
      console.log(doc)
      console.log('done sync')
  })
  }).on('error', function (err) {
    console.log(err);
  });
}