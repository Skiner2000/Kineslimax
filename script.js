// public/script.js
document.addEventListener("DOMContentLoaded", () => {
    const stripe = Stripe('tu_clave_publica_de_stripe');

    const subscribeButtons = document.querySelectorAll('.subscribe-btn');

    subscribeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plan = button.getAttribute('data-plan');

            fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plan: plan })
            })
            .then(response => response.json())
            .then(session => {
                return stripe.redirectToCheckout({ sessionId: session.id });
            })
            .then(result => {
                if (result.error) {
                    alert(result.error.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
});