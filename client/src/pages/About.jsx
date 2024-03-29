import React from 'react'

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Me</h1>
      <p className=' mb-4 text-slate-700 font-medium'>I'm a seasoned full stack developer with 1 years of experience in web development. My expertise spans both front-end and back-end technologies, ensuring end-to-end proficiency. Front-end skills: I excel in HTML, CSS, and JAVASCRIPT, crafting responsive and visually engaging user interfaces using frameworks like REACT</p>
      <div className='font-medium mb-4 text-slate-700'>
        My Recent Portfolio:
        <article>NextJs: <a className='text-blue-700' href="https://next-portfolio-sage-eta.vercel.app/" target="_blank">https://next-portfolio-sage-eta.vercel.app/</a></article>
        <article>MernProject: <a className='text-blue-700' href="https://mern-render-2.onrender.com/ " target="_blank">https://mern-render-2.onrender.com/</a></article>
      </div >
      <p className='font-medium mb-4 text-slate-700'>
        <article>Best Regards</article>
        Mahedy Hasan Noman</p>
    </div>
  )
}
