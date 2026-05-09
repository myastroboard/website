const navToggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.site-nav')

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true'
    navToggle.setAttribute('aria-expanded', String(!expanded))
    nav.classList.toggle('is-open', !expanded)
  })
}

const year = new Date().getFullYear()
const copyrightEl = document.getElementById('copyright')
if (copyrightEl) {
  copyrightEl.textContent = `© ${year} WorldOfGZ · MIT ecosystem`
}
