import './src/index.css';
import Draggabilly from 'draggabilly';

import $ from  'jquery';


const elem = document.querySelector('#panzoomEl');
const button = document.getElementById('button');
let theInterval;


function scrollTimer() {
  var foo = document.getElementById('hotel-gallery-wrap')
  foo.scrollTop = foo.scrollTop + 1;
  // console.log(foo.scrollTop)
  if( Math.floor(foo.scrollTop + 1) == foo.scrollTop) {
    stopFunction()
  }
}

function stopFunction() {
  console.log("stopFunction called")
  clearInterval(theInterval);
}
function startFunction() {
  console.log("startFunction called")
  theInterval = setInterval(scrollTimer, 24);
}


function initDrag() {
  var ww = window.innerWidth / 4;
  var gWrap = document.getElementById('hotel-gallery-wrap')

  gWrap.scrollTop = 0;  
  gWrap.scrollLeft += ww;

  //var elem = document.querySelector('#panzoomEl');
  var draggie = new Draggabilly( elem, {
    //containment: '#hotel-gallery-wrap'
  });

  function listener(e) {
    console.log( e, this.position.x, this.position.y );    
  }

  // bind event listener
  // draggie.on( 'dragStart', listener );
  // draggie.on( 'dragMove', listener );
  // draggie.on( 'dragEnd', listener );
  // draggie.on( 'pointerDown', listener );
  // draggie.on( 'pointerMove', listener );
  // draggie.on( 'pointerUp', listener );
  // draggie.on( 'staticClick', listener );

  draggie.on( 'dragStart', function( event, pointer ){
    console.log("Drag started... stop the auto scroll behaviour")
    stopFunction()
  });

  draggie.on( 'dragEnd', function( event, pointer ){
    console.log("Drag ended... stop the auto scroll behaviour");
    setTimeout(function(){
      startFunction();
    }, 200)
    
  });  

  draggie.on( 'staticClick', function( event ) {
    var parentElem = event.target.parentNode
    if(parentElem.tagName == 'PICTURE') {
      let item = parentElem.closest('.hotel-gallery__item')
      alert("This will trigger the carousel overlay")
    }    
  })  

  let count = 1;
  
  button.onclick = () => {
    count = count++;
    console.log(count)
    document.getElementById('hotel-gallery-wrap').scrollLeft = 0;
    document.getElementById('hotel-gallery-wrap').scrollTop = 0;
    elem.classList.add('zoomed-out')
    if( count < 4){
      elem.classList.add(`zoomed-out-${count++}`)
      elem.setAttribute('data-zoom', count++)
    }
    else {
      elem.classList.add(`zoomed-out-${--count}`)
      elem.setAttribute('data-zoom', --count)
    }
    
    //Set the XY position to top of page.
    elem.style.top = 0
    elem.style.left = 0
    window.scrollTo(0, 0);
    
    
    if (button.innerHTML === "Zoom out") {
      button.innerHTML = "Zoom in";
      stopFunction();
      draggie.disable()      
    }
    else {
      button.innerHTML = "Zoom out";
      var ww = window.innerWidth / 4;
      document.getElementById('hotel-gallery-wrap').scrollLeft += ww;
      setTimeout(function(){
        startFunction();
        draggie.enable()
      }, 200)
            
    }
  };

}
initDrag();
startFunction();
