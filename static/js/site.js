/* =========================================================
   myAstroBoard – site.js
   ========================================================= */

// --- Mobile nav toggle ---
const navToggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.site-nav')

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true'
    navToggle.setAttribute('aria-expanded', String(!expanded))
    nav.classList.toggle('is-open', !expanded)
  })

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('is-open')
      navToggle.setAttribute('aria-expanded', 'false')
    }
  })
}

// --- Dynamic copyright year ---
const year = new Date().getFullYear()
document.querySelectorAll('.js-copyright').forEach((el) => {
  el.textContent = `© ${year} WorldOfGZ — Licensed under AGPL-3.0`
})

// --- Cookie consent banner ---
;(function () {
  const CONSENT_KEY = 'mab_cookie_consent'
  const banner = document.getElementById('cookie-banner')
  if (!banner) return

  const consent = localStorage.getItem(CONSENT_KEY)

  if (consent) {
    banner.classList.add('is-hidden')
    return
  }

  // Show banner after short delay for better UX
  setTimeout(() => {
    banner.classList.remove('is-hidden')
  }, 800)

  const btnAccept = document.getElementById('cookie-accept')
  const btnDecline = document.getElementById('cookie-decline')

  function dismissBanner(value) {
    localStorage.setItem(CONSENT_KEY, value)
    banner.classList.add('is-hidden')
  }

  if (btnAccept) btnAccept.addEventListener('click', () => dismissBanner('accepted'))
  if (btnDecline) btnDecline.addEventListener('click', () => dismissBanner('declined'))
})()

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// --- Simple intersection observer for fade-in animations ---
;(function () {
  if (!('IntersectionObserver' in window)) return

  const elements = document.querySelectorAll('.fade-in')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1 }
  )

  elements.forEach((el) => observer.observe(el))
})()
