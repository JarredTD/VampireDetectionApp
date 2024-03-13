class VampireView {
    constructor() {
        this.classmateTableBody = document.getElementById("classmateTableBody");
        this.classmates = [];
        this.chartCanvas = document.getElementById("vampireChart");
        this.chartContext = this.chartCanvas.getContext("2d");
        this.chartLabels = ["Vampires", "Non-Vampires"];
        this.chartColors = ["#ff6384", "#36a2eb"];
    }

    displayClassificationResult(name, isVampire) {
        const resultText = `${name} is ${isVampire ? "" : "not "}a vampire.`;
        document.getElementById("classificationResult").innerText = resultText;

        this.addClassmateToList({ name, isVampire });
        this.updatePieChart();
    }

    addClassmateToList(classmate) {
        this.classmates.unshift(classmate);

        // Max 10 classmates
        if (this.classmates.length > 10) {
            this.classmates.pop();
        }

        this.updateClassmateTable();
    }

    updateClassmateTable() {
        this.classmateTableBody.innerHTML = "";

        this.classmates.forEach((classmate, index) => {
            const row = this.classmateTableBody.insertRow();
            const cellIndex = row.insertCell(0);
            const cellName = row.insertCell(1);
            const cellIsVampire = row.insertCell(2);

            cellIndex.innerHTML = index + 1;
            cellName.innerHTML = classmate.name;
            cellIsVampire.innerHTML = classmate.isVampire ? "Yes" : "No";
        });
    }

    updatePieChart() {
        const vampireCount = this.classmates.filter(
            (classmate) => classmate.isVampire
        ).length;
        const nonVampireCount = this.classmates.length - vampireCount;

        const chartData = {
            labels: this.chartLabels,
            datasets: [
                {
                    data: [vampireCount, nonVampireCount],
                    backgroundColor: this.chartColors,
                },
            ],
        };

        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(this.chartContext, {
            type: "doughnut",
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                },
            },
        });
    }
}
