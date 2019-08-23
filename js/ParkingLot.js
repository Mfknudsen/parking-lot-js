function openGate(gate) {
    gate.classList.add('open');
    setTimeout(() => gate.classList.remove('open'), 2500);
}

class ParkingLot {
    checkedInCars = {};
    hourForEachCar = {};
    minForEachCar = {};

    entranceGate = document.getElementById('entrance-gate');
    exitGate = document.getElementById('exit-gate');

    checkin(licensePlate) {
        if (this.checkedInCars[licensePlate] != undefined) {
            throw new Error(`${licensePlate} holder allerede på pladsen!`);
        } else {
            this.checkedInCars[licensePlate] = "CHECKED IN";
            openGate(this.entranceGate);
            this.hourForEachCar[licensePlate] = new Date().getHours();
            this.minForEachCar[licensePlate] = new Date().getMinutes();
        }
    }

    checkout(licensePlate, price, priceOffer) {
        if (this.checkedInCars[licensePlate] != 'CHECKED IN') {
            throw new Error(`${licensePlate} holder ikke på pladsen!`);
        } else {
            this.checkedInCars[licensePlate] = this.payCalculation(this.hourForEachCar[licensePlate], this.minForEachCar[licensePlate], price, priceOffer);
            return this.checkedInCars[licensePlate];
        }
    }

    pay(licensePlate, amount) {
        if (typeof (this.checkedInCars[licensePlate]) != 'number') {
            throw new Error(`${licensePlate} er ikke ved at betale!`);
        } else {
            this.checkedInCars[licensePlate] -= amount;

            if (this.checkedInCars[licensePlate] <= 0) {
                const exchange = -this.checkedInCars[licensePlate];
                delete this.checkedInCars[licensePlate];

                openGate(this.exitGate);

                return exchange;
            }
        }
    }

    payCalculation(hour, min, basePrice, sOffer) {
        if (sOffer == null) {
            sOffer = 0;
        }
        const endPrice = basePrice * Math.floor((new Date().getHours() * 60 - hour * 60 + new Date().getMinutes() - min) / basePrice + 1) - sOffer;

        if (endPrice < 0) {
            endPrice = 0;
        }

        return endPrice;
    }
}