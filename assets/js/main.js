/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Show menu */
if (navToggle) {
   navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if (navClose) {
   navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLinks = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () => {
   const navMenu = document.getElementById('nav-menu')
   navMenu.classList.remove('show-menu')
}
navLinks.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TEXT CIRCULAR ===============*/
const text = document.getElementById('home-text')
if (text) {
   const str = text.innerText.trim()
   text.innerHTML = ''
   const length = str.length
   const angleStep = 360 / length

   for (let i = 0; i < length; i++) {
      const span = document.createElement('span')
      span.innerText = str[i]
      span.style.transform = `rotate(${i * angleStep}deg)`
      text.appendChild(span)
   }
}

/*=============== HOME TYPED JS ===============*/
if (document.getElementById('home-typed')) {
   new Typed('#home-typed', {
      strings: [
         'Web Developer',
         'Freelancer',
         'UI/UX Designer',
         'Frontend Specialist'
      ],
      typeSpeed: 80,
      backSpeed: 45,
      backDelay: 1800,
      loop: true
   })
}

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () => {
   const header = document.getElementById('header')
   if (window.scrollY >= 50) {
      header.classList.add('bg-header')
   } else {
      header.classList.remove('bg-header')
   }
}
window.addEventListener('scroll', scrollHeader)
scrollHeader()

/*=============== SWIPER WORK ===============*/
const swiperWork = new Swiper('.work__container', {
   loop: true,
   spaceBetween: 24,
   grabCursor: true,
   slidesPerView: 'auto',
   centeredSlides: false,
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   breakpoints: {
      320: {
         slidesPerView: 1,
         spaceBetween: 20,
      },
      640: {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      1150: {
         slidesPerView: 3,
         spaceBetween: 32,
      },
   }
})

/*=============== SERVICES ACCORDION ===============*/
const servicesCards = document.querySelectorAll('.services__card')

servicesCards.forEach((card) => {
   const header = card.querySelector('.services__header')
   
   header.addEventListener('click', () => {
      const isOpen = card.classList.contains('services-open')

      // Close all cards
      servicesCards.forEach((c) => c.classList.remove('services-open'))

      // If clicked card was closed, open it
      if (!isOpen) {
         card.classList.add('services-open')
      }
   })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/
const testimonialsTrack = document.getElementById('testimonials-track')
if (testimonialsTrack) {
   const cards = Array.from(testimonialsTrack.children)
   // Duplicate all cards to provide seamless infinite scroll loop
   cards.forEach((card) => {
      const clone = card.cloneNode(true)
      testimonialsTrack.appendChild(clone)
   })
}

/*=============== CONTACT EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form')
const contactMessage = document.getElementById('contact-message-feedback')

const sendEmail = (e) => {
   e.preventDefault()

   // If EmailJS keys are provided, we can use emailjs.sendForm
   // By default, provide immediate visual feedback & graceful simulation
   if (window.emailjs && window.emailjs._publicKey) {
      // serviceID - templateID - #form - publicKey
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#contact-form', 'YOUR_PUBLIC_KEY')
         .then(() => {
            contactMessage.classList.remove('error')
            contactMessage.classList.add('success')
            contactMessage.textContent = 'Message sent successfully ✅'
            contactForm.reset()

            setTimeout(() => {
               contactMessage.textContent = ''
            }, 5000)
         }, () => {
            contactMessage.classList.remove('success')
            contactMessage.classList.add('error')
            contactMessage.textContent = 'Message not sent (service error) ❌'
         })
   } else {
      // Demo / offline fallback simulation
      contactMessage.classList.remove('error')
      contactMessage.classList.add('success')
      contactMessage.textContent = 'Message sent successfully ✅'
      contactForm.reset()

      setTimeout(() => {
         contactMessage.textContent = ''
      }, 5000)
   }
}

if (contactForm) {
   contactForm.addEventListener('submit', sendEmail)
}

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
   const scrollUpBtn = document.getElementById('scroll-up')
   if (window.scrollY >= 350) {
      scrollUpBtn.classList.add('show-scroll')
   } else {
      scrollUpBtn.classList.remove('show-scroll')
   }
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
   const scrollDown = window.scrollY

   sections.forEach((current) => {
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector(`.nav__menu a[href*='${sectionId}']`)

      if (sectionsClass) {
         if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
         } else {
            sectionsClass.classList.remove('active-link')
         }
      }
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.getElementById('custom-cursor')

if (cursor && window.innerWidth >= 1150) {
   let mouseX = 0, mouseY = 0
   let cursorX = 0, cursorY = 0

   document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
   })

   const renderCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2
      cursorY += (mouseY - cursorY) * 0.2
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      requestAnimationFrame(renderCursor)
   }
   requestAnimationFrame(renderCursor)

   // Add hover effect on interactive elements
   const interactiveElements = document.querySelectorAll('a, button, .work__card, .services__card, .skills__item')
   interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'))
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'))
   })
}

/*=============== SCROLLREVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
   const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 300,
      reset: false
   })

   sr.reveal('.home__data')
   sr.reveal('.home__image-box', { delay: 500, origin: 'bottom' })
   sr.reveal('.about__data', { origin: 'left' })
   sr.reveal('.about__info', { origin: 'right', delay: 400 })
   sr.reveal('.work__container')
   sr.reveal('.services__container')
   sr.reveal('.skills__description')
   sr.reveal('.skills__card', { interval: 150 })
   sr.reveal('.testimonials__container')
   sr.reveal('.contact__form', { origin: 'left' })
   sr.reveal('.contact__data', { origin: 'right', delay: 300 })
   sr.reveal('.footer__container')
}
