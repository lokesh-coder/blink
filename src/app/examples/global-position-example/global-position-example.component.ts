import { Component, OnInit } from '@angular/core';
import { InsidePlacement, ToppyRef, Toppy, GlobalPosition } from 'toppy';
import { SimpleModalComponent } from '../../host-components/simple-modal/simple-modal.component';

@Component({
  selector: 'app-global-position-example',
  templateUrl: './global-position-example.component.html',
  styles: []
})
export class GlobalPositionExampleComponent implements OnInit {
  placements: { name: string; value: InsidePlacement }[] = [
    { name: 'Bottom', value: InsidePlacement.BOTTOM },
    { name: 'Bottom left', value: InsidePlacement.BOTTOM_LEFT },
    { name: 'Bottom right', value: InsidePlacement.BOTTOM_RIGHT },
    { name: 'Left', value: InsidePlacement.LEFT },
    { name: 'Right', value: InsidePlacement.RIGHT },
    { name: 'Top', value: InsidePlacement.TOP },
    { name: 'Top left', value: InsidePlacement.TOP_LEFT },
    { name: 'Top right', value: InsidePlacement.TOP_RIGHT },
    { name: 'Center', value: InsidePlacement.CENTER }
  ];
  selectedPlacement = null;
  private _toppyRef: ToppyRef<SimpleModalComponent>;
  constructor(private toppy: Toppy<SimpleModalComponent>) {}

  ngOnInit() {}

  open() {
    if (this._toppyRef) {
      this._toppyRef.close();
    }
    this._toppyRef = this.toppy
      .overlay(new GlobalPosition({ placement: this.selectedPlacement, hostHeight: 'auto', hostWidth: 'auto' }))
      .host(SimpleModalComponent)
      .create();
    this._toppyRef.open();
  }

  onOptionChange() {
    console.log('option changed');
  }
}
