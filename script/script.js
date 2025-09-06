const navLink = document.getElementById('nav-link');

const newsContainer = document.getElementById('news-container')

const bookmarkContainer = document.getElementById('bookmark-container')

const bookmarksCount = document.getElementById("bookmark-count")

let bookmarks =[]

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
                showLoading()

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
    .catch((err) => {
        showError()

    })
}


const displayNewsByCategory = (newsCard) =>{

    newsContainer.innerHTML = ""
     if(newsCard.length === 0){
            showEmptyMsg()
        }

    newsCard.forEach(news =>{
        // console.log(news.image.srcset[5])
        newsContainer.innerHTML += `
            <div  class = "space-y-2 border border-gray-300 rounded-lg ">
                <div>
                    <img src="${news.image.srcset[5].url}" alt="" class ="rounded-t">
                </div>
                <div id ="${news.id}" class = "px-3">
                    <h1 class = "font-bold">${news.title}</h1>
                    <p class ="text-sm">${news.time}</p>
                    <button class = "btn mb-1">Bookmark</button>
                </div>

           </div>
        `
    })
    
}

newsContainer.addEventListener('click', (e) => {
   
    if(e.target.innerText === "Bookmark"){
        handleBookmarks(e)
       
    }
})

const handleBookmarks = (e) =>{
      const title = e.target.parentNode.children[0].innerText
        const id = e.target.parentNode.id

        if (bookmarks.some(bookmark => bookmark.id === id)) {
                return;
            }

        bookmarks.push({
            title : title,
            id : id
        })

        displayBookmarks(bookmarks)
}


const displayBookmarks = (show) =>{
    bookmarkContainer.innerHTML = ''
    show.forEach(bookmark =>{
        bookmarkContainer.innerHTML += `
            <div class = " mx-2 border border-gray-300 p-2 my-2 rounded-md flex justify-between items-center gap-5 text-justify">
                    <h1>${bookmark.title}</h1>
                    <button onclick = "handleDeleteBookmark('${bookmark.id}')" class ="text-white text-sm bg-red-500 p-1 rounded-sm cursor-pointer">Clear</button>
            </div>
        `
    })

    bookmarksCount.innerText = bookmarks.length
   
}


const handleDeleteBookmark = (bookmarkId) =>{
   const filteredData =  bookmarks.filter(bookmark => bookmark.id !== bookmarkId )
   bookmarks = filteredData
   displayBookmarks(bookmarks)
}

const showLoading = () =>{
    newsContainer.innerHTML = `
        <h2 class="bg-green-600 p-4 text-white text-2xl">Loading....</h2>
    `
}

const showError = () =>{
    newsContainer.innerHTML = `
        <h2 class="bg-red-600 p-4 text-white text-2xl">Something Went Wrong...</h2>
    `
}

const showEmptyMsg =() =>{
    newsContainer.innerHTML = `
        <h2 class="bg-orange-600 p-4 text-white text-2xl">No News Found For This Category</h2>
    `
}

loadNavCategoryData()
loadNewsBycategory('main')