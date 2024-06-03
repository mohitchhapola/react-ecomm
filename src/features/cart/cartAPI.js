// A mock function to mimic making an async request for data
export function addtoCart(order) {
  return new Promise (async (resolve) =>
  {
    const response = await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(order),
      headers:{"content-type":'application/json'},
    })
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchItemByUserId(userId){
  return new Promise(async(resolve)=>{
    const response = await fetch('http://localhost:8080/cart?user='+userId)
    const data = await response.json()
    resolve({data})
  })
}

export function updateCart(update){
  return new Promise(async(resolve) => {
    const response = await fetch('http://localhost:8080/cart/'+update.id,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":'application/json'},
    })
    const data = await response.json()
    resolve({data})
  })
}

export function deleteItemById(itemId){
  return new Promise (async(resolve)=>{
    const response = await fetch('http://localhost:8080/cart/'+itemId,{
      method:"DELETE",  
      headers:{"content-type":"application/json"},
    })
    const data = await response.json()
    resolve({data:{id:itemId}})
  })
}

export function resetCart(userId){
  return new Promise (async(resolve)=>{
    let response = await fetchItemByUserId(userId)
    let items = response.data;
    for (let item of items){
      await deleteItemById(item.id)
    }
    resolve({status:"success"})
    })
}