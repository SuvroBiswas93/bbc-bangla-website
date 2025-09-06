const navLink = document.getElementById('nav-link');

const newsContainer = document.getElementById('news-container')

const loadNavCategoryData = () => {
    const url = `https://news-api-fs.vercel.app/api/categories`;

    fetch(url)
    .then(res => res.json())
    .then(data =>{
        
        const storeCategoryData = data.categories
        // console.log(storeCategoryData)
        displayNavCategoryData(storeCategoryData)
    })
    .catch(err => console.log('There is some error here to fecth data'))
}

const displayNavCategoryData = (navItems) =>{
    navItems.forEach(data => {
            navLink.innerHTML += `
                <li id ="${data.id}" 
                class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer ${data.id === "main" ? "border-b-4 border-red-600" : ""}" >
                    ${data.title}
                 </li>
            `
        });

        navLink.addEventListener('click',(e) =>{

            const allLi = document.querySelectorAll('li')
            allLi.forEach(li =>{
                li.classList.remove('border-b-4')
            })

            if(e.target.localName === "li"){
                loadNewsBycategory(e.target.id)

                e.target.classList.add('border-b-4')

                
            }
        })
}


const loadNewsBycategory = (categoryId)=>{
    // console.log(categoryId)
    const url = `https://news-api-fs.vercel.app/api/categories/${categoryId}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const showNews = data.articles
        displayNewsByCategory(showNews)
        console.log(showNews)
    })
    .catch(err => console.log('Data fetching error..'))
}


const displayNewsByCategory = (newsCard) =>{

    newsContainer.innerHTML = ""

    newsCard.forEach(news =>{
        // console.log(news.image.srcset[5])
        newsContainer.innerHTML += `
            <div  class = "space-y-2 border border-gray-300 rounded-lg ">
                <div>
                    <img src="${news.image.srcset[5].url}" alt="" class ="rounded-t">
                </div>
                <div class = "px-3">
                    <h1>${news.title}</h1>
                    <p>${news.time}</p>
                </div>

           </div>
        `
    })
    
}

loadNavCategoryData()
loadNewsBycategory('main')