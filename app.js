const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        cat: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        cat: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        cat: "Casual",
    },
    {
        id: 6,
        name: "Garmin Venu Smartwatch 2",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        cat: "Nothings",
    },
];
const productsContainer = document.querySelector('.products');
const search = document.querySelector('.search');
const product = document.querySelectorAll('.product')
const categoriesContainer = document.querySelector('.cats')
const price = document.querySelector('.price')
const priceRange = document.querySelector('.priceRange')
const priceValue = document.querySelector('.priceValue')


let pIndex = 0;
let selectedPrice;
let maxPrice;
let minPrice;

const showProduct = (filteredProduct) => {
    productsContainer.innerHTML = filteredProduct.map((product) =>
        `<div class="product">
        <img src=${product.img} alt="">
        <span class="productName">${product.name}</span>
        <span class="ProductPrize">${product.price} Rs.</span>
    </div>`
    ).join("");
}

search.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();
    if (value) {
        showProduct(data.filter((item) => {
            return item.name.toLowerCase().indexOf(value) !== -1; w
        }))
    }
    else {
        showProduct(data);
    }
})

const setCategories = () => {
    const allCats = data.map(item => item.cat)
    const categories = ["All", ...allCats.filter((item, i) => {
        return allCats.indexOf(item) === i;
    })];
    categoriesContainer.innerHTML = categories.map(item =>
        `
  <span class="cat">${item}</span>
`
    ).join("");

    categoriesContainer.addEventListener("click", (e) => {
        const selectedCat = e.target.textContent

        selectedCat === "All" ? showProduct(data) :
            showProduct(data.filter(item => selectedCat === item.cat))
    })

}

const setPrices = () => {
    const prices = data.map(item => item.price)
    maxPrice = Math.max(...prices);
    minPrice = Math.min(...prices);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;

    priceValue.textContent = maxPrice + " Rs.";

}

priceRange.addEventListener("input", (e) => {
    selectedPrice = e.target.value;
    priceValue.textContent = selectedPrice + " Rs."

    selectedPrice === maxPrice ? showProduct(data) :
        showProduct(data.filter(product => product.price <= selectedPrice))
})

setPrices();
setCategories();
showProduct(data);