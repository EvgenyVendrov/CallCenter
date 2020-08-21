//index 0 = > emergency 1 = > emergency calm 2 = > calm

module.exports = class CallCenterSituation {
    constructor() {
        this.situationIndex = 0;
    }

    changeIndex(nSituation) {
        if (nSituation === "Emergency") {
            this.situationIndex = 0;
        }
        else if (nSituation === "Emergency - Calm") {
            this.situationIndex = 1;
        }
        else {
            this.situationIndex = 2;
        }
    }

    getCurrIndex() {
        return this.situationIndex;
    }
};

