const navLink = document.getElementById('nav-link')

const loadNavCategoryData = () => {
    const url = `https://news-api-fs.vercel.app/api/categories`;

    fetch(url)
    .then(res => res.json())
    .then(data =>{
        
        const storeCategoryData = data.categories
        console.log(storeCategoryData)
        displayNavCategoryData(storeCategoryData)
    })
    .catch(err => console.log('There is some error here to fecth data'))
}

const displayNavCategoryData = (navItems) =>{
    navItems.forEach(data => {
            navLink.innerHTML += `
                <li id ="${data.id}" class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">${data.title}</li>
            `
        });

        navLink.addEventListener('click',(e) =>{

            const li = document.querySelectorAll('li')
            li.forEach(li =>{
                li.classList.remove('border-b-4')
            })

            if(e.target.localName === "li"){
                console.log(e)
                e.target.classList.add('border-b-4')
            }
        })
}

loadNavCategoryData()
