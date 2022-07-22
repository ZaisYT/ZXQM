const menuToggle = document.querySelector('.menutoggle');
const navigation = document.querySelector('.navigation');

menuToggle.onclick = () => {
    navigation.classList.toggle('open');
}

const listItems = document.querySelectorAll('.list-item');

listItems.forEach(item => {
    item.onclick = () => {
        listItems.forEach(item => item.classList.remove('active'));
        item.classList.add('active');
    }
})
