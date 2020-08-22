//index 0 = > emergency 1 = > emergency calm 2 = > calm

module.exports = class CallCenterSituation {
    constructor() {
        this.situationIndex = 0;
    }

    changeIndex(nSituation) {
        nSituation = nSituation.trim();
        if (isSituationValid(nSituation)) {

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
        else {
            console.sysa("ERR: NOT A VALID CALL CENTER SITUATION RECIVED");
            return;
        }

    }

    getCurrIndex() {
        return this.situationIndex;
    }

    isSituationValid(nSituation) {
        if (nSituation !== "Emergency" && nSituation !== "Emergency - Calm" && nSituation !== "Calm") {
            return false;
        }
        return true;
    }
};

