class VampireView {
    constructor() {
        this.classmateTableBody = document.getElementById("classmateTableBody");
        this.classmates = [];
    }

    displayClassificationResult(name, isVampire) {
        const resultText = `${name} is ${isVampire ? "" : "not "}a vampire.`;
        document.getElementById("classificationResult").innerText = resultText;

        this.addClassmateToList({ name, isVampire });
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
}
