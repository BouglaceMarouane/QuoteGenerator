const api_url = "http://localhost:3000/api/quote";

async function getQuote(){
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        // ZenQuotes returns an array with one object
        const quoteObj = Array.isArray(data) ? data[0] : data;
        document.getElementById("quote").innerText = quoteObj.q || quoteObj.content || "No quote found.";
        document.querySelector(".quote-container span").innerText = ` ${quoteObj.a || quoteObj.author || "Unknown"}`;
    } catch (error) {
        document.getElementById("quote").innerText = "Failed to fetch quote.";
        document.querySelector(".quote-container span").innerText = "";
    }
}

function copyCurrentQuote() {
    console.log('Copy button clicked!'); // Debug log
    const quoteText = document.getElementById("quote").innerText;
    const author = document.querySelector(".quote-container span").innerText.trim();
    
    console.log('Quote text:', quoteText); // Debug log
    console.log('Author:', author); // Debug log
    
    if (quoteText === "Loading..." || quoteText === "Failed to fetch quote." || quoteText === "No quote found.") {
        alert("Please wait for a quote to load before copying.");
        return;
    }

    const shareText = `"${quoteText}" ${author}`;
    console.log('Share text:', shareText); // Debug log
    copyToClipboard(shareText);
}

async function shareQuote() {
    const quoteText = document.getElementById("quote").innerText;
    const author = document.querySelector(".quote-container span").innerText.trim();
    
    if (quoteText === "Loading..." || quoteText === "Failed to fetch quote." || quoteText === "No quote found.") {
        alert("Please wait for a quote to load before sharing.");
        return;
    }

    const shareText = `"${quoteText}" ${author}`;
    const shareUrl = window.location.href;

    // Try Web Share API first (mobile devices)
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Inspirational Quote',
                text: shareText
            });
            return;
        } catch (error) {
            console.log('Web Share API failed:', error);
        }
    }

    // Fallback: Show sharing options
    showShareOptions(shareText, shareUrl);
}

function showShareOptions(shareText, shareUrl) {
    const shareOptions = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 20px; border-radius: 10px; max-width: 400px; text-align: center;">
                <h3>Share Quote</h3>
                <p style="margin: 15px 0; font-style: italic;">"${shareText.split(' — ')[0]}"</p>
                <p style="margin: 10px 0;">— ${shareText.split(' — ')[1] || 'Unknown'}</p>
                <div style="margin: 20px 0;">
                    <button onclick="copyToClipboard('${shareText.replace(/'/g, "\\'")}')" style="margin: 5px; padding: 10px 15px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        <i class="fa fa-copy"></i> Copy Quote
                    </button>
                    <button onclick="shareOnTwitter('${shareText.replace(/'/g, "\\'")}')" style="margin: 5px; padding: 10px 15px; background: #1da1f2; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        <i class="fa fa-twitter"></i> Twitter
                    </button>
                    <button onclick="shareOnFacebook('${shareText.replace(/'/g, "\\'")}', '${shareUrl}')" style="margin: 5px; padding: 10px 15px; background: #4267b2; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        <i class="fa fa-facebook"></i> Facebook
                    </button>
                    <button onclick="shareOnWhatsApp('${shareText.replace(/'/g, "\\'")}')" style="margin: 5px; padding: 10px 15px; background: #25d366; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        <i class="fa fa-whatsapp"></i> WhatsApp
                    </button>
                </div>
                <button onclick="closeShareModal()" style="padding: 8px 15px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', shareOptions);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCopyNotification();
        closeShareModal();
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyNotification();
        closeShareModal();
    });
}

function showCopyNotification() {
    console.log('Showing copy notification...'); // Debug log
    
    // Remove any existing notification
    const existingNotification = document.querySelector('.copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create a simple, highly visible notification first
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">✅</span>
            <span>Quote copied to clipboard!</span>
        </div>
    `;
    
    // Simple, highly visible styles
    notification.style.cssText = `
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        background: #4CAF50;
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 999999;
        font-family: Arial, sans-serif;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        min-width: 300px;
        border: 3px solid #45a049;
    `;

    // Add to page immediately
    document.body.appendChild(notification);
    console.log('Notification added to page'); // Debug log

    // Simple fade out after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
                console.log('Notification removed'); // Debug log
            }
        }, 500);
    }, 3000);
}

function shareOnTwitter(text) {
    const tweetText = encodeURIComponent(text);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, '_blank');
    closeShareModal();
}

function shareOnFacebook(text, url) {
    // Share the quote text directly, not the URL
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, '_blank');
    closeShareModal();
}

function shareOnWhatsApp(text) {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    closeShareModal();
}

function closeShareModal() {
    const modal = document.querySelector('div[style*="position: fixed"]');
    if (modal) {
        modal.remove();
    }
}

getQuote();
