import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from '../../providers/rest/rest';
import { LoadingController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import jsSHA from 'jssha';

@IonicPage()
@Component({
  selector: 'page-select-mode',
  templateUrl: 'select-mode.html'
})
export class SelectModePage {

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'pagesheet',//iOS only
    fullscreen : 'yes',//Windows only
  };

  result : any;
  order :  any;

  txnId : any;
  surl : string;
  furl : string;

  paymentString : string;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage: Storage,
    public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    private theInAppBrowser: InAppBrowser) {
      this.surl = this.restProvider.getBaseUrl() + "/PayUMoney/success.php";
      this.furl = this.restProvider.getBaseUrl() + "/PayUMoney/failure.php";

    }

    goToConfirmOrder(){
      this.presentPickupConfirm();
    }

    goToSetAddress(){
      this.navCtrl.push('DeliveryAddressPage');
      
    }

    goToTermsAndConditionsPage(){
      this.navCtrl.push('TermsAndConditionsPage');
    }

    presentPickupConfirm() {
      let alert = this.alertCtrl.create({
        title: 'Prasad Medical',
        message: 'Are you sure you want to pickup the medicines?',
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
              this.presentRadioPrompt();

            }
          }
        ]
      });
      alert.present();
    };

    callPlaceOrderApi(){
      this.storage.get('pxIdArray').then((val) => {
        console.log('storage pxIdArray', val);

        this.storage.get('itemsArray').then((val1) => {
          console.log('storage itemsArray', val1);

          this.storage.get('userId').then((val2) => {
            console.log('storage userId', val2);

            this.storage.get('email').then((val3) => {
              console.log('storage email', val3);

              this.storage.get('mobile').then((val4) => {
                console.log('storage mobile', val4);
                //mode is pickup here, address will b blank
                this.order ={
                "prescription_array" : val,
                "items_array" : val1,
                "user_id" : val2,
                "mode" : "p",
                "address" : null,
                "email"  : val3,
                "mobile" : val4,
                "txn_id"  : this.txnId
              };

              let loader = this.loadingCtrl.create({
                content: "Placing your order..."
              });
              loader.present();

              this.restProvider.postRequest('/placeOrder', this.order).then((result) => {
                loader.dismiss();
                console.log(result);
                this.result = result;

                if(this.result.statusKey == 200){
                  this.storage.remove('pxIdArray');
                  this.storage.remove('smallImgs');
                  this.storage.remove('itemsArray');
                  this.storage.remove('amountTotal');
                  this.navCtrl.setRoot('ConfirmOrderPage');
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
            });
          });
        });
      });
    });
  }

  payWithPayMoney(){

    this.storage.get('amountTotal').then((val1) => {
      console.log('storage amountTotal', val1);

      this.storage.get('userName').then((val2) => {
        console.log('storage userName', val2);

        this.storage.get('email').then((val3) => {
          console.log('storage email', val3);

          this.storage.get('mobile').then((val4) => {
            console.log('storage mobile', val4);


            if(val4 == undefined || val4 == ''){
              this.presentPrompt();
              return;
            }

            var options = {
              location: 'yes',
              clearcache: 'yes',
              toolbar: 'no',
              closebuttoncaption:'back'
            };
            var close;
            var closeLoop;
            var amt = val1;
            var name =  val2;
            var email = val3;
            var mobile = val4;
            this.txnId = this.restProvider.getUniqueTxnId();
            console.log('generateTxnId:',this.txnId);
            // var amt = 1;
            // var name =  "Kriti";
            // var email = "kritid11@gmail.com";
            // var mobile = "8600273356";
            var bookingId = this.txnId;
            var productinfo = "Order for "+ this.txnId;
            var string = this.restProvider.getKey() + '|' + bookingId + '|' + amt+ '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + this.restProvider.getSalt();
            //var encrypttext = sha512(string);
            let shaObj = new jsSHA("SHA-512", "TEXT");
            shaObj.update(string);
            let encrypttext = shaObj.getHash("HEX");
            console.log(encrypttext);

            this.paymentString = `
            <html>
            <body>
            <form action="${this.restProvider.getProductionUrl()}" method="post" id="payu_form">
            <input type="hidden" name="firstname" value="${name}"/>
            <input type="hidden" name="email" value="${email}"/>
            <input type="hidden" name="phone" value="${mobile}"/>
            <input type="hidden" name="surl" value="${this.surl}"/>
            <input type="hidden" name="furl" value="${this.furl}"/>
            <input type="hidden" name="key" value="${this.restProvider.getKey()}"/>
            <input type="hidden" name="hash" value="${encrypttext}"/>
            <input type="hidden" name="txnid" value="${this.txnId}"/>
            <input type="hidden" name="productinfo" value="${productinfo}"/>
            <input type="hidden" name="amount" value="${amt}"/>
            <input type="hidden" name="service_provider" value="${this.restProvider.getServiceProvider()}"/>
            <button type="submit" value="submit" #submitBtn></button>
            </form>
            <script type="text/javascript">document.getElementById("payu_form").submit();</script>
            </body>
            </html>`;

            console.log(this.paymentString);
            this.paymentString = 'data:text/html;base64,' + btoa(this.paymentString);

            const browser = this.openWithInAppBrowser(this.paymentString);
            browser.on('loadstart').subscribe(event => {});

            browser.on('loadstop').subscribe(event => {

              if(event.url == this.surl) {
                browser.close();
                this.callPlaceOrderApi();
              }
              if(event.url == this.furl) {
                browser.close();
                this.presentAlert('Something went wrong.. Please try again.');
              }
            });

            browser.on('loaderror').subscribe(event => {});
            browser.on('exit').subscribe(event => {});

          });
        });
      });
    });
  }

  openWithSystemBrowser(url : string){
    let target = "_system";
    return this.theInAppBrowser.create(url,target,this.options);
  }

  openWithInAppBrowser(url : string){
    let target = "_blank";
    return this.theInAppBrowser.create(url,target,this.options);
  }

  openWithCordovaBrowser(url : string){
    let target = "_self";
    return this.theInAppBrowser.create(url,target,this.options);
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
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Prasad Medical',
      inputs: [
        {
          name: 'mobileNumber',
          placeholder: 'please enter Mobile Number'
        }
      ],
      buttons: [
        {
          text: 'Save',
          handler: data => {

            this.storage.set('mobile', data.mobileNumber);
            this.payWithPayMoney();
          }
        }
      ]
    });
    alert.present();
  }

  presentRadioPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Prasad Medical',
      message: 'Please select Payment mode ',
      inputs : [
        {
          type:'radio',
          label:'NetBanking/Credit Cards/Debit Cards',
          value:'PG'
        },
        {
          type:'radio',
          label:'Cash on Pickup/Delivery',
          value:'COD'
        }],
        buttons : [
          {
            text: "Cancel",
            handler: data => {
              console.log("cancel clicked");
            }
          },
          {
            text: "Ok",
            handler: data => {
              console.log("ok clicked data: ",data);
              if(data == 'PG'){
                this.storage.get('amountTotal').then((val1) => {
                  console.log('storage amountTotal', val1);
                  if(val1 == undefined || val1 == 0){
                    this.txnId = null;
                    this.callPlaceOrderApi();
                  }else{
                    this.payWithPayMoney();
                  }
                });
              }else{
                this.txnId = null;
                this.callPlaceOrderApi();
              }
            }
          }]
        });
        prompt.present();
      }

    }
