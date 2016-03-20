Implement a queue using stacks, so only push and pop methods
should have methods enqueue and dequeue

var Transform = {

  //create two stacks
  var inbox: [],
  var outbox: [],

  //add element to the back of inbox
  queue = function(element){
    inbox.push(element);
  },

  //take element off the front of outbox
  //could use shift here as well?
  dequeue = function(){
    if(outbox.length === 0){
      outbox.push(inbox.pop());
    }
    return outbox.pop();
  }
  
}

var arr = new Transform();