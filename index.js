const { EventEmitter } = require('events');

class MessageQueue {
  constructor() {
    this.queue = [];
    this.emitter = new EventEmitter();
  }

  enqueue(message) {
    this.queue.push(message);
    this.emitter.emit('messageAdded', message);
  }

  dequeue() {
    if (this.queue.length === 0) {
      return null;
    }

    const message = this.queue.shift();
    this.emitter.emit('messageRemoved', message);
    return message;
  }

  onMessageAdded(listener) {
    this.emitter.on('messageAdded', listener);
  }

  onMessageRemoved(listener) {
    this.emitter.on('messageRemoved', listener);
  }
}

const messageQueue = new MessageQueue();

messageQueue.enqueue('Hello ');
messageQueue.enqueue('How are you');

const onMessageAdded = (message) => {
  console.log(`Message added: ${message}`);
};

const onMessageRemoved = (message) => {
  console.log(`Message removed: ${message}`);
};

messageQueue.onMessageAdded(onMessageAdded);
messageQueue.onMessageRemoved(onMessageRemoved);

console.log('Dequeueing message:', messageQueue.dequeue());
console.log('Dequeueing message:', messageQueue.dequeue());