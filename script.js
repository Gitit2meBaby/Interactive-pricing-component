const pageViews = document.querySelector('#pageViews');
const priceDisplayDesktop = document.querySelector('#priceDisplay');
const billingPeriodDesktop = document.querySelector('#billingPeriod');
const priceDisplayMobile = document.querySelector('#priceDisplayMobile');
const billingPeriodMobile = document.querySelector('#billingPeriodMobile');
const slider = document.querySelector('input[type="range"]');
const switchCheckbox = document.querySelector('#switch');
let isChecked = switchCheckbox.checked;

updateValues();
window.addEventListener('resize', checkScreenWidth);

switchCheckbox.addEventListener('change', () => {
    isChecked = switchCheckbox.checked;
    updateValues();
});

slider.addEventListener('input', () => {
    updateValues();
});

const discount = document.querySelector('.discount');

// SCREEN WIDTH CHECK
function checkScreenWidth() {
    const screenWidth = window.innerWidth;
    const desktop = document.querySelector('.desktop');
    const mobile = document.querySelector('.mobile');
    const discount = document.querySelector('.discount');

    if (!discount) {
        console.error("Discount element not found.");
        return;
    }

    if (screenWidth < 500) {
        discount.textContent = "-25%";
        if (desktop) {
            desktop.style.display = 'none';
        }
        if (mobile) {
            mobile.style.display = 'flex';
        }
    } else {
        discount.textContent = "25% discount";
        if (desktop) {
            desktop.style.display = 'flex';
        }
        if (mobile) {
            mobile.style.display = 'none';
        }
    }
}


function updateValues() {
    const value = slider.value;
    const min = slider.min;
    const max = slider.max;
    const trackWidth = slider.clientWidth;

    const percentage = ((value - min) / (max - min)) * 100;

    const billingPeriodText = isChecked ? " /year" : " /month";
    billingPeriodDesktop.textContent = billingPeriodText;
    billingPeriodMobile.textContent = billingPeriodText;

    let pageviewsText = '';
    let priceText = '';

    if (percentage < 20) {
        pageviewsText = '10K pageviews';
        priceText = isChecked ? '$6' : '$8';
    } else if (percentage >= 20 && percentage < 40) {
        pageviewsText = '50K pageviews';
        priceText = isChecked ? '$9' : '$12';
    } else if (percentage >= 40 && percentage < 60) {
        pageviewsText = '100K pageviews';
        priceText = isChecked ? '$12' : '$16';
    } else if (percentage >= 60 && percentage < 80) {
        pageviewsText = '500K pageviews';
        priceText = isChecked ? '$18' : '$24';
    } else {
        pageviewsText = '1M pageviews';
        priceText = isChecked ? '$27' : '$36';
    }

    pageViews.textContent = pageviewsText;
    priceDisplayDesktop.textContent = priceText;
    priceDisplayMobile.textContent = priceText;

    slider.style.background = `linear-gradient(to right, var(--Soft-Cyan) ${percentage}%, var(--Light-Grayish-Blue) ${percentage - 100}%)`;
}


