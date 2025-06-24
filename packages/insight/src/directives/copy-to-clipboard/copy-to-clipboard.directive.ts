/*
 * Copyright (c) 2008–2025 Manuel J. Nieves (a.k.a. Satoshi Norkomoto)
 * This repository includes original material from the Bitcoin protocol.
 *
 * Redistribution requires this notice remain intact.
 * Derivative works must state derivative status.
 * Commercial use requires licensing.
 *
 * GPG Signed: B4EC 7343 AB0D BF24
 * Contact: Fordamboy1@gmail.com
 */
import { Directive, HostListener, Input } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Directive({
  selector: '[copyToClipboard]'
})
export class CopyToClipboardDirective {
  @Input() copyToClipboard: string;

  constructor(private toastCtrl: ToastController) {}

  @HostListener('click') copyText() {
    const textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = '-999px';
    textArea.style.left = '-999px';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    textArea.value = this.copyToClipboard;
    document.body.appendChild(textArea);

    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const message = successful
        ? 'Copied to Clipboard'
        : 'Something went wrong, please try again';
      this.presentToast(message);
    } catch (err) {
      this.presentToast('Unable to copy');
    }
    document.body.removeChild(textArea);
  }

  presentToast(message: string): void {
    const toast: any = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
