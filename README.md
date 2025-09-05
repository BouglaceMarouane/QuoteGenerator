# 💬 Quote Generator 🌟

## ✨ Project Description
This project is a beautiful and interactive web application that generates inspirational quotes from famous authors and personalities. It features a clean, modern design with responsive layout and provides users with the ability to get new quotes, copy them to clipboard, and share them on various social media platforms.

## 🔧 Key Features

### 📝 **Quote Display**
- Beautiful, centered quote container with elegant typography
- Displays inspirational quotes with author attribution
- Automatic loading of quotes on page load

### 🔄 **New Quote Generation**
- "New Quote" button to fetch fresh inspirational content
- Integration with ZenQuotes API for real-time quote fetching
- Fallback system with curated quotes when API is unavailable

### 📋 **Copy to Clipboard**
- One-click copy functionality for easy sharing
- Visual feedback with success notification
- Handles both modern and legacy browser compatibility

### 📱 **Social Media Sharing**
- Share quotes on Twitter, Facebook, and WhatsApp
- Web Share API support for mobile devices
- Custom sharing modal with multiple platform options

### 🎨 **Responsive Design**
- Mobile-first approach with responsive breakpoints
- Elegant typography using Google Fonts (Playfair Display)
- Beautiful card-based layout with subtle shadows
- Font Awesome icons for enhanced user experience

### ⚡ **Smart Rate Limiting**
- Built-in rate limiting to prevent API abuse
- Automatic fallback to local quotes when rate limited
- Seamless user experience even during API restrictions

## 🛠️ Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **APIs**: ZenQuotes API
- **Styling**: Custom CSS with Google Fonts
- **Icons**: Font Awesome 6.4.2
- **Dependencies**: Express, CORS

## ⚙️ Installation Steps

### 📥 **Clone the repository**
```bash
git clone https://github.com/<your-username>/QuoteGenerator.git
```

### 📂 **Navigate to the project folder**
```bash
cd QuoteGenerator
```

### 📦 **Install dependencies**
```bash
npm install
```

### 🌐 **Start the server**
```bash
node server.js
```

### 🚀 **Access the application**
Open your browser and navigate to:
- **Frontend**: `http://localhost:3000` (or open `index.html` directly)
- **API Endpoint**: `http://localhost:3000/api/quote`

## 📷 Screenshots

### 🏠 **Home Screen**
*Clean, centered design with quote display and action buttons*

### ✅ **Quote Display**
*Beautiful typography showing inspirational quote with author attribution*

### 📱 **Mobile Responsive**
*Optimized layout for mobile devices with touch-friendly buttons*

### 📋 **Copy Notification**
*Success feedback when quote is copied to clipboard*

### 📤 **Share Options**
*Modal with multiple social media sharing options*

## 🔧 **API Endpoints**

### `GET /api/quote`
Returns a random inspirational quote in JSON format.

**Response Format:**
```json
[
  {
    "q": "The only way to do great work is to love what you do.",
    "a": "Steve Jobs"
  }
]
```

## 🤝 Contributing
Contributions to this project are welcome! If you have suggestions, improvements, or bug fixes, please submit a pull request. Make sure to follow coding conventions and maintain consistent styles.

If you encounter issues or want to request a new feature, please open an issue in the repository with as much detail as possible.

## ⭐ Support
If you like this project, don't forget to leave a ⭐ on GitHub. Thank you and happy coding! 🚀

## 📬 Stay in Touch
- 📧 **Email**: bouglacemarouane@gmail.com
- 🌐 **GitHub**: [Bouglace Marouane](https://github.com/bouglacemarouane)
- 🌍 **LinkedIn**: [Marouane Bouglace](https://linkedin.com/in/marouane-bouglace)

---

*Made with ❤️ and lots of ☕*