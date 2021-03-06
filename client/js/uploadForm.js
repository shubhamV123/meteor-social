Template.uploadForm.onCreated(function () {
    this.currentUpload = new ReactiveVar(false);
  });
  
  Template.uploadForm.helpers({
    currentUpload:function() {
      return Template.instance().currentUpload.get();
    }
  });
  
  Template.uploadForm.events({
    'change #fileInput':function(e, template) {
      if (e.currentTarget.files && e.currentTarget.files[0]) {
        // We upload only one file, in case
        // multiple files were selected
        var upload = Images.insert({
          file: e.currentTarget.files[0],
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);
  
        upload.on('start', function () {
          template.currentUpload.set(this);
        });
  
        upload.on('end', function (error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error);
          } else {
            console.log(fileObj.ext)
            var fileName = fileObj._id+'.'+fileObj.ext;
            // console.log()
            Meteor.call('imgUpdate', fileName);
            alert('File "' + fileObj.name + '" successfully uploaded');
          }
          template.currentUpload.set(false);
        });
  
        upload.start();
      }
    }
  });