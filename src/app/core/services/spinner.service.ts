import { BehaviorSubject, Observable } from "rxjs";

export class SpinnerService {
  private spinner: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  get getSpinner(): Observable<string[]> {
    return this.spinner.asObservable();
  }

  addSpinner(url: string): void {
    const spinner: string[] = this.spinner.getValue();
    spinner.push(url);
    return this.spinner.next(spinner);
  }

  removeSpinner(index: number): void {
    let spinner: string[] = this.spinner.getValue();
    spinner = spinner.filter((_: string, i: number) => i !== index)
    return this.spinner.next(spinner);
  }

  removeAllSpinner(): void {
    return this.spinner.next([]);
  }
}
