const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.remove("active")
    })
)

String.prototype.toJadenCase = function () {
    const arr = this.split(" ")
    arr.forEach((word) => {
        word[0].toUpperCase()
    })
    const ans = arr.join(" ")
    return ans
}

for (let i = 0; i < arr.length; i++) {
    const element = arr[i]
}

arr.forEach((element) => {})
