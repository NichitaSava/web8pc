$(function(){

    $('.slider_inner').slick({
        nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
        prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
        infinte: false
    });
    $('select').styler();
    
    $('.header_btn-menu').on('click', function(){
        $('.menu ul').slideToggle();
    });

});
$(document).ready(function() {

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Gracias!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
let lastScroll = 0;
const defaultOffset = 200;
const header = document.querySelector('.header');

const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
const containHide = () => header.classList.contains('hide');

window.addEventListener('scroll', () => {
    if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
        //scroll down
        header.classList.add('hide');
    }
    else if(scrollPosition() < lastScroll && containHide()){
        //scroll up
        header.classList.remove('hide');
    }

    lastScroll = scrollPosition();
})
function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.2),
        zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(){
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight =  animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el){
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return{ top: rect.top + scrollTop, left: rect.left + scrollTop}
    }
    setTimeout(() =>{
        animOnScroll();
    }, 300);
    
}