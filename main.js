import './src/index.css';
import Draggabilly from 'draggabilly';

import $ from  'jquery';


const elem = document.querySelector('#panzoomEl');

function moveElem(){
  var foo = document.getElementById('hotel-gallery-wrap')
  setInterval(function() {
    
    //if (animation complete) clearInterval(timer);
    foo.scrollTop = foo.scrollTop + 2;
    console.log("move...")
  }, 20)
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
  });

  draggie.on( 'dragEnd', function( event, pointer ){
    console.log("Drag ended... stop the auto scroll behaviour")
  });  

  draggie.on( 'staticClick', function( event, pointer ) {
    alert("Static click..... trigger the Swiper overlay")
    console.log(event.target)
  })  

  const button = document.getElementById('button');
  button.onclick = () => {
    document.getElementById('hotel-gallery-wrap').scrollLeft = 0;
    document.getElementById('hotel-gallery-wrap').scrollTop = 0;
    elem.classList.toggle('zoomed-out')
    elem.style.top = 0
    elem.style.left = 0
    window.scrollTo(0, 0);
    var ww = window.innerWidth / 4;
    
    if (button.innerHTML === "Zoom out") {
      button.innerHTML = "Zoom in";
      //draggie.disable()
    } else {
      button.innerHTML = "Zoom out";
      document.getElementById('hotel-gallery-wrap').scrollLeft += ww;
      //draggie.enable()
    }
  };

}
initDrag()
moveElem()
