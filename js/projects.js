//global variables
let toggleMobMenu = $('#nav-toggler-icon');
let menuDrop = true;
let all = $('#all');
let bs = $('#bs');
let ent = $('#ent');
let ec = $('#ec');
let allT = '#all';
let bsT = '#bs';
let entT = '#ent';
let ecT = '#ec';


/* jquery start */
$(toggleMobMenu).on('click', () => {
    if(menuDrop === true){
        // toggleBtnVJ.className = 'fad fa-caret-up';
        toggleMobMenu.removeClass('fad fa-caret-down');
        toggleMobMenu.addClass('fad fa-caret-up');
        menuDrop = false;
    } else {
        toggleMobMenu.removeClass('fad fa-caret-up');
        toggleMobMenu.addClass('fad fa-caret-down');
        menuDrop = true;
    }
});

$(all).on('click', () => {
    let classArr = [ bsT, entT, ecT];
    removeClass(all, classArr);
});

$(bs).on('click', () => {
    let classArr = [ allT, entT, ecT];
    removeClass(bs, classArr);
});

$(ent).on('click', () => {
    let classArr = [ bsT, allT, ecT];
    removeClass(ent, classArr);
});

$(ec).on('click', () => {
    let classArr = [ bsT, allT, entT];
    removeClass(ec, classArr);
});



/* jquery end */

//js function to highlight categories
function removeClass(id, arr){
    if(id.hasClass('flush')){

        id.removeClass('flush');
    } else if(id.hasClass('stir')) {

     id.removeClass('stir');
    }
    changeCategories(id, arr);
}
function changeCategories(id, arr){
    id.addClass('stir');
    changeUnusedCats(arr[0],arr[1],arr[2]);
};

function changeUnusedCats(firstCat, secondCat, thirdCat){
    $(`${firstCat}`).addClass('flush');
    $(`${secondCat}`).addClass('flush');
    $(`${thirdCat}`).addClass('flush');
}










/* firebase events & fns */

let referenceEnt = firebase.database().ref('project-list/cat-01/ent');
referenceEnt.once('value').then((snapshot) => {
    let snap = snapshot.val();
    let projects = $('.projects-content-row');
    console.log(snap);
    snap.forEach(element => {
        console.log(element);
        //create elements
        let parentDiv = document.createElement('div');
        let cardDiv = document.createElement('div');
        let cardBody = document.createElement('div');
        let cardTitle = document.createElement('p');
        let imgTag = document.createElement('img');
        let pDetails = document.createElement('p');
        let aDetails = document.createElement('a');
        let pBody = document.createElement('p');
        let pName = document.createElement('h4');
        parentDiv.setAttribute('class', 'col-12 content text-center');
        pName.setAttribute('class', 'projects-h4 font-weight-normal');
        pBody.setAttribute('class', 'pBody');
        imgTag.setAttribute('src', '/images/trp.png');
        aDetails.setAttribute('href', '#');
        pDetails.setAttribute('class', 'p-text');
        imgTag.setAttribute('class', 'img-fluid project-image');
        cardDiv.setAttribute('class', 'card projects-card');
        cardBody.setAttribute('class', 'card-body projects-card-body');
        cardTitle.setAttribute('class', 'card-title projects-card-title');

        //insert text in elements

        pName.innerHTML = element.name;
        pBody.innerHTML = element.description;
        aDetails.innerHTML = 'More Details';

        //assemble elements
        pDetails.append(aDetails);
        cardBody.append(pDetails);
        cardBody.prepend(cardTitle);
        cardTitle.append(pName);
        cardBody.append(pBody);
        cardBody.append(pDetails);
        // cardBody.prepend(imgTag);
        cardDiv.append(cardBody);
        parentDiv.append(cardDiv);
        projects.append(parentDiv);
    });
});