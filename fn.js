$(document).ready( () => {

    //GLOBAL variables
    let toggleBtnJQ = $('#nav-toggler-icon');
    let toggleBtnVJ = document.getElementById('nav-toggler-icon');
    let flag = false;
    let qCounter = 0;
    let eCounter = 0;
    let wthr;
    let menuDrop = true;
    
    //jquery events
    /* JQUERY START */
    
    // when navbar mobile toggle is clicked
    $(toggleBtnJQ).on('click', () => {
        let classes = toggleBtnVJ.classList.contains('ellipsis');
        if(toggleBtnJQ.hasClass('fad fa-caret-up')){
            toggleBtnVJ.className = '';
            toggleBtnJQ.addClass('fad fa-caret-down');
        } else {
            toggleBtnVJ.className = '';
            toggleBtnJQ.addClass('fad fa-caret-up');
        }
    });

    //when social icons in navbar is clicked
    $('.mediumb').on('click', () => {
        window.location.href = "https://medium.com/@andremj013090";
    });
    $('.github').on('click', () => {
        window.location.href = "https://www.github.com/andrejacksonnola";
    });
    $('.youtube').on('click', () => {
        window.location.href = "https://www.youtube.com/watch?v=lGQH87I7RPk&t=167s";
    });
    
    // when mystary message is clicked
    $('.col-spacer-row2').on('click', () => {
        //storage
        let quotes = {
            first: 'Hardships often prepare ordinary people for an extraordinary destiny.',
            second: 'Life is like photography, you use the negatives to develop.',
            third: 'Instead of looking for happiness, try creating it',
            fourth: 'Optimism is the faith that leads to achievement',
            fifth: 'The secret to getting ahead is getting started',
            sixth: 'Inspirational Quotes',
        };
    
        let flipAgain = {
            first: 'Want another quote?',
            second: 'Go for another one, wont hurt',
            third: 'Third times the charm.',
            fourth: 'Okay, last one..',
            fifth: 'Inspirational Quotes',
        };
    
        //variables
        let encourArr = [ flipAgain.first, flipAgain.second, flipAgain.third, flipAgain.fourth, flipAgain.fifth];
        let quotesArr = [ quotes.first, quotes.second, quotes.third, quotes.fourth, quotes.fifth, quotes.sixth];
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
    
        //javascript statements
        if(qCounter === length){
            qCounter = 0;
        }
    
        if(eCounter === flipLength){
            eCounter = 0;
        }
    
        changeCard(quotesArr[qCounter]);
    
    
        function changeCard(quote){
            spacer.innerHTML = quote;
            flag = true;
            $('.col-spacer-row2').css('background', 'white');
            if(qCounter === length - 1){
                $(title).css('background', '#3B5998').addClass('animate__animated animate__flipInY animate__faster');
            } else {
                $(title).css('background', 'linear-gradient(45deg, #DFE3EE, #3B5998)').addClass('animate__animated animate__flipInY animate__faster');
            }
            qCounter += 1;
            // if(!flag){
            // } 
            // else {
            //     flag = false;
            //     spacer.innerHTML = encourMssg;
            //     // $('.col-spacer-row2').css('background', '#BF1F3C');
            //     $(title).css('background', '#8B9DC3').addClass('animate__animated animate__flipInY animate__faster');
            //     eCounter += 1;
            // }
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
    
    
      /* JQUERY END */
    
    
      //javascript statements
    
      /* js start */
    setInterval(() => {
        grabInfo();
    },3600000);
    
    setInterval(() => {
        updateInfo();
       
    }, 1000);
    grabInfo();
    
    
    
      //fns to automatically post day, time and weather
      function grabInfo(){
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?id=4335045&appid=4c0c0abe0793b6f569c03a4fa14ff282&units=metric", (json) => {
            let wthr = JSON.stringify(json, null, 2);
            let weather = JSON.parse(wthr);
            let getFahrenheit = (weather.main.temp * 1.8) + 32;
            let fahrenheit = Math.round(getFahrenheit) + '° ';
            $('#weather').append(fahrenheit);
            // console.log(weather.weather[0].main);
            updateWeather(weather.weather[0].main, getFahrenheit);
        });
    }
    
      function updateInfo(){
        let today = moment().format('dddd');
        let time = moment().format('LT');
        let day = document.getElementById('day');
        let timeD = document.getElementById('time');
        day.innerHTML = '';
        timeD.innerHTML = '';
        $('#day').append(today);
        $('#time').append(time);
    };
    
      function updateWeather(summary, temp){
        let roundTemp = Math.round(temp);
        let elemId = document.getElementById('weather');
        let newIcon = document.createElement('i');
        let temperature = document.createElement('span');
        temperature.setAttribute('id', 'weather-temp');
    
    
        if(summary === 'Rain'){
            newIcon.className = 'fas fa-cloud-rain';
        } else if (summary === 'Thunderstorm'){
            newIcon.className = 'fas fa-thunderstorm';
        } else if (summary === 'Drizzle'){
            newIcon.className = 'fas fa-thunderstorm';
        } else if (summary === 'Snow'){
            newIcon.className = 'fad fa-snowflakes';
        } else if (summary === 'Clouds'){
            newIcon.className = 'fad fa-clouds-sun';
        } else if (summary === 'Clear'){
            newIcon.className = 'fad fa-sun-cloud';
        }
    
        newIcon.setAttribute('id', 'weather-icon');
        elemId.innerHTML = '';
        elemId.prepend(temperature);
        document.getElementById('weather-temp').innerHTML = roundTemp + '° ';
        elemId.appendChild(newIcon);
      };





//end
});


