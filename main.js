const productTemp = document.querySelector(".product-temp")
const products = document.querySelector(".products")
const filterSelect = document.querySelector(".filter")
let mainData

//Pobieranie danych z pliku products.json do zmiennej mainData
function fetchData() {
    fetch("products.json")
      .then(res => res.json())
      .then(res=>{mainData=Object.values(res)
        mainData = mainData.filter(el=>typeof(el)==="object")
        displayData(mainData)
    })
}

//Funkcja zwracająca status przedmiotu po polsku
function statusToPolish(status){
    switch (status) {
        case "new":
            return "Nowość";
        case "recommended":
            return "Polecamy";
        case "saleout":
            return "Wyprzedaż";    
        case "promotion":
            return "Promocja";    
        case "bestseller":
            return "Bestseller";    
        default:
            return status;
      }
}

//Reagowanie na zmianę w polu select
filterSelect.addEventListener("change",()=>displayData(mainData))

//Główna funkcja wyświetlania danych
function displayData(data) {
    
    //filtrowanie produktów
    if (filterSelect.value!=="") {
        data = data.filter(el=>el.prod_status.includes(filterSelect.value))
    }
    products.innerHTML=""

    //iterowanie po tablicy produktów oraz wyświetlanie ich przy pomocy znacznika <template>
    data.forEach(element=>{
        let statusesList
        let discount
        const product = productTemp.content.cloneNode(true)
        product.querySelector(".product__name").textContent=element.prod_name
        product.querySelector(".product__actual_price").textContent=element.prod_price
        if (element.prod_oldprice){
            product.querySelector(".product__old_price").textContent=element.prod_oldprice
            discount = Math.round((1 - (element.prod_price / element.prod_oldprice))*100)
            product.querySelector(".product__discount").textContent= "-" + discount +"%"
        }else{
            product.querySelector(".product__discount").style.display="none"
        }
        if(element.prod_status){
            const statuses=element.prod_status.split(",")
            statusesList = statuses.map(status => {
                return '<li>' + statusToPolish(status) + '</li>'
            }).join('')
            product.querySelector(".product__statuses").innerHTML=statusesList
        }

        products.appendChild(product)
    });
}

fetchData()