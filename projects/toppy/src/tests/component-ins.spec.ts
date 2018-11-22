import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { ComponentInstance } from 'toppy/lib/component-ins';

@Component({
  selector: 'lib-test-component',
  template: '<h1 id="greet">Hello</h1>'
})
export class TestComponent {}

describe('== ComponentInstance ==', () => {
  let component: TestComponent = null;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: []
    }).compileComponents();
    component = TestBed.createComponent(TestComponent).componentInstance;
  }));

  it('should return host component instance on calling "getInstance" method', () => {
    const compIns = new ComponentInstance(component, {});
    expect(compIns.getInstance()).toBe(component);
  });
  it('should add props on calling "_addProps" method', () => {
    const dummyProps = { isTest: true, data: ['a', 'b', 'c'], value: 32, string: 'hello' };
    const compIns = new ComponentInstance(component, { name: 'test' });
    expect(Object.keys(compIns.getInstance())).toEqual(['name']);
    (compIns as any)._addProps(dummyProps);
    expect(Object.keys(compIns.getInstance())).toEqual(['name', ...Object.keys(dummyProps)]);
  });
});
