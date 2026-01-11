
    const user = '<%- JSON.stringify(user) %>';

    function addtocart() {

    if(!user){
        window.location = '/login'
        return false;
    }
    const qty = document.getElementById('qty').value;
    const productId = document.getElementById('productId').value;
    const price = document.getElementById('price').value
    
    const selectedVariations = {};
    const radios = document.querySelectorAll('input[type="radio"]');
    const variationTypes = [...new Set(Array.from(radios).map(r => r.name))];
 
    variationTypes.forEach(type => {
        const checked = document.querySelector(`input[name="${type}"]:checked`);
        if (checked) {
            const label = document.querySelector(`label[for="${checked.id}"]`);
            if (type === 'Color') {
                selectedVariations[type] = label.style.backgroundColor;
            } else {
                selectedVariations[type] = label.textContent;
            }
        }
    });

    const cartData = {
        productId: productId,
        quantity: qty,
        price: price,
        variations: selectedVariations
    };

    fetch('/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData)
    }).then(res => res.json())
      .then(data => {
        if(data.success){
            document.getElementById('cartCount').innerText = data.cartCout
          }
        } 
      );
    
}
