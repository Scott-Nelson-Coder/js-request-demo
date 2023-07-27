console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form') // need to prevent default 
const ageInput = document.querySelector('#age-input') // give me a value
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = 'http://localhost:4000'

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllChars() {
  clearCharacters()
  axios
    .get(baseURL + '/characters')
    .then((response) => {
      console.log(response.data)
      response.data.forEach(createCharacterCard)
  })
    .catch((err) => {
      console.error(err)
    })
 }

 function getOneChar(event) {
  clearCharacters()
  axios
    .get(baseURL + `/character/${event.target.id}`)
    .then((res) => {
      createCharacterCard(res.data)
    })
    .catch((err) => {
      console.error(err)
    })
 }

 function getOldChars(event) {
  event.preventDefault()
  clearCharacters()

    axios
    .get(baseURL + `/character/?age=${ageInput.value}`)
    .then((res) => {
      res.data.forEach(createCharacterCard)
    }) 
    .catch((err) => {
      console.error(err)
    })
 }

 function addNewChar(event) {
  event.preventDefault()
  clearCharacters()

  let newLikes = newLikesText.value.split(', ')

  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes
  }

  axios
  .post(baseURL + '/character', body)
  .then((res) => {
    res.data.forEach(createCharacterCard)
  })
  .catch((err) => {
    console.error(err)
  })


  newAgeInput.value = ""
  newFirstInput.value = ""
  newLastInput.value = ""
  newGenderDropDown.value = ""
  newLikesText.value = ""
 }

 getAllBtn.addEventListener('click', getAllChars)
 charBtns.forEach((btn) => btn.addEventListener("click", getOneChar))
 ageForm.addEventListener("submit", getOldChars)
 createForm.addEventListener("submit", addNewChar)