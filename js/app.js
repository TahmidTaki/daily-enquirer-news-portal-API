const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

loadCategory();

// display category list 
const displayCategory = (data) => {
    // console.log(data);
    data.forEach(category => {
        // console.log(category.category_name);
        const categoryList = document.getElementById('category-list');
        const categoryLink = document.createElement('div');
        // categoryLink.innerHTML = `${category.category_name}`;
        categoryLink.innerHTML = `<button type="button" class="btn btn-light my-2" onclick="loadCategoryNews('${category.category_id}')">
        ${category.category_name}</button>
        `;
        categoryList.appendChild(categoryLink);
    })
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}



//load news specific to category
const loadCategoryNews = async (categoryId) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    // console.log(url);
    try {
        const res = await fetch(url);
        const data = await res.json();
        viewNews(data.data);
    }
    catch (error) {
        console.log(error);
    }
}
// loadCategoryNews('05');


//show news of specific categories
const viewNews = (allNews) => {
    // console.log(data);
    // let newsCount = 0;
    const newsCount = allNews.length;
    const newsContainer = document.getElementById('news-container');
    const newsCounterText = document.getElementById('newsCounter');
    const firstMessage = document.getElementById('first-message');
    firstMessage.classList.add('d-none');
    newsContainer.innerHTML = '';
    allNews.sort(function (a, b) { return b.total_view - a.total_view });
    allNews.forEach(news => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('row');
        cardDiv.classList.add('my-2');
        cardDiv.classList.add('mx-auto');
        cardDiv.classList.add('border');
        cardDiv.classList.add('border-light');
        cardDiv.classList.add('bg-light');
        cardDiv.classList.add('d-flex');
        cardDiv.classList.add('justify-content-center');
        cardDiv.innerHTML = `
                    <div class="col-md-2">
                        <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title pt-4">${news.title}</h5>
                            
                            <p class="card-text">${news.details.slice(0, 500)}...</p>
                            <div class="card-text d-flex justify-content-around">
                            <p class=""><img class="rounded-circle author-image" src="${news.author.img}" alt=""><small
                                class="text-muted">${news.author.name ? news.author.name : 'Author Info not found'}, ${news.author.published_date ? news.author.published_date.slice(0, 10) : 'No publish date found'}</small></p>
                            <p><i class="fa-regular fa-eye  pt-3 me-2"></i>${news.total_view ? news.total_view : 'View Count not available'}</p>
                            <p class="d-none d-md-block"><i class="fa-solid fa-star pt-3"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></p>
                            <button class="btn btn-light" data-bs-toggle="modal" data-bs-target="#newsModal" onclick="newsDetailsLoad('${news._id}')"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                        </div>
                    </div>
        `;
        newsContainer.appendChild(cardDiv);

        newsCounterText.classList.remove('d-none');


    })
    newsCounterText.innerText = `${newsCount} Results Found`;
    // newsCount = 0;
    toggleSpinner(false);
}

const newsDetailsLoad = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        showNewsDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const showNewsDetails = (news) => {
    // console.log(news[0]);
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = `Title: ${news[0].title}`;
    const newsDetails = document.getElementById('news-details-body');
    newsDetails.innerHTML = `
    <p>Author: ${news[0].author.name ? news[0].author.name : 'Author Info not found'}, Published on: ${news[0].author.published_date ? news[0].author.published_date.slice(0, 10) : 'No publish date found'}, Total Views: ${news[0].total_view ? news[0].total_view : 'View Count not available'} </p>
    <img class="img-fluid" src="${news[0].image_url}" alt="News Image">
    <p>Full News:${news[0].details.slice(0, 1000)}...</p>
    `;
}