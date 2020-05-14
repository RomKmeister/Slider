class EventEmitter {
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  public notify(data, event): void {
    this.observers.forEach((item) => item.update(data, event))
  }
}

export default EventEmitter;
