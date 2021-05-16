import { Subject, ReplaySubject, merge } from 'rxjs';
import _ from 'lodash';
import type { ObjectType } from '@/utils/types';

class Observer {
  private observers: ObjectType = {};
  private lazyObservers: ObjectType = {};

  constructor() {
    this.observers = {};
    this.lazyObservers = {};
  }
  createObserver = (key: string) => {
    if (!this.observers[key]) {
      const lazySubject = new ReplaySubject(1);
      this.lazyObservers[key] = lazySubject;
      this.observers[key] = merge(new Subject(), lazySubject);
    }
    return this.observers[key];
  };
  on = (key: string, subscriber: () => void) => {
    this.createObserver(key);
    return this.observers[key].subscribe(subscriber);
  };
  off = (key: string) => {
    delete this.observers[key];
    delete this.lazyObservers[key];
  };
  next = (key: string, subscription: any) => {
    this.createObserver(key);
    this.lazyObservers[key].next(subscription);
  };
  get = (key: string) => {
    return this.observers[key];
  };
  at = (keys: string[]) => {
    return _.at(this.observers, keys);
  };
}

const observer = new Observer();

export default observer;
