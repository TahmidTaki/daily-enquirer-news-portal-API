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
        <a class="text-decoration-none text-secondary" href="">${category.category_name}</a>
        `
        categoryList.appendChild(categoryLink);
    })
}