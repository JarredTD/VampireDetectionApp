class VampireController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupEventListeners();
        this.setDefaultMethod();
    }

    setupEventListeners() {
        const methodSelect = document.getElementById("methodSelect");
        methodSelect.addEventListener("change", (e) =>
            this.handleMethodChange(e)
        );

        const form = document.getElementById("classmateForm");
        form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    handleMethodChange(e) {
        this.currentMethod = e.target.value;
        this.updateDynamicFields(this.currentMethod);
    }

    setDefaultMethod() {
        const methodSelect = document.getElementById("methodSelect");
        methodSelect.value = "threshold";
        this.handleMethodChange({ target: methodSelect });
    }

    updateDynamicFields(method) {
        const dynamicFields = document.getElementById("dynamicFields");
        dynamicFields.innerHTML = ""; // Clear previous content

        if (method === "threshold") {
            dynamicFields.innerHTML = this.getThresholdFields();
        } else if (method === "random") {
            dynamicFields.innerHTML = this.getRandomFields();
        } else if (method === "decisionTree") {
            dynamicFields.innerHTML = this.getDecisionTreeFields();
        }
    }

    getThresholdFields() {
        return `
            <div class="form-group">
                <label for="nameInput">Name</label>
                <input type="text" class="form-control" id="nameInput" name="nameInput" placeholder="Enter name" required>
            </div>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="shadowInput">
                <label class="custom-control-label" for="shadowInput">Has Shadow</label>
            </div>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="complexionInput">
                <label class="custom-control-label" for="complexionInput">Pale Complexion</label>
            </div>
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="garlicInput">
                <label class="custom-control-label" for="garlicInput">Allergic to Garlic</label>
            </div>
        `;
    }

    getRandomFields() {
        return `
            <div class="form-group">
                <label for="nameInput">Name</label>
                <input type="text" class="form-control" id="nameInput" name="nameInput" placeholder="Enter name">
            </div>
        `;
    }

    getDecisionTreeFields() {
        //TODO Decision Tree Fields
        return `
            <div class="form-group">
                <!-- Add decision tree specific fields here -->
            </div>
        `;
    }

    handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(event.target);

        var data;

        switch (this.currentMethod) {
            case "threshold":
                data = {
                    name: formData.get("nameInput") || "John Doe",
                    hasShadow: form.shadowInput.checked,
                    paleComplexion: form.complexionInput.checked,
                    allergicToGarlic: form.garlicInput.checked,
                    classificationMethod: this.currentMethod,
                };
                break;
            case "random":
                data.name = formData.get("nameInput");
                break;
            case "decisionTree":
                break;
            default:
                console.log("Unknown classification method.");
                return;
        }

        this.handleClassification(data);
        form.reset();
    }

    handleClassification(formData) {
        console.log("Handling classification for:", formData);
        const {
            name,
            hasShadow,
            paleComplexion,
            allergicToGarlic,
            classificationMethod,
        } = formData;

        let isVampire;
        switch (classificationMethod) {
            case "threshold":
                isVampire = this.model.thresholdDecision({
                    hasShadow,
                    paleComplexion,
                    allergicToGarlic,
                });
                break;
            // TODO Handle random choice && decision tree
            default:
                isVampire = false;
        }

        this.view.displayClassificationResult(name, isVampire);
    }
}
