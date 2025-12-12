# Developer Portfolio

A modern, responsive, and professional developer portfolio website built with HTML, CSS, and JavaScript. This portfolio is designed to showcase your skills, projects, and experience to potential employers.

🌐 **Live Demo**: [https://kazym667.github.io](https://kazym667.github.io)

## ✨ Features

- **Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- **Modern UI/UX** - Clean and professional design with smooth animations
- **Interactive Elements** - Smooth scrolling, hover effects, and dynamic navigation
- **Easy to Customize** - Well-structured code that's easy to modify
- **Performance Optimized** - Fast loading times and smooth animations
- **SEO Friendly** - Proper meta tags and semantic HTML

## 🎯 Sections

1. **Home/Hero** - Eye-catching introduction with call-to-action buttons
2. **About** - Tell your story and showcase your background
3. **Skills** - Display your technical and professional skills
4. **Projects** - Showcase your best work with images and descriptions
5. **Contact** - Multiple ways for people to reach you

## 🚀 Quick Start

### 1. Clone or Download

This repository is already set up on GitHub Pages. Just customize the content!

### 2. Customize Your Information

Edit the `index.html` file and replace the placeholder content:

- **Your Name**: Replace "Your Name" with your actual name
- **Job Title**: Change "Full Stack Developer" to your role
- **Social Links**: Update all social media URLs
  - GitHub: Line 42, 334
  - LinkedIn: Line 43, 335
  - Twitter: Line 44, 336
  - Email: Line 45, 328
- **About Section**: Lines 54-90 - Write your own story
- **Location & Info**: Lines 74-86 - Update your location, status, and degree
- **Skills**: Lines 100-210 - Add/remove skills as needed
- **Projects**: Lines 220-350 - Replace with your actual projects
- **Contact Info**: Lines 365-375 - Update email, phone, location

### 3. Add Your Images

Place your images in the `assets/` folder:

- `profile.jpg` - Your professional photo (400x400px recommended)
- `project1.jpg` through `project6.jpg` - Screenshots of your projects (800x500px recommended)

**Temporary Solution**: Use placeholder images until you have your own:
```html
<img src="https://via.placeholder.com/400x400/667eea/ffffff?text=Your+Photo" alt="Profile">
```

### 4. Add Your Resume

Place your resume PDF in the root folder as `resume.pdf`, or update the link on line 91:
```html
<a href="./resume.pdf" class="btn btn-primary" download>
```

### 5. Update Contact Form

The contact form currently uses a `mailto:` link. For production, consider:
- [Formspree](https://formspree.io/) - Free form backend
- [EmailJS](https://www.emailjs.com/) - Send emails from JavaScript
- [Netlify Forms](https://www.netlify.com/products/forms/) - If hosting on Netlify

Update the email in `script.js` on line 109.

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css` (lines 1-11):

```css
:root {
    --primary-color: #3b82f6;      /* Main brand color */
    --secondary-color: #8b5cf6;    /* Accent color */
    --text-primary: #1f2937;       /* Main text */
    --text-secondary: #6b7280;     /* Secondary text */
    /* ... more variables ... */
}
```

### Fonts

Currently using system fonts. To add custom fonts, add this to the `<head>` in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

Then update `body` font-family in `styles.css`.

### Add/Remove Projects

Each project card follows this structure in `index.html`:

```html
<div class="project-card">
    <div class="project-image">
        <img src="./assets/projectX.jpg" alt="Project Name">
        <div class="project-overlay">
            <a href="GITHUB_URL" target="_blank" class="project-link">
                <i class="fab fa-github"></i>
            </a>
            <a href="DEMO_URL" target="_blank" class="project-link">
                <i class="fas fa-external-link-alt"></i>
            </a>
        </div>
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description...</p>
        <div class="project-tech">
            <span class="tech-tag">Technology</span>
            <!-- Add more tech tags -->
        </div>
    </div>
</div>
```

## 📱 Testing

Test your portfolio on:
- Different browsers (Chrome, Firefox, Safari, Edge)
- Different devices (phone, tablet, desktop)
- Different screen sizes using browser DevTools

## 🌐 Deployment

### GitHub Pages (Current Setup)

Your site is already configured for GitHub Pages:

1. Make sure all your changes are committed
2. Push to the `main` branch
3. Go to Settings → Pages
4. Ensure source is set to `main` branch
5. Your site will be live at `https://kazym667.github.io`

### Alternative Hosting Options

- **Netlify**: Drag and drop your folder
- **Vercel**: Connect your GitHub repo
- **GitHub Pages with Custom Domain**: Add a `CNAME` file with your domain

## 📝 Checklist

Before going live, make sure to:

- [ ] Replace all placeholder text with your information
- [ ] Update all social media links
- [ ] Add your profile picture
- [ ] Add project screenshots
- [ ] Add your resume PDF
- [ ] Update contact email in both HTML and JS
- [ ] Test on mobile devices
- [ ] Test all links
- [ ] Check for typos
- [ ] Optimize images (compress them)
- [ ] Update meta description in HTML head
- [ ] Test contact form

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with modern features (Grid, Flexbox, Animations)
- **JavaScript** - Interactivity and animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography (optional)

## 📄 File Structure

```
portfoloi/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
├── assets/             # Images folder
│   ├── profile.jpg     # Your photo
│   ├── project1.jpg    # Project screenshots
│   └── ...
├── resume.pdf          # Your resume (add this)
└── README.md           # This file
```

## 💡 Tips for Success

1. **Keep it updated** - Regularly add new projects and skills
2. **Quality over quantity** - Showcase your best work
3. **Tell a story** - Make your about section personal and engaging
4. **Professional photos** - Use high-quality images
5. **Proofread** - Check for spelling and grammar errors
6. **Performance** - Optimize images and code
7. **Analytics** - Add Google Analytics to track visitors
8. **SEO** - Use proper meta tags and descriptions

## 🤝 Support

If you need help:
- Check the comments in the code
- Review the customization section above
- Test thoroughly before going live

## 📧 Contact

Questions about this portfolio? Feel free to reach out!

---

**Made with ❤️ for developers who want to stand out**

Good luck with your job search! 🚀