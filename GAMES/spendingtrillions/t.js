const items = [
    { name: "Sports Car", price: 200000 },
    { name: "Luxury House", price: 5000000 },
    { name: "Private Jet", price: 2000000 },
    { name: "Yacht", price: 10000000 },
    { name: "Gold", price: 1000000 },
    { name: "tank", price: 4000000 },
    { name: "Iphones", price: 10000 },
    { name: "Helicopter", price: 10000000 },
    { name: "Watch", price: 1000000 }
];

let money = 100000000000000;
let currentItemIndex = 0;
const moneyDisplay = document.getElementById("money");
const messageDisplay = document.getElementById("message");
const itemSection = document.getElementById("item-section");

function buyItem(index) {
    if (index !== currentItemIndex) return; 

    const quantityInput = document.getElementById(`quantity-${index}`);
    const quantity = parseInt(quantityInput.value);
    const currentItem = items[index];
    const totalCost = currentItem.price * quantity;

    if (quantity <= 0) {
        messageDisplay.textContent = "Please select a quantity greater than 0!";
        return;
    }

    if (totalCost > money) {
        messageDisplay.textContent = "Not enough money to buy this quantity!";
        return;
    }

    money -= totalCost;
    moneyDisplay.textContent = money.toLocaleString();

    const nextArrow = document.getElementById(`next-arrow-${index}`);
    nextArrow.style.display = "inline-block";
    quantityInput.disabled = true; 
    messageDisplay.textContent = `Purchased ${quantity} ${currentItem.name}(s) for $${totalCost.toLocaleString()}!`;

    if (money <= 0) {
        itemSection.style.display = "none";
        messageDisplay.textContent = "You’re out of money!";
        nextArrow.style.display = "none";
    }
}

function goToNextItem(index) {
    if (index !== currentItemIndex) return; 

    document.getElementById(`item-${index}`).style.display = "none";

    currentItemIndex++;
    messageDisplay.textContent = ""; 

    if (currentItemIndex < items.length) {
        document.getElementById(`item-${currentItemIndex}`).style.display = "block";
    } else {
        itemSection.style.display = "none";
        messageDisplay.textContent = "You’ve bought everything! Remaining money: $" + money.toLocaleString();
    }
}