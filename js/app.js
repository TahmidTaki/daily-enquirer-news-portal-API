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
        categoryLink.innerHTML = `
        <a class="text-decoration-none text-secondary" onclick="loadCategoryNews('${category.category_id}')" >${category.category_name}</a>
        `;
        categoryList.appendChild(categoryLink);
    })
}



//load news specific to category
const loadCategoryNews = async (categoryId) => {
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
// loadCategoryNews('03');


//show news of specific categories
const viewNews = (allNews) => {
    // console.log(data);

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    allNews.forEach(news => {

        // console.log(news.title);
        // console.log(news.author.name);
        // console.log(news.author.published_date);
        // console.log(news.total_view);
        // console.log(news.thumbnail_url);
        // console.log(news.details.slice(0, 10));
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
                                class="text-muted">${news.author.name}, ${news.author.published_date.slice(0, 10)}</small></p>
                            <p><i class="fa-regular fa-eye  pt-3 me-2"></i>${news.total_view}</p>
                            <p><i class="fa-solid fa-star pt-3"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
                                class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></p>
                            <button class="btn btn-light"><i class="fa-solid fa-arrow-right-from-bracket"></i></button>
                    </div>
                        </div>
                    </div>
        `;
        newsContainer.appendChild(cardDiv);

    })
}