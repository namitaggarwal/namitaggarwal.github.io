// EmailJS Configuration
// Copy this file to config.js and fill in your actual values
// DO NOT commit config.js to version control

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'your_public_key_here',
    SERVICE_ID: 'your_service_id_here',
    TEMPLATE_ID: 'your_template_id_here'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
}
