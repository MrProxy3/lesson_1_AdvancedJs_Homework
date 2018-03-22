let showAllPosts = () => {

    const getJson = (url) => fetch(url).then(response => response.json());

    Promise.all([
        getJson('https://jsonplaceholder.typicode.com/posts'),
        getJson('https://jsonplaceholder.typicode.com/users')
    ]).then(res => {
        let mainDiv = document.getElementById('mainDiv');
        mainDiv.innerHTML = null;
        res[0].forEach((el) => {
            let newContent = document.createElement('div');
            newContent.innerHTML = `<div class="titleFake"><h2 class="title-${el.id}" onclick="clickTitle(this)">${el.title}</h2></div>
                                        <div class="bodyFake"><span>${el.body}</span></div>
                                        <div class="authorFake"><span class="author-${el.userId}" onclick="clickAuthor(this)">${res[1].map((elem) => el.userId == elem.id ? elem.name : null).join('')}</span></div>`;
            mainDiv.appendChild(newContent);
        });
    })
        .catch(err => console.log(err))
};

showAllPosts();

clickTitle = (elem) => {
    let separatePost = elem.getAttribute('class').split('-')[1];
    fetch(`https://jsonplaceholder.typicode.com/posts/${separatePost}`)
        .then(response => response.json())
        .then(json => {
            let mainDiv = document.getElementById('mainDiv');
            mainDiv.innerHTML = null;
            let newPost = document.createElement('div');
            newPost.innerHTML = `<div class="titleFake"><h2 class="title-${json.id}">${json.title}</h2></div>
                                        <div class="bodyFake"><span>${json.body}</span></div>`;
            mainDiv.appendChild(newPost);
        })
        .then(() => {
            fetch(`https://jsonplaceholder.typicode.com/comments`)
                .then(response => response.json())
                .then(res => {
                    let mainDiv = document.getElementById('mainDiv');
                    res.forEach((el) => {
                        if (el.postId === +separatePost) {
                            let newContent = document.createElement('div');
                            newContent.innerHTML = `<div class="email__name"><span>${el.name}</span></div>
                                        <div class="email__address"><span>${el.email}</span></div>
                                        <div class="email__body"><span>${el.body}</span></div>`;
                            mainDiv.appendChild(newContent);
                        }
                    })
                    let backBtn = document.createElement('div');
                    backBtn.innerHTML = `<span class="backBtn" onclick="showAllPosts()">< Back</span>`
                    mainDiv.appendChild(backBtn);
                });
        })

};

clickAuthor = (elem) => {
    let authorPosts = elem.getAttribute('class').split('-')[1];
    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => response.json())
        .then(res => {
            let mainDiv = document.getElementById('mainDiv');
            mainDiv.innerHTML = null;
            res.forEach((el) => {
                if (el.userId === +authorPosts) {
                    let newContent = document.createElement('div');
                    newContent.innerHTML = `<div class="titleFake"><h2 class="title-${el.id}" onclick="clickTitle(this)">${el.title}</h2></div>
                                        <div class="bodyFake"><span>${el.body}</span></div>`;
                    mainDiv.appendChild(newContent);
                }
            })
            let backBtn = document.createElement('div');
            backBtn.innerHTML = `<span class="backBtn" onclick="showAllPosts()">< Back</span>`;
            mainDiv.appendChild(backBtn);
        })
};