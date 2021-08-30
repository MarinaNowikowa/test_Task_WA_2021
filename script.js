const addTagBtn = document.querySelector('.app-button')
const tagInput = document.querySelector('.app-input')
const readOnlyBtn = document.querySelector('.btn-read')
const appContainer = document.querySelector('.app-container')

let tags
!localStorage.tags ?
  (tags = []) :
  (tags = JSON.parse(localStorage.getItem('tags')))

let btnDeleteElems = []

function Tag(description) {
  this.description = description
  this.readOnly = false
}
const createTemplate = (tag, index) => {
  return `
    <div class="tag-item ${tag.readOnly ? 'checked' : ''}">
          <div class="tag-description">${tag.description}</div>
          <div class="buttons">
            <button onclick="deleteTag(${index})" class="btn-delete ${
    tag.readOnly ? 'checked' : ''
}" >X</button>
          </div>
    </div>
    `
}

const fillHtmlList = () => {
  appContainer.innerHTML = ''
  if (tags.length > 0) {
    tags.forEach((el, index) => {
      appContainer.innerHTML += createTemplate(el, index)
    })
  }
  btnDeleteElems = document.querySelectorAll('.btn-delete')
}

fillHtmlList()

const updateLocalStorage = () => {
  localStorage.setItem('tags', JSON.stringify(tags))
}

const addTag = () => {
  tags.push(new Tag(tagInput.value))
  updateLocalStorage()
  fillHtmlList()
  tagInput.value = ''
}

addTagBtn.addEventListener('click', addTag)

const deleteTag = (index) => {
  tags.splice(index, 1)
  updateLocalStorage()
  fillHtmlList()
}

const setReadOnly = () => {
  tags.forEach((el) => {
    el.readOnly = !el.readOnly
    btnDeleteElems.forEach((btn) => {
      if (el.readOnly) {
        addTagBtn.classList.add('checked')
        addTagBtn.removeEventListener('click', addTag)
        btn.disabled=true
      } else {
        addTagBtn.classList.remove('checked')
        addTagBtn.addEventListener('click', addTag)
        btn.disabled=false
      }
    })
  })
  updateLocalStorage()
  fillHtmlList()
}

readOnlyBtn.addEventListener('click', setReadOnly)
