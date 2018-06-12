import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, Platform } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular'
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Toast } from '@ionic-native/toast';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-add-prescription',
  templateUrl: 'add-prescription.html',
})
export class AddPrescriptionPage {

  lastImage: string;
  pxIdArray : Array<string> = [];
  result : any;
  smallImgs: Array<string> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider,
              private transfer: FileTransfer,
              private camera: Camera,
              public actionSheetCtrl: ActionSheetController,
              private storage: Storage,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private file: File,
              private filePath: FilePath,
              private platform: Platform,
              private toast: Toast) {

              this.storage.get('smallImgs').then((val) => {
                  console.log('from upload storage smallImgs', val);
                  if(val == null || val == undefined){
                    this.storage.set('smallImgs',this.smallImgs);
                  }else{
                    this.smallImgs = val;
                  }
              });

              this.storage.get('pxIdArray').then((val) => {
                  console.log('from storage pxIdArray', val);
                  if(val == null || val == undefined){
                    this.storage.set('pxIdArray',this.pxIdArray);
                  }else{
                    this.pxIdArray = val;
                  }
              });

 }

 addPrescription() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add Prescription',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            console.log('take photo clicked');
            this.loadImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Select from Gallery',
          handler: () => {
            console.log('gallery clicked');
            this.loadImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  loadImage(sourceType) {
   const options: CameraOptions = {
     quality: 100,
     destinationType: this.camera.DestinationType.FILE_URI,
     sourceType: sourceType,
     correctOrientation: true,
     allowEdit: false
   };

   this.camera.getPicture(options).then(imagePath => {
      // Special handling for Android library

      //console.log('this filePath',this.filePath);
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        console.log('if');
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            console.log('filePath',filePath);
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        console.log('else');
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }


   }, err => {
     console.log('gallery error: ', err);
   });
 }

 //Create a new name for the image
 private createFileName() {
   var d = new Date(),
   n = d.getTime(),
   newFileName =  n + ".jpg";
   console.log('newFileName',newFileName);
   return newFileName;
 }

 // Copy the image to a local folder
 private copyFileToLocalDir(namePath, currentName, newFileName) {
   console.log('currentName',currentName);
   console.log('correctPath',namePath);

   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
     this.lastImage = newFileName;
     console.log('lastImage',this.lastImage);

     this.uploadFile();
   }, error => {
     console.log('Error while storing file.');
   });
 }

 // Always get the accurate path to your apps folder
 public pathForImage(img) {
   if (img === null) {
     console.log('pathForImage','');
     return '';
   } else {
     console.log('pathForImage',cordova.file.dataDirectory + img);
     return cordova.file.dataDirectory + img;
   }
 }

 uploadFile() {
   console.log('image data sent:', this.lastImage);
   let loader = this.loadingCtrl.create({
     content: "Uploading Prescription..."
   });
   loader.present();

   // File for Upload
   var targetPath = this.pathForImage(this.lastImage);

   // File name only
   var filename = this.lastImage;

   var options = {
     fileKey: "file",
     fileName: filename,
     chunkedMode: false,
     mimeType: "multipart/form-data",
     params : {'fileName': filename}
   };

   const fileTransfer: FileTransferObject  = this.transfer.create();

   fileTransfer.upload(targetPath, 'https://ede354dd.ngrok.io/prasad-medical/public/addPrescription', options)
     .then((data) => {
       console.log('data:',data);
       loader.dismiss();

       this.result = JSON.parse(data.response);
       console.log('data.response json:', this.result);
       if(this.result.statusKey == 200){
          //save px id got frm serve, to use while placing order
          this.presentToast('Prescription added successfully');
          this.pxIdArray.push(this.result.data.id);
          this.storage.set('pxIdArray',this.pxIdArray);
          this.smallImgs.push(this.result.data.prescription);
          this.storage.set('smallImgs',this.smallImgs);
          //this.imageFileName = this.result.data.prescription; //"http://192.168.0.7:8080/static/images/ionicfile.jpg"

       }else{
         this.presentAlert(this.result.message);
       }
   }, (err) => {
     console.log(err);
     loader.dismiss();
     this.presentAlert('Something went wrong.. Please try again.');
   });
 }

 presentToast(msg){
   this.toast.show(msg, '3000', 'bottom').subscribe(
      toast => {
        console.log(toast);
      }
    );
 }

 presentAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Prasad Medical',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  };

 deletePrescription(index){

   //todo: call delete px api, using px id base on index

   let loader = this.loadingCtrl.create({
     content: "Deleting Prescription..."
   });
   loader.present();

    this.restProvider.getRequest('/deletePrescription', '/' + this.pxIdArray[index]).then((result) => {
      loader.dismiss();
      console.log(result);
        this.result = result;

        if(this.result.statusKey == 200){
          this.presentToast(this.result.message);

          this.smallImgs.splice(index,1);
          this.storage.set('smallImgs',this.smallImgs);

          this.pxIdArray.splice(index,1);
          this.storage.set('pxIdArray',this.pxIdArray);
        }else if(this.result.statusKey == 400){
          this.presentAlert(this.result.message);
        }else{
          this.presentAlert('Something went wrong.. Please try again.');
        }

    }, (err) => {
      loader.dismiss();
      console.log(err);
      this.presentAlert('Something went wrong.. Please try again.');
    });

 }

 goToAddItemPage(){
   this.navCtrl.push('AddItemPage');
 }

 presentDeleteConfirm(index) {
   let alert = this.alertCtrl.create({
     title: 'Prasad Medical',
     message: 'Are you sure you want to delete this Prescription?',
     buttons: [
       {
         text: 'No',
         role: 'cancel',
         handler: () => {
           //console.log('Cancel clicked');
         }
       },
       {
         text: 'Yes',
         handler: () => {
           this.deletePrescription(index);
         }
       }
     ]
   });
   alert.present();
 }
}
