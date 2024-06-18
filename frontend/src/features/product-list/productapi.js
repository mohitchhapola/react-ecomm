// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise (async (resolve) =>
  {
    const response = await fetch('http://localhost:8080/api/products')
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('http://localhost:8080/api/products/'+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchProductsByFilters(filter) {
//filter object
let querystring = '';
  for(let key in filter){
    querystring += `${key}=${filter[key]}&`
  }
  return new Promise (async (resolve) =>
  {
    const response = await fetch('http://localhost:8080/products?'+querystring)
    const data = await response.json()
    resolve({data})
  }
  );
}
