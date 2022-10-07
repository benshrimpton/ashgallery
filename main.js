import './src/index.css';
import Draggabilly from 'draggabilly';

const button = document.getElementById('button');
const elem = document.querySelector('#panzoomEl');

function moveElem(){
  setInterval(function() {
    var foo = document.getElementById('hotel-gallery-wrap')
    //if (animation complete) clearInterval(timer);
    foo.scrollTop = foo.scrollTop + 1;
    console.log("move...")
  }, 20)
}

button.onclick = () => {
  document.getElementById('hotel-gallery-wrap').scrollLeft = 0;
  document.getElementById('hotel-gallery-wrap').scrollTop = 0;
  elem.classList.toggle('zoomed-out')
  elem.style.top = 0
  elem.style.left = 0
  window.scrollTo(0, 0);
  if (button.innerHTML === "Zoom out") {
    button.innerHTML = "Zoom in";
  } else {
    button.innerHTML = "Zoom out";
  }
};


function initDrag() {
  
  var ww = window.innerWidth / 4;
  document.getElementById('hotel-gallery-wrap').scrollLeft += ww;

  //var elem = document.querySelector('#panzoomEl');
  var draggie = new Draggabilly( elem, {
    //containment: '#hotel-gallery-wrap'
  });

  function listener(e) {
    console.log( e, this.position.x, this.position.y );
    
  }

  // bind event listener
  draggie.on( 'dragStart', listener );
  draggie.on( 'dragMove', listener );
  draggie.on( 'dragEnd', listener );
  draggie.on( 'pointerDown', listener );
  draggie.on( 'pointerMove', listener );
  draggie.on( 'pointerUp', listener );
  draggie.on( 'staticClick', listener );
  
  // // unbind event listener
  // draggie.off( 'dragEnd', listener );
  
  // // bind event listener to trigger once. note ONCE not ONE or ON
  // draggie.off( 'dragStart', listener );

}

moveElem()
initDrag()