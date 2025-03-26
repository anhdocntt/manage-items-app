import { Injectable } from "@angular/core";
import { SpinnerService } from "../services/spinner.service";

@Injectable()
export default class SpinnerController {
  private isRunning: boolean = false;
  private removeList: string[] = [];
  private notFoundList: string[] = [];

  constructor(
    private spinnerService: SpinnerService
  ) { }

  addSpinner(url: string): void {
    this.spinnerService.addSpinner(url);
    this.startRemove();
  }

  removeSpinner(url: string): void {
    if (!url) {
      this.removeList.push('');
    } else {
      this.removeList.push(url);
    }
    return this.startRemove();
  }

  private startRemove(): void {
    if (this.isRunning) { return; }
    this.isRunning = true;
    return this.processRemove();
  }

  private processRemove(): void {
    if (!this.removeList.length) {
      this.isRunning = false;
      this.processNotFound();
      return;
    }
    this.spinnerService.getSpinner.subscribe((spinner: string[]): void => {
      const index: number = spinner.findIndex((e: string) =>
        e === this.removeList[0]
        || e.indexOf(this.removeList[0]) > -1
        || this.removeList[0].indexOf(e) > -1
      );
      if (index > -1) {
        this.spinnerService.removeSpinner(index);
      } else {
        this.notFoundList.push(this.removeList[0]);
      }
      this.removeList = this.removeList.filter((_: string, i: number): number => i);
      setTimeout(() => {
        this.processRemove();
      });
    }).unsubscribe();
  }

  private processNotFound() {
    this.spinnerService.getSpinner.subscribe((spinner: string[]): void => {
      const storeList: string = JSON.stringify(spinner);
      setTimeout(() => {
        if (storeList === JSON.stringify(spinner)) {
          return this.spinnerService.removeAllSpinner();
        }
      }, 60000);
    }).unsubscribe();
  }
}
