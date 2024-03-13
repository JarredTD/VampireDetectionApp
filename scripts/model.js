class VampireModel {
    constructor() {}

    thresholdDecision(student) {
        let score = 0;
        score += student.hasShadow ? 0 : 4;
        score += student.paleComplexion ? 3 : 0;
        score += student.allergicToGarlic ? 3 : 0;

        return score > 6;
    }

    randomDecision() {
        return Math.random() < 0.5;
    }

    //TODO Implement decisionTree method
}
