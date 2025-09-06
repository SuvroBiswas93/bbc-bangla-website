const navLink = document.getElementById('nav-link')

const loadNavCategoryData = () => {
    const url = `https://news-api-fs.vercel.app/api/categories`;

    fetch(url)
    .then(res => res.json())
    .then(data =>{
        console.log(data.categories)
        const storeCategoryData = data.categories
        storeCategoryData.forEach(data => {
            navLink.innerHTML += `
                <li class="hover:border-b-4 hover:border-red-600 cursor-pointer">${data.title}</li>
            `
        });
    })
    .catch(err => console.log('There is some error here to fecth data'))
}

const displayNavCategoryData = (navItems) =>{

}

loadNavCategoryData()
