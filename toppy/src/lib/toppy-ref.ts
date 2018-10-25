import { animationFrameScheduler, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, observeOn, skipWhile, takeUntil, tap } from 'rxjs/operators';
import { Config } from './config';
import { EventBus } from './helper/event-bus';
import { HostContainer } from './host-container';
import { OverlayInstance } from './overlay-instance';

export class ToppyRef {
  private _isOpen = false;
  private _alive: Subject<Boolean> = new Subject();

  constructor(
    private _overlay: OverlayInstance,
    private _host: HostContainer,
    private _eventBus: EventBus,
    private _config: Config,
    public overlayID: string
  ) {}

  open() {
    const view = this._host.attach();
    this._overlay.create().setView(view);

    this.onDocumentClick().subscribe();
    this.onWindowResize().subscribe();

    setTimeout(_ => this._overlay.computePosition.next(true), 1);
    this._isOpen = true;
    return this;
  }

  close() {
    this._host.detach();
    this._overlay.destroy();
    this._cleanup();
    this._isOpen = false;
    this._eventBus.post({ name: 'REMOVE_OVERLAY_INS', data: this.overlayID });
  }

  toggle() {
    return this._isOpen ? this.close() : this.open();
  }

  events() {
    return this._eventBus.watch();
  }

  onDocumentClick(): Observable<any> {
    return fromEvent(this._overlay.getContainerEl(), 'click').pipe(
      takeUntil(this._alive),
      map((e: any) => e.target),
      skipWhile(() => !this._config.dismissOnDocumentClick),
      filter(this._overlay.isHostElement.bind(this._overlay)),
      tap(() => this.close())
    );
  }

  onWindowResize(): Observable<any> {
    const onResize = fromEvent(window, 'resize');
    const onScroll = fromEvent(window, 'scroll', { passive: true });
    return merge(onResize, onScroll).pipe(
      takeUntil(this._alive),
      debounceTime(5),
      observeOn(animationFrameScheduler),
      distinctUntilChanged(),
      tap(() => {
        this._overlay.computePosition.next(true);
        this._overlay.config.windowResizeCallback();
      })
    );
  }

  private _cleanup() {
    this._alive.next(true);
  }
}
