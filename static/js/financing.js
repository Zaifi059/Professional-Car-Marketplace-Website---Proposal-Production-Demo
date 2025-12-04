// Financing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initApplyNowButton();
});

// Apply Now Button
function initApplyNowButton() {
    const applyBtn = document.getElementById('applyNowBtn');
    
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            console.log('Apply now clicked');
            
            // Collect calculator values
            const carPrice = document.getElementById('carPrice').value;
            const paybackPeriod = document.getElementById('paybackPeriod').value;
            const downPayment = document.getElementById('downPayment').value;
            const loanAmount = document.getElementById('loanAmount').textContent;
            const monthlyPayment = document.getElementById('monthlyPayment').textContent;
            
            console.log('Financing application:', {
                carPrice,
                paybackPeriod,
                downPayment,
                loanAmount,
                monthlyPayment
            });
            
            // Show application form or redirect
            alert('Thank you for your interest! Our team will contact you shortly to proceed with your financing application.\n\nLoan Amount: ' + loanAmount + '\nMonthly Payment: ' + monthlyPayment);
            
            // In a real application, you would:
            // 1. Open a modal with application form
            // 2. Redirect to application page
            // 3. Send data to backend API
        });
    }
}

