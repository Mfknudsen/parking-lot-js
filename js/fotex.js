document.addEventListener('DOMContentLoaded', () => {
    const parkingLot = new ParkingLot();

    const checkin = document.getElementById('entrance-gate');
    const checkout = document.getElementById('exit-gate');

	const fotexBasePrice = 15;
    const priceOffer;
    
    checkin.addEventListener('click', () => {
        try {
            const licensePlate = prompt('Nummerplade?');
            parkingLot.checkin(licensePlate);
        } catch (e) {
            alert(e.message);
        }
        
    });

    checkout.addEventListener('click', () => {
        try {
            const licensePlate = prompt('Nummerplade?');
            const price = parkingLot.checkout(licensePlate, fotexBasePrice);

            var exchange = undefined;
            var paid = 0;
            while (typeof(exchange) != 'number') {
                const amount = parseInt(prompt(`Betal ${price} DKK. Betalt: ${paid} DKK.`));
                paid += amount;
                exchange = parkingLot.pay(licensePlate, amount);
            }

            if (exchange != 0) {
                alert(`Her er ${exchange} DKK i byttepenge. Tak for besøget.`)
            } else {
                alert(`Tak for besøget.`)
            }
        } catch (e) {
            alert(e.message);
        }
    })
});