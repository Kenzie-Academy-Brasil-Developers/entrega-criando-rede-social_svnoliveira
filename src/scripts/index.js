import { users, posts, suggestUsers } from "./database.js"

//form adjust

document.getElementById("post__container").addEventListener("click", function(event){
    event.preventDefault()
  });

//render fuctions

function renderMainUser (){
    const mainUserName = users[0].user;
    const mainUserImage = users[0].img;
    const mainUserStack = users[0].stack;

    document.querySelector('#post__container > .user__profile--small > img').src = `${mainUserImage}`;
    document.querySelector('#post__container > .user__profile--small > .user__name-container > h2').innerText = `${mainUserName}`;
    document.querySelector('#post__container > .user__profile--small > .user__name-container > span').innerText = `${mainUserStack}`;
}
renderMainUser();

function createUserProfileSmall(userData){
    const mainDiv = document.createElement('div');
    const userPicture = document.createElement('img');
    const textDiv = document.createElement('div');
    const userName = document.createElement('h2');
    const userStack = document.createElement('span');

    mainDiv.classList.add('user__profile--small');
    userPicture.src = (`${userData.img}`);
    userPicture.alt = (`a picture of ${userData.user}`);
    textDiv.classList.add('user__name-container');
    userName.innerText = (`${userData.user}`);
    userStack.innerText = (`${userData.stack}`);

    mainDiv.appendChild(userPicture);
    mainDiv.appendChild(textDiv);
    textDiv.appendChild(userName);
    textDiv.appendChild(userStack);

    return mainDiv;
}

function createSuggestedUsersCards(){
    const userList = suggestUsers;
    const suggestionContainer = document.querySelector('#suggestion__users-container');

    for (let i = 0; i < userList.length; i++) {
        const userInfo = userList[i];
        const card = document.createElement('div');
        const header = createUserProfileSmall(userInfo);
        const button = document.createElement('button');

        card.classList.add('suggestion__users-card');
        button.classList.add('button--white');
        button.innerText = 'Seguir';

        suggestionContainer.appendChild(card);
        card.appendChild(header);
        card.appendChild(button);
    }
}
createSuggestedUsersCards()

function renderPosts(){
    const userList = posts;
    const publishedContainer = document.querySelector('#published__container');

    for (let i = 0; i < userList.length; i++) {
        const userInfo = userList[i];
        const card = document.createElement('div');
        const header = createUserProfileSmall(userInfo);
        const postTitle = document.createElement('h1');
        const description = document.createElement('p');
        const footer = document.createElement('footer');
        const button = document.createElement('button');
        const heart = document.createElement('img');
        const counter = document.createElement('span');

        card.classList.add('published__post-card');
        postTitle.innerText = `${userInfo.title}`;
        description.innerText = `${userInfo.text}`;
        footer.classList.add('published__footer__container');
        button.classList.add('published__button--open');
        button.classList.add('button--black');
        button.dataset.postId = `${userInfo.id}`;
        button.innerText = 'Abrir';
        heart.src = './src/assets/img/heart.svg';
        heart.alt = 'heart';
        heart.classList.add('button--heart')
        counter.classList.add('published__like-counter');
        counter.innerText =`${userInfo.likes}`;

        publishedContainer.appendChild(card);
        card.appendChild(header);
        card.appendChild(postTitle);
        card.appendChild(description);
        card.appendChild(footer);
        footer.appendChild(button);
        footer.appendChild(heart);
        footer.appendChild(counter);
    }
}
renderPosts()

// button clicks

function handlePostButton(){
    const button = document.querySelector('#post__container > button');
    const input = document.querySelector('#post__container > input');
    const description = document.querySelector('#post__container > textarea');
    
    enablePost(input);
    enablePost(description);
    function enablePost (element){
        element.addEventListener('input', () => {
            if (input.checkValidity() && description.checkValidity()){
                button.classList.remove('button--disabled')
            } else {
                button.classList.add('button--disabled')
            }
        })
    }
}
handlePostButton();

function handleFollowButton(){
    const buttonList = document.querySelectorAll('.suggestion__users-card > button');
    for (let i = 0; i < buttonList.length; i++) {
        const button = buttonList[i];
        button.addEventListener('click', () => {
            if (button.classList.contains('button--white--active')){
                button.classList.remove('button--white--active');
                button.innerText = 'Seguir';
            } else {
                button.classList.add('button--white--active');
                button.innerText = 'Seguindo';
            }
        })
    }
}
handleFollowButton()

function handleLikes() {
    const buttonList = document.querySelectorAll('.button--heart');
    const counterList = document.querySelectorAll('.published__like-counter');
    for (let i = 0; i < buttonList.length; i++) {
        const button = buttonList[i];
        const counter = counterList[i];
        button.addEventListener('click', () => {
            if (button.classList.contains('heart--clicked')){
                button.classList.remove('heart--clicked');
                button.src = './src/assets/img/heart.svg';
                counter.innerText = `${parseInt(counter.innerText)-1}`;
            } else {
                button.classList.add('heart--clicked');
                button.src = './src/assets/img/heart-red.svg';
                counter.innerText = `${parseInt(counter.innerText)+1}`;
            }
        })
    }
}
handleLikes()

function handleModal () {
    const buttonList = document.querySelectorAll('.published__button--open');
    const controller = document.querySelector('.modal__controller');
    const closeButton = document.querySelector('.button--grey');

    closeButton.addEventListener('click', () =>{
        controller.close()
    });

    for (let i = 0; i < buttonList.length; i++) {
        const button = buttonList[i];
        const postNumber = button.dataset.postId;
        const userInfo = posts[parseInt(postNumber)-1];

        const userPicture = document.querySelector('.modal__container > header > .user__profile--small > img');
        const userName = document.querySelector('.modal__container > header > .user__profile--small > .user__name-container > h2');
        const userStack = document.querySelector('.modal__container > header > .user__profile--small > .user__name-container > span');
        const postTitle = document.querySelector('.modal__container > h2');
        const description = document.querySelector('.modal__container > p');

        button.addEventListener('click', () => {
            userPicture.src = `${userInfo.img}`;
            userName.innerText = `${userInfo.user}`;
            userStack.innerText = `${userInfo.stack}`;
            postTitle.innerText = `${userInfo.title}`;
            description.innerText = `${userInfo.text}`;
            controller.showModal();
        })
    }
}
handleModal();
