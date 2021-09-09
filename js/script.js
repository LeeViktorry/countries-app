const active_burger = document.querySelector('.active_burger');
const right_content = document.querySelector('.right_content');
// querySelector connected your class in html




// burger is active!!

active_burger.addEventListener('click' , e => {
    e.preventDefault();
    right_content.classList.toggle('rightAcitve')
})





// Counrties App

const Region = {
    getAll:'all',
    region:'region',
    name:'name'
}


const RegionData = [
    {
        title:'All countries',
        route:'all'
    },
    {
        title:'Africa',
        route:'africa'
    },
    {
        title:'Asia',
        route:'asia'
    },
    {
        title:'America',
        route:'americas'
    },
    {
        title:'Europe',
        route:'europe'
    },
    {
        title:'Oceania',
        route:'oceania'
    },
]


const generalContent = document.querySelector('.right_content')
const container = document.querySelector('.container')

window.addEventListener('load' , () =>{
    const nav = RegionData.map(({title, route}) =>{
        return NavList(title, route)
    }).join('')

    generalContent.innerHTML = nav

    FetchData(Region.getAll , res =>{
        const card = res.map((item) =>{
            return Card(item)
        }).join('')

        container.innerHTML = card
    })
})

function NavList(title, route){
    return`
        <div>
            <button class="btn" onclick="chooseRegion('${route}')"> ${title}</button>
        </div>
    `
}


function chooseRegion(route){
    FetchData(`${Region.region}/${route}` , res=>{
        const card = res.map(item =>{
            return Card(item)
        }).join('')

        container.innerHTML = card
    })
}


function Card(res){
    return`
        <div class="card" onclick="this.classList.toggle('expanded')">
            <div class="card_content">
                <div class="image" >
                    <img src = ${res.flag} >
                </div>
                <div class="text">
                    <p>Capital: ${res.capital}</p>
                    <p>Region: ${res.region}</p>
                    <p>Population: ${res.population}</p>
                    <p>Code of Country: ${res.callingCodes}</p>
                </div>
                                
            </div>

            <svg class="chevron" style="color: white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 35" width="30"><path d="M5 30L50 5l45 25" fill="none" stroke="#000" stroke-width="5"/></svg>
        </div>
    `
}

function FetchData(endPoint, cb){
    fetch(`https://restcountries.eu/rest/v2/${endPoint}`)
    .then(res => res.json())
    .then(r => cb(r))
}


const select = document.querySelector('.select')
const search = document.querySelector('.search')

select.addEventListener('input' , e =>{
    var value = e.target.value

    if(value == 'capital'){
        search.setAttribute('placeholder' , 'Enter by capital')
    }else{
        search.setAttribute('placeholder' , 'Enter by name')
    }
})


search.addEventListener('input' , e =>{
    var value = e.target.value

    if(select.value == 'capital'){
        FetchData(Region.getAll , res =>{
            const Card = res.map(item =>{
                if(item.capital.includes(value)){
                    return Card(item)
                }
            }).join('')
            container.innerHTML = card
        })
    }else if(select.value == 'name'){
        FetchData(Region.getAll , res =>{
            const Card = res.map(item =>{
                if(item.name.includes(value)){
                    return Card(item)
                }
            }).join('')
            container.innerHTML = card
        })
    }
})