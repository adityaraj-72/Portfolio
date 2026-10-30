# Assets Directory

This folder contains assets for the portfolio website.

### Replacing Your Resume PDF
To update your resume:
1. Export your latest resume as a PDF file.
2. Name it `Aditya_Raj_Resume.pdf` (or any name you prefer).
3. Place it in this `assets/` folder (replacing the existing `Aditya_Raj_Resume.pdf`).
4. If you change the filename, update the `href` attribute in `index.html` where `assets/Aditya_Raj_Resume.pdf` is referenced.

All "Download Resume" buttons on the portfolio are pre-wired to:
```html
<a href="assets/Aditya_Raj_Resume.pdf" download="Aditya_Raj_Resume.pdf">Download Resume ↓</a>
```
