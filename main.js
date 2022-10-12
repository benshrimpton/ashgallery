import './src/index.css';


const elem = document.querySelector('#panzoomEl');

let theInterval;

function scrollTimer() {
  var foo = document.getElementById('hotel-gallery-wrap')
  var fooScrollheight = foo.scrollHeight;
  foo.scrollTop = foo.scrollTop + 1;
  
  //foo.scrollTop = foo.scrollTop + 1;


  //console.log(foo.scrollTop, fooScrollheight)
  // if( Math.floor(foo.scrollTop + 1) == Math.floor(fooScrollheight)) {
  //   stopFunction()
  // }
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
    //Scroll the grid left 25%
    var ww = window.innerWidth / 4;
    var gWrap = document.getElementById('hotel-gallery-wrap')
    
    gWrap.scrollTop = 0;  
    gWrap.scrollLeft += ww;

    //var elem = document.querySelector('#panzoomEl');
    var draggie = new Draggabilly( elem, {
      //containment: '#hotel-gallery-wrap'
    });

    // function listener(e) {
    //   console.log( e, this.position.x, this.position.y );    
    // }

    draggie.on( 'dragStart', function( event, pointer ){
      console.log("Drag started... stop the auto scroll behaviour")
      stopFunction()
    });
 

    draggie.on( 'dragEnd', function( event, pointer ){
      console.log("Drag ended... stop the auto scroll behaviour");
      setTimeout(function(){
        if( $(window).width() > 768 ) { startFunction(); }
      }, 300)      
    });  

    draggie.on( 'staticClick', function( event ) {
      triggerSwiperOverlay(event)        
    }) 

  $(document).on('click', '#button', ()=> {
  
    //console.log(count, count++)
    document.getElementById('hotel-gallery-wrap').scrollLeft = 0;
    document.getElementById('hotel-gallery-wrap').scrollTop = 0;

    if($("#panzoomEl").attr('data-zoom') === '0') {
      $(this).addClass('zoom-out')
      $("#panzoomEl").attr('data-zoom', '1')
      $('#button-text').text( "Zoom out")
      
      stopFunction();
      //Set the XY position to top of page.
      elem.style.top = 0
      elem.style.left = 0
      window.scrollTo(0, 0);
      // draggie.disable()
    }

    else if($("#panzoomEl").attr('data-zoom') === '1') {
      $(this).addClass('zoom-out')
      $("#panzoomEl").attr('data-zoom', '2')
      $('#button-text').text( "Zoom out")
      stopFunction();
      //Set the XY position to top of page.
      elem.style.top = 0
      elem.style.left = 0
      window.scrollTo(0, 0); 
      // draggie.disable()     
    }    

    else if($("#panzoomEl").attr('data-zoom') === '2') {
      $("#panzoomEl").attr('data-zoom', '3')
      $('#button-text').text( "Zoom in")
      stopFunction();
      //Set the XY position to top of page.
      elem.style.top = 0
      elem.style.left = 0
      window.scrollTo(0, 0);  
      // draggie.disable()    
    } 

    else if($("#panzoomEl").attr('data-zoom') === '3') {
      $('#button-text').text( "Zoom out")
      startFunction();   
      var ww = window.innerWidth / 4;
      var gWrap = document.getElementById('hotel-gallery-wrap')      
      gWrap.scrollTop = 0;  
      gWrap.scrollLeft += ww;
      window.scrollTo(0, 0); 
      $("#panzoomEl").attr('data-zoom', '0')   
      draggie.enable()     
    } 
  });
}

//Trigegr swiper overlay
function triggerSwiperOverlay(event) {
  var parentElem = event.target.parentNode
  if(parentElem.tagName == 'PICTURE') {
    let item = parentElem.closest('.hotel-gallery__item')
    alert("This will trigger the carousel overlay")
  } 
}
//START IT UP
if( $(window).width() > 768 ) {
  initDrag();
  startFunction();
}
else {
  var ww = window.innerWidth / 3.5;
  var gWrap = document.getElementById('hotel-gallery-wrap')    
  gWrap.scrollTop = 0;  
  gWrap.scrollLeft += ww;
  $(document).on('click', '.hotel-gallery__item', function(event){
    triggerSwiperOverlay(event)
  })
  // initDrag();
}

// initDrag();
// startFunction();