// A mock function to mimic making an async request for data
export function addtoCart(order) {
  return new Promise (async (resolve) =>
  {
    const response = await fetch('http://localhost:8080/api/cart/addToCart',{
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
    const response = await fetch('http://localhost:8080/api/cart?user='+userId)
    const data = await response.json()
    resolve({data})
  })
}

export function updateCart(update){
  return new Promise(async(resolve) => {
    const response = await fetch('http://localhost:8080/api/cart/update/'+update.id,{
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
    const response = await fetch('http://localhost:8080/api/cart/deleteItem?id='+itemId,{
      method:"DELETE",  
      headers:{"content-type":"application/json"},
    })
    const data = await response.json()
    resolve({ data : { id : itemId }})
  })
}

export async function resetCart(userId) {
  try {
    const response = await fetchItemByUserId(userId);
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid response data");
    }
    await Promise.all(response.data.map(item => deleteItemById(item.id)));
    return ({ status: "success" });
  } catch (error) {
    return ({ status: "error", message: error.message });
  }
}