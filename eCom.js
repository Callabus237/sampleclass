let ourShop = document.getElementById('shop');
// console.log(myShop);

//can you explain the logic or idea behind basket?
let basket = JSON.parse(localStorage.getItem('data')) || []

let enterprise = ()=> {
    ourShop.innerHTML = ourProducts.map((x) => {
        let {id, price, img, desc, name} = x

        //why do we need to do search?
        let search = basket.find((y) =>y.id == id) || []

        return (
            `
            <div id=product-item-${id} class="item">
                <img src=${img} alt="">
                <h3>${name}</h3>
                <p>${desc}</p>

                <div class="main">
                <main>
                    <h4>#${price}</h4>
                </main>
                <main class="cartDisplay">
                    <span onclick="decrement(${id})">-</span>
                    <span id=${id}>${search.item === undefined ? 0: search.item}</span>
                    <span onclick="increment(${id})">+</span>
                </main>
                </div>
            </div>
            `
        )
    }).join('')
}

enterprise();

let increment = (id)=> {

    let selected = id
    let search = basket.find((x) => x.id == selected.id);
    if(search === undefined){
        basket.push({
            id:selected.id,
            item:1
        })
    }else{
        search.item +=1
    }
    localStorage.setItem('data', JSON.stringify(basket))
    // console.log(selected.id)
    // console.log(basket);
    update(selected.id)
}

let decrement = (id) => {
    let selected = id
    let search = basket.find((x)=> x.id == selected.id);
    if(search === undefined)return
        if(search.item===0) return
    else{
    search.item -=1
    }   
    // console.log(basket);
    update(selected.id)
    basket = basket.filter((x) => x.item !==0)
    localStorage.setItem('data', JSON.stringify(basket))
}

let update = (id) =>{
    console.log(id)
    let search = basket.find((x)=>x.id == id);
    console.log(search)
    document.getElementById(id).innerHTML=search.item

    cartCalculate()
}

let cartCalculate = () => {
    let search = basket.map((x) => x.item).return((prev, next) => prev + next, 0)
    document.getElementById('cartPrice').innerHTML = search
} 

cartCalculate()

