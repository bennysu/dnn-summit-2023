import { toastController, modalController, popoverController, alertController, loadingController } from '@ionic/vue'

export default {
  helper: {
    getSlug(record: any): string {
      if (!record) return ''
      const new_id = record.id.slice(-4)
      return (record.ordernumber || new_id.toUpperCase())
    },
    formatPhone(phone: string): string {
      return `${phone.slice(2,5)}-${phone.slice(5,8)}-${phone.slice(8)}`
    },
    removePlusOne(phone: string): string {
      return phone.replace('+1', '')
    },
  },
  alert: {
    async confirmation(opts: any) {
      return alertController.create(opts);
    }
  },
  toasty: {
    async create(msg: string) {
      const toast = await toastController.create({
        message: msg,
        duration: 2000,
      });
      toast.present();
    },
    async operation_failed(err_code?: string) {
      const toast = await toastController.create({
        message: 'Operation FAILED. Contact support if problem persist. ' + (err_code || '') ,
        duration: 5000,
      });
      toast.present();
    },
  },
  loading: {
    async create() {
      const loading = await loadingController.create({
        message: 'LOADING...',
        spinner: 'lines',
      })
      await loading.present()
    },
    dismiss() {
      loadingController.dismiss()
    },
  },
  modal: {
    create(opts: any): Promise<HTMLIonModalElement>
    {
      opts.canDismiss = true
      return modalController.create(opts)
    },
    dismiss(id?: string) {
      if (id)
      {
        modalController.dismiss({}, 'cancel', id);
      }
      else
      {
        modalController.dismiss();
      }
  },
    success(returnObj: any, id: string) {
      modalController.dismiss(returnObj,'success', id)
    },
  },
  popover: {
    create(opts: any): Promise<HTMLIonPopoverElement>
    {
      opts.canDismiss = true
      return popoverController.create(opts)
    },
    createSlideover(opts: any): Promise<HTMLIonPopoverElement>
    {
      opts.cssClass = 'slide-popover'
      opts.showBackdrop = true
      opts.canDismiss = true
      return popoverController.create(opts)
    },
    dismiss(id?: string){
      if (id)
      {
        popoverController.dismiss({}, 'cancel', id);
      }
      else
      {
        popoverController.dismiss();
      }
    },
    success(data: any, id: string){
      popoverController.dismiss(data, 'success', id);
    },
  },
  ID: {
    SessionDetailsModal: 'SessionDetailsModal',
  },
}