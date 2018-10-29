import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';
import { ToppyModule } from 'toppy';
import { AppComponent } from './app.component';
import { FullscreenPositionExampleComponent } from './examples/fullscreen-position-example/fullscreen-position-example.component';
import { GlobalPositionExampleComponent } from './examples/global-position-example/global-position-example.component';
import { RelativePositionExampleComponent } from './examples/relative-position-example/relative-position-example.component';
import { SlidePositionExampleComponent } from './examples/slide-position-example/slide-position-example.component';
import { HeroScreenComponent } from './host-components/hero-screen/hero-screen.component';
import { SimpleListComponent } from './host-components/simple-list/simple-list.component';
import { SimpleModalComponent } from './host-components/simple-modal/simple-modal.component';
import { TooltipComponent } from './host-components/tooltip/tooltip.component';
import { TestComponent } from './test/test.component';
import { ScollSpyDirective } from './utils/scollspy.directive';
import { SectionComponent } from './utils/section/section.component';
import { SubSectionComponent } from './utils/sub-section/sub-section.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SectionComponent,
    SubSectionComponent,
    RelativePositionExampleComponent,
    TooltipComponent,
    GlobalPositionExampleComponent,
    SimpleModalComponent,
    SimpleListComponent,
    SlidePositionExampleComponent,
    FullscreenPositionExampleComponent,
    HeroScreenComponent,
    ScollSpyDirective
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, MarkdownModule.forRoot({ loader: HttpClient }), ToppyModule],
  providers: [],
  entryComponents: [TestComponent, TooltipComponent, SimpleModalComponent, SimpleListComponent, HeroScreenComponent],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
