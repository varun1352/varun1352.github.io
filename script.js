document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggle = document.getElementById("themeToggle")
  const body = document.body

  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    body.classList.add("dark-theme")
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme")
    const currentTheme = body.classList.contains("dark-theme") ? "dark" : "light"
    localStorage.setItem("theme", currentTheme)
  })

  // Typewriter effect
  const typewriterText = document.getElementById("typewriter-text")
  const phrases = [
    "Computer Science @ NYU",
    "Computer Vision Research",
    "Scrappy Builder",
    "Machine Learning Engineer",
  ]

  let phraseIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 100

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex]

    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1)
      charIndex--
      typingSpeed = 50
    } else {
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1)
      charIndex++
      typingSpeed = 100
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true
      typingSpeed = 1500 // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
      typingSpeed = 500 // Pause before typing next phrase
    }

    setTimeout(typeWriter, typingSpeed)
  }

  // Start the typewriter effect
  setTimeout(typeWriter, 1000)

  // Smooth scrolling for navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      })
    })
  })

  // Add scroll animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe project cards and timeline items
  document.querySelectorAll(".project-card, .timeline-item").forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    observer.observe(item)
  })

  // Add fade-in class to observed elements
  document.addEventListener(
    "scroll",
    () => {
      document.querySelectorAll(".fade-in").forEach((item) => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      })
    },
    { passive: true },
  )
})

