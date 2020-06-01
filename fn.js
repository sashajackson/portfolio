let toggleBtnJQ = $('#nav-toggler-icon');
let toggleBtnVJ = document.getElementById('nav-toggler-icon');
let flag = false;
let qCounter = 0;
let eCounter = 0;


// when navbar mobile toggle is clicked
$(toggleBtnJQ).on('click', () => {

    let classes = toggleBtnVJ.classList.contains('fal fa-chevron-double-down');
    console.log(classes);

    if(toggleBtnVJ.classList.contains('fal fa-chevron-double-down')){
        console.log('suppose to go up');
        toggleBtnVJ.className = 'fal fa-chevron-double-up';
    } else {
        toggleBtnVJ.className = 'fal fa-chevron-double-down';
        console.log('suppose to go down');
    }
});

// when mystary message is clicked
$('.col-spacer-row2').on('click', () => {
    let quotes = {
        first: 'Hardships often prepare ordinary people for an extraordinary destiny.',
        second: 'Life is like photography, you use the negatives to develop.',
        third: 'Instead of looking for happiness, try creating it',
        fourth: 'Optimism is the faith that leads to achievement',
        fifth: 'The secret to getting ahead is getting started'
    };

    let flipAgain = {
        first: 'Want another quote?',
        second: 'Go for another one, wont hurt',
        third: 'Third times the charm.',
        fourth: 'Okay, last one..',
        fifth: '(not so) Mystery Messages',
    };

    let encourArr = [ flipAgain.first, flipAgain.second, flipAgain.third, flipAgain.fourth, flipAgain.fifth];
    let quotesArr = [ quotes.first, quotes.second, quotes.third, quotes.fourth, quotes.fifth];
    let length = quotesArr.length;
    let flipLength = encourArr.length;
    let randomQuote = Math.floor(Math.random() * Math.floor(length));
    let randomEncourMessage = Math.floor(Math.random() * Math.floor(flipLength));
    let encourMssg = encourArr[eCounter];
    let getProp = localStorage.getItem('hasFlippedCard');
    let spacer = document.getElementById('mm-spacer');
    let card = document.getElementById('mm-col');
    let message = spacer.innerHTML;
    let title = $('.mm-title');

    if(qCounter === length){
        qCounter = 0;
    }

    if(eCounter === flipLength){
        eCounter = 0;
    }

    changeCard(quotesArr[qCounter]);


    function changeCard(quote){
        if(!flag){
            spacer.innerHTML = quote;
            flag = true;
            $('.col-spacer-row2').css('background', 'white');
            $(title).css('background', 'linear-gradient(45deg, #CC0034, fuchsia)').addClass('animate__animated animate__flipInY animate__faster');
            qCounter += 1;
        } else {
            flag = false;
            spacer.innerHTML = encourMssg;
            // $('.col-spacer-row2').css('background', '#BF1F3C');
            $(title).css('background', '#CC0034').addClass('animate__animated animate__flipInY animate__faster');
            eCounter += 1;
        }
    };  

    setTimeout(function(){ 
        $(title).removeClass('animate__animated animate__flipInY animate__faster');
        $(title).removeClass('animate__bounceIn');
    }, 500);

});


// makes mystery message shake when scrolled past
$(window).scroll(function(){
    // This is then function used to detect if the element is scrolled into view
    function elementScrolled(elem)
    {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop = $(elem).offset().top;
      return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
    }
  
    // This is where we use the function to detect if ".box2" is scrolled into view, and when it is add the class ".animated" to the <p> child element
    if(elementScrolled('.mm-title')) {
  
        let addClassToDiv = $('.mm-title');

        addClassToDiv.addClass('animate__animated animate__shakeX');
    }
  });

