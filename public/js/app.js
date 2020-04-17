const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault() // prevents the refresh of the page
    const location = search.value.split(',')
    if(!location[1]){
        return messageOne.textContent = 'Please insert the country!'
    }
    const adress = {
        city: location[0],
        country: location[1]
    }

    fetch(`http://localhost:8000/weather/?city=${location[0]}&country=${location[1]}`)
        .then((res) => {
            res.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageTwo.textContent = data.value
                    messageOne.textContent = data.location
                   // messageThree.textContent = data.adress
                }
            })
        }
    )
    
    console.log(adress)
})