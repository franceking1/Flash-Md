// france/fonts.js

// Simple font conversion to bold and italic styles
const toBold = (text) => text.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 0x1D400 - 0x41)).join('');
const toItalic = (text) => text.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 0x1D434 - 0x41)).join('');
const toBoldItalic = (text) => text.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 0x1D468 - 0x41)).join('');

// Add more font styles as needed
const toUppercase = (text) => text.toUpperCase();

module.exports = {
    toBold,
    toItalic,
    toBoldItalic,
    toUppercase
};
