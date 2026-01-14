document.addEventListener('DOMContentLoaded', ()=>{
    const container = document.getElementById('category-selection');

    // Intro animation
    document.querySelectorAll('.hero, .hero-actions').forEach(el=> el.classList.add('intro-fade'));

    // Category buttons: ripple + navigate
    if(container){
        container.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const target = btn.dataset.target;
                rippleAtEvent(btn, e);
                navigateWithDelay(target);
            });
            btn.addEventListener('keydown', e => {
                if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); btn.click(); }
            });
        });
    }

    // No modal overlay: modal behavior removed per request

    function navigateWithDelay(target){
        if(!target){ alert('Category not available'); return; }
        setTimeout(()=> window.location.href = encodeURI(target), 220);
    }

    function rippleAtEvent(el, event){
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.2;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        const x = (event.clientX || rect.left + rect.width/2) - rect.left - size/2;
        const y = (event.clientY || rect.top + rect.height/2) - rect.top - size/2;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        el.appendChild(ripple);
        ripple.addEventListener('animationend', ()=> ripple.remove());
    }
});