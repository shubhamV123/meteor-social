Posts = new Mongo.Collection('Posts'); 
Images = new FilesCollection({
    collectionName: 'Images',
    allowClientCode: false, // Disallow remove files from Client
    storagePath: process.env.PWD+'/public',
    downloadRoute: '/public',
    onBeforeUpload:function(file) {
      // Allow upload files under 10MB, and only in png/jpg/jpeg formats
      if (file.size <= 10485760 && /png|jpg|jpeg|svg/i.test(file.extension)) {
        return true;
      } else {
        return 'Please upload image, with size equal or less than 10MB';
      }
    }
  });
