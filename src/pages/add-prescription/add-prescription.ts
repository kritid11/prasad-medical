import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';


import { RestProvider } from '../../providers/rest/rest';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular'

//import { AddItemPage } from '../add-item/add-item';

/**
 * Generated class for the AddPrescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-prescription',
  templateUrl: 'add-prescription.html',
})
export class AddPrescriptionPage {

  imageURI:any;
  imageFileName:any;

  user = { name: '', username: '', email: '', phone: '', website: '',
          address: { street: '', suite: '', city: '', zipcode: '',
                    geo: { lat: '', lng: '' } },
          company: { name: '', bs: '', catchPhrase: '' }
        };

    //bigImg = null;
    bigSize = '0';

    bigImgs: Array<string> = [];
    smallImgs: Array<string> = [];
    smallSize = '0';

    count: number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider,
              private transfer: FileTransfer,
              private camera: Camera,
              public actionSheetCtrl: ActionSheetController) {

                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');
                this.smallImgs.push('assets/imgs/logo.png');


 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPrescriptionPage');
  }

  uploadImage(){
    //todo: upload pres pics and go to add-items pages
    //uploadFile();
    this.navCtrl.push('AddItemPage');
  }

  private fileTransfer: FileTransferObject = this.transfer.create();

  uploadFile() {
    // let loader = this.loadingCtrl.create({
    //   content: "Uploading..."
    // });
    // loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.bigImgs[0], 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      alert(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      //loader.dismiss();
      //this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      //loader.dismiss();
      //this.presentToast(err);
    });
  }

    // presentToast(msg) {
    //   let toast = this.toastCtrl.create({
    //     message: msg,
    //     duration: 3000,
    //     position: 'bottom'
    //   });
    //
    //   toast.onDidDismiss(() => {
    //     console.log('Dismissed toast');
    //   });
    //
    //   toast.present();
    // }

    loadImage(sourceType) {
       const options: CameraOptions = {
         quality: 100,
         destinationType: this.camera.DestinationType.DATA_URL,
         sourceType: sourceType,
         correctOrientation: true,
         allowEdit: false
       };

       this.camera.getPicture(options).then(imageData => {
         let base64data = 'data:image/jpeg;base64,' + imageData;
         this.bigImgs.push(base64data);
         //this.bigSize = this.getImageSize(this.bigImg[this.count]);
         this.createThumbnail();
       }, err => {
         console.log('gallery error: ', err);
       });
     }

     createThumbnail() {
       this.generateFromImage(this.bigImgs[this.count], 100, 100, 0.5, data => {
         this.smallImgs.push(data);
         //this.smallSize = this.getImageSize(this.smallImgs[count]);
         this.count++;
       });
     }

     generateFromImage(img, MAX_WIDTH: number = 700, MAX_HEIGHT: number = 700, quality: number = 1, callback) {
       var canvas: any = document.createElement("canvas");
       var image = new Image();

       image.onload = () => {
         var width = image.width;
         var height = image.height;

         if (width > height) {
           if (width > MAX_WIDTH) {
             height *= MAX_WIDTH / width;
             width = MAX_WIDTH;
           }
         } else {
           if (height > MAX_HEIGHT) {
             width *= MAX_HEIGHT / height;
             height = MAX_HEIGHT;
           }
         }
         canvas.width = width;
         canvas.height = height;
         var ctx = canvas.getContext("2d");

         ctx.drawImage(image, 0, 0, width, height);

         // IMPORTANT: 'jpeg' NOT 'jpg'
         var dataUrl = canvas.toDataURL('image/jpeg', quality);

         callback(dataUrl)
       }
       image.src = img;
     }

     getImageSize(data_url) {
       var head = 'data:image/jpeg;base64,';
       return ((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4);
     }


  // saveUser() {
  //   this.restProvider.saveUser(this.user).then((result) => {
  //     console.log(result);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }
  deletePrescription(index){
    //console.log('delete item i:',index);
    this.smallImgs.splice(index,1);
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

}
