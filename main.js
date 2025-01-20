const dropdowns = document.querySelectorAll("#dropdown #select")
const button = document.querySelector("#form button")
const formCurr = document.querySelector("#from select")
const toCurr = document.querySelector("#to select")
const msg = document.querySelector('#change-amout h5')


dropdowns.forEach((select) => {
  for (code in countryList) {
    const option = document.createElement("option")
    option.innerText = code
    option.value = code
    if (select.name === "from" && code === "USD") {
      option.selected = "selected"
    } else if (select.name === "to" && code === "PKR") {
      option.selected = "selected"
    }
    select.append(option)
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target)
  })
})


window.addEventListener('load', ()=> {
    changeRate()
})

function updateFlag(elem) {
  let currencyCode = elem.value
  let countryCode = countryList[currencyCode]
  let imgSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
  let imgElem = elem.parentElement.children[0]
  imgElem.src = imgSrc
}

button.addEventListener("click",  (e) => {
  e.preventDefault()
  changeRate()
})

async function changeRate(){
    let amount = document.querySelector("#form input")
    let amountVal = amount.value
    if (amountVal === "" || amountVal < 1) {
      amountVal = 1
      amount.value = "1"
    }
  
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${formCurr.value.toLowerCase()}.json`
  
    let response = await fetch(URL)
  
    let data = await response.json()
  
    let rate = data[formCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
  
    let finalvalue = Number(amount.value) * rate
  
    msg.innerText =   `${amount.value} ${formCurr.value} = ${finalvalue} ${toCurr.value}`
}