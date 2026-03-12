const menu = document.getElementById('menu');
const messageDiv = document.getElementById('message');
function showMessage(text) {
    messageDiv.innerHTML = `✅ Вы выбрали: <strong>${text}</strong> (можно перейти по ссылке)`;
}

function updateMarker(li) {
    const marker = li.querySelector('.marker');
    if (!marker) return;
    
    const subMenu = li.querySelector(':scope > ul');
    if (subMenu) {
        if (subMenu.style.display === 'block') {
            marker.textContent = '−';
        } else {
            marker.textContent = '+';
        }
    } else {
        marker.textContent = '';
    }
}
document.querySelectorAll('#menu li').forEach(li => {
    const subMenu = li.querySelector(':scope > ul');
    if (subMenu) {
        subMenu.style.display = 'none';
    }
    updateMarker(li);
});

menu.addEventListener('click', function(e) {
    let li = e.target.closest('li');
    if (!li) return;
    let liText = '';
    li.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
            liText += node.nodeValue.trim();
        }
    });
    if (!liText) liText = 'пункт';

    let subMenu = li.querySelector(':scope > ul');
    
    if (subMenu) {
        if (subMenu.style.display === 'block') {
            subMenu.style.display = 'none';
        } else {
            subMenu.style.display = 'block';
        }
        
        updateMarker(li);
        li.querySelectorAll('li').forEach(child => {
            updateMarker(child);
        });
    } else {

        showMessage(liText);
    }
});