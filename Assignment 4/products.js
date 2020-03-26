let requestURL = "https://rjmcgill.github.io/products/products.json";
//New XHR object, grabs things from the server without refresh
const request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function() {
  let productJson = request.response;
  let button1 = document.getElementById('product1').addEventListener('click', function() {  //If the first product is clicked, then display the first info
    getInfo(0, productJson);
  });
  let button2 = document.getElementById('product2').addEventListener('click', function() {  //If the second product is clicked, then display the first info
    getInfo(1, productJson);
  });
  let button3 = document.getElementById('product3').addEventListener('click', function() {  //If the third product is clicked, then display the first info
    getInfo(2, productJson);
  });
};

//Makes the info Promise
function makeInfo(product, jsonObj) {
  let infoPromise = new Promise(function(resolve, reject) { //The promise to make the info
    if(product > 2 || product < 0) {  //If the product is out of range, then reject
      reject("Product out of bounds");
    } else {  //If all is good, then all is good
      resolve();
    }
  });
  return infoPromise;
}

//Makes the info
async function getInfo(product, jsonObj) {
  try {
    let productInfo = await makeInfo(product, jsonObj).then(function() {
      //Everything needed to make all the info for the product
      let checkDiv = document.getElementById('productStuff');
      let main = document.querySelector('main');
      if(checkDiv != null) {
        main.removeChild(checkDiv);
      }
      let products = jsonObj.products;
      let div = document.createElement('div');
      div.setAttribute('id', 'productStuff');
      div.setAttribute('class', 'productStuff');

      let h2 = document.createElement('h2');
      let p1 = document.createElement('p');
      let p2 = document.createElement('p');
      let img = document.createElement('img');

      let name = document.createTextNode(products[product].name);
      let price = document.createTextNode("Price: $" + products[product].price);
      let details = document.createTextNode("Details: " + products[product].details);
      img.setAttribute('src', "assets/" + products[product].image);

      h2.appendChild(name);
      p1.appendChild(price);
      p2.appendChild(details);

      div.appendChild(h2);
      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(img);

      main.appendChild(div);
    });
  } catch(e) {
    console.log(e);
  }
}
