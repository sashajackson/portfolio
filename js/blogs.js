
let all = $('#all');
let js = $('#js');
let bsh = $('#bsh');
let bs = $('#bs');
let node = $('#node');
let all1 = '#all';
let js1 = '#js';
let bsh1 = '#bsh';
let bs1 = '#bs';
let node1 = '#node';

let referenceEnt = firebase.database().ref('project-list/cat-01/blogs');
populateData('');


$(all).on('click', () => {
    let classArr = [ js1, bsh1, bs1, node1 ];
    removeClass(all, classArr, '');
});

$(js).on('click', () => {
    let classArr = [ bs1, bsh1, all1, node1 ];
    removeClass(js, classArr, 'js');
});

$(bsh).on('click', () => {
    let classArr = [ js1, all1, bs1, node1 ];
    removeClass(bsh, classArr, 'bsh');
});

$(node).on('click', () => {
    let classArr = [ js1, bsh1, bs1, all1 ];
    removeClass(node, classArr, 'node');
});

$(bs).on('click', () => {
    let classArr = [ js1, bsh1, node1, all1 ];
    removeClass(bs, classArr, 'bs');
});

//js function to highlight categories
function removeClass(id, arr, type){
    if(id.hasClass('flush')){

        id.removeClass('flush');
    } else {
        id.removeClass('stir');
    }
    changeCategories(id, arr, type);
}

function changeCategories(id, arr, type){
    // console.log(arr);
    id.addClass('stir');
    changeUnusedCats(arr[0],arr[1],arr[2], arr[3]);
    changeTextColor(id, true);
    populateData(type)
};

function changeUnusedCats(firstCat, secondCat, thirdCat, fourthCat){
    $(`${firstCat}`).addClass('flush').css('color', '#3B5998');
    $(`${secondCat}`).addClass('flush').css('color', '#3B5998');
    $(`${thirdCat}`).addClass('flush').css('color', '#3B5998');
    $(`${fourthCat}`).addClass('flush').css('color', '#3B5998');
}

function changeTextColor(id, isClicked){
    if(isClicked){
        id.css('color', 'white');
    } else {
        id.css('color', '#3B5998');
    }
}

//fn to populate blog post from firebase
function populateData(typeBlog){
    referenceEnt.once('value').then((snapshot) => {
        let snap = snapshot.val();
        let blogsRow = $('#blogs-row');
        let blogsv = document.getElementById('blogs-row');
        let typeArr = null;
        let filter = snap.filter(element => element.type === typeBlog);
        if(typeBlog === ''){
           typeArr = snap.filter(elem => elem.type);
        } else if (filter.length === 0) {
            typeArr = ['none'];
        } else {
            typeArr = filter;
        } 
        blogsv.innerHTML = '';
        typeArr.forEach(element => {
            let arr = typeof typeArr[0];
            if(arr !== 'string'){
                //create elements
                let col = document.createElement('div');
                let cardDiv = document.createElement('div');
                let cardBody = document.createElement('div');
                let cardTitle = document.createElement('p');
                let imgTag = document.createElement('img');
                let pDetails = document.createElement('p');
                let aDetails = document.createElement('a');
                let pBody = document.createElement('p');
                let pName = document.createElement('h4');
                let technology = document.createElement('span');
                let exerpt = document.createElement('p');
                // aDetails.setAttribute('data-target', 'link-modal');
                // aDetails.setAttribute('data-toggle', 'modal');
                technology.setAttribute('class', 'tech');
                exerpt.setAttribute('class', 'spec-details');
                aDetails.setAttribute('class', 'more-details');
                col.setAttribute('class', 'col-12 content text-center');
                pName.setAttribute('class', 'projects-h4 font-weight-normal');
                pBody.setAttribute('class', 'pBody');
                imgTag.setAttribute('src', '/images/trp.png');
                console.log(element.url);
                aDetails.setAttribute('href', `${element.url}`);
                pDetails.setAttribute('class', 'p-text');
                imgTag.setAttribute('class', 'img-fluid project-image');
                cardDiv.setAttribute('class', 'card projects-card');
                cardBody.setAttribute('class', 'card-body projects-card-body');
                cardTitle.setAttribute('class', 'card-title projects-card-title');
    
                //insert text in elements
                // technology.innerHTML = 'technologies: ';
                pName.innerHTML = element.title;
                // pBody.innerHTML = element.title;
                aDetails.innerHTML = 'Read More';
                exerpt.innerHTML = element.body;
        
                //assemble elements
                // pDetails.prepend(technology);
                pDetails.append(exerpt);
                pDetails.append(aDetails);
                cardBody.append(pDetails);
                cardBody.prepend(cardTitle);
                cardTitle.append(pName);
                // cardBody.append(pBody);
                // cardBody.append(pDetails);
                // cardBody.prepend(imgTag);
                cardDiv.append(cardBody);
                col.append(cardDiv);
                blogsRow.append(col);

            } else {
                console.log('nothing to show');
                let col = document.createElement('div');
                col.setAttribute('class', 'col-12 text-center pt-3');
                let p = document.createElement('p');
                p.setAttribute('class', 'no-show');
                p.innerHTML = 'No blogs to view at the moment, check back later.';
                col.append(p);
                blogsRow.append(col);
            }
        });

    });

};