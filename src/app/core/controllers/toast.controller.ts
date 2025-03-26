import { EmbeddedViewRef, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarRef, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { IToastConfigOption } from "../shared/interfaces";

@Injectable()
export default class ToastController {
    private duration: number = 3000;
    private successCom: any;
    private warningCom: any;
    private dangerCom: any;
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    constructor(
        private _snack: MatSnackBar,
    ) { }

    addComponent(components: any): void {
        this.successCom = components.success;
        this.warningCom = components.warning;
        this.dangerCom = components.danger;
    }

    success(message: string | string[], configOptions?: IToastConfigOption): void {
        if (!this.successCom) { return; };
        const defaultTitle: string = configOptions?.title ?? 'Successfully!';
        const temp: MatSnackBarRef<EmbeddedViewRef<any>> = this._snack.openFromTemplate(this.successCom, {
            duration: configOptions?.duration || this.duration,
            panelClass: configOptions?.panelClass || "success",
            data: {
                title: defaultTitle,
                message: this.formatMes(message),
                cb: (): void => temp.dismiss()
            },
            horizontalPosition: configOptions?.horizontalPosition || this.horizontalPosition,
            verticalPosition: configOptions?.verticalPosition || this.verticalPosition,
        });
    }

    warning(message: string | string[], configOptions?: IToastConfigOption): void {
        if (!this.warningCom) { return; }
        const defaultTitle: string = configOptions?.title ?? 'Warning!';
        const temp: MatSnackBarRef<EmbeddedViewRef<any>> = this._snack.openFromTemplate(this.warningCom, {
            duration: configOptions?.duration || this.duration,
            panelClass: configOptions?.panelClass || "warning",
            data: {
                title: defaultTitle,
                message: this.formatMes(message),
                cb: (): void => temp.dismiss()
            },
            horizontalPosition: configOptions?.horizontalPosition || this.horizontalPosition,
            verticalPosition: configOptions?.verticalPosition || this.verticalPosition,
        });
    }

    error(message: string | string[], configOptions?: IToastConfigOption): void {
        if (!this.dangerCom) { return; };
        const defaultTitle: string | undefined = configOptions?.title;
        const temp: MatSnackBarRef<EmbeddedViewRef<any>> = this._snack.openFromTemplate(this.dangerCom, {
            duration: configOptions?.duration || this.duration,
            panelClass: configOptions?.panelClass || "danger",
            data: {
                title: defaultTitle,
                message: this.formatMes(message),
                cb: (): void => temp.dismiss()
            },
            horizontalPosition: configOptions?.horizontalPosition || this.horizontalPosition,
            verticalPosition: configOptions?.verticalPosition || this.verticalPosition,
        });
    }

    private formatMes(message: string | string[]): string[] {
        return Array.isArray(message) ? message : [message];
    }
}
