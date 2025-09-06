const data = [
    {
        name: 'shuvo',
        id:3,
        check: true
    },
    {
        name: 'suvro',
        id:4,
        check: true
    },
    {
        name: 'biswas',
        id:5,
        check: false
    },
   
]

const foundData = data.find(num => num.id === 6);
// const foundData = data.filter(num => num.id !== 3);
// const foundData = data.filter(num => num.id === 3);
if(foundData){
    console.log('Data found')
}
else{
    console.log('data not found')
}


    
