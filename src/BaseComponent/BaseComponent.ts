import Presenter from '../Presenter/Presenter';

class BaseComponent {
  protected mediator: Presenter;

  constructor(mediator: Presenter = null) {
    this.mediator = mediator;
  }

  setMediator(mediator: Presenter): void {
    this.mediator = mediator;
  }
}

export default BaseComponent;
