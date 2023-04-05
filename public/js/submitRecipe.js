// Adding and Removing ingredients
let addIngredientBtn = document.getElementById("addIngredientBtn")
let removeIngredientBtn = document.getElementById("removeIngredientBtn")
let ingredientList = document.querySelector(".ingredientList")
let ingredientDiv = document.querySelectorAll(".ingredientDiv")
addIngredientBtn.addEventListener("click", function () {
    let newIngredient = ingredientDiv[0].cloneNode(true)
    let input = newIngredient.getElementsByTagName("input")
    for (let i = 0; i < 4; i++) {
        const element = input[i]
        element.value = ""
    }
    ingredientList.appendChild(newIngredient)
})
removeIngredientBtn.addEventListener("click", function () {
    let ingredientNodesNum = document.querySelector(".ingredientList").childNodes.length
    let IngredientToRemove = document.querySelector(".ingredientList").childNodes[ingredientNodesNum - 1]
    if (ingredientNodesNum > 3) {
        IngredientToRemove.parentNode.removeChild(IngredientToRemove)
    }
})

let addDirectionBtn = document.getElementById("addDirectionBtn")
let removeDirectionBtn = document.getElementById("removeDirectionBtn")
let directionList = document.querySelector(".directionList")
let directionDiv = document.querySelectorAll(".directionDiv")
addDirectionBtn.addEventListener("click", function () {
    let newDirection = directionDiv[0].cloneNode(true)
    let textarea = newDirection.getElementsByTagName("textarea")[0]
    let span = newDirection.getElementsByTagName("span")[0]
    textarea.value = ""
    let stepCount = directionList.childNodes.length - 1
    span.innerText = `Step ${stepCount}`
    directionList.appendChild(newDirection)
})
removeDirectionBtn.addEventListener("click", function () {
    let directionNodesNum = document.querySelector(".directionList").childNodes.length
    let DirectionToRemove = document.querySelector(".directionList").childNodes[directionNodesNum - 1]
    if (directionNodesNum > 3) {
        DirectionToRemove.parentNode.removeChild(DirectionToRemove)
    }
})

// // Define a function to add or remove a text area
// function addRemoveTextArea(action) {
//     let container = document.querySelector("#textarea-container")
//     if (action === "add") {
//         let textarea = document.createElement("textarea")
//         let span = document.createElement("span")
//         textarea.className = "form-control"
//         span.className = "input-group-text"
//         container.appendChild(textarea, span)
//     } else if (action === "remove") {
//         let textareas = container.querySelectorAll("textarea")
//         if (textareas.length > 1) {
//             textareas[textareas.length - 1].remove()
//             span[span.length - 1].remove()
//         }
//     }
// }

// Form styling
// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll(".needs-validation")
// Loop over them and prevent submission
Array.from(forms).forEach((form) => {
    form.addEventListener(
        "submit",
        (event) => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add("was-validated")
        },
        false
    )
})
